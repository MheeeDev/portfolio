---
title: Bulk-Bag Filling Line — PLC and HMI from Infeed to Outfeed
summary: Wrote the PLC program and HMI myself for a big-bag filling line in a vegetable-oil plant — every machine from the start of the line to the end, with fill-by-weight and on-site commissioning.
company: P.A.M Engineering & Automation
period: { start: 2024-06, end: 2024-09 } # TODO: confirm real start/end months
role: PLC and HMI programmer — the whole line, from infeed to outfeed, and commissioning on site
sector: Food processing — vegetable-oil plant, bulk material handling
platforms: [Siemens S7-1200, TIA Portal V17, Siemens HMI]
tags: [PLC, HMI, Commissioning]
cover: ./cover.svg
coverAlt: Process overview of the big-bag line — feed hopper, dust collector, filling head on a weighing frame, and the pallet conveyor out.
highlights:
  - PLC program and HMI written by me, covering every machine from the start of the line to the end
  - Fill-by-weight with setpoint and actual weight on the operator screen
  - One process overview for the whole line — feed, dust collection, filling and pallet conveyor
  - Commissioned in a running plant, including night work around production
track: industry
---

## Problem

A vegetable-oil plant was installing a big-bag filling line, supplied with weighing equipment from
a specialist vendor. Material is fed from a hopper, filled into a bulk bag hanging on a weighing
frame, and the full bag leaves on a pallet conveyor, with a dust collector on the filling head.
Every machine on the line needed one control program and one operator screen, commissioned inside
a plant that kept producing.

## My role & scope

I wrote the PLC program and the HMI myself, for the whole line — from the infeed at the start to
the pallet conveyor at the end — and commissioned them on site with the weighing-equipment
supplier and the plant's operators, including night shifts so testing did not stop production.

## Approach

### One program for the whole line

The line runs as one sequence: feed, fill, weigh, release the bag, move it out. The program covers
every machine on it — feeder, dust collector, filling head, conveyor — and the sequence that runs
them in order, so the plant has one place to look when the line stops.

### Fill by weight

The operator enters a set weight for the bag. The screen shows setpoint and actual weight side by
side while the bag fills, and the sequence stops the feed when the target is reached.

### One screen for the whole line

The HMI shows a process overview of the full line with each motor and valve in its running or
stopped state, so the operator sees where a bag is and why it is waiting.

## Delivery

- I/O check of every device against the drawings
- Each machine tested on its own, then the full sequence — first empty, then with product
- Commissioning on site with the supplier and the plant's operators
- Handover of the PLC and HMI program backups

## Result

- The line runs from infeed to outfeed on one program and one operator screen that I wrote
- Bags filled to a set weight, with setpoint and actual weight visible to the operator
- Commissioned without stopping the rest of the plant

## Skills used

Siemens S7-1200 and TIA Portal V17 · Siemens HMI screen design · machine sequences and interlocks ·
weighing and batching · material handling and dust collection · commissioning in a live food plant.
