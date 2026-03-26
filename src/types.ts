export type FlowTheme = 'aurora' | 'graphite' | 'sunset';
export type FlowLayout = 'balanced' | 'focus-home';
export type DetailsMode = 'summary' | 'extended';
export type ViewMode = 'simple' | 'advanced';

export interface HomeAssistantLike {
  states: Record<string, { state: string; attributes?: Record<string, unknown> }>;
}

export interface ZsPowerFlowCardConfig {
  type: 'custom:zs-power-flow-card';
  title?: string;
  solar_entity?: string;
  grid_entity?: string;
  battery_power_entity?: string;
  battery_soc_entity?: string;
  home_entity?: string;
  grid_connected_entity?: string;
  inverter_status_entity?: string;
  daily_solar_energy_entity?: string;
  daily_home_energy_entity?: string;
  daily_grid_import_energy_entity?: string;
  daily_grid_export_energy_entity?: string;
  daily_battery_charge_energy_entity?: string;
  daily_battery_discharge_energy_entity?: string;
  battery_capacity_kwh?: number;
  theme?: FlowTheme;
  layout?: FlowLayout;
  view_mode?: ViewMode;
  show_details?: boolean;
  details_mode?: DetailsMode;
  show_solar?: boolean;
  show_grid?: boolean;
  show_battery?: boolean;
  animation_enabled?: boolean;
  show_status_bar?: boolean;
  decimals?: number;
  solar_label?: string;
  grid_label?: string;
  battery_label?: string;
  home_label?: string;
}

export interface FlowNodeData {
  label: string;
  value: number;
  unit: string;
  accent: string;
  secondary: string;
}

export interface PowerFlowSnapshot {
  solar: FlowNodeData;
  grid: FlowNodeData;
  battery: FlowNodeData & { soc: number | null; mode: 'charging' | 'discharging' | 'idle' };
  home: FlowNodeData;
  solarToHome: number;
  solarToBattery: number;
  solarToGrid: number;
  gridToHome: number;
  batteryToHome: number;
  batteryStoredKwh: number | null;
  netHomeDemand: number;
  gridConnected: boolean | null;
  inverterStatus: string | null;
  dailyEnergy: {
    solar: number | null;
    home: number | null;
    gridImport: number | null;
    gridExport: number | null;
    batteryCharge: number | null;
    batteryDischarge: number | null;
  };
}
