import { BreakdownItem, FlowTheme, FlowNodeData, HomeAssistantLike, PowerFlowSnapshot, ZsPowerFlowCardConfig } from './types';

const THEMES: Record<FlowTheme, { panel: string; border: string; text: string; muted: string; solar: string; grid: string; battery: string; home: string }> = {
  aurora: {
    panel: 'linear-gradient(145deg, rgba(8,24,38,0.96), rgba(12,52,61,0.94))',
    border: 'rgba(125, 249, 255, 0.18)',
    text: '#ecfeff',
    muted: 'rgba(220, 252, 255, 0.68)',
    solar: '#f7b500',
    grid: '#60a5fa',
    battery: '#34d399',
    home: '#f472b6',
  },
  graphite: {
    panel: 'linear-gradient(145deg, rgba(17,24,39,0.98), rgba(31,41,55,0.94))',
    border: 'rgba(255,255,255,0.1)',
    text: '#f9fafb',
    muted: 'rgba(249, 250, 251, 0.62)',
    solar: '#f59e0b',
    grid: '#38bdf8',
    battery: '#22c55e',
    home: '#fb7185',
  },
  sunset: {
    panel: 'linear-gradient(145deg, rgba(55,23,48,0.96), rgba(125,43,79,0.92))',
    border: 'rgba(255,255,255,0.12)',
    text: '#fff7ed',
    muted: 'rgba(255, 247, 237, 0.7)',
    solar: '#fb923c',
    grid: '#93c5fd',
    battery: '#86efac',
    home: '#f9a8d4',
  },
};

const FALLBACK_VALUES_W = {
  solar: 4800,
  grid: -1200,
  batteryPower: -1600,
  batterySoc: 68,
  home: 5200,
};

type EntityState = { state: string; attributes?: Record<string, unknown> };

function getEntity(hass: HomeAssistantLike | undefined, entityId: string | undefined): EntityState | undefined {
  if (!hass || !entityId) return undefined;
  return hass.states[entityId];
}

function parseRawNumber(entity?: EntityState): number | null {
  if (!entity) return null;
  const parsed = Number(entity.state);
  return Number.isFinite(parsed) ? parsed : null;
}

function getUnit(entity?: EntityState): string | null {
  const unit = entity?.attributes?.unit_of_measurement;
  return typeof unit === 'string' ? unit : null;
}

function parsePowerWatts(entity?: EntityState, fallbackWatts = 0): number {
  const value = parseRawNumber(entity);
  if (value === null) return fallbackWatts;
  const unit = (getUnit(entity) ?? '').toLowerCase();
  if (unit === 'kw') return value * 1000;
  return value;
}

function parseOptionalEnergyKwh(entity?: EntityState): number | null {
  const value = parseRawNumber(entity);
  if (value === null) return null;
  const unit = (getUnit(entity) ?? '').toLowerCase();
  if (unit === 'wh') return value / 1000;
  if (unit === 'mwh') return value * 1000;
  return value;
}

function parseOptionalNumber(entity?: EntityState): number | null {
  return parseRawNumber(entity);
}

function parseEntityText(entity?: EntityState): string | null {
  const value = entity?.state;
  return value && value !== 'unknown' && value !== 'unavailable' ? value : null;
}

function parseOptionalBoolean(entity?: EntityState): boolean | null {
  const state = parseEntityText(entity)?.toLowerCase();
  if (!state) return null;
  if (['on', 'connected', 'online', 'true', '1', 'ok', 'normal'].includes(state)) return true;
  if (['off', 'disconnected', 'offline', 'false', '0', 'fault', 'alarm'].includes(state)) return false;
  return null;
}

