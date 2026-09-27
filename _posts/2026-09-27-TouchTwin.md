---
title: "TouchTwin: Human–AI Haptic Authoring for 3D-Scanned Tabletop Scenes through Language and Touch"
layout: post
categories: projects
---

![TouchTwin: capture, reconstruct, auto-propose, correct by language, feel](/img/TouchTwin_teaser.jpg)

**Submitted to CHI 2027** · [Video](https://youtu.be/xTslWM09Zl8)

TouchTwin turns a 30-second phone video of a tabletop into a touchable twin. AI drafts the material regions, and you feel them with a haptic stylus and fix what feels wrong by typing what your hand tells you.



{% include embed.html url="https://www.youtube.com/embed/xTslWM09Zl8" %}

## Overview

A phone video can capture how a scene looks, but not how it feels. Making a scanned scene touchable usually means assigning friction, stiffness, and vibration to every surface by hand, which takes haptics expertise most people don't have. Letting a vision model guess the materials is faster, but its mistakes are obvious to the touch: a cardboard box that feels like wood is still wrong.

TouchTwin treats the AI's guess as a draft rather than a final answer. The system proposes named material regions, and the user feels them with a haptic stylus while the real objects sit on the desk for comparison. Anything that feels wrong is fixed by renaming the region or repainting its boundary, and every edit regenerates the haptics live.

![The operator explores the twin with the stylus while the renderer tracks the contact point](/img/TouchTwin_operator.jpg)

*Left: the operator explores the touchable twin with the stylus. Right: the renderer's view of the same moment.*

## Propose–Feel–Revise

A vision model can guess that a surface is "oak wood", but it cannot see that the surface is actually soft velvet. Compliance is invisible to a camera and obvious to a hand.

The unit that both the AI and the user work on is a **named material layer**: a mesh region, a natural-language description, and the haptic models generated from that description. The system proposes a stack of layers, and the user feels them and revises them with three operations:

- **Relabel:** type a new material name or description ("cardboard", "gritty but cushioned") and the layer's haptics regenerate live.
- **Region repair:** a SAM-assisted selector grows or shrinks a layer's boundary from a few seed clicks.
- **Add / delete:** create a new layer for a region the system missed, or remove one.

AI proposals and user corrections go through the same text-to-haptics path. That means a user fixes a box that feels wrong by typing "cardboard" instead of tuning friction coefficients or vibration spectra.

## How It Works

![TouchTwin system pipeline](/img/TouchTwin_pipeline.jpg)

- **Reconstruct.** VGGT recovers camera poses and a point cloud from the phone video, and diffusion-based depth completion fills in missing depth. TSDF fusion then builds a mesh, which is cleaned so the haptic proxy never falls through holes or snags on fragments.
- **Propose.** SAM 2.1 masks are lifted onto the mesh by multi-view voting, and Qwen2.5-VL names the material of each region.
- **Generate.** Each description is turned into sliding-vibration and tapping models by our [language-guided texture model]({% post_url 2026-02-08-Paper-2026017722 %}), which is grounded in 100 measured materials.
- **Feel.** A hybrid renderer uses a Phantom Touch for 1 kHz force feedback (contact, friction, taps) and a voice-coil actuator at the stylus tip for sliding texture. Regenerated models are swapped in atomically, so edits take effect without restarting the scene.

![A voice-coil actuator mounted at the tip of the force-feedback stylus](/img/TouchTwin_stylus.jpg)

## Results

We tested TouchTwin with 12 people, most with little or no haptics experience. Each corrected the automatic drafts of two real scenes with the physical objects on the desk, then built a third scene freely from an empty canvas.

- **Useful even when wrong.** People rated the automatic drafts only 4.0/7 for realism, but 5.4/7 as a useful starting point.
- **Quick fixes.** After a median of 6.6 minutes of editing per scene, realism rose from 4.0 to 5.6 out of 7, and no scene was rated worse after editing.
- **The right kind of material.** Scored from the saved scenes, material-family accuracy rose from 52% to 92%. Edits made each surface feel like the right *kind* of material, though not like an exact copy of the particular sample on the desk.
- **Language did most of the work.** In 14 of 24 scenes, people only renamed materials. Most final names were multi-word descriptions that went beyond the 100-material library.
- **Different goals, different amounts of AI.** People valued the AI draft when replicating a real scene, but 9 of 12 preferred starting from scratch when creating something new.

## Beyond the Desk

![An antique typewriter from stock footage, and its hand-finished touchable twin](/img/TouchTwin_wild.jpg)

As a demonstration outside the study, the same pipeline also works on casual videos shot elsewhere. Here, stock footage of an antique typewriter on display becomes a twin that anyone can touch, even though visitors can't touch the real one.

## Related Links

- [Video](https://youtu.be/xTslWM09Zl8)
- [Language-Guided Multimodal Texture Authoring (IEEE Haptics Symposium 2026)]({% post_url 2026-02-08-Paper-2026017722 %}), the text-to-haptics model TouchTwin builds on
