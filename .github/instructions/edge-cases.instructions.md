# Edge Cases Instructions

## Scope
Known operational and implementation edge cases for Neon Scrap: Sector 7.

## Conventions
- Treat local storage and Capacitor Preferences access as failure-prone boundaries.
- Ensure all native Capacitor plugins have Web fallbacks since the app will heavily be developed and tested in a standard browser environment.

## Common Patterns
- **SaveSystem Failovers**: The `SaveSystem` handles At Rest, In Transit, and In Use states. Always ensure failover logic automatically reconciles with the latest Cloud-Storage timestamp if local data integrity fails.
- **TickSystem Performance**: The `TickSystem` runs frequent calculations for "Key Risk Factors" (Resource Exhaustion, Thermal Shutdown, Memory Leaks). Unthrottled React state updates on every tick can freeze the UI. Use buffered flush windows or references for rapid value changes to prevent React re-render loops.
- **UILayoutController Scaling**: Ensure Tailwind CSS responsive classes (`md:`, `lg:`) are correctly applied so the UI smoothly transitions between the Windows widescreen sidebar layout and the future mobile centered layout.

## Append-Only Updates
- 2026-04-23: Established baseline edge cases for SaveSystem data reconciliation and TickSystem React rendering performance.
