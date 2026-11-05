---
title: End-of-Line Test Stands — Traceability & OT/MES Integration
summary: A request/response contract between test-stand PLCs and a MySQL MES, so a new product model is a database row instead of a logic change.
company: MIAC Automation
period: { start: 2025-09, end: present } # TODO: confirm real start/end months
role: Lead controls & software engineer — PLC, HMI, database, integration design
sector: Appliance manufacturing — end-of-line functional test
platforms: [Rockwell ControlLogix, FactoryTalk Optix (C# / .NET 6), Ignition, MySQL]
tags: [MES, Traceability, PLC, HMI, Database]
cover: ./cover.svg
coverAlt: Diagram of test-stand PLCs exchanging model, serial and result request/response messages with an Ignition and MySQL MES layer.
highlights:
  - PLC ↔ MES interface designed as paired request/response structures
  - Serial-level traceability database that grew to about 1.4 GB
  - 56 feeder-selection routines generated from a CSV instead of hand-coded
  - Found an E-stop wiring contradiction before energisation
featured: true
---

## Problem

A manufacturing line ran multiple end-of-line test stands — electrical safety, ground bond,
hi-pot, motor and valve function, gas valve leak test — across several station types. Each
stand tested a different product model, each model needed different parameters, and every
unit tested had to be traceable by serial number afterwards.

The stands had grown up independently. Test parameters lived in PLC constants, results were
recorded inconsistently, and adding a product model meant editing ladder logic.

## My role & scope

Lead engineer for the controls and software side: PLC data structures and logic, the
FactoryTalk Optix HMI recipe code, the MySQL schema, and the interface design between them.
Also the cross-check of the electrical package against the logic.

## Approach

### 1. A messaging contract between PLC and MES, not a tag list

The usual way to connect a PLC to a database is to expose a flat pile of tags and let the
SCADA layer scrape them. That couples the two systems permanently and breaks quietly.

Instead I defined the interface as **paired request/response structures** — a small,
explicit protocol implemented as PLC user-defined types:

| Exchange | Purpose |
|---|---|
| `ModelRequest` → `ModelResponse` | PLC asks "what are the test parameters for this model?" |
| `ProductSerialRequest` → `ProductSerialResponse` | PLC asks "is this scanned serial valid, and what is it?" |
| `ProductResultRequest` → `ProductResultResponse` | PLC posts a completed test result and gets an acknowledgement |
| `UserRequest` → `UserResponse` | Operator authentication and permission level |

Supporting types (`TestStandCommand`, `TestStandStatus`, `TestStandData`,
`TestStandParameter`, `TestStandHMI`, `TestStandSCADA`, `TestStandStatic`) separate what the
*operator* touches, what the *system* reports, and what is *configuration*.

**Why this matters:** the PLC no longer knows or cares that MySQL is on the other end. Adding
a product model is a database row, not a logic change. The database can be migrated, and the
handshake can be tested from either side independently.

### 2. Recipe management driven from the plant floor

On the HMI side (FactoryTalk Optix, C# / .NET 6) I extended the recipe subsystem so that
recipe operations — select, save, load-from-PLC, apply, import, export, delete — are each
driven by a **trigger variable the PLC can set**, not only by a button an operator presses.

This lets the machine sequence itself request a recipe change at the correct point in the
cycle, with the HMI as the executor rather than the gatekeeper, while keeping full
operator control and error feedback in the UI.

### 3. Configuration-driven PLC code generation

One station family needed **56 power feeder circuits** across two test stands, selected at
runtime by the full-load current of the model being tested.

The existing logic compared FLA to a single constant — workable for one circuit, impossible
for 56. The electrical drawings gave only a single rating per circuit, not a range.

I derived the selection bands algorithmically: within each station / voltage / phase group,
circuits were sorted by rating, and each circuit covers from *just above the previous
circuit's rating* up to *its own*. That mapping lives in a CSV
(`FLA_Min` / `FLA_Max` per circuit), and the PLC routines are **generated from the CSV**.

A rating change is a CSV edit and a regenerate — not 56 hand-edited rungs.

### 4. Designed so it could be imported before the hardware existed

The physical I/O tree did not yet exist in the project when the logic was written. Rather
than block, I wrote all logic against an **I/O image** and confined every real module
reference to a **single mapping routine** — 17 rungs, each commented with exactly what it
must become.

The export imported and verified cleanly on day one, and when the I/O tree was built, only
one file needed to change.

## Delivery

While cross-checking the electrical package against the logic I found a **direct
contradiction in the emergency-stop wiring** for one of the two stations:

| | Safety relay drawing | Digital input schedule |
|---|---|---|
| Station A | Safety relay contact → module bit 7, labelled *E-STOP (safety relay)* | consistent |
| Station B | Safety relay contact → equivalent module bit 7 | labelled **"SPARE"** |

Two controlled documents disagreed about whether an input was an emergency stop or unused.
I took the **safety relay drawing as authoritative** — it describes physical wiring, while
the I/O schedule is a derived document — implemented accordingly, and documented the
decision with the exact single rung to change if the drawing was the wrong one.

I raised this together with **five other items I could not resolve from the documentation**
rather than guessing on any of them. I also found three tags referenced by the existing
control-module routines that had **never been declared**, meaning the original program could
not have verified. Those were created with driving logic.

## Result

- Product models, test parameters and results moved from PLC constants to a database
  that reached ~1.4 GB of production traceability data
- Serial-level traceability from barcode scan to stored test result
- New product models added without touching PLC code
- Feeder logic maintainable as data rather than as 56 hand-written branches
- A documented, reviewable handover — decisions and open questions written down

## Skills used

Rockwell Studio 5000 (UDT and AOI design, ladder) · FactoryTalk Optix NetLogic in C# / .NET 6 ·
MySQL schema design · Ignition · code generation from configuration data · electrical
schematic and I/O schedule review · functional-safety awareness.
