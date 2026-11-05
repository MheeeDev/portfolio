---
title: Keg Line Control Upgrade — S7-300 to S7-1500 Retrofit
summary: Replaced the ageing control cabinets of a brewery keg line — S7-300 and Pro-face panels to S7-1500, Comfort panels, safety relays and new drives — on a running plant, from bid to handover.
company: P.A.M Engineering & Automation
period: { start: 2023-09, end: 2024-07 }
role: Project engineer — revised the PLC program and built the HMI screens for conveyor control and the line
sector: Brewery — keg conveying and filling line
platforms: [Siemens S7-1500, TIA Portal V17, SIMATIC Comfort Panels, Pilz PNOZ s4, Danfoss FC 302, PROFINET, PROFIBUS]
tags: [PLC, HMI, Retrofit, Commissioning]
cover: ./cover.svg
coverAlt: Before-and-after of the retrofit — S7-300 and Pro-face panels replaced by an S7-1500 cabinet with a Comfort panel, safety relay and two drives, linked to the vision controller.
highlights:
  - Three cabinets rebuilt — conveyor, filler and vision — in 2 mm SS304, IP55
  - S7-300 and Pro-face replaced by S7-1500 and Comfort panels, rewired cable by cable
  - Program structured on the PackML / ISA-88 state model; HMI colours to ISA-5.5
  - 100 % I/O and function test before shipping, then a 72-hour continuous run on site
track: industry
featured: true
---

## Problem

A brewery's keg line was still controlled from its original cabinets: an S7-300 PLC, Pro-face
operator panels, a mimic board of indicator lamps and years of added wiring. Spare parts were
getting hard to find, faults took long to trace through undocumented cables, and the line could not
be stopped for long — it fills the kegs the plant ships.

The plant wanted the conveyor and filler controls replaced with current Siemens hardware, without
losing a single machine function or any of the line's original output.

## My role & scope

Project engineer in the integrator's team, from the bid in September 2023 to handover in July 2024.
My own part was the software:

- **Revised the PLC program** for the new S7-1500 — carried over from the S7-300 into the client's
  module structure, without changing how the machines behave
- **Built the HMI screens** for conveyor control and the keg line on the new Comfort panels,
  including the status that used to be on the lamp mimic board
- Took part in the I/O test and commissioning of my screens and logic on site

The team covered the rest of the scope: site survey, backups, electrical drawings, the cabinet
build, installation and training. Three cabinets were replaced — the **conveyor control cabinet**,
the **Filler 1 control cabinet** with a separate operator panel and junction boxes, and the
**vision cabinet**.

## Approach

```
Before                                   After
S7-300 + Pro-face panel          ──►     CPU 1515-2 PN + TP1200 / TP1500 Comfort
Lamp mimic board                 ──►     Status moved onto a TP1900 Comfort screen
Old drives and safety wiring     ──►     Danfoss FC 302 drives + Pilz PNOZ s4 safety relay
                                         PROFINET to panels and remote I/O · PROFIBUS to the vision controller
```

### Start from what the line really does

Before any logic changed, the team surveyed the running line: every sensor, motor and cable, and
each machine sequence written down as a flowchart. The old PLC, HMI and safety programs and the
drive parameters were backed up first. Those flowcharts and backups were what I checked the
revised program against.

### Keep the program structure the client knows

The client's rule was that the new program must keep the structure of the old one; anything
added must not disturb it. The PLC program is organised in device modules — general, HMI, safety,
drives and servos, infeed, outfeed, interface — each with its data, logic and functions, and a
machine state model based on OMAC PackML and ISA-88. Ladder, STL and SCL are used where each fits.

### An HMI specification before the screens

The screens were specified before they were drawn: 1280 × 800 layout with a title bar, status
bar, work area, navigation and machine functions; status colours following ISA-5.5 (green running,
grey stopped, red and blinking for an alarm); message classes for critical errors, errors, warnings
and information; and logs for parameters, alarms and trends. The lamp mimic board was removed and
its information moved onto the HMI. The client approved the design before installation.

### Build it to last in a wet plant

New cabinets in 2 mm stainless steel 304, IP55, with air conditioning. The filler panel is on a
stand that turns through 270° so the operator can see it from the machine. All wiring follows one
colour code: three phases, neutral, earth, 230 V, 24 V control and measuring leads.

## Delivery

- **Sep–Nov 2023:** bid, site survey, purchase order, material and shop drawings, purchasing
- **Nov 2023 – Jul 2024:** cabinet build, 100 % I/O and function test before the cabinets left the
  workshop, removal of the old cabinets and cables, installation, rewiring and commissioning
- **Acceptance:** the line had to reach its original performance and run for 72 hours without
  interruption, with any defect fixed to the client's satisfaction
- **Handover (Jul 2024):** as-built drawings, source code and backups, manuals, labelling, and two
  days of operation and maintenance training

## Result

- Keg line running on supported hardware, with spare parts and drawings that match the plant
- Faults traced on the HMI instead of on a lamp board and through untraceable wiring
- A program in the client's own structure, so their engineers can maintain it
- Accepted after a 72-hour run at the line's original performance

## Skills used

Siemens S7-1500 and TIA Portal V17 (LAD, STL, SCL) · SIMATIC Comfort panels · PLC migration from
S7-300 · PackML / ISA-88 state model · ISA-5.5 HMI colours · Pilz safety relays · Danfoss drives ·
PROFINET and PROFIBUS · keeping a client's program structure while changing the hardware under it ·
I/O test and commissioning on a running line.
