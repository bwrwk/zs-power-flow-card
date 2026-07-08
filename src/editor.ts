import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CardActionConfig, CardActionType, ZsPowerFlowCardConfig } from './types';

type HassEntityState = {
  entity_id?: string;
  state?: string;
  attributes?: Record<string, unknown>;
};

type HassStateMap = Record<string, HassEntityState>;

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
        ${this.renderWizardSection(config)}
        ${this.renderRecommendationSection(config)}
        ${this.renderValidationSection(config)}

        <section class="section">
          <div class="section-header">
            <h4>Podstawy</h4>
            <p>Najwazniejsze ustawienia karty oraz glowne sensory mocy.</p>
          </div>

          <div class="grid one">
            ${this.renderTextField('Tytul', 'title', config.title ?? '')}
          </div>

          <div class="grid two">
            ${this.renderEntityField('Produkcja PV', 'solar_entity', config.solar_entity ?? '', ['sensor'], 'Aktualna moc produkcji z paneli. Najczesciej sensor w W lub kW, np. laczna moc PV.')}
            ${this.renderEntityField('Moc sieci', 'grid_entity', config.grid_entity ?? '', ['sensor'], 'Aktualna moc wymiany z siecia. Oczekiwane: plus = import, minus = eksport.')}
            ${this.renderEntityField('Moc baterii', 'battery_power_entity', config.battery_power_entity ?? '', ['sensor'], 'Aktualna moc baterii. Oczekiwane: plus = rozladowanie do domu, minus = ladowanie.')}
            ${this.renderEntityField('SOC baterii', 'battery_soc_entity', config.battery_soc_entity ?? '', ['sensor'], 'Procent naladowania baterii, najlepiej sensor 0-100.')}
            ${this.renderEntityField('Zuzycie domu', 'home_entity', config.home_entity ?? '', ['sensor'], 'Calkowita aktualna moc odbiorow domu.')}
            ${this.renderNumberField('Pojemnosc baterii (kWh)', 'battery_capacity_kwh', config.battery_capacity_kwh, 'Sluzy do wyliczenia energii zgromadzonej w baterii na podstawie SOC.')}
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
            ], 'Simple pokazuje najwazniejsze dane, a advanced dodaje statusy i metryki dzienne.')}
            ${this.renderSelectField('Motyw', 'theme', config.theme ?? 'aurora', [
              ['aurora', 'Aurora'],
              ['graphite', 'Graphite'],
              ['sunset', 'Sunset'],
            ], 'Zmienia palete kolorow i charakter wizualny karty.')}
            ${this.renderSelectField('Layout', 'layout', config.layout ?? 'balanced', [
              ['balanced', 'Balanced'],
              ['focus-home', 'Focus home'],
            ], 'Balanced jest bardziej symetryczny, a Focus home bardziej eksponuje zuzycie domu.')}
            ${this.renderSelectField('Preset wizualny', 'visual_preset', config.visual_preset ?? 'default', [
              ['default', 'Default'],
              ['compact', 'Compact'],
              ['analytics', 'Analytics'],
              ['console', 'Console'],
            ], 'Default jest zbalansowany, Compact bardziej zwarty, Analytics robi wiecej miejsca na dane pomocnicze, a Console nawiazuje do prostych ekranow inwertera i paneli HMI.')}
            ${this.renderSelectField('Styl flow', 'flow_style', config.flow_style ?? 'soft', [
              ['soft', 'Soft'],
              ['beam', 'Beam'],
              ['pulse', 'Pulse'],
            ], 'Zmienia charakter animacji przeplywu energii bez zmiany danych.')}
            ${this.renderSelectField('Tryb szczegolow', 'details_mode', config.details_mode ?? 'summary', [
              ['summary', 'Summary'],
              ['extended', 'Extended'],
            ], 'Extended pokazuje wiecej kart z przeplywami i energiami dziennymi.')}
            ${this.renderNumberField('Miejsca po przecinku', 'decimals', config.decimals, 'Ile cyfr po przecinku pokazywac dla wartosci mocy.')}
            ${this.renderNumberField('Prog szumu mocy (W)', 'power_noise_floor_w', config.power_noise_floor_w, 'Male wartosci ponizej tego progu beda ignorowane w kierunku flow, zeby nie pokazywac pozornego wsparcia przy kilku watach. Domyslnie 30 W.')}
          </div>

          <div class="toggle-grid">
            ${this.renderToggleTile('Pokaz szczegoly', 'show_details', config.show_details ?? true)}
            ${this.renderToggleTile('Pokaz PV', 'show_solar', config.show_solar ?? true)}
            ${this.renderToggleTile('Pokaz siec', 'show_grid', config.show_grid ?? true)}
            ${this.renderToggleTile('Pokaz baterie', 'show_battery', config.show_battery ?? true)}
            ${this.renderToggleTile('Animacje przeplywu', 'animation_enabled', config.animation_enabled ?? true)}
            ${this.renderToggleTile('Belka statusu', 'show_status_bar', config.show_status_bar ?? true)}
            ${this.renderToggleTile('Odwroc znak sieci', 'invert_grid', config.invert_grid ?? false)}
            ${this.renderToggleTile('Odwroc znak baterii', 'invert_battery', config.invert_battery ?? false)}
            ${this.renderToggleTile('Pokaz breakdown PV', 'show_pv_breakdown', config.show_pv_breakdown ?? true)}
            ${this.renderToggleTile('Pokaz breakdown faz', 'show_phase_breakdown', config.show_phase_breakdown ?? true)}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Akcje</h4>
            <p>Co ma sie stac po kliknieciu lub przytrzymaniu glownego bloku PV, sieci, baterii i domu.</p>
          </div>

          <div class="grid two">
            ${this.renderActionTypeField('Klikniecie', 'tap_action', config.tap_action, 'Domyslnie otwiera more-info dla kliknietej encji.')}
            ${this.renderActionTypeField('Przytrzymanie', 'hold_action', config.hold_action, 'Moze otwierac more-info, przechodzic do widoku albo otwierac URL.')}
          </div>
        </section>

        <section class="section">
          <div class="section-header">
            <h4>Status i metryki zaawansowane</h4>
            <p>Opcjonalne pola dla widoku advanced. Jesli ich nie ustawisz, karta nadal bedzie dzialac.</p>
          </div>

          <div class="grid two">
            ${this.renderEntityField('Stan on/off-grid', 'grid_connected_entity', config.grid_connected_entity ?? '', ['binary_sensor', 'sensor'], 'Binary sensor lub sensor tekstowy wskazujacy, czy falownik pracuje z siecia. Obslugiwane m.in. on/off, connected/disconnected.')}
            ${this.renderEntityField('Status inwertera', 'inverter_status_entity', config.inverter_status_entity ?? '', ['sensor'], 'Tekstowy status pracy inwertera, np. Normal, Fault, Standby.')}
            ${this.renderEntityField('Produkcja dzienna', 'daily_solar_energy_entity', config.daily_solar_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia wyprodukowana przez PV, najlepiej w kWh.')}
            ${this.renderEntityField('Zuzycie dzienne', 'daily_home_energy_entity', config.daily_home_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia zuzyta przez odbiory domu.')}
            ${this.renderEntityField('Import dzienny', 'daily_grid_import_energy_entity', config.daily_grid_import_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia pobrana z sieci.')}
            ${this.renderEntityField('Eksport dzienny', 'daily_grid_export_energy_entity', config.daily_grid_export_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia oddana do sieci.')}
            ${this.renderEntityField('Ladowanie baterii dzisiaj', 'daily_battery_charge_energy_entity', config.daily_battery_charge_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia wlozona do baterii.')}
            ${this.renderEntityField('Rozladowanie baterii dzisiaj', 'daily_battery_discharge_energy_entity', config.daily_battery_discharge_energy_entity ?? '', ['sensor'], 'Dzisiejsza energia oddana z baterii.')}
            ${this.renderEntityField('Stan baterii', 'battery_state_entity', config.battery_state_entity ?? '', ['sensor'], 'Tekstowy stan baterii, np. idle, charging, discharging.')}
            ${this.renderEntityField('SOH baterii', 'battery_soh_entity', config.battery_soh_entity ?? '', ['sensor'], 'Kondycja baterii, zwykle procent.')}
            ${this.renderEntityField('Temperatura baterii', 'battery_temperature_entity', config.battery_temperature_entity ?? '', ['sensor'], 'Temperatura baterii w stopniach C.')}
            ${this.renderEntityField('Temperatura inwertera', 'inverter_temperature_entity', config.inverter_temperature_entity ?? '', ['sensor'], 'Temperatura inwertera lub sekcji DC.')}
            ${this.renderEntityField('Alarm urzadzenia', 'device_alarm_entity', config.device_alarm_entity ?? '', ['sensor'], 'Tekstowy alarm inwertera, np. OK lub opis alarmu.')}
            ${this.renderEntityField('Fault urzadzenia', 'device_fault_entity', config.device_fault_entity ?? '', ['sensor'], 'Tekstowy fault inwertera, np. OK lub opis bledu.')}
            ${this.renderEntityField('Alarm baterii', 'battery_alarm_entity', config.battery_alarm_entity ?? '', ['binary_sensor', 'sensor'], 'Alarm baterii jako binary sensor lub tekstowy stan.')}
            ${this.renderEntityField('Fault baterii', 'battery_fault_entity', config.battery_fault_entity ?? '', ['binary_sensor', 'sensor'], 'Fault baterii jako binary sensor lub tekstowy stan.')}
            ${this.renderEntityField('Tryb pracy falownika', 'work_mode_entity', config.work_mode_entity ?? '', ['sensor', 'select'], 'Biezacy work mode lub tekstowy status trybu pracy.')}
            ${this.renderEntityField('Pattern energii', 'energy_pattern_entity', config.energy_pattern_entity ?? '', ['sensor', 'select'], 'Informacja o strategii pracy, np. Battery First, Load First.')}
            ${this.renderEntityField('PV1 moc', 'pv1_power_entity', config.pv1_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown pierwszego MPPT/stringu PV.')}
            ${this.renderEntityField('PV2 moc', 'pv2_power_entity', config.pv2_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown drugiego MPPT/stringu PV.')}
            ${this.renderEntityField('PV3 moc', 'pv3_power_entity', config.pv3_power_entity ?? '', ['sensor'], 'Opcjonalny breakdown trzeciego MPPT/stringu PV.')}
            ${this.renderEntityField('Load L1 moc', 'load_l1_power_entity', config.load_l1_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L1 dla obciazenia.')}
            ${this.renderEntityField('Load L2 moc', 'load_l2_power_entity', config.load_l2_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L2 dla obciazenia.')}
            ${this.renderEntityField('Load L3 moc', 'load_l3_power_entity', config.load_l3_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L3 dla obciazenia.')}
            ${this.renderEntityField('Grid L1 moc', 'grid_l1_power_entity', config.grid_l1_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L1 po stronie sieci.')}
            ${this.renderEntityField('Grid L2 moc', 'grid_l2_power_entity', config.grid_l2_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L2 po stronie sieci.')}
            ${this.renderEntityField('Grid L3 moc', 'grid_l3_power_entity', config.grid_l3_power_entity ?? '', ['sensor'], 'Opcjonalna moc fazy L3 po stronie sieci.')}
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

  private renderWizardSection(config: ZsPowerFlowCardConfig) {
    const profile = this.detectProfile();
    const profileLabel =
      profile === 'solarman' ? 'Solarman-like' : profile === 'deye_sunsynk' ? 'Deye / Sunsynk-like' : 'Generic';

    return html`
      <section class="section accent">
        <div class="section-header">
          <h4>Szybki start</h4>
          <p>Wykryty profil: <strong>${profileLabel}</strong>. Mozesz uzupelnic konfiguracje jednym kliknieciem i potem tylko ja skorygowac.</p>
        </div>

        <div class="wizard-actions">
          <button type="button" class="wizard-button" @click=${() => this.applySuggestedConfig(this.buildWizardConfig('core'))}>
            Ustaw podstawowe encje
          </button>
          <button type="button" class="wizard-button" @click=${() => this.applySuggestedConfig(this.buildWizardConfig('advanced'))}>
            Ustaw advanced
          </button>
          <button
            type="button"
            class="wizard-button secondary"
            @click=${() => this.applySuggestedConfig(this.buildWizardConfig(profile === 'generic' ? 'advanced' : 'profile'))}
          >
            Zastosuj preset ${profileLabel}
          </button>
        </div>
      </section>
    `;
  }

  private renderRecommendationSection(config: ZsPowerFlowCardConfig) {
    const recommendations = this.getRecommendations().filter(({ key, value }) => value && config[key] !== value);
    if (recommendations.length === 0) return html``;

    return html`
      <section class="section accent">
        <div class="section-header">
          <h4>Rekomendowane mapowanie</h4>
          <p>Znalazlem encje, ktore wygladaja na dobre kandydaty. Mozesz je wstawic jednym kliknieciem.</p>
        </div>

        <div class="recommendation-list">
          ${recommendations.map(
            ({ label, key, value, reason }) => html`
              <button type="button" class="recommendation" @click=${() => this.updateConfig(key, value)}>
                <strong>${label}</strong>
                <span>${value}</span>
                <small>${reason}</small>
              </button>
            `,
          )}
        </div>
      </section>
    `;
  }

  private renderValidationSection(config: ZsPowerFlowCardConfig) {
    const issues: string[] = [];
    const required = [
      ['solar_entity', 'Produkcja PV'],
      ['grid_entity', 'Moc sieci'],
      ['battery_power_entity', 'Moc baterii'],
      ['battery_soc_entity', 'SOC baterii'],
      ['home_entity', 'Zuzycie domu'],
    ] as const;

    required.forEach(([key, label]) => {
      if (!config[key]) issues.push(`Brakuje pola: ${label}.`);
    });

    const coreValues = [config.solar_entity, config.grid_entity, config.battery_power_entity, config.battery_soc_entity, config.home_entity]
      .filter((value): value is string => Boolean(value));
    const duplicates = coreValues.filter((value, index) => coreValues.indexOf(value) !== index);
    if (duplicates.length > 0) {
      issues.push(`Te same encje sa uzyte wielokrotnie: ${Array.from(new Set(duplicates)).join(', ')}.`);
    }

    if (issues.length === 0) return html``;

    return html`
      <section class="section warning">
        <div class="section-header">
          <h4>Kontrola konfiguracji</h4>
          <p>To nie blokuje karty, ale warto to sprawdzic przed zapisaniem.</p>
        </div>
        <div class="validation-list">
          ${issues.map((issue) => html`<div class="validation-item">${issue}</div>`)}
        </div>
      </section>
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

  private renderNumberField(label: string, key: keyof ZsPowerFlowCardConfig, value?: number, helpText?: string) {
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
        ${helpText ? html`<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
  }

  private renderEntityField(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: string,
    includeDomains: string[],
    helpText?: string,
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
          spellcheck="false"
          autocapitalize="off"
          autocomplete="off"
          @input=${(event: Event) => this.updateConfig(key, (event.target as HTMLInputElement).value || undefined)}
        />
        <datalist id=${listId}>
          ${entityIds.map((entityId) => html`<option value=${entityId}></option>`)}
        </datalist>
        ${helpText ? html`<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
  }

  private renderSelectField(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    value: string,
    options: Array<[string, string]>,
    helpText?: string,
  ) {
    return html`
      <label class="field">
        <span class="field-label">${label}</span>
        <select
          class="text-input"
          .value=${value}
          @change=${(event: Event) => this.updateConfig(key, (event.target as HTMLSelectElement).value)}
        >
          ${options.map(
            ([optionValue, optionLabel]) =>
              html`<option value=${optionValue} ?selected=${value === optionValue}>${optionLabel}</option>`,
          )}
        </select>
        ${helpText ? html`<span class="helper">${helpText}</span>` : ''}
      </label>
    `;
  }

  private renderActionTypeField(
    label: string,
    key: 'tap_action' | 'hold_action',
    value: CardActionConfig | undefined,
    helpText?: string,
  ) {
    const action = value?.action ?? 'more-info';
    return html`
      <div class="field action-group">
        <span class="field-label">${label}</span>
        <select
          class="text-input"
          .value=${action}
          @change=${(event: Event) => this.updateActionConfig(key, { action: (event.target as HTMLSelectElement).value as CardActionType })}
        >
          <option value="more-info" ?selected=${action === 'more-info'}>More info</option>
          <option value="navigate" ?selected=${action === 'navigate'}>Navigate</option>
          <option value="url" ?selected=${action === 'url'}>Open URL</option>
          <option value="none" ?selected=${action === 'none'}>None</option>
        </select>
        ${action === 'navigate'
          ? html`
              <input
                class="text-input"
                .value=${value?.navigation_path ?? ''}
                placeholder="/lovelace/energia"
                @input=${(event: Event) =>
                  this.updateActionConfig(key, {
                    action: 'navigate',
                    navigation_path: (event.target as HTMLInputElement).value || undefined,
                  })}
              />
            `
          : ''}
        ${action === 'url'
          ? html`
              <input
                class="text-input"
                .value=${value?.url_path ?? ''}
                placeholder="https://example.com"
                @input=${(event: Event) =>
                  this.updateActionConfig(key, {
                    action: 'url',
                    url_path: (event.target as HTMLInputElement).value || undefined,
                  })}
              />
            `
          : ''}
        ${helpText ? html`<span class="helper">${helpText}</span>` : ''}
      </div>
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

  private getRecommendations() {
    return [
      this.makeRecommendation('Produkcja PV', 'solar_entity', ['pv power', 'pv_power', 'solar power', 'solar_power', 'production']),
      this.makeRecommendation('Moc sieci', 'grid_entity', ['grid power', 'grid_power', 'import power', 'external power', 'internal power']),
      this.makeRecommendation('Moc baterii', 'battery_power_entity', ['battery power', 'battery_power']),
      this.makeRecommendation('SOC baterii', 'battery_soc_entity', ['battery', 'battery soc'], ['battery']),
      this.makeRecommendation('Zuzycie domu', 'home_entity', ['load power', 'load_power', 'home load', 'consumption']),
      this.makeRecommendation('Stan on/off-grid', 'grid_connected_entity', ['grid'], ['binary_sensor']),
      this.makeRecommendation('Status inwertera', 'inverter_status_entity', ['device state', 'inverter status', 'status']),
    ].filter((item): item is { label: string; key: keyof ZsPowerFlowCardConfig; value: string; reason: string } => Boolean(item));
  }

  private buildWizardConfig(mode: 'core' | 'advanced' | 'profile'): Partial<ZsPowerFlowCardConfig> {
    const profile = this.detectProfile();
    const core: Partial<ZsPowerFlowCardConfig> = {
      solar_entity: this.findBestEntity(['pv power', 'pv_power', 'solar power', 'production'], ['sensor'])?.entityId,
      grid_entity: this.findBestEntity(['grid power', 'grid_power', 'external power', 'import power'], ['sensor'])?.entityId,
      battery_power_entity: this.findBestEntity(['battery power', 'battery_power'], ['sensor'])?.entityId,
      battery_soc_entity: this.findBestEntity(['battery soc', ' battery ', 'battery'], ['sensor'])?.entityId,
      home_entity: this.findBestEntity(['load power', 'load_power', 'home load', 'consumption'], ['sensor'])?.entityId,
      grid_connected_entity: this.findBestEntity(['grid connected', ' grid '], ['binary_sensor', 'sensor'])?.entityId,
      inverter_status_entity: this.findBestEntity(['device state', 'inverter status', 'status'], ['sensor'])?.entityId,
      power_noise_floor_w: this._config?.power_noise_floor_w ?? 30,
    };

    if (mode === 'core') {
      return core;
    }

    const advanced: Partial<ZsPowerFlowCardConfig> = {
      ...core,
      daily_solar_energy_entity: this.findBestEntity(['today production', 'daily solar', 'today_production'], ['sensor'])?.entityId,
      daily_home_energy_entity: this.findBestEntity(['today load consumption', 'daily home', 'load consumption'], ['sensor'])?.entityId,
      daily_grid_import_energy_entity: this.findBestEntity(['today energy import', 'daily import', 'energy import'], ['sensor'])?.entityId,
      daily_grid_export_energy_entity: this.findBestEntity(['today energy export', 'daily export', 'energy export'], ['sensor'])?.entityId,
      daily_battery_charge_energy_entity: this.findBestEntity(['today battery charge', 'battery charge'], ['sensor'])?.entityId,
      daily_battery_discharge_energy_entity: this.findBestEntity(['today battery discharge', 'battery discharge'], ['sensor'])?.entityId,
      battery_state_entity: this.findBestEntity(['battery state'], ['sensor'])?.entityId,
      battery_soh_entity: this.findBestEntity(['battery soh'], ['sensor'])?.entityId,
      battery_temperature_entity: this.findBestEntity(['battery temperature'], ['sensor'])?.entityId,
      inverter_temperature_entity: this.findBestEntity(['inverter temperature', 'device temperature', 'temperature'], ['sensor'])?.entityId,
      device_alarm_entity: this.findBestEntity(['device alarm', 'alarm'], ['sensor'])?.entityId,
      device_fault_entity: this.findBestEntity(['device fault', 'fault'], ['sensor'])?.entityId,
      battery_alarm_entity: this.findBestEntity(['battery alarm'], ['binary_sensor', 'sensor'])?.entityId,
      battery_fault_entity: this.findBestEntity(['battery fault'], ['binary_sensor', 'sensor'])?.entityId,
      work_mode_entity: this.findBestEntity(['work mode'], ['sensor', 'select'])?.entityId,
      energy_pattern_entity: this.findBestEntity(['energy pattern'], ['sensor', 'select'])?.entityId,
      pv1_power_entity: this.findBestEntity(['pv1 power', 'pv1_power'], ['sensor'])?.entityId,
      pv2_power_entity: this.findBestEntity(['pv2 power', 'pv2_power'], ['sensor'])?.entityId,
      pv3_power_entity: this.findBestEntity(['pv3 power', 'pv3_power'], ['sensor'])?.entityId,
      load_l1_power_entity: this.findBestEntity(['load l1 power', 'load_l1_power'], ['sensor'])?.entityId,
      load_l2_power_entity: this.findBestEntity(['load l2 power', 'load_l2_power'], ['sensor'])?.entityId,
      load_l3_power_entity: this.findBestEntity(['load l3 power', 'load_l3_power'], ['sensor'])?.entityId,
      grid_l1_power_entity: this.findBestEntity(['grid l1 power', 'grid_l1_power'], ['sensor'])?.entityId,
      grid_l2_power_entity: this.findBestEntity(['grid l2 power', 'grid_l2_power'], ['sensor'])?.entityId,
      grid_l3_power_entity: this.findBestEntity(['grid l3 power', 'grid_l3_power'], ['sensor'])?.entityId,
      view_mode: 'advanced',
      visual_preset: profile === 'generic' ? 'default' : 'analytics',
    };

    if (mode === 'advanced') {
      return advanced;
    }

    if (profile === 'solarman') {
      return {
        ...advanced,
        theme: this._config?.theme ?? 'sunset',
        layout: this._config?.layout ?? 'balanced',
        show_pv_breakdown: true,
        show_phase_breakdown: true,
      };
    }

    if (profile === 'deye_sunsynk') {
      return {
        ...advanced,
        theme: this._config?.theme ?? 'aurora',
        visual_preset: 'analytics',
        show_pv_breakdown: true,
        show_phase_breakdown: true,
      };
    }

    return advanced;
  }

  private detectProfile(): 'generic' | 'solarman' | 'deye_sunsynk' {
    const entityIds = Object.keys(this.hass?.states ?? {}).join(' ').toLowerCase();
    if (entityIds.includes('solarman')) return 'solarman';
    if (entityIds.includes('deye') || entityIds.includes('sunsynk')) return 'deye_sunsynk';
    return 'generic';
  }

  private applySuggestedConfig(patch: Partial<ZsPowerFlowCardConfig>) {
    const sanitized = Object.fromEntries(
      Object.entries(patch).filter(([, value]) => value !== undefined && value !== ''),
    ) as Partial<ZsPowerFlowCardConfig>;

    const nextConfig: ZsPowerFlowCardConfig = {
      ...this._config,
      ...sanitized,
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

  private makeRecommendation(
    label: string,
    key: keyof ZsPowerFlowCardConfig,
    phrases: string[],
    includeDomains = ['sensor', 'binary_sensor'],
  ) {
    const candidate = this.findBestEntity(phrases, includeDomains);
    if (!candidate) return null;
    return {
      label,
      key,
      value: candidate.entityId,
      reason: candidate.reason,
    };
  }

  private findBestEntity(phrases: string[], includeDomains: string[]) {
    const entries = Object.entries(this.hass?.states ?? {})
      .filter(([entityId]) => includeDomains.includes(entityId.split('.')[0]))
      .map(([entityId, state]) => {
        const friendlyName = typeof state.attributes?.friendly_name === 'string' ? state.attributes.friendly_name : '';
        const haystack = `${entityId} ${friendlyName}`.toLowerCase();
        let score = 0;
        const matched: string[] = [];

        phrases.forEach((phrase) => {
          if (haystack.includes(phrase)) {
            score += phrase.length;
            matched.push(phrase);
          }
        });

        if (score === 0) return null;
        return {
          entityId,
          score,
          reason: `Dopasowanie po: ${matched.join(', ')}`,
        };
      })
      .filter((entry): entry is { entityId: string; score: number; reason: string } => Boolean(entry))
      .sort((a, b) => b.score - a.score || a.entityId.localeCompare(b.entityId));

    return entries[0];
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

  private updateActionConfig(key: 'tap_action' | 'hold_action', patch: CardActionConfig) {
    const previous = this._config?.[key];
    this.updateConfig(key, {
      ...previous,
      ...patch,
    });
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

    .section.accent {
      border-color: rgba(59, 130, 246, 0.22);
      box-shadow: 0 12px 34px rgba(59, 130, 246, 0.08);
    }

    .section.warning {
      border-color: rgba(245, 158, 11, 0.22);
      box-shadow: 0 12px 34px rgba(245, 158, 11, 0.08);
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

    .helper {
      font-size: 0.79rem;
      line-height: 1.4;
      color: var(--secondary-text-color);
    }

    .recommendation-list,
    .validation-list {
      display: grid;
      gap: 10px;
    }

    .wizard-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .wizard-button {
      border: 1px solid rgba(59, 130, 246, 0.2);
      background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(239,246,255,0.94));
      color: var(--primary-text-color);
      border-radius: 14px;
      padding: 11px 14px;
      font: inherit;
      cursor: pointer;
      transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease;
    }

    .wizard-button:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.32);
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.12);
    }

    .wizard-button.secondary {
      background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(249,250,251,0.94));
    }

    .recommendation {
      display: grid;
      gap: 2px;
      text-align: left;
      border: 1px solid rgba(59, 130, 246, 0.18);
      background: linear-gradient(180deg, rgba(239,246,255,0.95), rgba(219,234,254,0.84));
      border-radius: 14px;
      padding: 12px 14px;
      cursor: pointer;
      transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease;
    }

    .recommendation:hover {
      transform: translateY(-1px);
      border-color: rgba(59, 130, 246, 0.3);
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.12);
    }

    .recommendation strong {
      font-size: 0.92rem;
    }

    .recommendation span,
    .recommendation small,
    .validation-item {
      color: var(--secondary-text-color);
    }

    .validation-item {
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.12);
      font-size: 0.88rem;
      line-height: 1.4;
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

    .action-group {
      align-content: start;
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
