---
layout: home
title: Home
lede: "I'm a Computer Science Ph.D. student at **USC**, working with Prof. [Heather Culbertson](https://viterbi.usc.edu/directory/faculty/Culbertson/Heather) in the **HaRVI Lab**. I study how to represent touch so that one model can both render it for humans and use it for robot learning. On the human side, I generate haptic textures from language, video, and 3D scenes, and build teleoperation systems that let you feel what the gripper feels. On the robot side, I learn tactile representations from vision-based touch, force, and vibration, trained on what a person would actually perceive, so robots can anticipate slip and manipulate by feel."
---

My research asks how touch should be represented so that the same signal means something to both people and robots. Contact reaches us as force, vibration, motion, and deformation unfolding over time. I study how to capture these signals, how to structure them, and how to use them in two directions: rendering them so people can feel them, and learning from them so robots can act on them.

On the rendering side, I build on data-driven texture rendering to generate haptic signals from language and video. I also build authoring tools that let people paint feelable textures onto 3D content and touch scanned scenes. The aim is to make tactile experience something people can describe, edit, and share, not just record.

In teleoperation, I estimate contact state at the robot gripper, including normal force, sliding velocity, and surface texture. I render that state back to the operator through a vibrotactile glove, so they feel what the gripper feels and can control it more precisely.

These two lines meet in my current work on tactile representations for manipulation. I train temporal encoders on vision-based tactile, force, and vibration data, supervised by perceptual rendering: a representation is judged by whether it can reproduce what a person would feel. My hypothesis is that this captures the temporal structure of contact that frame-level tactile self-supervised learning misses, such as slip onset, stick-slip, and texture during sliding. If so, one representation can drive both haptic feedback and slip-anticipating manipulation. To scale the approach, I pair real sensor data with measured materials in simulation, so the same contact can be replayed and generated across sim and real.

My long-term goal is touch as a programmable medium: a shared representation that lets robots perceive by feel and lets people author, transmit, and experience touch. The applications span teleoperation, design, accessibility, and embodied AI.
