# Config Reference

## Core

- `type`: zawsze `custom:zs-power-flow-card`
- `title`: tytul karty
- `solar_entity`: aktualna moc PV
- `grid_entity`: aktualna moc sieci
- `battery_power_entity`: aktualna moc baterii
- `battery_soc_entity`: SOC baterii w procentach
- `home_entity`: aktualne zuzycie domu
- `battery_capacity_kwh`: pojemnosc baterii w kWh

## View

- `theme`: `aurora | graphite | sunset`
- `layout`: `balanced | focus-home`
- `view_mode`: `simple | advanced`
- `visual_preset`: `default | compact | analytics`
- `flow_style`: `soft | beam | pulse`
- `details_mode`: `summary | extended`
- `show_details`: pokazuje dolne kafle metryk
- `show_status_bar`: pokazuje badge statusowe
- `show_solar`: pokazuje node PV
- `show_grid`: pokazuje node sieci
- `show_battery`: pokazuje node baterii
- `show_pv_breakdown`: pokazuje breakdown PV1/PV2/PV3
- `show_phase_breakdown`: pokazuje breakdown faz
- `animation_enabled`: wlacza animacje flow
- `power_noise_floor_w`: ignoruje male moce w logice flow
- `decimals`: liczba miejsc po przecinku dla kW

## Sign Handling

- `invert_grid`: odwraca znak encji sieci
- `invert_battery`: odwraca znak encji baterii

## Actions

- `tap_action`
- `hold_action`

Kazda akcja wspiera:

- `action: more-info`
- `action: navigate` z `navigation_path`
- `action: url` z `url_path`
- `action: none`

## Advanced Entities

- `grid_connected_entity`
- `inverter_status_entity`
- `battery_state_entity`
- `battery_soh_entity`
- `battery_temperature_entity`
- `inverter_temperature_entity`
- `device_alarm_entity`
- `device_fault_entity`
- `battery_alarm_entity`
- `battery_fault_entity`
- `work_mode_entity`
- `energy_pattern_entity`

## Daily Energy

- `daily_solar_energy_entity`
- `daily_home_energy_entity`
- `daily_grid_import_energy_entity`
- `daily_grid_export_energy_entity`
- `daily_battery_charge_energy_entity`
- `daily_battery_discharge_energy_entity`

## Breakdown

- `pv1_power_entity`
- `pv2_power_entity`
- `pv3_power_entity`
- `load_l1_power_entity`
- `load_l2_power_entity`
- `load_l3_power_entity`
- `grid_l1_power_entity`
- `grid_l2_power_entity`
- `grid_l3_power_entity`

## Labels

- `solar_label`
- `grid_label`
- `battery_label`
- `home_label`
