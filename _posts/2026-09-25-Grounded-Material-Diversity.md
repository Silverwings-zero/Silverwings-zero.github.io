---
title: "Physically Grounded Material Diversity for Dexterous Manipulation"
card_title: "Physically Grounded Material Diversity"
layout: post
categories: projects
venue: "Ongoing project"
featured: 4
topics: [Robotics, Haptics]
image: /img/cards/material-diversity.jpg
image_alt: "Measured material cards on the left; simulated dexterous hands grasping objects made of those materials on the right"
summary: "Putting measured materials, not random friction values, into simulation, so robot hands learn how real surfaces grip, slide, and slip."
---

## Overview

Robot hands trained in simulation touch a world that is physically plausible but has no real materials in it. A physics engine reduces each material to one tuned friction number, and it can't produce the high-frequency vibrations that tell a fingertip what it's touching or that it's starting to slip.

This project builds the simulation from measured materials instead. Each object carries a material card built from real tool–surface recordings in the Penn Haptic Texture Toolkit: a measured friction coefficient, plus models of sliding vibration and tapping that are synthesized from each contact's force and sliding speed.

On an XHAND1 dexterous hand, we train grasping policies across 100 real materials and compare them with standard domain randomization, in a task where only friction keeps the object in hand.

## Status

Early simulation results suggest that policies trained on measured materials drop slippery objects less often. Next come slip-aware sensing and transfer to the real hand.
<!-- TODO: credit collaborators / undergraduate researcher, if you want them listed -->

## Related Projects

- [Feeling What the Robot Touches: Haptic Rendering for Bilateral Teleoperation]({% post_url 2026-09-26-Haptic-Bilateral-Teleoperation %}), a companion project on real-world tactile sensing and rendering
- [Language-Guided Multimodal Texture Authoring (IEEE Haptics Symposium 2026)]({% post_url 2026-02-08-Paper-2026017722 %}), which builds on the same Penn Haptic Texture Toolkit measurements
