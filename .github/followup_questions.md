# Follow-up Questions & Future Architecture Notes

This document serves as a persistent backlog for architectural questions, feature ideas, and technical debt that should be revisited during later development phases.

## Phase 2 Notes
- **ScavengeManager Interaction**: Currently, the `ScavengeManager` handles "Due Diligence" assessments using a standard probability stat-check (Drone MTBF vs. Sector Difficulty). Revisit this in later phases to determine if this should be upgraded into an **interactive mini-game** for better player engagement.

## Phase 3 Notes
- **Trade Pricing**: Trade pricing is currently static for the Alpha Prototype. Revisit this to implement dynamic, fluctuating exchange rates (e.g., updating every 1 in-game hour) to simulate a real economy.
