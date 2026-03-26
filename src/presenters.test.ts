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
