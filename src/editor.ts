import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ZsPowerFlowCardConfig } from './types';

type HomeAssistantEditor = {
  states: Record<string, { entity_id?: string }>;
};

type EditorTab = 'data' | 'display';

@customElement('zs-power-flow-card-editor')
export class ZsPowerFlowCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantEditor;
  @state() private _config?: ZsPowerFlowCardConfig;
  @state() private _tab: EditorTab = 'data';

  public setConfig(config: ZsPowerFlowCardConfig): void {
    this._config = config;
  }

  protected render() {
    const config = this._config;
    if (!config) {
      return nothing;
    }

    return html`
      <div class="tabs">
        <button class=${this._tab === 'data' ? 'active' : ''} @click=${() => this.setTab('data')}>Konfiguracja</button>
        <button class=${this._tab === 'display' ? 'active' : ''} @click=${() => this.setTab('display')}>Widocznosc</button>
      </div>

      ${this._tab === 'data' ? this.renderDataTab(config) : this.renderDisplayTab(config)}
    `;
  }

  private renderDataTab(config: ZsPowerFlowCardConfig) {
    return html`
      <div class="form">
        ${this.renderTextField('Tytul', 'title', config.title ?? '')}

        <div class="section">
          <div class="section-header">
            <h4>Encje energii</h4>
            <p>Wybierz sensory mocy. Dla tej wersji przyjmujemy: siec plus = import, minus = eksport; bateria plus = rozladowanie, minus = ladowanie.</p>
          </div>

          ${this.renderEntityPicker('Produkcja PV', 'solar_entity', config.solar_entity ?? '', ['sensor'])}
          ${this.renderEntityPicker('Moc sieci', 'grid_entity', config.grid_entity ?? '', ['sensor'])}
          ${this.renderEntityPicker('Moc baterii', 'battery_power_entity', config.battery_power_entity ?? '', ['sensor'])}
          ${this.renderEntityPicker('SOC baterii', 'battery_soc_entity', config.battery_soc_entity ?? '', ['sensor'])}
          ${this.renderEntityPicker('Zuzycie domu', 'home_entity', config.home_entity ?? '', ['sensor'])}
          ${this.renderNumberField('Pojemnosc baterii (kWh)', 'battery_capacity_kwh', config.battery_capacity_kwh)}
          ${this.renderNumberField('Miejsca po przecinku', 'decimals', config.decimals)}
        </div>

        <div class="section">
          <div class="section-header">
            <h4>Status i encje zaawansowane</h4>
            <p>Te pola sa szczegolnie przydatne dla widoku advanced. Mozesz je zostawic puste, jesli jeszcze nie masz takich sensorow.</p>
          </div>

          <div class="grid two">
            ${this.renderEntityPicker('Stan on/off-grid', 'grid_connected_entity', config.grid_connected_entity ?? '', ['binary_sensor', 'sensor'])}
            ${this.renderEntityPicker('Status inwertera', 'inverter_status_entity', config.inverter_status_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Produkcja dzienna', 'daily_solar_energy_entity', config.daily_solar_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Zuzycie dzienne', 'daily_home_energy_entity', config.daily_home_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Import dzienny', 'daily_grid_import_energy_entity', config.daily_grid_import_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Eksport dzienny', 'daily_grid_export_energy_entity', config.daily_grid_export_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Ladowanie baterii dzisiaj', 'daily_battery_charge_energy_entity', config.daily_battery_charge_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityPicker('Rozladowanie baterii dzisiaj', 'daily_battery_discharge_energy_entity', config.daily_battery_discharge_energy_entity ?? '', ['sensor'])}
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h4>Etykiety</h4>
            <p>Opcjonalnie zmien nazwy blokow widocznych na karcie.</p>
          </div>

          <div class="grid two">
            ${this.renderTextField('Etykieta PV', 'solar_label', config.solar_label ?? '')}
            ${this.renderTextField('Etykieta sieci', 'grid_label', config.grid_label ?? '')}
            ${this.renderTextField('Etykieta baterii', 'battery_label', config.battery_label ?? '')}
            ${this.renderTextField('Etykieta domu', 'home_label', config.home_label ?? '')}
          </div>
        </div>
      </div>
    `;
  }

  private renderDisplayTab(config: ZsPowerFlowCardConfig) {
    return html`
      <div class="form">
        <div class="section">
          <div class="section-header">
            <h4>Wyglad</h4>
            <p>Ustaw motyw, layout i sposob prezentacji szczegolow.</p>
          </div>

          <div class="grid two">
            ${this.renderSelectField('Widok', 'view_mode', config.view_mode ?? 'simple', [
              ['simple', 'Simple'],
              ['advanced', 'Advanced'],
            ])}
            ${this.renderSelectField('Motyw', 'theme', config.theme ?? 'aurora', [
              ['aurora', 'Aurora'],
              ['graphite', 'Graphite'],
              ['sunset', 'Sunset'],
            ])}
            ${this.renderSelectField('Layout', 'layout', config.layout ?? 'balanced', [
              ['balanced', 'Balanced'],
              ['focus-home', 'Focus home'],
            ])}
            ${this.renderToggleCard('Pokaz szczegoly', 'show_details', config.show_details ?? true)}
            ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
              ['summary', 'Summary'],
              ['extended', 'Extended'],
            ])}
          </div>
        </div>

        <div class="section">
          <div class="section-header">
            <h4>Widocznosc elementow</h4>
            <p>Ukryj sekcje, ktorych nie ma w instalacji lub ktorych nie chcesz pokazywac.</p>
          </div>

          <div class="grid two">
            ${this.renderToggleCard('Pokaz PV', 'show_solar', config.show_solar ?? true)}
            ${this.renderToggleCard('Pokaz siec', 'show_grid', config.show_grid ?? true)}
            ${this.renderToggleCard('Pokaz baterie', 'show_battery', config.show_battery ?? true)}
            ${this.renderToggleCard('Animacje przeplywu', 'animation_enabled', config.animation_enabled ?? true)}
            ${this.renderToggleCard('Belka statusu', 'show_status_bar', config.show_status_bar ?? true)}
          </div>
        </div>
      </div>
    `;
  }

  private renderTextField(label: string, key: keyof ZsPowerFlowCardConfig, value: string) {
    return html`
      <ha-textfield
        .label=${label}
        .value=${value}
        @input=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).value)}
      ></ha-textfield>
    `;
  }

  private renderEntityPicker(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: string,
    includeDomains: string[],
  ) {
    return html`
      <ha-entity-picker
        .hass=${this.hass}
        .label=${label}
        .value=${value}
        .includeDomains=${includeDomains}
        .allowCustomEntity=${true}
        @value-changed=${(event: CustomEvent) => this.updateConfig(key, event.detail.value || undefined)}
      ></ha-entity-picker>
    `;
  }

  private renderNumberField(label: string, key: keyof ZsPowerFlowCardConfig, value?: number) {
    return html`
      <ha-textfield
        .label=${label}
        type="number"
        .value=${value === undefined ? '' : String(value)}
        @input=${(event: Event) => {
          const next = (event.target as HTMLInputElement).value;
          this.updateConfig(key, next === '' ? undefined : Number(next));
        }}
      ></ha-textfield>
    `;
  }

  private renderSelectField(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: string,
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

  private renderToggleCard(label: string, key: keyof ZsPowerFlowCardConfig, value: boolean) {
    return html`
      <ha-formfield .label=${label}>
        <ha-checkbox
          .checked=${value}
          @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).checked)}
        ></ha-checkbox>
      </ha-formfield>
    `;
  }

  private setTab(tab: EditorTab) {
    this._tab = tab;
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
      padding-top: 8px;
    }

    .tabs {
      display: flex;
      gap: 24px;
      border-bottom: 1px solid var(--divider-color);
      margin-bottom: 16px;
    }

    .tabs button {
      background: none;
      border: 0;
      border-bottom: 2px solid transparent;
      padding: 10px 2px 12px;
      color: var(--secondary-text-color);
      font: inherit;
      cursor: pointer;
    }

    .tabs button.active {
      color: var(--primary-text-color);
      border-bottom-color: var(--primary-color);
    }

    .form {
      display: grid;
      gap: 16px;
    }

    .section {
      display: grid;
      gap: 12px;
    }

    .section-header h4 {
      margin: 0 0 4px;
      font-size: 1rem;
    }

    .section-header p {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      line-height: 1.4;
    }

    .grid {
      display: grid;
      gap: 12px;
    }

    .grid.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field span {
      color: var(--secondary-text-color);
      font-size: 0.85rem;
    }

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

    ha-formfield {
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 10px 12px;
      display: flex;
      background: var(--card-background-color);
    }

    ha-textfield,
    ha-entity-picker {
      display: block;
    }

    @media (max-width: 640px) {
      .grid.two {
        grid-template-columns: 1fr;
      }
    }
  `;
}
