import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './editor';
import { buildSnapshot, formatEnergy, formatPower, getThemeTokens } from './presenters';
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
  show_details: true,
  details_mode: 'summary',
  show_solar: true,
  show_grid: true,
  show_battery: true,
  animation_enabled: true,
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
    return 4;
  }

  protected render() {
    const snapshot = buildSnapshot(this.hass, this._config);
    const theme = getThemeTokens(this._config.theme);
    const layoutClass = this._config.layout === 'focus-home' ? 'layout-focus-home' : 'layout-balanced';

    return html`
      <ha-card
        style=${`--zs-panel:${theme.panel}; --zs-border:${theme.border}; --zs-text:${theme.text}; --zs-muted:${theme.muted};`}
      >
        <section class="shell">
          <div class="hero">
            <div>
              <p class="eyebrow">ZS Power Flow</p>
              <h2>${this._config.title ?? 'Power Flow'}</h2>
            </div>
            <div class="status-pill">${this.describeSystemBalance(snapshot)}</div>
          </div>

          <div class=${`stage ${layoutClass}`}>
            ${this._config.show_solar ? this.renderNode(snapshot.solar, 'top left', '☀') : nothing}
            ${this._config.show_grid ? this.renderNode(snapshot.grid, 'top right', '⇄') : nothing}
            ${this.renderCore(snapshot)}
            ${this._config.show_battery ? this.renderNode(snapshot.battery, 'bottom left', '▣', snapshot.battery.soc) : nothing}
            ${this.renderNode(snapshot.home, 'bottom right', '⌂')}

            ${this._config.show_solar ? this.renderFlow('solar-home', snapshot.solarToHome, snapshot.solar.accent, 'M 190 145 C 255 145, 280 178, 315 208') : nothing}
            ${this._config.show_solar && this._config.show_battery
              ? this.renderFlow('solar-battery', snapshot.solarToBattery, snapshot.battery.accent, 'M 170 165 C 170 255, 210 288, 305 310')
              : nothing}
            ${this._config.show_solar && this._config.show_grid
              ? this.renderFlow('solar-grid', snapshot.solarToGrid, snapshot.grid.accent, 'M 240 120 C 345 100, 400 110, 470 130')
              : nothing}
            ${this._config.show_grid ? this.renderFlow('grid-home', snapshot.gridToHome, snapshot.grid.accent, 'M 493 160 C 493 236, 468 270, 396 308') : nothing}
            ${this._config.show_battery
              ? this.renderFlow('battery-home', snapshot.batteryToHome, snapshot.battery.accent, 'M 355 324 C 410 338, 455 334, 505 318')
              : nothing}
          </div>

          ${this._config.show_details ? this.renderDetails(snapshot) : nothing}
        </section>
      </ha-card>
    `;
  }

  private renderCore(snapshot: PowerFlowSnapshot) {
    return html`
      <div class="core">
        <div class="core-ring"></div>
        <div class="core-content">
          <span class="core-label">Bilans</span>
          <strong>${formatPower(snapshot.netHomeDemand, this._config.decimals ?? 1)}</strong>
          <small>zapotrzebowanie netto</small>
        </div>
      </div>
    `;
  }

  private renderNode(
    node: PowerFlowSnapshot['solar'] | PowerFlowSnapshot['grid'] | PowerFlowSnapshot['home'] | PowerFlowSnapshot['battery'],
    position: string,
    glyph: string,
    soc?: number | null,
  ) {
    return html`
      <article class="node ${position}" style=${`--accent:${node.accent};`}>
        <div class="icon">${glyph}</div>
        <div class="meta">
          <span class="label">${node.label}</span>
          <strong>${formatPower(node.value, this._config.decimals ?? 1)}</strong>
          <small>${node.secondary}</small>
          ${soc === undefined ? nothing : html`<small class="soc">Poziom: ${formatEnergy(soc, 0)}</small>`}
        </div>
      </article>
    `;
  }

  private renderFlow(id: string, power: number, color: string, path: string) {
    const active = power > 0.05;
    const width = Math.max(2, Math.min(10, power * 2.2));
    const animate = this._config.animation_enabled ?? true;

    return html`
      <svg class="flow" viewBox="0 0 640 420" preserveAspectRatio="none" aria-hidden="true">
        <path class="flow-track" d=${path}></path>
        <path
          data-flow-id=${id}
          class=${`flow-line ${active && animate ? 'active' : ''} ${active ? 'visible' : ''}`}
          style=${`--flow-color:${color}; --flow-width:${width}px; --flow-speed:${Math.max(2.4, 8 - power)}s;`}
          d=${path}
        ></path>
      </svg>
    `;
  }

  private renderDetails(snapshot: PowerFlowSnapshot) {
    const extended = this._config.details_mode === 'extended';

    return html`
      <section class="details">
        <div class="detail-card">
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
          <span>Energie w baterii</span>
          <strong>${snapshot.batteryStoredKwh === null ? '--' : `${snapshot.batteryStoredKwh.toFixed(1)} kWh`}</strong>
        </div>
        ${extended
          ? html`
              <div class="detail-card">
                <span>Eksport do sieci</span>
                <strong>${formatPower(snapshot.solarToGrid, this._config.decimals ?? 1)}</strong>
              </div>
              <div class="detail-card">
                <span>Oddawanie z baterii</span>
                <strong>${formatPower(snapshot.batteryToHome, this._config.decimals ?? 1)}</strong>
              </div>
            `
          : nothing}
      </section>
    `;
  }

  private describeSystemBalance(snapshot: PowerFlowSnapshot): string {
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

  static styles = css`
    :host {
      display: block;
    }

    ha-card {
      background: var(--zs-panel);
      border: 1px solid var(--zs-border);
      border-radius: 28px;
      color: var(--zs-text);
      overflow: hidden;
      box-shadow:
        0 20px 60px rgba(0, 0, 0, 0.24),
        inset 0 1px 0 rgba(255, 255, 255, 0.06);
    }

    .shell {
      padding: 22px;
      position: relative;
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.1), transparent 34%),
        radial-gradient(circle at bottom right, rgba(255, 255, 255, 0.08), transparent 30%);
    }

    .hero {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
    }

    .eyebrow {
      margin: 0 0 4px;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      font-size: 0.72rem;
      color: var(--zs-muted);
    }

    h2 {
      margin: 0;
      font-size: clamp(1.45rem, 2vw, 1.9rem);
      line-height: 1.05;
    }

    .status-pill {
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: var(--zs-muted);
      font-size: 0.82rem;
      white-space: nowrap;
    }

    .stage {
      position: relative;
      min-height: 420px;
      border-radius: 24px;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)),
        rgba(7, 10, 18, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .stage.layout-focus-home .core {
      width: 184px;
      height: 184px;
    }

    .stage.layout-focus-home .bottom.right {
      width: 190px;
    }

    .core {
      position: absolute;
      inset: 50% auto auto 50%;
      transform: translate(-50%, -50%);
      width: 160px;
      height: 160px;
      display: grid;
      place-items: center;
      z-index: 2;
    }

    .core-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background:
        radial-gradient(circle, rgba(255,255,255,0.16), rgba(255,255,255,0.02) 62%, transparent 63%),
        conic-gradient(from 180deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.14));
      box-shadow: inset 0 0 40px rgba(255, 255, 255, 0.08);
    }

    .core-content {
      position: relative;
      z-index: 1;
      text-align: center;
      padding: 24px;
    }

    .core-label,
    .core-content small {
      display: block;
      color: var(--zs-muted);
    }

    .core-content strong {
      display: block;
      margin: 8px 0 4px;
      font-size: 1.4rem;
    }

    .node {
      position: absolute;
      width: 170px;
      padding: 16px;
      border-radius: 22px;
      background: rgba(9, 13, 24, 0.34);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(12px);
      display: flex;
      gap: 14px;
      z-index: 2;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
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
      width: 46px;
      height: 46px;
      border-radius: 16px;
      background: color-mix(in srgb, var(--accent) 26%, transparent);
      color: var(--accent);
      display: grid;
      place-items: center;
      font-size: 1.3rem;
      flex: 0 0 auto;
    }

    .meta {
      display: grid;
      gap: 3px;
    }

    .label,
    .meta small {
      color: var(--zs-muted);
    }

    .meta strong {
      font-size: 1.24rem;
      line-height: 1.1;
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
      opacity: 0.15;
      filter: drop-shadow(0 0 10px color-mix(in srgb, var(--flow-color) 55%, transparent));
    }

    .flow-line.visible {
      opacity: 1;
    }

    .flow-line.active {
      opacity: 1;
      animation: flow var(--flow-speed) linear infinite;
    }

    .details {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .detail-card {
      padding: 14px 16px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.06);
    }

    .detail-card span {
      display: block;
      color: var(--zs-muted);
      margin-bottom: 6px;
      font-size: 0.82rem;
    }

    .detail-card strong {
      font-size: 1rem;
    }

    @keyframes flow {
      from {
        stroke-dashoffset: 0;
      }
      to {
        stroke-dashoffset: -132;
      }
    }

    @media (max-width: 720px) {
      .hero {
        flex-direction: column;
        align-items: flex-start;
      }

      .stage {
        min-height: 560px;
      }

      .node {
        width: 150px;
        padding: 14px;
      }

      .top.left {
        top: 18px;
        left: 18px;
      }

      .top.right {
        top: 18px;
        right: 18px;
      }

      .bottom.left {
        bottom: 18px;
        left: 18px;
      }

      .bottom.right {
        bottom: 18px;
        right: 18px;
      }

      .details {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 520px) {
      .shell {
        padding: 16px;
      }

      .stage {
        min-height: 680px;
      }

      .node {
        width: calc(50% - 22px);
        gap: 10px;
      }

      .core {
        width: 138px;
        height: 138px;
      }

      .details {
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
