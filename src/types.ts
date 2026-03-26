export type FlowTheme = 'aurora' | 'graphite' | 'sunset';

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
  battery_capacity_kwh?: number;
  theme?: FlowTheme;
  show_details?: boolean;
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
}
