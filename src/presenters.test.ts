import { describe, expect, it } from 'vitest';
import { buildSnapshot, formatKwh, formatPower, getThemeTokens, prettifyStatus } from './presenters';
import { ZsPowerFlowCardConfig } from './types';

const baseConfig: ZsPowerFlowCardConfig = {
  type: 'custom:zs-power-flow-card',
  solar_entity: 'sensor.solar',
  grid_entity: 'sensor.grid',
  battery_power_entity: 'sensor.battery_power',
  battery_soc_entity: 'sensor.battery_soc',
  home_entity: 'sensor.home',
  battery_capacity_kwh: 15,
  theme: 'aurora',
  grid_connected_entity: 'binary_sensor.grid_connected',
  inverter_status_entity: 'sensor.inverter_status',
  daily_solar_energy_entity: 'sensor.daily_solar',
  daily_home_energy_entity: 'sensor.daily_home',
  daily_grid_import_energy_entity: 'sensor.daily_grid_import',
  daily_grid_export_energy_entity: 'sensor.daily_grid_export',
  daily_battery_charge_energy_entity: 'sensor.daily_battery_charge',
  daily_battery_discharge_energy_entity: 'sensor.daily_battery_discharge',
  battery_state_entity: 'sensor.battery_state',
  battery_soh_entity: 'sensor.battery_soh',
  battery_temperature_entity: 'sensor.battery_temp',
  inverter_temperature_entity: 'sensor.inverter_temp',
  device_alarm_entity: 'sensor.device_alarm',
  device_fault_entity: 'sensor.device_fault',
  battery_alarm_entity: 'binary_sensor.battery_alarm',
  battery_fault_entity: 'binary_sensor.battery_fault',
};

