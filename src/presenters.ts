import { FlowTheme, HomeAssistantLike, PowerFlowSnapshot, ZsPowerFlowCardConfig } from './types';

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

const FALLBACK_VALUES = {
  solar: 4.8,
  grid: -1.2,
  batteryPower: -1.6,
  batterySoc: 68,
  home: 5.2,
};

function parseEntityNumber(hass: HomeAssistantLike | undefined, entityId: string | undefined, fallback: number): number {
  if (!hass || !entityId) return fallback;
  const raw = hass.states[entityId]?.state;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseOptionalEntityNumber(hass: HomeAssistantLike | undefined, entityId: string | undefined): number | null {
  if (!hass || !entityId) return null;
  const raw = hass.states[entityId]?.state;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
}

function parseEntityText(hass: HomeAssistantLike | undefined, entityId: string | undefined): string | null {
  if (!hass || !entityId) return null;
  const value = hass.states[entityId]?.state;
  return value && value !== 'unknown' && value !== 'unavailable' ? value : null;
}

function parseGridConnected(hass: HomeAssistantLike | undefined, entityId: string | undefined): boolean | null {
  const state = parseEntityText(hass, entityId)?.toLowerCase();
  if (!state) return null;
  if (['on', 'connected', 'online', 'true', '1'].includes(state)) return true;
  if (['off', 'disconnected', 'offline', 'false', '0'].includes(state)) return false;
  return null;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function getThemeTokens(theme: FlowTheme | undefined) {
  return THEMES[theme ?? 'aurora'];
}

export function buildSnapshot(
  hass: HomeAssistantLike | undefined,
  config: ZsPowerFlowCardConfig,
): PowerFlowSnapshot {
  const themeTokens = getThemeTokens(config.theme);
  const solar = Math.max(0, parseEntityNumber(hass, config.solar_entity, FALLBACK_VALUES.solar));
  const grid = parseEntityNumber(hass, config.grid_entity, FALLBACK_VALUES.grid);
  const batteryPower = parseEntityNumber(hass, config.battery_power_entity, FALLBACK_VALUES.batteryPower);
  const home = Math.max(0, parseEntityNumber(hass, config.home_entity, FALLBACK_VALUES.home));
  const socValue = parseEntityNumber(hass, config.battery_soc_entity, FALLBACK_VALUES.batterySoc);
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
  const gridConnected = parseGridConnected(hass, config.grid_connected_entity);
  const inverterStatus = parseEntityText(hass, config.inverter_status_entity);

  return {
    solar: {
      label: config.solar_label ?? 'Produkcja',
      value: solar,
      unit: 'kW',
      accent: themeTokens.solar,
      secondary: 'PV',
    },
    grid: {
      label: config.grid_label ?? 'Siec',
      value: grid,
      unit: 'kW',
      accent: themeTokens.grid,
      secondary: grid >= 0 ? 'Import' : 'Eksport',
    },
    battery: {
      label: config.battery_label ?? 'Magazyn',
      value: batteryPower,
      unit: 'kW',
      accent: themeTokens.battery,
      secondary: soc === null ? 'Stan nieznany' : `SOC ${soc.toFixed(0)}%`,
      soc,
      mode: batteryPower > 0 ? 'discharging' : batteryPower < 0 ? 'charging' : 'idle',
    },
    home: {
      label: config.home_label ?? 'Dom',
      value: home,
      unit: 'kW',
      accent: themeTokens.home,
      secondary: 'Zuzycie',
    },
    solarToHome,
    solarToBattery,
    solarToGrid,
    gridToHome,
    batteryToHome,
    batteryStoredKwh,
    netHomeDemand,
    gridConnected,
    inverterStatus,
    dailyEnergy: {
      solar: parseOptionalEntityNumber(hass, config.daily_solar_energy_entity),
      home: parseOptionalEntityNumber(hass, config.daily_home_energy_entity),
      gridImport: parseOptionalEntityNumber(hass, config.daily_grid_import_energy_entity),
      gridExport: parseOptionalEntityNumber(hass, config.daily_grid_export_energy_entity),
      batteryCharge: parseOptionalEntityNumber(hass, config.daily_battery_charge_energy_entity),
      batteryDischarge: parseOptionalEntityNumber(hass, config.daily_battery_discharge_energy_entity),
    },
  };
}

export function formatPower(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)} kW`;
}

export function formatEnergy(value: number | null, decimals = 0): string {
  if (value === null) return '--';
  return `${value.toFixed(decimals)}%`;
}

export function formatKwh(value: number | null, decimals = 1): string {
  if (value === null) return '--';
  return `${value.toFixed(decimals)} kWh`;
}
