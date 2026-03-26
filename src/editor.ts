import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ZsPowerFlowCardConfig } from './types';

type HassStateMap = Record<string, { entity_id?: string }>;

type HomeAssistantEditor = {
  states: HassStateMap;
};

@customElement('zs-power-flow-card-editor')
export class ZsPowerFlowCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistantEditor;
  @state() private _config?: ZsPowerFlowCardConfig;

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
        <section class="section">
          <div class="section-header">
            <h4>Podstawy</h4>
            <p>Najwazniejsze ustawienia karty oraz glowne sensory mocy.</p>
          </div>

          <div class="grid one">
            ${this.renderTextField('Tytul', 'title', config.title ?? '')}
          </div>

          <div class="grid two">
            ${this.renderEntityField('Produkcja PV', 'solar_entity', config.solar_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Moc sieci', 'grid_entity', config.grid_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Moc baterii', 'battery_power_entity', config.battery_power_entity ?? '', ['sensor'])}
            ${this.renderEntityField('SOC baterii', 'battery_soc_entity', config.battery_soc_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Zuzycie domu', 'home_entity', config.home_entity ?? '', ['sensor'])}
            ${this.renderNumberField('Pojemnosc baterii (kWh)', 'battery_capacity_kwh', config.battery_capacity_kwh)}
          </div>

          <p class="hint">Konwencja tej wersji: siec plus = import, minus = eksport; bateria plus = rozladowanie, minus = ladowanie.</p>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Widok i zachowanie</h4>
            <p>Wybierz tryb prosty lub zaawansowany oraz ustaw prezentacje danych.</p>
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
            ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
              ['summary', 'Summary'],
              ['extended', 'Extended'],
            ])}
            ${this.renderNumberField('Miejsca po przecinku', 'decimals', config.decimals)}
          </div>

          <div class="toggle-grid">
            ${this.renderToggleTile('Pokaz szczegoly', 'show_details', config.show_details ?? true)}
            ${this.renderToggleTile('Pokaz PV', 'show_solar', config.show_solar ?? true)}
            ${this.renderToggleTile('Pokaz siec', 'show_grid', config.show_grid ?? true)}
            ${this.renderToggleTile('Pokaz baterie', 'show_battery', config.show_battery ?? true)}
            ${this.renderToggleTile('Animacje przeplywu', 'animation_enabled', config.animation_enabled ?? true)}
            ${this.renderToggleTile('Belka statusu', 'show_status_bar', config.show_status_bar ?? true)}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Status i metryki zaawansowane</h4>
            <p>Opcjonalne pola dla widoku advanced. Jesli ich nie ustawisz, karta nadal bedzie dzialac.</p>
          </div>

          <div class="grid two">
            ${this.renderEntityField('Stan on/off-grid', 'grid_connected_entity', config.grid_connected_entity ?? '', ['binary_sensor', 'sensor'])}
            ${this.renderEntityField('Status inwertera', 'inverter_status_entity', config.inverter_status_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Produkcja dzienna', 'daily_solar_energy_entity', config.daily_solar_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Zuzycie dzienne', 'daily_home_energy_entity', config.daily_home_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Import dzienny', 'daily_grid_import_energy_entity', config.daily_grid_import_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Eksport dzienny', 'daily_grid_export_energy_entity', config.daily_grid_export_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Ladowanie baterii dzisiaj', 'daily_battery_charge_energy_entity', config.daily_battery_charge_energy_entity ?? '', ['sensor'])}
            ${this.renderEntityField('Rozladowanie baterii dzisiaj', 'daily_battery_discharge_energy_entity', config.daily_battery_discharge_energy_entity ?? '', ['sensor'])}
          </div>
        </section>

        <section class="section">
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
        </section>
      </div>
    `;
  }

  private renderTextField(label: string, key: keyof ZsPowerFlowCardConfig, value: string) {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          .value=${value}
          @input=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).value)}
        />
      </label>
    `;
  }

  private renderNumberField(label: string, key: keyof ZsPowerFlowCardConfig, value?: number) {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
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

  private renderEntityField(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: string,
    includeDomains: string[],
  ) {
    const listId = `entities-${String(key)}`;
    const entityIds = this.getEntityIds(includeDomains);

    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <input
          class="text-input"
          .value=${value}
          list=${listId}
          placeholder="sensor.twoja_encja"
          @input=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).value || undefined)}
        />
        <datalist id=${listId}>
          ${entityIds.map((entityId) => html`<option value=${entityId}></option>`)}
        </datalist>
      </label>
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
        <span class="field-label">${label}</span>
        <select
          class="text-input"
          .value=${value}
          @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLSelectElement).value)}
        >
          ${options.map(([optionValue, optionLabel]) => html`<option value=${optionValue}>${optionLabel}</option>`)}
        </select>
      </label>
    `;
  }

  private renderToggleTile(label: string, key: keyof ZsPowerFlowCardConfig, value: boolean) {
    return html`
      <label class="toggle-tile">
        <input
          type="checkbox"
          .checked=${value}
          @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).checked)}
        />
        <span>${label}</span>
      </label>
    `;
  }

  private getEntityIds(includeDomains: string[]) {
    const states = this.hass?.states ?? {};
    return Object.keys(states)
      .filter((entityId) => includeDomains.includes(entityId.split('.')[0]))
      .sort((a, b) => a.localeCompare(b));
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

    .form {
      display: grid;
      gap: 20px;
    }

    .section {
      display: grid;
      gap: 14px;
      padding: 16px;
      border-radius: 18px;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.82), rgba(255,255,255,0.74)),
        var(--card-background-color);
      border: 1px solid var(--divider-color);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
    }

    .section-header h4 {
      margin: 0 0 4px;
      font-size: 1rem;
    }

    .section-header p,
    .hint {
      margin: 0;
      color: var(--secondary-text-color);
      font-size: 0.9rem;
      line-height: 1.45;
    }

    .grid {
      display: grid;
      gap: 12px;
    }

    .grid.one {
      grid-template-columns: 1fr;
    }

    .grid.two {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .field {
      display: grid;
      gap: 6px;
    }

    .field-label {
      font-size: 0.85rem;
      color: var(--secondary-text-color);
    }

    .text-input {
      width: 100%;
      box-sizing: border-box;
      border-radius: 16px;
      border: 1px solid rgba(120, 131, 155, 0.22);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,252,0.96));
      color: var(--primary-text-color);
      padding: 13px 14px;
      font: inherit;
      outline: none;
      transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
    }

    .text-input:focus {
      border-color: rgba(59, 130, 246, 0.5);
      box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.12);
    }

    .toggle-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
    }

    .toggle-tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 16px;
      border: 1px solid rgba(120, 131, 155, 0.22);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,252,0.96));
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }

    .toggle-tile:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.28);
    }

    .toggle-tile input {
      width: 16px;
      height: 16px;
      margin: 0;
    }

    @media (max-width: 800px) {
      .grid.two,
      .toggle-grid {
        grid-template-columns: 1fr;
      }
    }
  `;
}
