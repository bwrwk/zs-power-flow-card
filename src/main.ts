import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './editor';
import { buildSnapshot, formatEnergy, formatKwh, formatPower, getThemeTokens } from './presenters';
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
  show_details: true,
  details_mode: 'summary',
  show_solar: true,
  show_grid: true,
  show_battery: true,
  animation_enabled: true,
  show_status_bar: true,
  decimals: 1,
};

@customElement('zs-power-flow-card')
export class ZsPowerFlowCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantLike;
  @property({ attribute: false }) private _config: ZsPowerFlowCardConfig = DEFAULT_CONFIG;

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
    this._config = { ...DEFAULT_CONFIG, ...config };
  }

  public getCardSize(): number {
    return this._config.view_mode === 'advanced' ? 6 : 4;
  }

  protected render() {
    const snapshot = buildSnapshot(this.hass, this._config);
    const theme = getThemeTokens(this._config.theme);
    const layoutClass = this._config.layout === 'focus-home' ? 'layout-focus-home' : 'layout-balanced';
    const advanced = this._config.view_mode === 'advanced';

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

          <div class=${`stage ${layoutClass} ${advanced ? 'stage-advanced' : 'stage-simple'}`}>
            <div class="ambient ambient-a"></div>
            <div class="ambient ambient-b"></div>
            <div class="grid-lines"></div>

            ${this._config.show_solar ? this.renderNode(snapshot.solar, 'top left', 'solar') : nothing}
            ${this._config.show_grid ? this.renderNode(snapshot.grid, 'top right', 'grid') : nothing}
            ${this.renderCore(snapshot, advanced)}
            ${this._config.show_battery ? this.renderNode(snapshot.battery, 'bottom left', 'battery', snapshot.battery.soc) : nothing}
            ${this.renderNode(snapshot.home, 'bottom right', 'home')}

            ${this._config.show_solar ? this.renderFlow(snapshot.solarToHome, snapshot.solar.accent, 'M 190 145 C 255 145, 280 178, 315 208') : nothing}
            ${this._config.show_solar && this._config.show_battery
              ? this.renderFlow(snapshot.solarToBattery, snapshot.battery.accent, 'M 170 165 C 170 255, 210 288, 305 310')
              : nothing}
            ${this._config.show_solar && this._config.show_grid
              ? this.renderFlow(snapshot.solarToGrid, snapshot.grid.accent, 'M 240 120 C 345 100, 400 110, 470 130')
              : nothing}
            ${this._config.show_grid ? this.renderFlow(snapshot.gridToHome, snapshot.grid.accent, 'M 493 160 C 493 236, 468 270, 396 308') : nothing}
            ${this._config.show_battery ? this.renderFlow(snapshot.batteryToHome, snapshot.battery.accent, 'M 355 324 C 410 338, 455 334, 505 318') : nothing}
          </div>

          ${advanced ? this.renderAdvancedRail(snapshot) : nothing}
          ${advanced ? this.renderHealthRail(snapshot) : nothing}
          ${this._config.show_details ? this.renderDetails(snapshot, advanced) : nothing}
        </section>
      </ha-card>
    `;
  }

  private renderStatusRail(snapshot: PowerFlowSnapshot, advanced: boolean) {
    return html`
      <div class="status-rail">
        <div class=${`badge ${snapshot.gridConnected === false ? 'warn' : 'ok'}`}>
          <span class="badge-dot"></span>
          ${snapshot.gridConnected === null ? 'Stan sieci nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}
        </div>
        ${advanced && snapshot.inverterStatus
          ? html`<div class="badge info">${snapshot.inverterStatus}</div>`
          : nothing}
        ${advanced ? html`<div class="badge soft">${this.describeBatteryStatus(snapshot)}</div>` : nothing}
      </div>
    `;
  }

  private renderCore(snapshot: PowerFlowSnapshot, advanced: boolean) {
    return html`
      <div class="core">
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
    soc?: number | null,
  ) {
    return html`
      <article class="node ${position}" style=${`--accent:${node.accent};`}>
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

  private renderFlow(power: number, color: string, path: string) {
    const active = power > 0.05;
    const width = Math.max(2, Math.min(10, power * 2.2));
    const animate = this._config.animation_enabled ?? true;

    return html`
      <svg class="flow" viewBox="0 0 640 420" preserveAspectRatio="none" aria-hidden="true">
        <path class="flow-track" d=${path}></path>
        <path
          class=${`flow-line ${active ? 'visible' : ''} ${active && animate ? 'active' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width}px; --flow-speed:${Math.max(2.2, 7.8 - power)}s;`}
          d=${path}
        ></path>
      </svg>
    `;
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
        <span>Energia w baterii</span>
        <strong>${formatKwh(snapshot.batteryStoredKwh, 1)}</strong>
      </div>
    `;

    if (!advanced) {
      return html`<section class="details simple">${baseCards}</section>`;
    }

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
          <strong>${this.describeSystemBalance(snapshot)}</strong>
          <small>${snapshot.inverterStatus ?? 'Brak statusu inwertera'}</small>
        </div>
        <div class="rail-card">
          <span>Stan magazynu</span>
          <strong>${this.describeBatteryStatus(snapshot)}</strong>
          <small>${snapshot.batteryState ?? (snapshot.battery.soc === null ? 'SOC nieznany' : `SOC ${snapshot.battery.soc.toFixed(0)}%`)}</small>
        </div>
        <div class="rail-card">
          <span>Tryb polaczenia</span>
          <strong>${snapshot.gridConnected === null ? 'Nieznany' : snapshot.gridConnected ? 'On-grid' : 'Off-grid'}</strong>
          <small>${snapshot.grid.value >= 0 ? 'Import z sieci' : 'Eksport do sieci'}</small>
        </div>
      </section>
    `;
  }

  private renderHealthRail(snapshot: PowerFlowSnapshot) {
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
        <div class="health-card ${this.isHealthy(snapshot.deviceAlarm) ? '' : 'warn'}">
          <span>Alarm urzadzenia</span>
          <strong>${snapshot.deviceAlarm ?? '--'}</strong>
          <small>Fault: ${snapshot.deviceFault ?? '--'}</small>
        </div>
        <div class="health-card ${snapshot.batteryAlarm === false && snapshot.batteryFault === false ? '' : 'warn'}">
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
    if (snapshot.batteryState) return this.formatStatusLabel(snapshot.batteryState);
    if (snapshot.battery.mode === 'charging') return 'Ladowanie';
    if (snapshot.battery.mode === 'discharging') return 'Rozladowanie';
    return 'Stabilny bufor';
  }

  private formatStatusLabel(value: string): string {
    const normalized = value.toLowerCase();
    if (normalized === 'idle') return 'Idle';
    if (normalized === 'charging') return 'Ladowanie';
    if (normalized === 'discharging') return 'Rozladowanie';
    if (normalized === 'normal') return 'Normal';
    return value;
  }

  private isHealthy(value: string | null): boolean {
    if (!value) return true;
    return ['ok', 'normal', 'none', 'idle'].includes(value.toLowerCase());
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
      z-index: 2;
    }

    .stage.layout-focus-home .core {
      width: 188px;
      height: 188px;
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
    }

    .core-ring.pulse {
      inset: -12px;
      opacity: 0.28;
      animation: pulse 4.8s ease-in-out infinite;
    }

    .core-content {
      position: relative;
      z-index: 1;
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
      stroke: rgba(255, 255, 255, 0.08);
      stroke-width: 2;
      stroke-linecap: round;
    }

    .flow-line {
      fill: none;
      stroke: var(--flow-color);
      stroke-width: var(--flow-width);
      stroke-linecap: round;
      stroke-dasharray: 8 14;
      opacity: 0.1;
      filter: drop-shadow(0 0 12px color-mix(in srgb, var(--flow-color) 60%, transparent));
    }

    .flow-line.visible {
      opacity: 0.95;
    }

    .flow-line.active {
      animation: flow var(--flow-speed) linear infinite;
    }

    .details {
      display: grid;
      gap: 12px;
      margin-top: 16px;
    }

    .advanced-rail {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .health-rail {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
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

    .health-card.warn {
      border-color: rgba(248, 113, 113, 0.3);
      box-shadow: inset 0 0 0 1px rgba(248, 113, 113, 0.08);
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
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .details.advanced {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .detail-card {
      padding: 14px 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)),
        rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.06);
      min-height: 82px;
    }

    .detail-card.highlight {
      border-color: color-mix(in srgb, var(--zs-solar) 22%, rgba(255,255,255,0.06));
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
    }

    .detail-card.metric {
      background:
        linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.018)),
        rgba(5, 9, 17, 0.18);
    }

    .detail-card span {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 6px;
      font-size: 0.82rem;
      line-height: 1.4;
    }

    .detail-card strong {
      font-size: 1.02rem;
    }

    @keyframes flow {
      from {
        stroke-dashoffset: 0;
      }
      to {
        stroke-dashoffset: -132;
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

      .advanced-rail {
        grid-template-columns: 1fr;
      }

      .health-rail {
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
        grid-template-columns: repeat(6, minmax(0, 1fr));
      }

      .advanced-rail {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      .health-rail {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }

    @media (max-width: 560px) {
      .shell {
        padding: 16px;
      }

      .stage {
        min-height: 700px;
      }

      .node {
        width: calc(50% - 20px);
        gap: 10px;
        padding: 14px;
      }

      .icon {
        width: 46px;
        height: 46px;
      }

      .details.simple,
      .details.advanced {
        grid-template-columns: 1fr;
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
