# ZS Power Flow Card

Nowoczesna, konfigurowalna karta Lovelace dla Home Assistanta do wizualizacji przeplywu energii w instalacji domowej: produkcji PV, magazynowania, importu lub eksportu z sieci oraz zuzycia domu.

To jest autorska implementacja inspirowana ogolnym pomyslem kart typu power flow, ale budowana od zera bez forkowania cudzego kodu.

## Status

Wersja `0.1.0` to MVP z:

- czystym szkieletem projektu w TypeScript i Lit,
- nowoczesnym ukladem `solar / grid / battery / home`,
- animowanymi liniami przeplywu energii,
- prostym API konfiguracyjnym opartym o encje Home Assistanta,
- prostym editorem Lovelace do podpiania encji i wyboru motywu,
- fallbackiem demo, gdy encje nie sa jeszcze podpiete.

## Instalacja developerska

```bash
npm install
npm run build
```

Po zbudowaniu dodaj zasob `zs-power-flow-card.js` do Lovelace.

## Przykladowa konfiguracja

```yaml
type: custom:zs-power-flow-card
title: Energia domu
solar_entity: sensor.pv_power
grid_entity: sensor.grid_power
battery_power_entity: sensor.battery_power
battery_soc_entity: sensor.battery_soc
home_entity: sensor.home_load
battery_capacity_kwh: 15
theme: aurora
layout: focus-home
details_mode: extended
animation_enabled: true
show_details: true
```

## Kierunek rozwoju

- rozbudowany editor GUI,
- wiecej layoutow i presetow wizualnych,
- grupy encji dla wielofazowych i bardziej zlozonych instalacji,
- lepsze mapowanie ikon i stanów pracy magazynu,
- testy logiki przeplywow i formatterow.
