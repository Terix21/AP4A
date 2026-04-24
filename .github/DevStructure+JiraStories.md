# Development Structure & User Stories: Neon Scrap: Sector 7

## 1. Development Structure & AI Implementation Directions

### Phase 1: Technical Foundation & Data Integrity
* **Identity & SSO Framework**: Implement a `GlobalIdentityManager` utilizing Single Sign-On (SSO) for Google Play Games and Apple iOS Game Center for achievements. A "Local" sign-in option must also be supported for local game saves with multi-user support. All player progress must be bound to a unique `UUID` to facilitate cross-platform synchronization.
* **Data Persistence Layer**: Create a `SaveSystem` that handles three data states: **At Rest** (Local/Cloud Storage), **In Transit** (Encryption during sync), and **In Use** (Active Memory). Implement a Failover Sync logic: if local data integrity check fails, the system must automatically reconcile with the latest Cloud-Storage timestamp.
* **Adaptive UI Architecture**: Establish a `UILayoutController` using a responsive canvas system. 
    * *Windows Target*: Widescreen sidebar layout with multi-panel visibility.
    * *Mobile Future*: Centered, thumb-accessible navigation with collapsible menus.

### Phase 2: Core Loop & Survivor Management
* **Facility & Role Logic**: Design a modular `Facility` class. 
    * **Roles**: Assign `Owner`, `Steward`, `Processor`, and `Custodian` enums.
    * **Modifiers**: Owners/Stewards increase accuracy/standards (output quality); Processors/Custodians manage security and storage (risk mitigation).
* **Risk Simulation**: Integrate a `TickSystem` that calculates "Key Risk Factors": Resource Exhaustion (Synth-Farm), Thermal Shutdown (Smelter), and Memory Leaks (Data Hub).
* **Automated Scavenging**: Implement a `ScavengeManager` where drone efficiency is dictated by Mean Time Before Failure (MTBF). Success in "Due Diligence" assessments (mini-games or stat checks) unlocks physical sector expansion (e.g., removing bollards).

### Phase 3: Trade, Tech, & Combat Expansion
* **Gated Tech Tree**: Build a `TechTree` system where nodes act as feature toggles for Phase 3 mechanics. 
    * *Node 1 (Market Access)*: Enables `TradingPost` construction.
    * *Node 2 (Economic Standard)*: Switches game state from `Barter_Mode` to `Currency_Mode`.
* **Unified Contract System**: Create a `ContractHandler` for NPC interactions.
    * **Supply Contracts**: Player delivers goods over time for reputation/rewards.
    * **Purchase Contracts**: Player pays to receive automated resource streams.
* **Threat Defense**: Develop a `SecurityManager` to handle "Injection Attacks" and "DDoS" raider waves. Implement "Technical Controls" (Turrets/Firewalls) as the primary defensive layer.

---

## 2. User Stories

### Phase 1: Foundation
* **SSO Integration**: As a player, I want to log in via Google Play Games, Apple Game Center, or Local Profile so my progress is saved and tracked.
* **Cloud Failover**: As a player, I want my game to automatically download my cloud save if my local data becomes corrupted so I never lose my sector progress.
* **Responsive Interface**: As a Windows player, I want to utilize my full screen resolution to see production, survivors, and alerts simultaneously.

### Phase 2: Alpha Prototype
* **Facility Operation**: As a Sector Controller, I want to build a Synth-Farm and assign a Processor so I can generate Rations for my survivors.
* **Role Optimization**: As a player, I want to assign a Steward to the Data Hub to reduce the frequency of Memory Leaks and maximize Tech Point output.
* **Scavenging**: As a player, I want to deploy drones to collect Encrypted Scrap while I am offline based on the drone's MTBF rating.
* **Expansion**: As a player, I want to perform a Due Diligence assessment on a locked area to expand my base footprint.

### Phase 3: Windows Launch (Revised)
* **Tech Tree Progression**: As a player, I want to research "Logistics" in the Tech Tree so that I can build a Trading Post and begin interacting with NPCs.
* **Barter System**: As a player, I want to trade my excess Building Materials directly for Tech Points through a barter UI before I have unlocked a currency system.
* **NPC Contracts**: As a player, I want to sign a Supply Contract with an NPC merchant to provide them with Rations in exchange for rare weapon components.
* **Currency Unlocking**: As a player, I want to unlock the "Universal Credit" tech so that I can use a standard currency for trades instead of calculating item-for-item barter values.
* **Nightly Defense**: As a player, I want to install Technical Controls to defend my sector from "Injection Attack" raider waves during the night cycle.
* **Combat Gear**: As a player, I want to equip my guardians with Public/Private Key weaponry to more effectively damage armored raiders.

### Phase 4: Mobile Deployment
* **Input Translation**: As a mobile player, I want to use touch gestures to navigate my sector and manage facilities with the same efficiency as a mouse and keyboard.
* **Cross-Play Persistence**: As a player, I want to start a trade contract on my PC and check its fulfillment status on my phone later in the day.