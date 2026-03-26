import { describe, expect, it } from 'vitest';
import { buildSnapshot, getThemeTokens } from './presenters';
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
};

describe('buildSnapshot', () => {
  it('maps direct solar usage, charging, and export correctly', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '6.2' },
          'sensor.grid': { state: '-1.0' },
          'sensor.battery_power': { state: '-1.4' },
          'sensor.battery_soc': { state: '80' },
          'sensor.home': { state: '3.8' },
          'binary_sensor.grid_connected': { state: 'on' },
          'sensor.inverter_status': { state: 'Normal' },
          'sensor.daily_solar': { state: '21.3' },
          'sensor.daily_home': { state: '16.4' },
          'sensor.daily_grid_import': { state: '2.2' },
          'sensor.daily_grid_export': { state: '5.8' },
          'sensor.daily_battery_charge': { state: '4.9' },
          'sensor.daily_battery_discharge': { state: '3.1' },
        },
      },
      baseConfig,
    );

    expect(snapshot.solarToHome).toBeCloseTo(3.8);
    expect(snapshot.solarToBattery).toBeCloseTo(1.4);
    expect(snapshot.solarToGrid).toBeCloseTo(1.0);
    expect(snapshot.grid.secondary).toBe('Eksport');
    expect(snapshot.battery.mode).toBe('charging');
    expect(snapshot.batteryStoredKwh).toBeCloseTo(12);
    expect(snapshot.gridConnected).toBe(true);
    expect(snapshot.inverterStatus).toBe('Normal');
    expect(snapshot.dailyEnergy.solar).toBeCloseTo(21.3);
  });

  it('maps grid import and battery discharge correctly', () => {
    const snapshot = buildSnapshot(
      {
        states: {
          'sensor.solar': { state: '1.1' },
          'sensor.grid': { state: '2.5' },
          'sensor.battery_power': { state: '1.7' },
          'sensor.battery_soc': { state: '45' },
          'sensor.home': { state: '4.9' },
        },
      },
      baseConfig,
    );

    expect(snapshot.solarToHome).toBeCloseTo(1.1);
    expect(snapshot.gridToHome).toBeCloseTo(2.5);
    expect(snapshot.batteryToHome).toBeCloseTo(1.7);
    expect(snapshot.battery.mode).toBe('discharging');
    expect(snapshot.netHomeDemand).toBeCloseTo(3.8);
  });

  it('falls back to demo values when entities are missing', () => {
    const snapshot = buildSnapshot(undefined, baseConfig);

    expect(snapshot.solar.value).toBeGreaterThan(0);
    expect(snapshot.home.value).toBeGreaterThan(0);
    expect(snapshot.battery.soc).toBe(68);
  });
});

describe('getThemeTokens', () => {
  it('returns aurora tokens by default', () => {
    expect(getThemeTokens(undefined).solar).toBe('#f7b500');
  });
});