function parseGridConnected(entity?: EntityState): boolean | null {
  const state = parseEntityText(entity)?.toLowerCase();
  if (!state) return null;
  if (['on', 'connected', 'online', 'true', '1'].includes(state)) return true;
  if (['off', 'disconnected', 'offline', 'false', '0'].includes(state)) return false;
  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function withDisplayPower(valueWatts: number) {
  const absolute = Math.abs(valueWatts);
  if (absolute >= 1000) {
    return { displayValue: valueWatts / 1000, displayUnit: 'kW' as const };
  }
  return { displayValue: valueWatts, displayUnit: 'W' as const };
}

function createNode(label: string, valueWatts: number, accent: string, secondary: string): FlowNodeData {
  const display = withDisplayPower(valueWatts);
  return {
    label,
    value: valueWatts,
    displayValue: display.displayValue,
    displayUnit: display.displayUnit,
    accent,
    secondary,
  };
}

function createBreakdownItem(label: string, valueWatts: number): BreakdownItem {
  const display = withDisplayPower(valueWatts);
  return {
    label,
    value: valueWatts,
    displayValue: display.displayValue,
    displayUnit: display.displayUnit,
  };
}

function createOptionalBreakdown(
  hass: HomeAssistantLike | undefined,
  entries: Array<{ label: string; entityId?: string }>,
): BreakdownItem[] {
  return entries
    .map(({ label, entityId }) => {
      const entity = getEntity(hass, entityId);
      const numeric = parseRawNumber(entity);
      if (numeric === null || !entityId) return null;
      return createBreakdownItem(label, parsePowerWatts(entity));
    })
    .filter((item): item is BreakdownItem => item !== null);
}

export function getThemeTokens(theme: FlowTheme | undefined) {
  return THEMES[theme ?? 'aurora'];
}

export function buildSnapshot(hass: HomeAssistantLike | undefined, config: ZsPowerFlowCardConfig): PowerFlowSnapshot {
  const themeTokens = getThemeTokens(config.theme);

  const solarEntity = getEntity(hass, config.solar_entity);
  const gridEntity = getEntity(hass, config.grid_entity);
  const batteryEntity = getEntity(hass, config.battery_power_entity);
  const homeEntity = getEntity(hass, config.home_entity);
  const socEntity = getEntity(hass, config.battery_soc_entity);

  const solar = Math.max(0, parsePowerWatts(solarEntity, FALLBACK_VALUES_W.solar));
  const gridBase = parsePowerWatts(gridEntity, FALLBACK_VALUES_W.grid);
  const batteryBase = parsePowerWatts(batteryEntity, FALLBACK_VALUES_W.batteryPower);
  const home = Math.max(0, parsePowerWatts(homeEntity, FALLBACK_VALUES_W.home));
  const grid = (config.invert_grid ? -1 : 1) * gridBase;
  const batteryPower = (config.invert_battery ? -1 : 1) * batteryBase;

  const socValue = parseOptionalNumber(socEntity) ?? FALLBACK_VALUES_W.batterySoc;
  const soc = Number.isFinite(socValue) ? clamp(socValue, 0, 100) : null;
  const batteryCapacity = config.battery_capacity_kwh ?? 0;

  const solarToHome = Math.min(solar, home);
  const remainingSolar = Math.max(0, solar - solarToHome);
  const solarToBattery = batteryPower < 0 ? Math.min(remainingSolar, Math.abs(batteryPower)) : 0;
  const solarToGrid = Math.max(0, remainingSolar - solarToBattery);
  const batteryToHome = batteryPower > 0 ? Math.min(home, batteryPower) : 0;
  const gridToHome = grid > 0 ? Math.min(home, grid) : 0;
  const batteryStoredKwh = soc !== null && batteryCapacity > 0 ? (batteryCapacity * soc) / 100 : null;
  const netHomeDemand = home - solar;

  const gridConnected = parseGridConnected(getEntity(hass, config.grid_connected_entity));
  const inverterStatus = parseEntityText(getEntity(hass, config.inverter_status_entity));
  const batteryState = parseEntityText(getEntity(hass, config.battery_state_entity));

  return {
    solar: createNode(config.solar_label ?? 'Produkcja', solar, themeTokens.solar, 'PV'),
    grid: createNode(config.grid_label ?? 'Siec', grid, themeTokens.grid, grid >= 0 ? 'Import' : 'Eksport'),
    battery: {
      ...createNode(config.battery_label ?? 'Magazyn', batteryPower, themeTokens.battery, soc === null ? 'Stan nieznany' : `SOC ${soc.toFixed(0)}%`),
      soc,
      mode: batteryPower > 0 ? 'discharging' : batteryPower < 0 ? 'charging' : 'idle',
    },
    home: createNode(config.home_label ?? 'Dom', home, themeTokens.home, 'Zuzycie'),
    solarToHome,
    solarToBattery,
    solarToGrid,
    gridToHome,
    batteryToHome,
    batteryStoredKwh,
    netHomeDemand,
    gridConnected,
    inverterStatus,
    batteryState,
    batterySoh: parseOptionalNumber(getEntity(hass, config.battery_soh_entity)),
    batteryTemperature: parseOptionalNumber(getEntity(hass, config.battery_temperature_entity)),
    inverterTemperature: parseOptionalNumber(getEntity(hass, config.inverter_temperature_entity)),
    deviceAlarm: parseEntityText(getEntity(hass, config.device_alarm_entity)),
    deviceFault: parseEntityText(getEntity(hass, config.device_fault_entity)),
    batteryAlarm: parseOptionalBoolean(getEntity(hass, config.battery_alarm_entity)),
    batteryFault: parseOptionalBoolean(getEntity(hass, config.battery_fault_entity)),
    workMode: parseEntityText(getEntity(hass, config.work_mode_entity)),
    energyPattern: parseEntityText(getEntity(hass, config.energy_pattern_entity)),
    dailyEnergy: {
      solar: parseOptionalEnergyKwh(getEntity(hass, config.daily_solar_energy_entity)),
      home: parseOptionalEnergyKwh(getEntity(hass, config.daily_home_energy_entity)),
      gridImport: parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_import_energy_entity)),
      gridExport: parseOptionalEnergyKwh(getEntity(hass, config.daily_grid_export_energy_entity)),
      batteryCharge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_charge_energy_entity)),
      batteryDischarge: parseOptionalEnergyKwh(getEntity(hass, config.daily_battery_discharge_energy_entity)),
    },
    pvBreakdown: createOptionalBreakdown(hass, [
      { label: 'PV1', entityId: config.pv1_power_entity },
      { label: 'PV2', entityId: config.pv2_power_entity },
      { label: 'PV3', entityId: config.pv3_power_entity },
    ]),
    loadPhaseBreakdown: createOptionalBreakdown(hass, [
      { label: 'L1 load', entityId: config.load_l1_power_entity },
      { label: 'L2 load', entityId: config.load_l2_power_entity },
      { label: 'L3 load', entityId: config.load_l3_power_entity },
    ]),
    gridPhaseBreakdown: createOptionalBreakdown(hass, [
      { label: 'L1 grid', entityId: config.grid_l1_power_entity },
      { label: 'L2 grid', entityId: config.grid_l2_power_entity },
      { label: 'L3 grid', entityId: config.grid_l3_power_entity },
    ]),
  };
}

export function formatPower(valueWatts: number, decimals = 1): string {
  const display = withDisplayPower(valueWatts);
  const precision = display.displayUnit === 'kW' ? decimals : 0;
  return `${display.displayValue.toFixed(precision)} ${display.displayUnit}`;
}

export function formatEnergy(value: number | null, decimals = 0): string {
  if (value === null) return '--';
  return `${value.toFixed(decimals)}%`;
}

export function formatKwh(value: number | null, decimals = 1): string {
  if (value === null) return '--';
  return `${value.toFixed(decimals)} kWh`;
}

export function prettifyStatus(value: string | null): string | null {
  if (!value) return null;
  const normalized = value.toLowerCase();

  const map: Record<string, string> = {
    idle: 'Idle',
    charging: 'Ladowanie',
    discharging: 'Rozladowanie',
    normal: 'Normal',
    fault: 'Fault',
    alarm: 'Alarm',
    'battery first': 'Battery First',
    'load first': 'Load First',
    'zero export to load': 'Zero Export To Load',
    'selling first': 'Selling First',
    'on-grid': 'On-grid',
    'off-grid': 'Off-grid',
  };

  return map[normalized] ?? value;
}
