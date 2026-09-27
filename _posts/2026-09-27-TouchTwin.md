---
title: "TouchTwin: Human–AI Haptic Authoring for 3D-Scanned Tabletop Scenes through Language and Touch"
layout: post
categories: projects
---

![TouchTwin: capture, reconstruct, auto-propose, correct by language, feel](/img/TouchTwin_teaser.jpg)

**Under review, 2026** · [Video](https://youtu.be/xTslWM09Zl8)

TouchTwin turns a 30-second phone video of a tabletop into a touchable twin. AI drafts the material regions, and you feel them with a haptic stylus and fix what feels wrong by typing what your hand tells you.



{% include embed.html url="https://www.youtube.com/embed/xTslWM09Zl8" %}

## Abstract

Creating haptic experiences from real-world environments remains difficult. Visual scans capture appearance but not material feel, while manual haptic authoring requires specialized expertise. We present TouchTwin, a human–AI approach that turns phone scans of tabletop scenes into editable haptic scenes through a propose–feel–revise workflow. AI proposes named material regions that users experience through touch and revise using language and spatial edits; a model grounded in measured tool–surface interactions converts material descriptions into haptic responses. In a study with 12 participants and physical reference objects present, automatic drafts scored 5.4/7 as useful starting points despite only 4.0/7 realism. After a median of 6.6 minutes of editing, realism increased to 5.6/7, and material-family accuracy from 52% to 92%. Participants also used the same workflow to author material feels without a physical reference. Our findings show how imperfect AI predictions can support haptic authoring when users can experience and directly revise their perceptual consequences.

## Propose–Feel–Revise

A vision model can guess that a surface is "oak wood", but it cannot see that the surface is actually soft velvet. Compliance is invisible to a camera and obvious to a hand. TouchTwin therefore treats automatic material recognition as the *start* of an interaction rather than a final answer.

The unit that both the AI and the user work on is a **named material layer**: a mesh region, a natural-language description, and the haptic models generated from that description. The system proposes a stack of layers, and the user feels them and revises them with three operations:

- **Relabel:** type a new material name or description ("cardboard", "gritty but cushioned") and the layer's haptics regenerate live.
- **Region repair:** a SAM-assisted selector grows or shrinks a layer's boundary from a few seed clicks.
- **Add / delete:** create a new layer for a region the system missed, or remove one.

AI proposals and user corrections go through the same text-to-haptics path. That means a user fixes a box that feels wrong by typing "cardboard" instead of tuning friction coefficients or vibration spectra.

![TouchTwin system pipeline](/img/TouchTwin_pipeline.jpg)

## Implementation

- **Reconstruct.** VGGT recovers camera poses and a point cloud from the phone video, and diffusion-based depth completion fills in missing depth. TSDF fusion then builds a mesh, which is cleaned so the haptic proxy never falls through holes or snags on fragments.
- **Propose.** SAM 2.1 masks are lifted onto the mesh by multi-view voting, and Qwen2.5-VL names the material of each region.
- **Generate.** Each description is turned into sliding-vibration and tapping models by our [language-guided texture model]({% post_url 2026-02-08-Paper-2026017722 %}), which is grounded in 100 measured materials.
- **Feel.** A hybrid renderer uses a Phantom Touch for 1 kHz force feedback (contact, friction, taps) and a voice-coil actuator at the stylus tip for sliding texture. Regenerated models are swapped in atomically, so edits take effect without restarting the scene.

## Evaluation

In a within-subjects study, 12 participants corrected automatic drafts of two scenes with the physical objects on the desk for comparison, then authored a third scene freely from an empty canvas.

- **Drafts are useful even when they are wrong.** Participants rated the automatic drafts only 4.0/7 for realism, but 5.4/7 as a useful starting point.
- **Brief revision improves perceived realism.** After a median of 6.6 minutes of editing, realism rose from 4.0 to 5.6/7 (paired *t*(11) = 7.48, *p* < .0001, *d<sub>z</sub>* = 2.16). 21 of 24 participant–scene pairs improved and none got worse.
- **Revision improves category fidelity.** Area-weighted material-family accuracy, computed from the saved layers, rose from 52% to 92%. Distance to the specific physical specimen did not reliably shrink, however. Users make each surface feel like the right *kind* of material, not an exact copy of that particular sample.
- **Language is the main editing tool.** In 14 of 24 trials participants only relabeled. 91% of final labels were multi-word, and most used vocabulary outside the 100 library names.
- **Different goals call for different amounts of AI initiative.** Participants valued the draft when replicating a real scene. For creative authoring, 9 of 12 preferred starting from scratch. The system scored 76.5 on the System Usability Scale.

## Contribution

- A **propose–feel–revise** interaction model for human–AI haptic authoring.
- **TouchTwin**, an end-to-end system that turns a casual phone scan into an editable, touchable haptic scene.
- Empirical evidence that people can improve imperfect automatic haptic drafts through brief semantic and spatial edits. The results also give design implications: align the AI's output with the user's unit of correction, ground open-ended input in measured experience, and evaluate both perceived quality and physical fidelity.

## Related Links

- [Video](https://youtu.be/xTslWM09Zl8)
- [Language-Guided Multimodal Texture Authoring (IEEE Haptics Symposium 2026)]({% post_url 2026-02-08-Paper-2026017722 %})
