# ZS Power Flow Card

Nowoczesna, konfigurowalna karta Lovelace dla Home Assistanta do wizualizacji przeplywu energii w instalacji domowej: produkcji PV, magazynowania, importu lub eksportu z sieci oraz zuzycia domu.

To jest autorska implementacja inspirowana ogolnym pomyslem kart typu power flow, ale budowana od zera bez forkowania cudzego kodu.

## Status

Wersja `1.0.0` to pierwsze stabilne wydanie:

- nowoczesny uklad `solar / grid / battery / home`,
- animowane flow z poprawiona geometria i stabilnym resize,
- bardziej wiarygodny bilans energii z rozbiciem `grid -> home`, `grid -> battery`, `battery -> home`, `battery -> grid`,
- prog szumu mocy, zeby drobne wahania nie udawaly realnego przeplywu,
- wizard i auto-discovery encji w editorze,
- profile `generic`, `solarman-like`, `deye / sunsynk-like`,
- analytics: autokonsumpcja, samowystarczalnosc, runtime baterii i mix zasilania domu,
- breakdown MPPT i faz,
- statusy health i alarmow,
- akcje `tap` i `hold`,
- harness do lokalnych testow wizualnych.

Dokumenty pomocnicze:

- [CONFIG_REFERENCE.md](C:\Users\User\Codex\Karty%20ha\zs-power-flow-card\CONFIG_REFERENCE.md)
- [CHANGELOG.md](C:\Users\User\Codex\Karty%20ha\zs-power-flow-card\CHANGELOG.md)
- [LICENSE](C:\Users\User\Codex\Karty%20ha\zs-power-flow-card\LICENSE)

## Licencja

Projekt jest obecnie `UNLICENSED / All Rights Reserved`.

- komercyjne uzycie wymaga osobnej zgody lub licencji,
- kod nie jest obecnie udostepniony jako open source,
- w przyszlosci licencja moze zostac zmieniona, ale na teraz prawa pozostaja zastrzezone.

## Instalacja developerska

```bash
npm install
npm run build
npm run visual:serve
```

Po zbudowaniu dodaj zasob `zs-power-flow-card.js` do Lovelace.

Harness wizualny bedzie dostepny pod adresem:

```text
http://localhost:4173/visual/index.html
```

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
power_noise_floor_w: 30
tap_action:
  action: more-info
hold_action:
  action: navigate
  navigation_path: /lovelace/energia
```

## Wizard i auto-discovery

Editor Lovelace ma teraz sekcje:

- `Szybki start` - automatycznie proponuje konfiguracje podstawowa, advanced albo preset profilu,
- `Rekomendowane mapowanie` - podpowiada najbardziej prawdopodobne encje,
- `Kontrola konfiguracji` - pokazuje braki i duplikaty.

Wykrywanie profilu opiera sie na nazwach encji i jest celowo bezpieczne:

- `generic`
- `solarman-like`
- `deye / sunsynk-like`

To nie blokuje recznej konfiguracji. Wszystkie pola nadal mozna poprawic lub nadpisac samodzielnie.

## Testy i walidacja

Logika ma testy jednostkowe:

```bash
npm test
```

Do sprawdzania geometrii, resize i layoutow full-width sluzy harness wizualny:

```bash
npm run build
npm run visual:serve
```

Potem otworz:

```text
http://localhost:4173/visual/index.html
```

## Uwagi integracyjne

- karta wspiera instalacje 1-fazowe i 3-fazowe,
- breakdowny PV i faz sa opcjonalne,
- jesli falownik raportuje inne znaki dla sieci lub baterii, uzyj `invert_grid` i `invert_battery`,
- jesli bateria pokazuje pojedyncze waty szumu, ustaw lub zostaw `power_noise_floor_w`.

## Kierunek rozwoju

- dalsze profile auto-mapowania,
- jeszcze lepszy wizard i onboarding,
- testy screenshotowe w przegladarce,
- dodatkowe warianty analytics i layoutow,
- dopracowanie kolejnych wydań po `1.0`.
