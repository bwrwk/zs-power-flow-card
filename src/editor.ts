import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { FlowLayout, FlowTheme, ZsPowerFlowCardConfig } from './types';

type HomeAssistantEditor = {
  localize?: (key: string) => string;
};

@customElement('zs-power-flow-card-editor')
export class ZsPowerFlowCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantEditor;
  @property({ attribute: false }) private _config?: ZsPowerFlowCardConfig;

  public setConfig(config: ZsPowerFlowCardConfig): void {
    this._config = config;
  }

  protected render() {
    const config = this._config;
    if (!config) {
      return html``;
    }

    return html`
      <div class="form">
        ${this.renderTextField('Tytul', 'title', config.title ?? '')}
        ${this.renderEntityField('Produkcja PV', 'solar_entity', config.solar_entity ?? '')}
        ${this.renderEntityField('Moc sieci', 'grid_entity', config.grid_entity ?? '')}
        ${this.renderEntityField('Moc baterii', 'battery_power_entity', config.battery_power_entity ?? '')}
        ${this.renderEntityField('SOC baterii', 'battery_soc_entity', config.battery_soc_entity ?? '')}
        ${this.renderEntityField('Zuzycie domu', 'home_entity', config.home_entity ?? '')}
        ${this.renderNumberField('Pojemnosc baterii (kWh)', 'battery_capacity_kwh', config.battery_capacity_kwh)}

        <div class="row">
          ${this.renderSelectField('Motyw', 'theme', config.theme ?? 'aurora', [
            ['aurora', 'Aurora'],
            ['graphite', 'Graphite'],
            ['sunset', 'Sunset'],
          ])}
          ${this.renderSelectField('Layout', 'layout', config.layout ?? 'balanced', [
            ['balanced', 'Balanced'],
            ['focus-home', 'Focus home'],
          ])}
        </div>

        <div class="row">
          ${this.renderToggle('Pokaz szczegoly', 'show_details', config.show_details ?? true)}
          ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
            ['summary', 'Summary'],
            ['extended', 'Extended'],
          ])}
        </div>

        <div class="toggles">
          ${this.renderToggle('Pokaz PV', 'show_solar', config.show_solar ?? true)}
          ${this.renderToggle('Pokaz siec', 'show_grid', config.show_grid ?? true)}
          ${this.renderToggle('Pokaz baterie', 'show_battery', config.show_battery ?? true)}
          ${this.renderToggle('Animacje', 'animation_enabled', config.animation_enabled ?? true)}
        </div>
      </div>
    `;
  }

  private renderTextField(label: string, key: keyof ZsPowerFlowCardConfig, value: string) {
    return html`
      <label class="field">
        <span>${label}</span>
        <input .value=${value} @input=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).value)} />
      </label>
    `;
  }

  private renderEntityField(label: string, key: keyof ZsPowerFlowCardConfig, value: string) {
    return this.renderTextField(label, key, value);
  }

  private renderNumberField(label: string, key: keyof ZsPowerFlowCardConfig, value?: number) {
    return html`
      <label class="field">
        <span>${label}</span>
        <input
          type="number"
          .value=${value === undefined ? '' : String(value)}
          @input=${(event: Event) => {
            const next = (event.target as HTMLInputElement).value;
            this.updateConfig(key, next === '' ? undefined : Number(next));
          }}
        />
      </label>
    `;
  }

  private renderSelectField(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: FlowTheme | FlowLayout | 'summary' | 'extended',
    options: Array<[string, string]>,
  ) {
    return html`
      <label class="field">
        <span>${label}</span>
        <select .value=${value} @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLSelectElement).value)}>
          ${options.map(([optionValue, optionLabel]) => html`<option value=${optionValue}>${optionLabel}</option>`)}
        </select>
      </label>
    `;
  }

  private renderToggle(label: string, key: keyof ZsPowerFlowCardConfig, value: boolean) {
    return html`
      <label class="toggle">
        <input type="checkbox" .checked=${value} @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).checked)} />
        <span>${label}</span>
      </label>
    `;
  }

  private updateConfig(key: keyof ZsPowerFlowCardConfig, value: unknown) {
    const nextConfig: ZsPowerFlowCardConfig = {
      ...this._config,
      [key]: value,
    } as ZsPowerFlowCardConfig;

    this._config = nextConfig;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config: nextConfig },
        bubbles: true,
        composed: true,
      }),
    );
  }

  static styles = css`
    :host {
      display: block;
    }

    .form {
      display: grid;
      gap: 12px;
      padding: 8px 0;
    }

    .row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field span {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }

    input,
    select {
      width: 100%;
      box-sizing: border-box;
      border-radius: 12px;
      border: 1px solid var(--divider-color);
      background: var(--card-background-color);
      color: var(--primary-text-color);
      padding: 10px 12px;
      font: inherit;
    }

    .toggles {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
    }

    .toggle {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px 12px;
    }
  `;
}