describe('buildSnapshot', () => {
  it('maps direct solar usage, charging, and export correctly', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '6200', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '-1000', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '-1400', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '80' },
          'sensor.home': { state: '3800', attributes: { unit_of_measurement: 'W' } },
          'binary_sensor.grid_connected': { state: 'on' },
          'sensor.inverter_status': { state: 'Normal' },
          'sensor.daily_solar': { state: '21300', attributes: { unit_of_measurement: 'Wh' } },
          'sensor.daily_home': { state: '16.4' },
          'sensor.daily_grid_import': { state: '2.2' },
          'sensor.daily_grid_export': { state: '5.8' },
          'sensor.daily_battery_charge': { state: '4.9' },
          'sensor.daily_battery_discharge': { state: '3.1' },
          'sensor.battery_state': { state: 'idle' },
          'sensor.battery_soh': { state: '99.8' },
          'sensor.battery_temp': { state: '18' },
          'sensor.inverter_temp': { state: '24.2' },
          'sensor.device_alarm': { state: 'OK' },
          'sensor.device_fault': { state: 'OK' },
          'binary_sensor.battery_alarm': { state: 'off' },
          'binary_sensor.battery_fault': { state: 'off' },
        },
      },
      baseConfig,
    );

    expect(snapshot.solarToHome).toBeCloseTo(3800);
    expect(snapshot.solarToBattery).toBeCloseTo(1400);
    expect(snapshot.solarToGrid).toBeCloseTo(1000);
    expect(snapshot.grid.secondary).toBe('Eksport');
    expect(snapshot.battery.mode).toBe('charging');
    expect(snapshot.batteryStoredKwh).toBeCloseTo(12);
    expect(snapshot.gridConnected).toBe(true);
    expect(snapshot.inverterStatus).toBe('Normal');
    expect(snapshot.dailyEnergy.solar).toBeCloseTo(21.3);
    expect(snapshot.analytics.selfConsumptionRate).toBeCloseTo(72.8, 1);
    expect(snapshot.analytics.selfSufficiencyRate).toBeCloseTo(86.6, 1);
    expect(snapshot.solar.displayUnit).toBe('kW');
    expect(snapshot.batteryState).toBe('idle');
    expect(snapshot.batterySoh).toBeCloseTo(99.8);
  });

  it('maps grid import and battery discharge correctly', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '1100', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '2500', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '1700', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '45' },
          'sensor.home': { state: '4900', attributes: { unit_of_measurement: 'W' } },
        },
      },
      baseConfig,
    );

    expect(snapshot.solarToHome).toBeCloseTo(1100);
    expect(snapshot.gridToHome).toBeCloseTo(2100);
    expect(snapshot.batteryToHome).toBeCloseTo(1700);
    expect(snapshot.gridToBattery).toBeCloseTo(0);
    expect(snapshot.battery.mode).toBe('discharging');
    expect(snapshot.netHomeDemand).toBeCloseTo(3800);
    expect(snapshot.residualPower).toBeCloseTo(400);
    expect(snapshot.residualDirection).toBe('unassigned_source');
    expect(snapshot.analytics.currentSourceMix.solar).toBeCloseTo(22.4, 1);
    expect(snapshot.analytics.currentSourceMix.battery).toBeCloseTo(34.7, 1);
    expect(snapshot.analytics.currentSourceMix.grid).toBeCloseTo(42.9, 1);
  });

  it('falls back to demo values when entities are missing', () => {
    const snapshot = buildSnapshot(undefined, baseConfig);

    expect(snapshot.solar.value).toBeGreaterThan(0);
    expect(snapshot.home.value).toBeGreaterThan(0);
    expect(snapshot.battery.soc).toBe(68);
  });

  it('supports inverted grid and battery signs', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '115', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '-1507', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '4', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '15' },
          'sensor.home': { state: '1497', attributes: { unit_of_measurement: 'W' } },
        },
      },
      { ...baseConfig, invert_grid: true, invert_battery: true },
    );

    expect(snapshot.grid.value).toBeCloseTo(1507);
    expect(snapshot.battery.value).toBeCloseTo(-4);
    expect(snapshot.battery.flowValue).toBe(0);
    expect(snapshot.battery.mode).toBe('idle');
    expect(formatPower(snapshot.solar.value, 1)).toBe('115 W');
  });

  it('routes grid import into battery charging when battery is charging', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '0', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '900', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '-320', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '41' },
          'sensor.home': { state: '500', attributes: { unit_of_measurement: 'W' } },
        },
      },
      baseConfig,
    );

    expect(snapshot.gridToHome).toBeCloseTo(500);
    expect(snapshot.gridToBattery).toBeCloseTo(320);
    expect(snapshot.battery.mode).toBe('charging');
    expect(snapshot.residualPower).toBeCloseTo(80);
    expect(snapshot.residualDirection).toBe('unassigned_source');
  });

  it('filters tiny battery power as measurement noise for flow decisions', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '0', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '773', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '14', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '15' },
          'sensor.home': { state: '639', attributes: { unit_of_measurement: 'W' } },
        },
      },
      baseConfig,
    );

    expect(snapshot.battery.value).toBeCloseTo(14);
    expect(snapshot.battery.flowValue).toBeCloseTo(0);
    expect(snapshot.battery.mode).toBe('idle');
    expect(snapshot.gridToHome).toBeCloseTo(639);
    expect(snapshot.residualPower).toBeCloseTo(134);
    expect(snapshot.residualDirection).toBe('unassigned_source');
  });

  it('estimates battery runtime when battery storage and load are known', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '0', attributes: { unit_of_measurement: 'W' } },
          'sensor.grid': { state: '500', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_power': { state: '0', attributes: { unit_of_measurement: 'W' } },
          'sensor.battery_soc': { state: '50' },
          'sensor.home': { state: '2000', attributes: { unit_of_measurement: 'W' } },
        },
      },
      baseConfig,
    );

    expect(snapshot.batteryStoredKwh).toBeCloseTo(7.5);
    expect(snapshot.analytics.batteryRuntimeHours).toBeCloseTo(3.75);
    expect(snapshot.analytics.residualRate).toBeCloseTo(75);
  });
});

describe('getThemeTokens', () => {
  it('returns aurora tokens by default', () => {
    expect(getThemeTokens(undefined).solar).toBe('#f7b500');
  });
});

describe('formatters', () => {
  it('formats power dynamically as W or kW', () => {
    expect(formatPower(140, 1)).toBe('140 W');
    expect(formatPower(1215, 1)).toBe('1.2 kW');
  });

  it('formats energy in kWh', () => {
    expect(formatKwh(2.1, 1)).toBe('2.1 kWh');
  });

  it('prettifies known statuses', () => {
    expect(prettifyStatus('charging')).toBe('Ladowanie');
    expect(prettifyStatus('Battery First')).toBe('Battery First');
  });
});
