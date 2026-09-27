---
title: "Feeling What the Robot Touches: Haptic Rendering for Bilateral Teleoperation"
layout: post
categories: projects
---

**Ongoing project**

Teleoperators see the task but feel almost nothing at the moment of contact. This project estimates the robot's contact state from its tactile and force sensors and renders it back to the operator's hand, so the operator can feel what the gripper is touching.



## Motivation

Teleoperation is how most contact-rich robot demonstrations are collected, yet the operator typically sees the task and feels almost nothing. The quality of every downstream demonstration is bounded by what the operator can perceive at the moment of contact. This project closes that loop: the robot's contact state is estimated from its sensors and rendered back to the operator's hand, so the operator can feel what the gripper is touching.

## Setup and Dataset

- A Franka FR3 arm with a parallel gripper, running on a real-time control workstation (Ubuntu 22.04, PREEMPT_RT kernel) built as shared lab infrastructure.
- A bilateral teleoperation dataset of gripper–surface contact, covering variations in movement across different force and velocity conditions.
- Each sample pairs GelSight Mini tactile video, three-axis force, and end-effector position with vibration. The demonstrations therefore carry measured contact force as ground truth, not only kinematics.

## Approach

- **Contact estimation.** Normal force, sliding velocity, and texture identity are inferred from the sensor streams. The central task is cross-modal inference from GelSight Mini images to these contact parameters.
- **Rendering to the operator.** The estimated contact state drives realistic vibrotactile signals on a Weart haptic glove, building on data-driven texture rendering from the Penn Haptic Texture Toolkit lineage. The aim is to improve operator trajectory accuracy during contact.
- **Temporal representation (in progress).** A multimodal temporal encoder is trained with perceptual rendering supervision: it must produce signals a person perceives as realistic, rather than only reconstructing frames. The hypothesis is that this objective captures temporal contact structure, such as the transition from sliding into slip, that frame-level tactile self-supervised learning misses.

## Why It Matters

One learned representation of contact can serve two users. For the human operator, it provides texture and contact feedback through the glove. For the robot, it provides the signals needed to anticipate slip during manipulation. Texture and slip are treated as two regimes of the same frictional-vibratory response, not as separate problems.

## Related Work

- [Language-Guided Multimodal Texture Authoring (IEEE Haptics Symposium 2026)]({% post_url 2026-02-08-Paper-2026017722 %}), our data-driven texture model built on the Penn Haptic Texture Toolkit
- [Real–Sim–Real: Grounding Simulated Tactile Signals in Measured Contact]({% post_url 2026-09-25-Real-Sim-Real-Tactile-Simulation %}), a companion direction on scaling tactile data in simulation
