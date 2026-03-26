import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import './editor';
import { buildSnapshot, formatEnergy, formatKwh, formatPower, getThemeTokens, prettifyStatus } from './presenters';
import { HomeAssistantLike, PowerFlowSnapshot, ZsPowerFlowCardConfig } from './types';

declare global {
  interface Window {
    customCards?: Array<Record<string, string>>;
  }
}

const DEFAULT_CONFIG: ZsPowerFlowCardConfig = {
  type: 'custom:zs-power-flow-card',
  title: 'Power Flow',
  battery_capacity_kwh: 10,
  theme: 'aurora',
  layout: 'balanced',
  view_mode: 'simple',
  visual_preset: 'default',
  flow_style: 'soft',
  show_details: true,
  details_mode: 'summary',
  show_solar: true,
  show_grid: true,
  show_battery: true,
  animation_enabled: true,
  show_status_bar: true,
  decimals: 1,
};

function normalizeActionConfig(actionConfig?: ZsPowerFlowCardConfig['tap_action']) {
  const action = actionConfig?.action ?? 'more-info';
  if (action === 'navigate') {
    return {
      action,
      navigation_path: actionConfig?.navigation_path,
    };
  }
  if (action === 'url') {
    return {
      action,
      url_path: actionConfig?.url_path,
    };
  }
  return { action };
}

function normalizeConfig(config: ZsPowerFlowCardConfig): ZsPowerFlowCardConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config,
    power_noise_floor_w: Math.max(0, config.power_noise_floor_w ?? DEFAULT_CONFIG.power_noise_floor_w ?? 30),
    decimals: Math.max(0, Math.min(3, config.decimals ?? DEFAULT_CONFIG.decimals ?? 1)),
    tap_action: normalizeActionConfig(config.tap_action),
    hold_action: normalizeActionConfig(config.hold_action),
  };
}

