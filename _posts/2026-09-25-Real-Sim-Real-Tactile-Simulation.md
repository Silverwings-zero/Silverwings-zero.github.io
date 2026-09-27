---
title: "Real–Sim–Real: Grounding Simulated Tactile Signals in Measured Contact"
layout: post
categories: projects
---

**Ongoing project**

Physics simulators can model contact forces but not the high-frequency signals, like texture vibration and stick-slip, that tell a robot what it is touching and when it is about to slip. This project scales tactile training data in simulation while keeping it anchored to measured, real-world contact.



## Motivation

Tactile data is the bottleneck for contact-rich robot learning. Real tactile data is slow and expensive to collect. Simulated tactile signals do not match reality: physics engines such as PhysX model slow, macroscopic contact (Coulomb friction, compliant contact) but cannot produce the high-frequency signals that carry material identity and incipient slip, such as texture vibration, micro-scale surface geometry, and stick-slip. Most tactile simulation today reproduces geometry and contact depth, not grounded high-frequency signals. This direction aims to scale tactile training data in simulation while keeping it anchored to measured, real contact.

## Approach

- **Real-to-sim replay.** Recorded real GelSight Mini trajectories are replayed in simulation, producing paired sim–real tactile data.
- **Shared intermediate representation.** The simulator does not need to reproduce raw sensor signals exactly. It needs to land in the same intermediate contact representation as the real sensor, and sim and real outputs are aligned at that representation. This scoping decision is what makes the problem tractable.
- **Physically grounded materials.** A dataset of real-world material properties, including measured compliance and surface texture, is baked into simulation as per-material parameter cards. Domain-randomization ranges are derived from measurement uncertainty instead of hand-tuned values.
- **Decoupled signal rendering.** The physics engine handles contact dynamics at the physics rate. A separate signal-rendering layer, driven by per-contact state (normal force, slip speed, contact location, material ID), synthesizes the fast signals from measured data models. This mirrors the split between the graphics loop and the haptic loop in haptic rendering. The Penn Haptic Texture Toolkit serves as the initial data source.
- **Sim-to-real.** Policies and representations learned on the grounded simulation are transferred back to hardware.

## Evaluation Plan

- Compare rendered and real signals at the distribution level (spectral statistics), and run cross-domain material classification (train on real and test on sim, and the reverse).
- Run ablations that toggle each rendered physical signal one at a time, measuring how each affects policy performance on contact-rich tasks (texture identification, slip-aware grasping, sliding manipulation), benchmarked against current tactile manipulation setups in Isaac Lab.

## Status

Ongoing. The material measurements and dataset construction are in progress.
<!-- TODO: credit collaborators / undergraduate researcher, if you want them listed -->

## Related Projects

- [Feeling What the Robot Touches: Haptic Rendering for Bilateral Teleoperation]({% post_url 2026-09-26-Haptic-Bilateral-Teleoperation %}), a companion project on real-world tactile sensing and rendering
- [Language-Guided Multimodal Texture Authoring (IEEE Haptics Symposium 2026)]({% post_url 2026-02-08-Paper-2026017722 %})
