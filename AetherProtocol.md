<!--
	NOTE: This document describes the game concept and world for Aether Protocol as originally designed for the Electron/React/Three.js stack.
	The project is now being migrated to Unity (C#). For up-to-date architecture and implementation, see UNITY_MIGRATION_PLAN.md.
-->
Aether Protocol — Concept Document
Core Concept
Aether Protocol is an Idle Management Simulation set in a technologically advanced, post-collapse region of space. Players act as “Base Commander," tasked with establishing, managing, expanding, and securing a colony base against internal and external threats.The Player will either start as a Veridian Commander sent from an orbital station, or an Indigenous commander on one of the inhabited planets. The game blends the high-stakes survival management of Frozen City, the automated progression of Wasteland Life, and the strategic combat/trading cycles of Idle Outpost.
In-Universe History
1. The Homeworld and the Collapse
The "Great System Collapse" occurred when the interconnected networks of the Homeworld suffered a cascading failure, wiping out centuries of stored knowledge and plunging society into a dark age of information.
Political strife and turmoil on Veridia leads to loss of cooperation and support from the Homeworld.
The Homeworld Veridia is located in the separate Veridian System on the other side of the galaxy.
[Space to fill in details about the collapse's immediate effects on the colonies].
2. Sector Designation and Initial Colonization


Ships were sent to 7 Sectors to explore and colonize, each with the capacity for 5-10 orbital ships. Each sector contains multiple planets, with habitable planets supported by up to 5 orbital ships.
[Space to fill in details about the initial journey time and orbital station setup].
3. The Post-Collapse Schism and Faction Origins
[Space to fill in details about the catalyst for the current political environment after the Homeworld support was lost].
[Space to fill in details on how the five competing orbital bases were formed and transitioned from unified centers to rival entities].
Factions & World Structure
Command Centers/ Bases
Bases originate from orbital command stations that deploy "base creation" ships with a crew consisting of a Captain/Pilot, Engineer, and Resource hunter/gatherer.
Surface bases coordinate and trade with one another while paying a variable tax in materials to their respective orbital base, or Main base if a faction has multiple bases but is not aligned with an Orbital base.
The world contains up to five competing orbital bases, depending on planet size, which engage in both trade and warfare.
Main factions are led by orbital stations, though smaller surface factions exist of Indigenous or seceded surface bases.
New factions can form between various combinations of orbital and surface-run groups.


Structures
Structures should have a simple green/red indicator light that indicates when a crew member is assigned. Total max assigned crew should range from 1 to 5, depending on the structure's complexity.
All base structures can be upgraded to a maximum of level 60, with each level increasing operational efficiency or output capacity.

Structure Category
Structure Name
Function & Key Resource Focus
Power Requirement (Units/Hour)
Housing & Morale
Crew Bunks
Basic housing for initial population, minor morale bonus.
5


Advanced Habitat
Mid-tier housing, significant morale and rest efficiency bonus.
15
Processing & Refinement
Heavy Metals Smelter
Refines raw metals (Raw Tantalum, Corroded Iron Ore) into structural alloys.
50


Energy Particle Processor
Refines energy resources (Charged Silicon, Thermic Dust) into power cells and components.
45


Hydroponics Lab
Processes biological and aqueous resources (Brine Algae, Water) into advanced synthetic materials and rations.
30


Mineral Refiner
Processes Rare Earths and Gems (Neodymium Salt, Quartzite Shards) for specialized components and trade.
35
Manufacturing
Component Fabricator
Produces general building materials and common components (High-Density Foam).
25


Specialized Forge
High-tolerance manufacturing of advanced components (Carbon Fibers, Synthetic Sapphire) and Guardian armor.
60
Power Management
Geothermal Generator
Primary base power source (Requires Thermic Dust).
0 (Produces Power)


Capacitor Array
Stores excess energy, providing a buffer against power failures and sudden high demand.
10
Security & Training
Perimeter Wall (Tiers I-III)
Physical barrier defense against raiders and hostile environment.
5


Automated Turret Platform
Active defense system for the base perimeter.
20


Tactical Training Range
Improves combat unit experience and unlocks new Warrior unit classes.
15


Exploration Command Center
Improves scout unit performance and unlocks new Explorer unit classes.
15

Player Roles & Startup Choices
Startup Choices
Players choose their starting faction, which dictates initial support and bonuses:
Captain/ Head of Base setup team (From an Orbital Faction)
Benefits
Support of Orbital Command and immediate trade (Once trade is unlocked) with other same Faction bases.
Emergency resource requests to Orbital Command.
Head of independent Indigenous base
Benefits
Quicker resource identification.
Immediate access to bartering with other Indigenous bases
+5 percent speed in resource extraction & gathering.
-3 percent resource costs.
Races Available
Circinus-7 and its orbital stations are inhabited by seven primary races: The Veridians, The Aetherians, The Cygnids, The Solisans, The Ferrics, The Thusians, and The Pelagics.

#
Planet
Status
Description
Inhabitants
Atmosphere Content Mixture
1
Xylos
Uninhabited planet.
A cold, icy dwarf planet with an atmosphere too thin for life. It is resource rich and mineable by automated mining drone—unlocked at &lt;tbd&gt; level of the tech tree branch for mining.
N/A
Thin, primarily Carbon Dioxide (90%), trace Nitrogen, and frozen Methane.
2
Acheron
Uninhabited gas giant.
Shrouded in perpetual electromagnetic storms. Its upper atmosphere is essential for harvesting rare energy particles used in orbital shield maintenance.
N/A
Dense hydrogen (75%) and helium (20%), with trace amounts of highly volatile, rare energy particles.
3


Tiber


Uninhabited volcanic world.


A molten world close to Circinus-7's star. Surface landing is impossible, but automated deep-orbit probes extract precious superheated element alloys.


N/A
Heavy sulfur dioxide (60%), carbon monoxide (30%), trace noble gases.
4


Aethus


Inhabited.


A lush, temperate world serving as Circinus-7's primary agricultural and living hub. It hosts the majority of orbital bases and is the main trade nexus.


The Aetherians and The Thusians.
Oxygen (22%), Nitrogen (76%), Trace Gases (2%).
5
Solis Magna
Inhabited.
A hot, arid desert world rich in rare earth minerals and ancient collapsed geothermal power complexes. Bases are rugged and focused on heavy industry and resource processing.
The Solisans and The Ferrics.
Nitrogen (68%), Oxygen (20%), Argon (10%), High particulate matter (dust/sand) (2%).
6
Cygnus
Inhabited.
A vibrant but geologically unstable world, heavily terraformed early on. It is known for its high-tech infrastructure and specialized manufacturing.
The Cygnids.
Nitrogen (74%), Oxygen (24%), Trace Helium and Neon (2%).
7
Pelagia
Inhabited.
A sprawling aquatic world composed of shallow seas and artificial floating cities. Its economy centers on aquaculture and synthetic material production.
The Pelagics.
Oxygen (20%), Nitrogen (78%), High Water Vapor (2%).
8
Aetheris
Inhabited.
A mountainous, rugged planet known for its natural defenses and independent, isolationist bases. Bases here emphasize self-sufficiency and local resource reliance.
The Aetherians (Secondary Population).
Nitrogen (78%), Oxygen (20%), Trace Argon (2%).

Detailed Race Descriptions (Humanoid Variants)
All seven races are humanoid variants capable of inter-procreation, leading to a significant hybrid population across all inhabited planets, particularly those hosting multiple races. Small populations of all races can be found across every inhabited planet in Circinus-7.
The Veridians: Originating from the earth-like homeworld Veridia, The Veridians are visually indistinguishable from baseline humans with a variety of skin tones and physical traits. They form the core crews and command structure of the powerful orbital factions, retaining a sense of technological authority and cultural heritage from the Homeworld.
The Aetherians: Originating from high elevation and open skies (Aethus and Aetheris), Aetherians are typically tall and slender with high lung capacity, enabling them to thrive in thinner atmospheres. Their skin often displays a natural, high-altitude pigmentation. They are culturally defined by their focus on exploration, mobility, and independent resource management.
The Cygnids: The Cygnids are masters of high technology, with subtle, inherent biological enhancements that facilitate high neural processing speed and an innate affinity for interacting with digital systems. This adaptation is vital for managing Cygnus's complex, geologically unstable infrastructure. They are generally slender and place great value on innovation, design, and structural stability.
The Solisans: Adapted to the extreme heat and arid scarcity of Solis Magna. Their physical traits include thick, naturally pigmented skin for intense UV filtering and highly efficient biological water recycling. Their culture is rigid, focusing on survival, rigorous excavation, and hierarchical heavy industry.
The Ferrics: Co-inhabiting Solis Magna, the Ferrics are closely tied to the planet’s heavy industrial processes. Their humanoid frame often incorporates denser bone structures or minor, inherited cybernetic elements, granting them immense physical strength and a high tolerance for operational heat. They hold endurance and efficiency as their core virtues.
The Thusians: The agricultural specialists of the sector, found primarily on Aethus. They possess a robust, stocky build ideal for operating heavy farming machinery and manual labor. They have an enhanced genetic trait for rapid healing and resilience to the various bio-engineered organic compounds used in Aethus's sprawling crop belts. They are known for their pragmatic, community-focused society.
The Pelagics: These oceanic settlers are adapted to Pelagia’s deep aquatic environments. They exhibit subtle physiological modifications, such as modified visual spectrums for low light and minor webbing between digits (more pronounced in those adapted to deep-sea living). Their economy and culture are centered on aquaculture, synthetic material production, and collective harmony with the sea.
The Brink Binary System
The Brink Binary System is a binary star system, consisting of the stars Threshold and Precipice, which contains the eight known planets. This system serves as the immediate local setting for Aether Protocol.
The player must navigate "Data Considerations" such as resource states (at rest, in transit, or in use) to optimize production chains. Success depends on balancing the needs of crew, expanding the sector's physical security, and defending against raiders attacking the base
Game Loops
1. Management & Production (The "Frozen City" Influence)
The player manages a population of crew with specific roles and responsibilities. Each crew member is assigned to a facility based on their designation or specialized training:
Base Crew Roles
Base Logistician: Manages the base’s internal supply chain, prioritizing resource movement between harvesting, processing, and storage facilities. Reduces resource transit time and material decay.
Base Fabricator: Operates and calibrates the Component Fabricator and Hydroponics Lab to increase output efficiency. Mitigates operational risks like Thermal Shutdown.
Security Commander (Guardian): Responsible for directing the base’s automated defenses and commanding combat units during "Physical Intrusions" by raiders.
Trade & Diplomat Agent: Manages and negotiates resource contracts, including Business Partner Agreements (BPA) and Service-Level Agreements (SLA), to ensure secure and profitable trade with orbital and surface factions.
Drone Engineer/Commander: Responsible for drone repair and maintenance; one must always be deployed with surface drones.
Power Systems Engineer: Responsible for the maintenance and optimization of power generation and storage facilities (Geothermal Generator, Capacitor Array). Mitigates risk of System Overload.
Fabrication Specialist: Manages the high-tolerance manufacturing structures, specifically the Specialized Forge and Mineral Refiner.
Specialized Combat & Exploration Units
The following units require specialized training facilities (Tactical Training Range, Exploration Command Center) to unlock and upgrade:
Unit Type
Class Name
Role Description
Warrior (Defense)
Guardian (Heavy Defense)
Heavily armored units for perimeter defense and holding choke points. Specialized for high-damage suppression. Armor, Health, and Suppression effectiveness scale with Tech Tree unlocks and Warrior level. (High Armor, High Health, Low Mobility, Moderate Damage)


Warrior (Defense)
Assault Trooper (Breacher)
Standard infantry units, focused on rapid deployment and high-fire-rate weaponry. Excels in sustained damage output, which improves with Tech Tree unlocks and Warrior level. (Moderate Armor, Moderate Health, Moderate Mobility, High Damage)


Warrior (Defense)
Tactical Ranger (Marksman)
Long-range combat units deployed to observation posts for precision fire support. High critical hit chance and range are scaled based on Tech Tree unlocks and Warrior level. (Low Armor, Low Health, Moderate Mobility, Very High Damage)


Warrior (Defense)
Support Medic (Field Specialist)
Provides battlefield repairs to automated turrets and non-combat trauma stabilization to other units. Repair speed and stabilization efficacy are limited by Tech Tree unlocks and Warrior level. (Very Low Armor, Moderate Health, High Mobility, Low Damage)


Warrior (Defense)
Sentinel (Melee/CQB)
Close-Quarters Battle specialist, equipped with shields and blunt weapons for perimeter control and counter-intrusion. Shield durability and control radius scale with Tech Tree unlocks and Warrior level. (High Armor, Moderate Health, High Mobility, Moderate Damage)


Explorer (Scout)
Surface Scout
Fast, lightly-armored units focused on rapid map exploration and resource node identification. Performance and survivability are limited based on tech tree unlocks and scout level.


Explorer (Scout)
Deep Explorer
Heavily-equipped units designed for high-risk resource node extraction and clearing physical barriers like bollards or fencing. Performance and survivability are limited based on tech tree unlocks and scout level.



Unit Leveling & Progression
All crew and specialized units gain experience through activity (working, fighting, exploring). Leveling up enhances the unit's effectiveness by increasing primary stats and unlocking new skills or bonuses at specific level tiers.
All crew and specialized units gain experience through activity (working, fighting, exploring). Leveling up enhances the unit's effectiveness by increasing primary stats and unlocking new skills or bonuses at specific level tiers. The maximum level for all Base Crew and Specialized Units is Level 100.
Table: Base Crew Roles - Skill and Stat Leveling
Unit Type
Role
Primary Stat/Skill Focus (Increases per Level)
Max Level Skill Unlock (Example)
Base Crew
Base Logistician
Resource Transit Speed, Material Decay Reduction, Inventory Capacity
Lvl 10: Automated Routing (50% reduction in transit time within base)Lvl 100: Automated Routing (50% reduction in transit time within base)


Base Crew
Base Fabricator
Component Fabricator Efficiency, Risk Mitigation (Thermal Shutdown), Repair Speed
Lvl 10: Master Calibrator (10% material cost reduction on common components)Lvl 100: Master Calibrator (10% material cost reduction on common components)


Base Crew
Security Commander
Automated Defense Damage Bonus, Turret Platform Health, Raid Warning Time
Lvl 10: Tactical Override (+20% damage for all automated turrets during a raid)Lvl 100: Tactical Override (+20% damage for all automated turrets during a raid)


Base Crew
Trade & Diplomat Agent
Negotiation Success Rate (BPA/SLA), Tax Rate Reduction, Trade Resource Throughput
Lvl 10: Master Negotiator (Guaranteed minimal tax rate with all aligned factions)Lvl 100: Master Negotiator (Guaranteed minimal tax rate with all aligned factions)


Base Crew
Drone Engineer/Commander
Drone MTBF (Mean Time Before Failure) increase, Drone Repair Time reduction, Drone Movement Speed
Lvl 10: Field Maintenance Kit (All deployed drones gain a passive regeneration rate)Lvl 100: Field Maintenance Kit (All deployed drones gain a passive regeneration rate)


Base Crew
Power Systems Engineer
Power Generation Efficiency, Capacitor Array Storage Capacity, System Overload Mitigation
Lvl 10: Grid Harmonizer (+15% total power output from all generators)Lvl 100: Grid Harmonizer (+15% total power output from all generators)


Base Crew
Fabrication Specialist
Specialized Forge/Mineral Refiner Critical Success Chance, Rare Material Yield
Lvl 10: High-Tolerance Focus (10% chance to produce a bonus advanced component)Lvl 100: High-Tolerance Focus (10% chance to produce a bonus advanced component)



Table: Specialized Combat & Exploration Units - Stat Leveling
Unit Type
Class Name
Primary Leveling Stats
Secondary Leveling Stats/Skills
Warrior
Guardian (Heavy Defense)
Armor Rating, Maximum Health
Suppression Field Radius, Melee Damage Resist
Warrior
Assault Trooper (Breacher)
Sustained Damage Output, Fire Rate
Recoil Control, Critical Hit Mitigation
Warrior
Tactical Ranger (Marksman)
Critical Hit Chance, Weapon Range
Vision/Spotting Radius, Stealth Rating
Warrior
Support Medic (Field Specialist)
Repair Speed, Trauma Stabilization Efficacy
Self-Preservation (Health), Deployment Speed
Warrior
Sentinel (Melee/CQB)
Shield Durability, Stun/Control Radius
Movement Speed in CQB, Armor Penetration Resist
Explorer
Surface Scout
Movement Speed, Resource Identification Radius
Camouflage Rating, Stealth Level
Explorer
Deep Explorer
Survivability (Environmental Resist), Extraction Speed
Carry Capacity, Barrier Removal Speed

2. Idle Scavenging & Expansion (The "Wasteland Life" Influence)
Scavenging is a tiered, automated process. Players deploy drones to gather "Salvaged Components." This scavenging is subject to "Raider Ambushes," where Contaminated Components might be unknowingly brought back to the base.

Automated Scavenging: Drones gather basic materials based on their "Mean Time Before Failure" (MTBF).
Base Expansion: Unlocking new sectors requires "Due Diligence" assessments and clearing physical barriers like bollards or fencing.
Resource Nodes: Various resource nodes occur naturally across surface maps. To enable and improve mining and extraction of these materials, different tooling and machinery options must be integrated into the build and tech tree.
Resource Manifest & Production
Circinus-7 Natural Resource Manifest (20 Items)
Resource Category
Resource Name
Context/Source Planet
Base Metals
Raw Tantalum
Solis Magna (Heavy Industry)


Corroded Iron Ore
General Scavenging
Energy/Power
Charged Silicon
Cygnus (High-tech)


Thermic Dust
Solis Magna (Geothermal)
Rare Earths
Neodymium Salt
Solis Magna (Rare Earth Minerals)


Praseodymium Powder
Solis Magna (Rare Earth Minerals)
Water/Aqueous
Brine Algae
Pelagia (Aquaculture)


Deep-Sea Hydrocarbons
Pelagia (Synthetic Materials)
Scrap/Digital


Salvaged Components


General Scavenging (Core Mechanic)




Data Sludge


Comms Relay/System Overload




Contaminated Components


Raider Ambushes (Scavenging Risk)


Advanced Polymers
Carbon Fibers
Cygnus (Specialized Manufacturing)


High-Density Foam
General Building
Gems/Crystals
Quartzite Shards
Aetheris (Mountainous/Local Reliance)


Synthetic Sapphire
Cygnus (Specialized Manufacturing)
Chemical/Catalysts
Caustic Agents
General Industrial Waste


Noble Gas Trace
Cygnus (Atmosphere content)
Biological/Rations
Nutrient Paste
Synth-Farm (Rations)


Mycelial Spores
Synth-Farm (Rations)
Unique/Specific
Collapsed Geode
Solis Magna (Ancient complexes)

Resource Synthesis Matrix (Examples)
Input Resource(s)
Process/Facility
Output Material/Item
Corroded Iron Ore + Thermic Dust
Scrap Smelter
Building Materials (Base Product)
Salvaged Components + Data Sludge


Comms Relay


Tech Points (Base Product)
Raw Tantalum + Neodymium Salt
Refinery/High-Tier Lab
Conductor Wire (Advanced Component)
Brine Algae + Deep-Sea Hydrocarbons
Synthetic Lab
Polymesh Fabric (Synthetic Material)
Carbon Fibers + Synthetic Sapphire
Specialized Manufacturer
Guardian Armor Plate (Hero Gear)
Malicious Firmware
Decontamination Unit (Clearing)


Refined Data Core (Trade Commodity)


Quartzite Shards + Noble Gas Trace
Capacitor Forge
Charged Capacitor (Energy Component)

Resource Prevalence Across Circinus-7 Planets
Prevalence Key:
Exclusive: Only found on this planet.
High/Moderate/Low: Frequency of natural deposits.
Scarce: Very rare, difficult to extract.
N/A: Not naturally occurring.

Resource
Xylos
Ach.
Tib.
Aeth.
Solis
Cyg.
Pel.
Aeths.
Raw Tantalum
Low
N/A
High
Low
High
Mod.
N/A
Mod.
Corroded Iron
High
N/A
Mod.
High
High
High
Mod.
High
Charged Silicon
N/A
Low
N/A
Low
Mod.
High
N/A
Mod.
Thermic Dust
N/A
N/A
Excl.
N/A
N/A


N/A


N/A
N/A
Neod. Salt
Low
N/A
Mod.
N/A
High
Low
N/A
Scarce
Pras. Powder
Scarce
N/A
Mod.
N/A
High
Low
N/A
Low
Brine Algae
N/A
N/A
N/A
N/A


N/A
N/A
Excl.
N/A


Deep-Sea Hyd.
N/A
N/A
N/A
N/A
N/A
N/A
Excl.
N/A
Salvaged Comp.
High
Mod.
Mod.
High
High
High
High
High
Data Sludge
Mod.
Mod.
Mod.
Mod.
Mod.
High
Mod.
Mod.
Contam. Comp.
Low
Low
Low
Mod.
Mod.
Mod.
Mod.
Mod.
Carbon Fibers
N/A
N/A
N/A
Low
Mod.
High
Mod.
Low
Hi-Density Foam
Mod.
Mod.
Mod.
High
High
High
High
High
Quartzite Shard
N/A


N/A
N/A


N/A


N/A


N/A


N/A
Excl.
Synth. Sapphire
N/A
N/A
Scarce
Low
Low
High
N/A
Mod.
Caustic Agents
Low
Low
High
Mod.
High
High
Mod.
Low
Noble Gas
Mod.
Mod.
High
Low
Low
High
Low
Mod.
Nutrient Paste
Low
N/A
N/A
High
Mod.
Mod.
High
Mod.
Mycelial Spore
N/A
N/A
N/A
High
Scarce
Low
Mod.
High
Collap. Geode
N/A


N/A
N/A


N/A
Excl.
N/A
N/A
N/A



3. Combat, Trading & RPG (The "Idle Outpost" Influence)
The game operates on a Day/Night cycle. Daytime focuses on "Business Partner Agreements" (BPA) with wandering merchants to acquire rare gear. Nighttime requires active defense.

Random Raider Waves: Raiders attempt "Physical Intrusions." Waves occur randomly with a minimum 4-day, in-game, buffer between them. Players must implement "Automated Defenses" like laser barriers and automated turrets to survive.
Hero Gear (RPG): Guardians can be equipped with "Access Code" and "Signature" weaponry to bypass raider defenses (Armor).
Trading: Players sign "Service-Level Agreements" (SLA) with other factions to guarantee resource flow.
Trade Mechanics (Gameplay)
Level 15 (Trade Tech Tree): Unlocks trade with other factions within the player's current sector.
Level 30 (Trade Tech Tree): Unlocks trade with factions in other sectors.
Tech Tree
The Tech Tree is divided into five core branches, reflecting the primary gameplay loops. Progress in each branch unlocks new structures, unit classes, component efficiency, and trade capabilities. Tech Points (TP) are generated through the "Comms Relay" structure by processing Salvaged Components and Data Sludge.
Tech Tree Branches (Tiered Progression)
Tier
I. Base Ops & Management
II. Resource Processing & Fabrication
III. Security & Defense
IV. Exploration & Expansion
V. Trade & Diplomacy
Tier 1
Basic Power Grid
Unlocks: Crew Bunks, Geothermal Generator.
Base Alloys
Unlocks: Heavy Metals Smelter, Component Fabricator.
Basic Defense Protocols
Unlocks: Perimeter Wall (Tier I), Guardian Unit Class.
Surface Reconnaissance
Unlocks: Surface Scout Unit, Due Diligence Assessment.
Local Exchange
Unlocks: Bartering with Indigenous Bases.
Tier 2
Advanced Power Storage
Unlocks: Capacitor Array, Power Systems Engineer role.
Refined Energy
Unlocks: Energy Particle Processor.
Automated Defense
Unlocks: Automated Turret Platform, Assault Trooper Unit Class.
Deep Exploration Gear
Unlocks: Deep Explorer Unit, Advanced Habitat.
Inter-Colony Contracts
Unlocks: Trade with Factions within Circinus-7 (Level 15 requirement).
Tier 3
Base Logistics Optimization
Unlocks: Base Logistician role, Improved resource decay rate.
Specialized Refinement
Unlocks: Mineral Refiner, Specialized Forge, Fabrication Specialist role.
Close-Quarters Control
Unlocks: Sentinel Unit Class, Tactical Ranger Unit Class, Perimeter Wall (Tier II).
Planetary Extraction
Unlocks: Remote Drone Mining (Xylos), Exploration Command Center.
Orbital Trade & Tax
Unlocks: Negotiated Tax Rates with Orbital Factions, Business Partner Agreements (BPA).
Tier 4
Advanced Life Support
Unlocks: Advanced Habitat efficiency bonus, Further reduction in power consumption.
Synthetic Material Science
Unlocks: Hydroponics Lab, Increased output of Nutrient Paste & Mycelial Spores.
Advanced Combat Support
Unlocks: Support Medic Unit Class, Perimeter Wall (Tier III), Hero Gear crafting recipes.
Deep-Space Probes
Unlocks: Orbital Probe Mining (Acheron/Tiber), Reduced Deep Explorer mission time.
Sector-Wide Commerce
Unlocks: Trade with Factions in other Sectors (Level 30 requirement), Service-Level Agreements (SLA).


Platform Strategy: Windows First, Mobile Future
To ensure a seamless experience between Windows (Steam/Web) and Mobile (Android/iOS), the following architectural and UI standards will be followed:
UI & UX Design
Adaptive Layout: A "Centralized Architecture" for the UI that concentrates key elements in a single location for easy thumb access on mobile, while expanding into a sidebar-style layout for wide-screen PC monitors.
Control Scheme: Simple click/tap interactions. "Automation" tools are utilized to streamline continuous data collection, reducing the need for complex keyboard inputs.
Technical Integration
Cross-Platform Sync: Implementing "Single Sign-On" (SSO) and "Identity Providers" (IdPs) like Google or Facebook to allow users to switch devices without losing progress.
Security & Compliance: Following "External Considerations" including national and global regulatory factors for data privacy.
Failover Systems: Use of "Cloud-Storage" for save data with "Failover Testing" to ensure that if a local sync fails, the system maintains its security posture and safeguards user data.
Development Plan
The development lifecycle is divided into four critical phases to ensure the stability of the "Base Commander" experience and the security of user data across platforms.
Phase 1: Foundation & Architecture
Engine & UI Framework: Establish the "Centralized Architecture" UI for Windows, ensuring elements are positioned for future mobile thumb-access.
Identity Management: Integrate Single Sign-On (SSO) and Identity Providers (IdPs) like Google or Facebook for secure user authentication.
Data Persistence: Configure Cloud-Storage solutions with robust Failover Testing to prevent progress loss during local sync failures.
Compliance Framework: Begin documentation for national and global regulatory factors concerning data privacy and security.
Phase 2: Core Loop Prototype
Resource Management: Build the Synth-Farm, Scrap Smelter, and Comms Relay systems to manage production chains and System Overload.
Crew Roles: Implement the logic for Owners, Stewards, Processors, and Custodians to manage facility-specific outputs and risks.
Automated Scavenging: Develop the drone deployment system based on Mean Time Before Failure (MTBF) and Salvaged Components collection.
Base Expansion: Integrate physical barrier removal logic (bollards/fencing) tied to "Due Diligence" assessments.
Phase 3: Content Expansion (Windows Target)
Day/Night Cycle: Implement the transition between daytime "Business Partner Agreements" (BPA) and nighttime survival.
Threat Systems: Program raider waves to test player-implemented defense systems.
RPG & Trading: Develop the "Access Code" and "Signature" weaponry systems along with Service-Level Agreement (SLA) trading mechanics.
Windows Release Candidate: Finalize the Steam/Web version with full keyboard/mouse support and optimized widescreen layouts.
The current build is a visually striking management dashboard. The UI is clean, the "Circinus-7" vibe is well-established through high-contrast neons, and the functional logic (Trade, Research, Roster) is clearly mapped out. However, the central hex map currently functions as a static visual anchor rather than an interactive game world. To transition from a "Management Dashboard" to a "Full 3D Game with Controllable Assets," the following directions should be followed:
Phase 4: Dynamic Scene Initialization
Transition to Live Rendering: Replace the static center hex image with a live @react-three/fiber Canvas.
Camera Calibration: Set an OrthographicCamera at the 35.264° / 45° "Wasteland" angle. Disable OrbitControls rotation to maintain the isometric constraint while enabling mouse-drag panning.
Environment Mapping: Apply a high-contrast HDRI (e.g., an industrial night scene) to the scene's environment property to give the "Foundations" metallic sheen to all scrap assets.
Phase 5: Interaction & Input (The "Controllable" Logic)
Raycasting System: Implement a global Raycaster to detect clicks on 3D meshes.
Selection State: Create a selectedEntity slice in the Zustand store. Clicking a 3D drone or building should highlight the object and update the UI sidebar with context-specific actions.
Command Pattern: Implement a "Right-Click to Move" or "Click-to-Action" system. When a unit is selected, clicking a map coordinate should dispatch a movement command to that entity.
Phase 6: Navigation & Pathfinding
NavMesh Generation: Create a hidden navigation mesh that mirrors the hex floor's geometry.
Pathfinding Integration: Use the yuka library or a custom A* implementation to calculate routes around obstacles (scrap piles, buildings) when a move command is issued.
Smooth Interpolation: Use useFrame to smoothly transition (lerp) the position and rotation of assets as they traverse their calculated paths.
Phase 7: Asset & Visual Fidelity Upgrade
PBR Asset Swap: Replace the primitive shapes (spheres/cubes) with modular .glb models of scrap machinery and drones.
Animated Emissives: Use custom shaders or the LayerMaterial to create "breathing" neon lights on the scrap assets that sync with the Threat Level in the Command Center.
Contact Shadows: Implement ContactShadows beneath moving assets to ground them in the scene, maintaining the "miniature toy" aesthetic.
Phase 8: Real-Time World-to-UI Linking
Visual Feedback: Trigger Tailwind-based UI notifications (e.g., "+100 Scrap") at the 3D screen-space coordinates where a scavenger successfully harvests a pile.
Drone Interaction: Link the "Research & Development" progress directly to the 3D world. When "Advanced Drone AI" finishes, visually swap the drone models or unlock a new "Patrol" behavior in the 3D scene.