@customElement('zs-power-flow-card')
export class ZsPowerFlowCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantLike;
  @property({ attribute: false }) private _config: ZsPowerFlowCardConfig = DEFAULT_CONFIG;
  @query('.stage') private _stageEl?: HTMLElement;
  @query('.core') private _coreEl?: HTMLElement;
  @state() private _flowPaths: Record<'solar' | 'grid' | 'battery' | 'home', string> = {
    solar: '',
    grid: '',
    battery: '',
    home: '',
  };
  @state() private _stageSize: { width: number; height: number } = { width: 640, height: 420 };
  private _resizeObserver?: ResizeObserver;
  private _flowFrame = 0;
  private _holdTimer?: number;
  private _holdTriggered = false;

  public static getConfigElement(): HTMLElement {
    return document.createElement('zs-power-flow-card-editor');
  }

  public static getStubConfig(): ZsPowerFlowCardConfig {
    return DEFAULT_CONFIG;
  }

  public setConfig(config: ZsPowerFlowCardConfig): void {
    if (!config?.type) {
      throw new Error('Config requires a type.');
    }
    this._config = normalizeConfig(config);
  }

  public getCardSize(): number {
    return this._config.view_mode === 'advanced' ? 6 : 4;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._resizeObserver = new ResizeObserver(() => this.scheduleFlowPathUpdate());
  }

  disconnectedCallback(): void {
    this._resizeObserver?.disconnect();
    this._resizeObserver = undefined;
    cancelAnimationFrame(this._flowFrame);
    this.clearHoldTimer();
    super.disconnectedCallback();
  }

  protected firstUpdated(): void {
    this.observeFlowLayout();
    this.scheduleFlowPathUpdate();
  }

  protected updated(): void {
    this.observeFlowLayout();
    this.scheduleFlowPathUpdate();
  }

  protected render() {
    const snapshot = buildSnapshot(this.hass, this._config);
    const theme = getThemeTokens(this._config.theme);
    const layoutClass = this._config.layout === 'focus-home' ? 'layout-focus-home' : 'layout-balanced';
    const advanced = this._config.view_mode === 'advanced';
    const presetClass = `preset-${this._config.visual_preset ?? 'default'}`;
    const flowStyleClass = `flow-style-${this._config.flow_style ?? 'soft'}`;

    return html`
      <ha-card
        style=${`--zs-panel:${theme.panel}; --zs-border:${theme.border}; --zs-text:${theme.text}; --zs-muted:${theme.muted}; --zs-solar:${theme.solar}; --zs-grid:${theme.grid}; --zs-battery:${theme.battery}; --zs-home:${theme.home};`}
      >
        <section class="shell">
          <div class="hero">
            <div class="hero-copy">
              <p class="eyebrow">ZS Power Flow</p>
              <h2>${this._config.title ?? 'Power Flow'}</h2>
              <p class="subtitle">${advanced ? 'Widok zaawansowany z dodatkowymi metrykami' : 'Widok prosty z kluczowym przeplywem energii'}</p>
            </div>
            <div class="hero-side">
              ${this._config.show_status_bar ? this.renderStatusRail(snapshot, advanced) : nothing}
              <div class="status-pill">${this.describeSystemBalance(snapshot)}</div>
            </div>
          </div>

          <div class=${`stage ${layoutClass} ${presetClass} ${flowStyleClass} ${advanced ? 'stage-advanced' : 'stage-simple'}`}>
            <div class="ambient ambient-a"></div>
            <div class="ambient ambient-b"></div>
            <div class="grid-lines"></div>

            ${this._config.show_solar ? this.renderNode(snapshot.solar, 'top left', 'solar', this._config.solar_entity) : nothing}
            ${this._config.show_grid ? this.renderNode(snapshot.grid, 'top right', 'grid', this._config.grid_entity) : nothing}
            ${this.renderCore(snapshot, advanced)}
            ${this._config.show_battery ? this.renderNode(snapshot.battery, 'bottom left', 'battery', this._config.battery_power_entity, snapshot.battery.soc) : nothing}
            ${this.renderNode(snapshot.home, 'bottom right', 'home', this._config.home_entity)}

            ${this._config.show_solar
              ? this.renderFlow({
                  power: snapshot.solar.flowValue,
                  color: snapshot.solar.accent,
                  path: this._flowPaths.solar,
                  direction: 'forward',
                })
              : nothing}
            ${this._config.show_grid
              ? this.renderFlow({
                  power: Math.abs(snapshot.grid.flowValue),
                  color: snapshot.grid.accent,
                  path: this._flowPaths.grid,
                  direction: snapshot.grid.flowValue >= 0 ? 'forward' : 'reverse',
                })
              : nothing}
            ${this._config.show_battery
              ? this.renderFlow({
                  power: Math.abs(snapshot.battery.flowValue),
                  color: snapshot.battery.accent,
                  path: this._flowPaths.battery,
                  direction: snapshot.battery.flowValue > 0 ? 'forward' : 'reverse',
                })
              : nothing}
            ${this.renderFlow({
              power: snapshot.home.value,
              color: snapshot.home.accent,
              path: this._flowPaths.home,
              direction: 'forward',
            })}
          </div>

          ${advanced ? this.renderAdvancedRail(snapshot) : nothing}
          ${advanced ? this.renderAnalyticsRail(snapshot) : nothing}
          ${advanced ? this.renderHealthRail(snapshot) : nothing}
          ${advanced ? this.renderBreakdowns(snapshot) : nothing}
          ${this._config.show_details ? this.renderDetails(snapshot, advanced) : nothing}
        </section>
      </ha-card>
    `;
  }

  private renderStatusRail(snapshot: PowerFlowSnapshot, advanced: boolean) {
    const inverterTone = this.getStatusTone(snapshot.inverterStatus);
    const deviceTone = this.getStatusTone(snapshot.deviceAlarm, snapshot.deviceFault);

    return html`
      <div class="status-rail">
        <div class=${`badge ${snapshot.gridConnected === false ? 'warn' : 'ok'}`}>
          <span class="badge-dot"></span>
          ${snapshot.gridConnected === null ? 'Stan sieci nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}
        </div>
        ${advanced && snapshot.inverterStatus
          ? html`<div class=${`badge info ${inverterTone}`.trim()}>${snapshot.inverterStatus}</div>`
          : nothing}
        ${advanced ? html`<div class="badge soft">${this.describeBatteryStatus(snapshot)}</div>` : nothing}
        ${advanced && snapshot.deviceAlarm
          ? html`<div class=${`badge ${deviceTone}`.trim()}>${snapshot.deviceAlarm}</div>`
          : nothing}
      </div>
    `;
  }

  private renderCore(snapshot: PowerFlowSnapshot, advanced: boolean) {
    return html`
      <div class="core">
        <span class="flow-anchor core-anchor top-left"></span>
        <span class="flow-anchor core-anchor top-right"></span>
        <span class="flow-anchor core-anchor bottom-left"></span>
        <span class="flow-anchor core-anchor bottom-right"></span>
        <div class="core-shield"></div>
        <div class="core-ring"></div>
        <div class="core-ring pulse"></div>
        <div class="core-content">
          <span class="core-label">Bilans</span>
          <strong>${formatPower(snapshot.netHomeDemand, this._config.decimals ?? 1)}</strong>
          <small>${advanced ? 'zapotrzebowanie netto i status pracy' : 'zapotrzebowanie netto'}</small>
        </div>
      </div>
    `;
  }

  private renderNode(
    node: PowerFlowSnapshot['solar'] | PowerFlowSnapshot['grid'] | PowerFlowSnapshot['home'] | PowerFlowSnapshot['battery'],
    position: string,
    iconName: 'solar' | 'grid' | 'battery' | 'home',
    entityId?: string,
    soc?: number | null,
  ) {
    return html`
      <article
        class=${`node ${position} ${entityId ? 'clickable' : ''}`}
        style=${`--accent:${node.accent};`}
        @click=${() => this.handleTap(entityId)}
        @pointerdown=${() => this.handlePointerDown(entityId)}
        @pointerup=${this.handlePointerUp}
        @pointerleave=${this.handlePointerLeave}
        @pointercancel=${this.handlePointerLeave}
      >
        <span class=${`flow-anchor node-anchor ${iconName}`}></span>
        <div class="icon">${this.renderIcon(iconName)}</div>
        <div class="meta">
          <span class="label">${node.label}</span>
          <strong>${formatPower(node.value, this._config.decimals ?? 1)}</strong>
          <small>${node.secondary}</small>
          ${soc === undefined ? nothing : html`<small class="soc">Poziom: ${formatEnergy(soc, 0)}</small>`}
        </div>
      </article>
    `;
  }

  private renderIcon(iconName: 'solar' | 'grid' | 'battery' | 'home') {
    const paths = {
      solar: html`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"></path>
        </svg>
      `,
      grid: html`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 4h8l3 5-7 11L5 9l3-5Z"></path>
          <path d="M9 9h6M8 13h8M7 17h10"></path>
        </svg>
      `,
      battery: html`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="7" width="14" height="10" rx="2"></rect>
          <path d="M20 10v4"></path>
          <path d="M7 12h6M10 9v6"></path>
        </svg>
      `,
      home: html`
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 11.5 12 5l8 6.5"></path>
          <path d="M6.5 10.5V19h11v-8.5"></path>
          <path d="M10 19v-5h4v5"></path>
        </svg>
      `,
    };

    return paths[iconName];
  }

  private renderFlow({
    power,
    color,
    path,
    direction,
  }: {
    power: number;
    color: string;
    path: string;
    direction: 'forward' | 'reverse';
  }) {
    if (!path) return nothing;
    const active = power > 12;
    const width = Math.max(2, Math.min(8, Math.abs(power) < 250 ? 2.6 : Math.abs(power) / 420));
    const animate = this._config.animation_enabled ?? true;
    const glow = Math.max(0.16, Math.min(0.42, Math.abs(power) / 3000));
    const style = this._config.flow_style ?? 'soft';
    const directionClass = direction === 'reverse' ? 'reverse' : 'forward';

    return html`
      <svg
        class="flow"
        viewBox=${`0 0 ${Math.max(1, this._stageSize.width)} ${Math.max(1, this._stageSize.height)}`}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path class="flow-track" d=${path}></path>
        <path
          class="flow-base"
          style=${`--flow-color:${color}; --flow-width:${Math.max(2, width - 0.3)}px;`}
          d=${path}
        ></path>
        <path
          class=${`flow-aura ${style} ${active ? 'visible' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width + 4}px; --flow-opacity:${glow};`}
          d=${path}
        ></path>
        <path
          class=${`flow-line ${style} ${directionClass} ${active ? 'visible' : ''} ${active && animate ? 'active' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width}px; --flow-speed:${Math.max(2.6, 7.6 - Math.min(Math.abs(power) / 700, 4.2))}s;`}
          d=${path}
        ></path>
      </svg>
    `;
  }

  private scheduleFlowPathUpdate() {
    cancelAnimationFrame(this._flowFrame);
    this._flowFrame = requestAnimationFrame(() => this.updateFlowPaths());
  }

  private observeFlowLayout() {
    if (!this._resizeObserver) return;

    this._resizeObserver.disconnect();
    this._resizeObserver.observe(this);

    const elements = this.renderRoot.querySelectorAll('.stage, .core, .node, .flow-anchor');
    elements.forEach((element) => this._resizeObserver?.observe(element));
  }

  private updateFlowPaths() {
    const stage = this._stageEl;
    const core = this._coreEl;
    if (!stage || !core) return;

    const stageRect = stage.getBoundingClientRect();
    const nextStageSize = {
      width: Math.round(stageRect.width),
      height: Math.round(stageRect.height),
    };
    const anchors = {
      solar: stage.querySelector<HTMLElement>('.node-anchor.solar')?.getBoundingClientRect(),
      grid: stage.querySelector<HTMLElement>('.node-anchor.grid')?.getBoundingClientRect(),
      battery: stage.querySelector<HTMLElement>('.node-anchor.battery')?.getBoundingClientRect(),
      home: stage.querySelector<HTMLElement>('.node-anchor.home')?.getBoundingClientRect(),
      coreTopLeft: stage.querySelector<HTMLElement>('.core-anchor.top-left')?.getBoundingClientRect(),
      coreTopRight: stage.querySelector<HTMLElement>('.core-anchor.top-right')?.getBoundingClientRect(),
      coreBottomLeft: stage.querySelector<HTMLElement>('.core-anchor.bottom-left')?.getBoundingClientRect(),
      coreBottomRight: stage.querySelector<HTMLElement>('.core-anchor.bottom-right')?.getBoundingClientRect(),
    };

    const nextPaths = {
      solar: this.buildAnchoredPath(anchors.solar, anchors.coreTopLeft, stageRect, 'left'),
      grid: this.buildAnchoredPath(anchors.grid, anchors.coreTopRight, stageRect, 'right'),
      battery: this.buildAnchoredPath(anchors.battery, anchors.coreBottomLeft, stageRect, 'bottom-left'),
      home: this.buildAnchoredPath(anchors.coreBottomRight, anchors.home, stageRect, 'bottom-right'),
    };

    if (
      nextStageSize.width !== this._stageSize.width ||
      nextStageSize.height !== this._stageSize.height
    ) {
      this._stageSize = nextStageSize;
    }

    if (JSON.stringify(nextPaths) !== JSON.stringify(this._flowPaths)) {
      this._flowPaths = nextPaths;
    }
  }

  private buildAnchoredPath(
    fromRect: DOMRect | undefined,
    toRect: DOMRect | undefined,
    stageRect: DOMRect,
    anchor: 'left' | 'right' | 'bottom-left' | 'bottom-right',
  ): string {
    if (!fromRect || !toRect) return '';

    const fromPoint = {
      x: fromRect.left - stageRect.left + fromRect.width / 2,
      y: fromRect.top - stageRect.top + fromRect.height / 2,
    };
    const toPoint = {
      x: toRect.left - stageRect.left + toRect.width / 2,
      y: toRect.top - stageRect.top + toRect.height / 2,
    };

    const control1 = this.computeControlPoint(fromPoint, toPoint, anchor, true);
    const control2 = this.computeControlPoint(fromPoint, toPoint, anchor, false);

    return `M ${fromPoint.x.toFixed(1)} ${fromPoint.y.toFixed(1)} C ${control1.x.toFixed(1)} ${control1.y.toFixed(1)}, ${control2.x.toFixed(1)} ${control2.y.toFixed(1)}, ${toPoint.x.toFixed(1)} ${toPoint.y.toFixed(1)}`;
  }

  private computeControlPoint(
    from: { x: number; y: number },
    to: { x: number; y: number },
    anchor: 'left' | 'right' | 'bottom-left' | 'bottom-right',
    first: boolean,
  ) {
    const mx = (from.x + to.x) / 2;
    const my = (from.y + to.y) / 2;

    if (anchor === 'left') {
      return first ? { x: mx - 34, y: from.y - 8 } : { x: mx + 10, y: to.y - 2 };
    }
    if (anchor === 'right') {
      return first ? { x: mx + 34, y: from.y - 8 } : { x: mx - 10, y: to.y - 2 };
    }
    if (anchor === 'bottom-left') {
      return first ? { x: from.x + 40, y: from.y + 18 } : { x: to.x - 16, y: my + 18 };
    }
    return first ? { x: from.x + 18, y: my + 18 } : { x: to.x - 44, y: to.y + 10 };
  }

  private renderDetails(snapshot: PowerFlowSnapshot, advanced: boolean) {
    const baseCards = html`
      <div class="detail-card highlight">
        <span>PV do domu</span>
        <strong>${formatPower(snapshot.solarToHome, this._config.decimals ?? 1)}</strong>
      </div>
      <div class="detail-card">
        <span>PV do magazynu</span>
        <strong>${formatPower(snapshot.solarToBattery, this._config.decimals ?? 1)}</strong>
      </div>
        <div class="detail-card">
          <span>Siec do domu</span>
          <strong>${formatPower(snapshot.gridToHome, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Siec do magazynu</span>
          <strong>${formatPower(snapshot.gridToBattery, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Energia w baterii</span>
          <strong>${formatKwh(snapshot.batteryStoredKwh, 1)}</strong>
        </div>
      `;

    if (!advanced) {
      return html`<section class="details simple">${baseCards}</section>`;
    }

    const residualCard =
      snapshot.residualPower > 0
        ? html`
            <div class="detail-card warn">
              <span>${this.describeResidualLabel(snapshot)}</span>
              <strong>${formatPower(snapshot.residualPower, this._config.decimals ?? 1)}</strong>
            </div>
          `
        : nothing;

    return html`
      <section class="details advanced">
        ${baseCards}
        <div class="detail-card">
          <span>Eksport do sieci</span>
          <strong>${formatPower(snapshot.solarToGrid, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Oddawanie z baterii</span>
          <strong>${formatPower(snapshot.batteryToHome, this._config.decimals ?? 1)}</strong>
        </div>
        <div class="detail-card">
          <span>Bateria do sieci</span>
          <strong>${formatPower(snapshot.batteryToGrid, this._config.decimals ?? 1)}</strong>
        </div>
        ${residualCard}
        <div class="detail-card metric">
          <span>Dzienna produkcja</span>
          <strong>${formatKwh(snapshot.dailyEnergy.solar, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Dzienne zuzycie</span>
          <strong>${formatKwh(snapshot.dailyEnergy.home, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Import dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.gridImport, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Eksport dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.gridExport, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Ladowanie baterii dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.batteryCharge, 1)}</strong>
        </div>
        <div class="detail-card metric">
          <span>Rozladowanie baterii dzisiaj</span>
          <strong>${formatKwh(snapshot.dailyEnergy.batteryDischarge, 1)}</strong>
        </div>
      </section>
    `;
  }

  private renderAdvancedRail(snapshot: PowerFlowSnapshot) {
    return html`
      <section class="advanced-rail">
        <div class="rail-card">
          <span>Tryb pracy</span>
          <strong>${prettifyStatus(snapshot.workMode) ?? this.describeSystemBalance(snapshot)}</strong>
          <small>${prettifyStatus(snapshot.energyPattern) ?? prettifyStatus(snapshot.inverterStatus) ?? 'Brak statusu inwertera'}</small>
        </div>
        <div class="rail-card">
          <span>Stan magazynu</span>
          <strong>${this.describeBatteryStatus(snapshot)}</strong>
          <small>${prettifyStatus(snapshot.batteryState) ?? (snapshot.battery.soc === null ? 'SOC nieznany' : `SOC ${snapshot.battery.soc.toFixed(0)}%`)}</small>
        </div>
        <div class="rail-card">
          <span>Tryb polaczenia</span>
          <strong>${snapshot.gridConnected === null ? 'Nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}</strong>
          <small>${snapshot.grid.value >= 0 ? 'Import z sieci' : 'Eksport do sieci'}</small>
        </div>
      </section>
    `;
  }

  private renderAnalyticsRail(snapshot: PowerFlowSnapshot) {
    return html`
      <section class="analytics-rail">
        <div class="analytics-card kpi">
          <span>Autokonsumpcja dzisiaj</span>
          <strong>${this.formatPercent(snapshot.analytics.selfConsumptionRate)}</strong>
          <small>${snapshot.dailyEnergy.solar === null ? 'Brak energii dziennej PV' : 'Udzial energii PV zuzytej lokalnie'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Samowystarczalnosc dzisiaj</span>
          <strong>${this.formatPercent(snapshot.analytics.selfSufficiencyRate)}</strong>
          <small>${snapshot.dailyEnergy.home === null ? 'Brak energii dziennej domu' : 'Udzial zuzycia pokrytego bez importu'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Bufor baterii</span>
          <strong>${this.formatHours(snapshot.analytics.batteryRuntimeHours)}</strong>
          <small>${snapshot.batteryStoredKwh === null ? 'Brak pojemnosci lub SOC' : 'Szacowany czas pokrycia aktualnego obciazenia'}</small>
        </div>
        <div class="analytics-card kpi">
          <span>Reszta bilansu</span>
          <strong>${this.formatPercent(snapshot.analytics.residualRate)}</strong>
          <small>${this.describeResidualLabel(snapshot)}</small>
        </div>
        <div class="analytics-card mix">
          <span>Aktualny mix zasilania domu</span>
          <div class="mix-bar" aria-hidden="true">
            <div class="mix-segment solar" style=${`width:${snapshot.analytics.currentSourceMix.solar.toFixed(1)}%`}></div>
            <div class="mix-segment battery" style=${`width:${snapshot.analytics.currentSourceMix.battery.toFixed(1)}%`}></div>
            <div class="mix-segment grid" style=${`width:${snapshot.analytics.currentSourceMix.grid.toFixed(1)}%`}></div>
          </div>
          <div class="mix-legend">
            <span>PV ${this.formatPercent(snapshot.analytics.currentSourceMix.solar, 0)}</span>
            <span>Bat ${this.formatPercent(snapshot.analytics.currentSourceMix.battery, 0)}</span>
            <span>Grid ${this.formatPercent(snapshot.analytics.currentSourceMix.grid, 0)}</span>
          </div>
        </div>
      </section>
    `;
  }

  private renderBreakdowns(snapshot: PowerFlowSnapshot) {
    const showPv = (this._config.show_pv_breakdown ?? true) && snapshot.pvBreakdown.length > 0;
    const showLoadPhases = (this._config.show_phase_breakdown ?? true) && snapshot.loadPhaseBreakdown.length > 0;
    const showGridPhases = (this._config.show_phase_breakdown ?? true) && snapshot.gridPhaseBreakdown.length > 0;

    if (!showPv && !showLoadPhases && !showGridPhases) {
      return nothing;
    }

    return html`
      <section class="breakdown-grid">
        ${showPv ? this.renderBreakdownCard('MPPT / PV', snapshot.pvBreakdown) : nothing}
        ${showLoadPhases ? this.renderBreakdownCard('Fazy obciazenia', snapshot.loadPhaseBreakdown) : nothing}
        ${showGridPhases ? this.renderBreakdownCard('Fazy sieci', snapshot.gridPhaseBreakdown) : nothing}
      </section>
    `;
  }

  private renderBreakdownCard(title: string, items: Array<{ label: string; value: number }>) {
    return html`
      <div class="breakdown-card">
        <span class="breakdown-title">${title}</span>
        <div class="breakdown-list">
          ${items.map(
            (item) => html`
              <div class="breakdown-item">
                <span>${item.label}</span>
                <strong>${formatPower(item.value, this._config.decimals ?? 1)}</strong>
              </div>
            `,
          )}
        </div>
      </div>
    `;
  }

  private renderHealthRail(snapshot: PowerFlowSnapshot) {
    const deviceTone = this.getStatusTone(snapshot.deviceAlarm, snapshot.deviceFault);
    const batteryTone = snapshot.batteryAlarm === false && snapshot.batteryFault === false ? '' : 'warn';

    return html`
      <section class="health-rail">
        <div class="health-card">
          <span>Kondycja baterii</span>
          <strong>${snapshot.batterySoh === null ? '--' : `${snapshot.batterySoh.toFixed(1)}% SOH`}</strong>
          <small>${snapshot.batteryTemperature === null ? 'Temp. baterii --' : `Temp. baterii ${snapshot.batteryTemperature.toFixed(0)}°C`}</small>
        </div>
        <div class="health-card">
          <span>Temperatura falownika</span>
          <strong>${snapshot.inverterTemperature === null ? '--' : `${snapshot.inverterTemperature.toFixed(0)}°C`}</strong>
          <small>${snapshot.inverterStatus ?? 'Brak statusu'}</small>
        </div>
        <div class=${`health-card ${deviceTone}`.trim()}>
          <span>Alarm urzadzenia</span>
          <strong>${snapshot.deviceAlarm ?? '--'}</strong>
          <small>Fault: ${snapshot.deviceFault ?? '--'}</small>
        </div>
        <div class=${`health-card ${batteryTone}`.trim()}>
          <span>Alarm baterii</span>
          <strong>${this.describeBinaryHealth(snapshot.batteryAlarm)}</strong>
          <small>Fault: ${this.describeBinaryHealth(snapshot.batteryFault)}</small>
        </div>
      </section>
    `;
  }

  private describeSystemBalance(snapshot: PowerFlowSnapshot): string {
    if (snapshot.gridConnected === false) {
      return 'Praca off-grid';
    }
    if (snapshot.residualPower > 0) {
      return 'Bilans czesciowy';
    }
    if (snapshot.solar.value > snapshot.home.value && snapshot.grid.value < 0) {
      return 'Nadwyzka produkcji';
    }
    if (snapshot.grid.value > 0 && snapshot.solar.value < snapshot.home.value) {
      return 'Wsparcie z sieci';
    }
    if (snapshot.battery.mode === 'discharging') {
      return 'Praca z magazynu';
    }
    if (snapshot.battery.mode === 'charging') {
      return 'Ladowanie magazynu';
    }
    return 'Przeplyw stabilny';
  }

  private describeBatteryStatus(snapshot: PowerFlowSnapshot): string {
    if (snapshot.batteryState) return prettifyStatus(snapshot.batteryState) ?? snapshot.batteryState;
    if (snapshot.battery.mode === 'charging') return 'Ladowanie';
    if (snapshot.battery.mode === 'discharging') return 'Rozladowanie';
    return 'Stabilny bufor';
  }

  private describeResidualLabel(snapshot: PowerFlowSnapshot): string {
    if (snapshot.residualDirection === 'unassigned_source') {
      return 'Inne zuzycie / straty';
    }
    if (snapshot.residualDirection === 'unassigned_demand') {
      return 'Brakujace zrodlo / dane';
    }
    return 'Bilans pozostaly';
  }

  private formatPercent(value: number | null, decimals = 1): string {
    if (value === null) return '--';
    return `${value.toFixed(decimals)}%`;
  }

  private formatHours(value: number | null): string {
    if (value === null) return '--';
    if (value >= 10) return `${value.toFixed(0)} h`;
    return `${value.toFixed(1)} h`;
  }

  private handleTap(entityId?: string) {
    if (this._holdTriggered) {
      this._holdTriggered = false;
      return;
    }
    this.fireConfiguredAction(this._config.tap_action, entityId);
  }

  private handlePointerDown(entityId?: string) {
    this.clearHoldTimer();
    this._holdTriggered = false;
    this._holdTimer = window.setTimeout(() => {
      this._holdTriggered = true;
      this.fireConfiguredAction(this._config.hold_action, entityId);
    }, 450);
  }

  private handlePointerUp = () => {
    this.clearHoldTimer();
  };

  private handlePointerLeave = () => {
    this.clearHoldTimer();
  };

  private clearHoldTimer() {
    if (this._holdTimer !== undefined) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
  }

  private fireConfiguredAction(actionConfig: ZsPowerFlowCardConfig['tap_action'], entityId?: string) {
    const action = actionConfig?.action ?? 'more-info';

    if (action === 'none') return;
    if (action === 'navigate' && actionConfig?.navigation_path) {
      window.history.pushState(null, '', actionConfig.navigation_path);
      window.dispatchEvent(new Event('location-changed'));
      return;
    }
    if (action === 'url' && actionConfig?.url_path) {
      window.open(actionConfig.url_path, '_blank', 'noopener');
      return;
    }
    this.showMoreInfo(entityId);
  }

  private showMoreInfo(entityId?: string) {
    if (!entityId || !this.hass) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private isHealthy(value: string | null): boolean {
    if (!value) return true;
    return ['ok', 'normal', 'none', 'idle'].includes(value.toLowerCase());
  }

  private getStatusTone(...values: Array<string | null | undefined>): string {
    const normalized = values
      .filter((value): value is string => Boolean(value))
      .map((value) => value.toLowerCase());

    if (normalized.some((value) => value.includes('fault') || value.includes('alarm') || value.includes('error'))) {
      return 'warn';
    }
    if (normalized.some((value) => value.includes('warn') || value.includes('offline'))) {
      return 'caution';
    }
    if (normalized.some((value) => value.includes('normal') || value.includes('ok') || value.includes('idle'))) {
      return 'ok';
    }
    return '';
  }

  private describeBinaryHealth(value: boolean | null): string {
    if (value === null) return '--';
    return value ? 'Alarm' : 'OK';
  }

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      background: var(--zs-panel);
      border: 1px solid var(--zs-border);
      border-radius: 30px;
      color: var(--zs-text);
      overflow: hidden;
      box-shadow:
        0 24px 80px rgba(0, 0, 0, 0.28),
        inset 0 1px 0 rgba(255, 255, 255, 0.08);
    }

    .shell {
      padding: 24px;
      position: relative;
      max-width: 1480px;
      margin: 0 auto;
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.14), transparent 28%),
        radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08), transparent 30%);
    }

    .hero {
      display: flex;
      justify-content: space-between;
      gap: 18px;
      align-items: flex-start;
      margin-bottom: 18px;
    }

    .hero-copy {
      max-width: 420px;
    }

    .hero-side {
      display: grid;
      gap: 10px;
      justify-items: end;
    }

    .eyebrow {
      margin: 0 0 6px;
      text-transform: uppercase;
      letter-spacing: 0.24em;
      font-size: 0.72rem;
      color: var(--zs-muted);
    }

    h2 {
      margin: 0;
      font-size: clamp(1.6rem, 2.3vw, 2.25rem);
      line-height: 1;
    }

    .subtitle {
      margin: 10px 0 0;
      color: var(--zs-muted);
      font-size: 0.92rem;
      line-height: 1.45;
    }

    .status-rail {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    .badge,
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--zs-muted);
      font-size: 0.82rem;
      white-space: nowrap;
    }

    .badge.ok .badge-dot {
      background: #86efac;
    }

    .badge.warn .badge-dot {
      background: #fca5a5;
    }

    .badge.caution .badge-dot {
      background: #fcd34d;
    }

    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #93c5fd;
      box-shadow: 0 0 10px currentColor;
    }

    .badge.soft {
      background: rgba(255, 255, 255, 0.05);
    }

    .badge.warn {
      border-color: rgba(248, 113, 113, 0.28);
      color: #ffe4e6;
    }

    .badge.caution {
      border-color: rgba(251, 191, 36, 0.28);
      color: #fef3c7;
    }

    .badge.ok {
      border-color: rgba(134, 239, 172, 0.22);
    }

    .stage {
      position: relative;
      min-height: 430px;
      border-radius: 26px;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01)),
        rgba(7, 10, 18, 0.18);
      border: 1px solid rgba(255, 255, 255, 0.07);
    }

    .stage-advanced {
      min-height: 450px;
    }

    .stage.preset-compact {
      min-height: 390px;
    }

    .stage.preset-analytics {
      min-height: 470px;
    }

    .ambient {
      position: absolute;
      border-radius: 999px;
      filter: blur(36px);
      opacity: 0.26;
      pointer-events: none;
    }

    .ambient-a {
      top: 36px;
      left: 70px;
      width: 140px;
      height: 140px;
      background: var(--zs-solar);
      animation: float 12s ease-in-out infinite;
    }

    .ambient-b {
      right: 90px;
      bottom: 52px;
      width: 160px;
      height: 160px;
      background: var(--zs-home);
      animation: float 14s ease-in-out infinite reverse;
    }

    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 28px 28px;
      mask-image: radial-gradient(circle at center, black 32%, transparent 82%);
      opacity: 0.3;
    }

    .core {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      width: 168px;
      height: 168px;
      display: grid;
      place-items: center;
      z-index: 4;
      isolation: isolate;
    }

    .flow-anchor {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0;
      pointer-events: none;
    }

    .node-anchor.solar {
      right: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.grid {
      left: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.battery {
      right: 8px;
      top: calc(50% - 4px);
    }

    .node-anchor.home {
      left: 8px;
      top: calc(50% - 4px);
    }

    .core-anchor.top-left {
      left: 28px;
      top: 44px;
    }

    .core-anchor.top-right {
      right: 28px;
      top: 44px;
    }

    .core-anchor.bottom-left {
      left: 28px;
      bottom: 44px;
    }

    .core-anchor.bottom-right {
      right: 28px;
      bottom: 44px;
    }

    .stage.layout-focus-home .core {
      width: 188px;
      height: 188px;
    }

    .core-shield {
      position: absolute;
      inset: 10px;
      border-radius: 50%;
      background:
        radial-gradient(circle, color-mix(in srgb, var(--zs-panel) 92%, rgba(255,255,255,0.12)) 0 58%, color-mix(in srgb, var(--zs-panel) 78%, rgba(255,255,255,0.08)) 70%, transparent 78%);
      box-shadow:
        0 12px 30px rgba(0, 0, 0, 0.18),
        inset 0 0 24px rgba(255, 255, 255, 0.05);
      z-index: 0;
      pointer-events: none;
    }

    .core-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(255,255,255,0.18), rgba(255,255,255,0.03) 62%, transparent 63%),
        conic-gradient(from 180deg, rgba(255,255,255,0.16), transparent, rgba(255,255,255,0.2));
      box-shadow:
        inset 0 0 46px rgba(255, 255, 255, 0.08),
        0 0 40px rgba(255, 255, 255, 0.06);
      z-index: 1;
    }

    .core-ring.pulse {
      inset: -12px;
      opacity: 0.28;
      animation: pulse 4.8s ease-in-out infinite;
      z-index: 0;
    }

    .core-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 22px;
    }

    .core-label,
    .core-content small {
      display: block;
      color: var(--zs-muted);
    }

    .core-content strong {
      display: block;
      margin: 8px 0 4px;
      font-size: 1.55rem;
    }

    .node {
      position: absolute;
      width: 178px;
      padding: 16px;
      border-radius: 24px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025)),
        rgba(9, 13, 24, 0.34);
      border: 1px solid rgba(255, 255, 255, 0.09);
      backdrop-filter: blur(14px);
      display: flex;
      gap: 14px;
      z-index: 2;
      box-shadow:
        0 18px 34px rgba(0, 0, 0, 0.2),
        inset 0 1px 0 rgba(255,255,255,0.05);
      transition: transform 180ms ease, border-color 180ms ease;
    }

    .node:hover {
      transform: translateY(-2px);
      border-color: color-mix(in srgb, var(--accent) 28%, rgba(255,255,255,0.08));
    }

    .node.clickable {
      cursor: pointer;
    }

    .top.left {
      top: 26px;
      left: 26px;
    }

    .top.right {
      top: 26px;
      right: 26px;
    }

    .bottom.left {
      bottom: 26px;
      left: 26px;
    }

    .bottom.right {
      bottom: 26px;
      right: 26px;
    }

    .icon {
      width: 52px;
      height: 52px;
      border-radius: 18px;
      background: color-mix(in srgb, var(--accent) 24%, transparent);
      color: var(--accent);
      display: grid;
      place-items: center;
      flex: 0 0 auto;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .icon svg {
      width: 24px;
      height: 24px;
      stroke: currentColor;
      fill: none;
      stroke-width: 1.8;
      stroke-linecap: round;
      stroke-linejoin: round;
    }

    .icon svg circle,
    .icon svg rect {
      fill: none;
    }

    .meta {
      display: grid;
      gap: 4px;
    }

    .label,
    .meta small {
      color: var(--zs-muted);
    }

    .meta strong {
      font-size: 1.28rem;
      line-height: 1.05;
    }

    .soc {
      margin-top: 2px;
    }

    .flow {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: visible;
    }

    .flow-track {
      fill: none;
      stroke: rgba(255, 255, 255, 0.06);
      stroke-width: 2;
      stroke-linecap: round;
    }

    .flow-base {
      fill: none;
      stroke: color-mix(in srgb, var(--flow-color) 26%, rgba(255, 255, 255, 0.05));
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      opacity: 0.72;
      filter: drop-shadow(0 0 8px color-mix(in srgb, var(--flow-color) 16%, transparent));
    }

    .flow-aura {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      opacity: 0;
      filter: blur(8px);
    }

    .flow-aura.visible {
      opacity: var(--flow-opacity);
    }

    .flow-line {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      stroke-dasharray: 18 24;
      opacity: 0.14;
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--flow-color) 45%, transparent));
    }

    .flow-line.soft {
      stroke-dasharray: 18 24;
    }

    .flow-line.beam {
      stroke-dasharray: 28 34;
      filter: drop-shadow(0 0 14px color-mix(in srgb, var(--flow-color) 55%, transparent));
    }

    .flow-line.pulse {
      stroke-dasharray: 10 18;
      filter: drop-shadow(0 0 12px color-mix(in srgb, var(--flow-color) 52%, transparent));
    }

    .flow-aura.beam.visible {
      opacity: calc(var(--flow-opacity) + 0.08);
    }

    .flow-aura.pulse.visible {
      opacity: calc(var(--flow-opacity) + 0.02);
    }

    .flow-line.visible {
      opacity: 0.9;
    }

    .flow-line.active {
      animation: flow var(--flow-speed) linear infinite;
    }

    .flow-line.reverse.active {
      animation-direction: reverse;
    }

    .flow-line.pulse.active {
      animation:
        flow var(--flow-speed) linear infinite,
        flowPulse 2.8s ease-in-out infinite;
    }

    .flow-line.pulse.reverse.active {
      animation-direction: reverse, normal;
    }

    .details {
      display: grid;
      gap: 12px;
      margin-top: 16px;
    }

    .breakdown-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .breakdown-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .breakdown-title {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 10px;
      font-size: 0.84rem;
    }

    .breakdown-list {
      display: grid;
      gap: 8px;
    }

    .breakdown-item {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      align-items: baseline;
      padding-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.05);
    }

    .breakdown-item:first-child {
      border-top: 0;
      padding-top: 0;
    }

    .breakdown-item span {
      color: var(--zs-muted);
    }

    .breakdown-item strong {
      font-size: 0.98rem;
    }

    .advanced-rail {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .health-rail {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .analytics-rail {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 12px;
      margin-top: 12px;
    }

    .rail-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .health-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .analytics-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255,255,255,0.02);
      border: 1px solid rgba(255,255,255,0.06);
    }

    .analytics-card span,
    .analytics-card small {
      display: block;
      color: var(--zs-muted);
    }

    .analytics-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.05rem;
    }

    .analytics-card.mix {
      grid-column: span 2;
    }

    .mix-bar {
      margin-top: 10px;
      height: 12px;
      border-radius: 999px;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.06);
      display: flex;
    }

    .mix-segment {
      height: 100%;
    }

    .mix-segment.solar {
      background: var(--zs-solar);
    }

    .mix-segment.battery {
      background: var(--zs-battery);
    }

    .mix-segment.grid {
      background: var(--zs-grid);
    }

    .mix-legend {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 10px;
      color: var(--zs-muted);
      font-size: 0.82rem;
    }

    .health-card.warn {
      border-color: rgba(248, 113, 113, 0.3);
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.08);
    }

    .health-card.caution {
      border-color: rgba(251, 191, 36, 0.3);
      box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.08);
    }

    .health-card span,
    .health-card small {
      display: block;
      color: var(--zs-muted);
    }

    .health-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.02rem;
    }

    .rail-card span,
    .rail-card small {
      display: block;
      color: var(--zs-muted);
    }

    .rail-card strong {
      display: block;
      margin: 6px 0 4px;
      font-size: 1.05rem;
    }

    .details.simple {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }

    .details.advanced {
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      align-items: start;
    }

    .detail-card {
      padding: 12px 14px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      min-height: 68px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .detail-card.highlight {
      border-color: color-mix(in srgb, var(--zs-solar) 22%, rgba(255,255,255,0.06));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
    }

    .detail-card.warn {
      border-color: rgba(251, 191, 36, 0.28);
      box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.08);
    }

    .detail-card.metric {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.018)),
        rgba(5, 9, 17, 0.18);
      min-height: 70px;
    }

    .detail-card span {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 4px;
      font-size: 0.77rem;
      line-height: 1.3;
    }

    .detail-card strong {
      font-size: 1.3rem;
      line-height: 1.02;
      letter-spacing: -0.01em;
    }

    @keyframes flow {
      from {
        stroke-dashoffset: 0;
      }
      to {
        stroke-dashoffset: -168;
      }
    }

    @keyframes flowPulse {
      0%, 100% {
        opacity: 0.72;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes pulse {
      0%, 100% {
        transform: scale(0.98);
        opacity: 0.18;
      }
      50% {
        transform: scale(1.03);
        opacity: 0.32;
      }
    }

    @keyframes float {
      0%, 100% {
        transform: translate3d(0, 0, 0);
      }
      50% {
        transform: translate3d(10px, -12px, 0);
      }
    }

    @media (max-width: 760px) {
      .hero {
        flex-direction: column;
      }

      .hero-side {
        justify-items: start;
      }

      .status-rail {
        justify-content: flex-start;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .advanced-rail,
      .analytics-rail,
      .health-rail,
      .breakdown-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (min-width: 1180px) {
      .stage {
        min-height: 500px;
      }

      .stage-advanced {
        min-height: 530px;
      }

      .top.left {
        top: 34px;
        left: 40px;
      }

      .top.right {
        top: 34px;
        right: 40px;
      }

      .bottom.left {
        bottom: 34px;
        left: 40px;
      }

      .bottom.right {
        bottom: 34px;
        right: 40px;
      }

      .node {
        width: 208px;
        padding: 18px;
      }

      .icon {
        width: 58px;
        height: 58px;
      }

      .meta strong {
        font-size: 1.5rem;
      }

      .core {
        width: 198px;
        height: 198px;
      }

      .stage.layout-focus-home .core {
        width: 220px;
        height: 220px;
      }

      .details.simple {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }

      .details.advanced {
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }

      .detail-card {
        min-height: 72px;
      }

      .detail-card.metric {
        min-height: 74px;
      }

      .detail-card strong {
        font-size: 1.36rem;
      }

      .advanced-rail,
      .analytics-rail,
      .health-rail,
      .breakdown-grid {
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      }
    }

    @media (max-width: 560px) {
      .shell {
        padding: 16px;
      }

      h2 {
        font-size: 2rem;
      }

      .subtitle {
        font-size: 0.88rem;
      }

      .hero {
        margin-bottom: 14px;
      }

      .stage {
        min-height: 720px;
      }

      .top.left,
      .top.right {
        top: 18px;
      }

      .bottom.left,
      .bottom.right {
        bottom: 18px;
      }

      .top.left,
      .bottom.left {
        left: 18px;
      }

      .top.right,
      .bottom.right {
        right: 18px;
      }

      .node {
        width: calc(50% - 40px);
        max-width: 146px;
        min-width: 118px;
        padding: 12px 10px;
        gap: 8px;
        flex-direction: column;
        align-items: center;
        text-align: center;
        border-radius: 20px;
      }

      .icon {
        width: 42px;
        height: 42px;
        border-radius: 14px;
      }

      .icon svg {
        width: 20px;
        height: 20px;
      }

      .meta {
        width: 100%;
        justify-items: center;
        gap: 3px;
      }

      .label,
      .meta small {
        font-size: 0.74rem;
        line-height: 1.2;
      }

      .meta strong {
        font-size: 1rem;
        line-height: 1.05;
      }

      .soc {
        font-size: 0.72rem;
      }

      .core {
        width: 154px;
        height: 154px;
      }

      .stage.layout-focus-home .core {
        width: 168px;
        height: 168px;
      }

      .core-content {
        padding: 18px;
      }

      .core-content strong {
        font-size: 1.3rem;
      }

      .core-content small {
        font-size: 0.8rem;
        line-height: 1.25;
      }

      .status-rail {
        gap: 6px;
      }

      .badge,
      .status-pill {
        padding: 8px 12px;
        font-size: 0.76rem;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 420px) {
      .stage {
        min-height: 740px;
      }

      .node {
        width: calc(50% - 34px);
        max-width: 138px;
        min-width: 108px;
        padding: 11px 8px;
      }

      .meta strong {
        font-size: 0.94rem;
      }

      .label,
      .meta small,
      .soc {
        font-size: 0.7rem;
      }

      .core {
        width: 146px;
        height: 146px;
      }

      .stage.layout-focus-home .core {
        width: 160px;
        height: 160px;
      }
    }
  `;
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'zs-power-flow-card',
  name: 'ZS Power Flow Card',
  description: 'Modern configurable power flow card for Home Assistant.',
});
