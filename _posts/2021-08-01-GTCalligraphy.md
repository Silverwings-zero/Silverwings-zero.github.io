---
title: "Enhancing Calligraphy Generation with Stroke Number Optimization"
layout: post
categories: projects
---

![Project Illustration](/img/Calligraphy.png)  <!-- Replace with an actual image from the project if available -->




## Overview

Building upon the previous work presented in the research paper titled "Learning to Write Stylized Chinese Characters by Reading a Handful of Examples" (link to the [original paper](https://arxiv.org/pdf/1911.08002.pdf)), this project takes a another step forward in improving the quality of generated calligraphy writing. By quantifying stroke curvature, we adjust the number of parameters(control points) in the Chebyshev Polynomial (In the Prior work, three control points were generated uniformly, without utilizing the prior information of the stroke complexity), from there we see a notable enhancement in the generated character skeleton of the calligraphy, which more closely resembles the original character. 

Additionally, few upgrades has been made to the brush model. In the original paper, the brush stroke was modeled through given heuristics such as depth of the brush, drag, orientation... To explicitly model the brush stroke and make it more realisitic, I added a parameter of brush deformation to model how different hardness of the brush hair can effect the width of the stroke. Which makes the brush stroke more realistic. 


## Contribution

The primary Contribution of this extended project include:
- Optimizing the PseudoSpectral Control method by varying the number of parameters based on the stroke complexity of each character.
- Achieving More complex Virtual Modeling of brush behavior to simulate virtual characters of higher resemblance to the original 


## Results

The results showcase a remarkable improvement in the quality of generated calligraphy writing, making a compelling case for the importance of stroke number optimization in enhancing calligraphy generation models, underscoring the potential of this method in contributing to the broader field of stylized character generation.

![Calligraphy Eval](/img/Calligraphy.png) 

## Future Work

The success of this project opens up avenues for further research in dynamically adjusting model parameters based on intrinsic character attributes, which could be a game-changer in the domain of automated stylized writing generation.

## Related Links

- [Original Research Paper](https://arxiv.org/pdf/1911.08002.pdf)
