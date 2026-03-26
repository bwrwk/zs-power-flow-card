export type FlowTheme = 'aurora' | 'graphite' | 'sunset';
export type FlowLayout = 'balanced' | 'focus-home';
export type DetailsMode = 'summary' | 'extended';
export type ViewMode = 'simple' | 'advanced';
export type VisualPreset = 'default' | 'compact' | 'analytics';
export type FlowStyle = 'soft' | 'beam' | 'pulse';
export type CardActionType = 'more-info' | 'navigate' | 'url' | 'none';

export interface CardActionConfig {
  action: CardActionType;
  navigation_path?: string;
  url_path?: string;
}

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
  battery_state_entity?: string;
  battery_soh_entity?: string;
  battery_temperature_entity?: string;
  inverter_temperature_entity?: string;
  device_alarm_entity?: string;
  device_fault_entity?: string;
  battery_alarm_entity?: string;
  battery_fault_entity?: string;
  work_mode_entity?: string;
  energy_pattern_entity?: string;
  pv1_power_entity?: string;
  pv2_power_entity?: string;
  pv3_power_entity?: string;
  load_l1_power_entity?: string;
  load_l2_power_entity?: string;
  load_l3_power_entity?: string;
  grid_l1_power_entity?: string;
  grid_l2_power_entity?: string;
  grid_l3_power_entity?: string;
  battery_capacity_kwh?: number;
  theme?: FlowTheme;
  layout?: FlowLayout;
  view_mode?: ViewMode;
  visual_preset?: VisualPreset;
  flow_style?: FlowStyle;
  show_details?: boolean;
  details_mode?: DetailsMode;
  show_solar?: boolean;
  show_grid?: boolean;
  show_battery?: boolean;
  animation_enabled?: boolean;
  show_status_bar?: boolean;
  show_phase_breakdown?: boolean;
  show_pv_breakdown?: boolean;
  invert_grid?: boolean;
  invert_battery?: boolean;
  power_noise_floor_w?: number;
  decimals?: number;
  tap_action?: CardActionConfig;
  hold_action?: CardActionConfig;
  solar_label?: string;
  grid_label?: string;
  battery_label?: string;
  home_label?: string;
}

export interface FlowNodeData {
  label: string;
  value: number;
  flowValue: number;
  displayValue: number;
  displayUnit: 'W' | 'kW';
  accent: string;
  secondary: string;
}

export interface BreakdownItem {
  label: string;
  value: number;
  displayValue: number;
  displayUnit: 'W' | 'kW';
}

export interface PowerFlowAnalytics {
  currentSourceMix: {
    solar: number;
    grid: number;
    battery: number;
  };
  selfConsumptionRate: number | null;
  selfSufficiencyRate: number | null;
  batteryRuntimeHours: number | null;
  residualRate: number | null;
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
  gridToBattery: number;
  batteryToHome: number;
  batteryToGrid: number;
  batteryStoredKwh: number | null;
  netHomeDemand: number;
  residualPower: number;
  residualDirection: 'balanced' | 'unassigned_source' | 'unassigned_demand';
  gridConnected: boolean | null;
  inverterStatus: string | null;
  batteryState: string | null;
  batterySoh: number | null;
  batteryTemperature: number | null;
  inverterTemperature: number | null;
  deviceAlarm: string | null;
  deviceFault: string | null;
  batteryAlarm: boolean | null;
  batteryFault: boolean | null;
  workMode: string | null;
  energyPattern: string | null;
  analytics: PowerFlowAnalytics;
  dailyEnergy: {
    solar: number | null;
    home: number | null;
    gridImport: number | null;
    gridExport: number | null;
    batteryCharge: number | null;
    batteryDischarge: number | null;
  };
  pvBreakdown: BreakdownItem[];
  loadPhaseBreakdown: BreakdownItem[];
  gridPhaseBreakdown: BreakdownItem[];
}
