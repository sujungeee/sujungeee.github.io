---
title: "[딥러닝] Yolo 논문 해설"
author: sujungeee
date: 2023-09-09 13:27:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, Object Detection, Yolo]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "YOLO 구현으로 배우는 딥러닝 논문 구현 with TensorFlow 2.0" 을 참고하여 작성하였습니다.



#### ✅  YOLO 논문 리뷰- Abstract

: YOLO(요약)

- a new approach to object detection
- by a regression problem → separated bounding boxes and associated class probabilities
- a single neural network(end-to-end) & in one evaluation
- extremely fast & real-time
- Fast YOLO
- outperformed other SOTA detection systems(DPM, R-CNN)
- general representations of objects(from natural images to other domains like artwork)



#### ✅  YOLO 논문 리뷰- Conclusion & Introduction

- Conclusion
  - a unified model for object detection
  - Fast YOLO- the fastest general-purpose object detection
  - the state-of-the-art in real-time object detection
  - fast, robust object detection
- Introduction
  - a single regression problem from image pixels to bounding box coordinates and class probabilities
  - Figure 1
    - A single convolutional network→ multiple bounding boxes, class probabilities
    - trains full images
    - directly optimizes detection performance
  - benefits
    - extremely fast: more than 150 fps, less than 25 milliseconds of latency, more than twice the mAP
    - reasons globally about the image when making predictions: larger context
    - generalizable representations of objects
  - lags behind in accuracy



#### ✅  YOLO 논문 리뷰- Unified Detection

[Methods]

- a single neural network → all bounding boxes, all classes
- structure
  - S X S grid
  - B bounding boxes(x, y, w, h, confidence)
  - confidence score
  - confidence
  - C Conditional class probabilities

Q. confidence score 와 confidence 는 다른건지?

: "confidence score"와 "confidence"는 다른 개념

1. Confidence Score (confidence scores for boxes)
   - 이 문서에서 "confidence scores"는 각 바운딩 박스(검출된 객체의 후보)에 대한 신뢰도를 나타내는 값.
   - 각 grid cell은 여러 개의 바운딩 박스(일반적으로 B개)를 예측. 각 바운딩 박스에 대해서는 모델이 얼마나 해당 박스에 객체가 있을 것으로 예측하는지를 나타내는 confidence scores가 존재.
   - Confidence scores는 `[0, 1]` 범위의 값이며, 높을수록 모델이 해당 박스에 실제 객체가 있을 것. 이 confidence scores는 `Pr(Object)`과 `IOUtruth`를 조합하여 계산됨
2. Confidence (Pr(Object))
   - "confidence"는 각 grid cell에서 객체(또는 물체)가 존재할 확률을 나타내는 값임. 이는 grid cell이 어떤 객체를 감지할 것으로 예측하는지에 대한 확률.
   - Confidence는 `[0, 1]` 범위의 값이며, 예측된 박스에 객체가 없을 때는 0, 객체가 있을 때는 1로 설정
   - Confidence 값은 모델이 각 grid cell이 실제 객체를 포함하는지 여부에 대한 예측을 나타내며, 이 값은 confidence scores 계산에 사용됨



#### ✅  YOLO 논문 리뷰- Network Design

: Implement- CNN, evaluate- PASCAL VOC Dataset

- 24 depth convolutional layers
- 2 depth fully connected layers
- Fast YOLO: 9 depth convolutional layers, fewer filters in those layers
  - 나머지 파라미터 값은 Fast YOLO 나 YOLO 나 똑같음
- 헷갈리는데 중요한 것 같은 문장 2개
  - Alternating 1X1 convolutional layers reduce the features space from preceding layers.
  - We pretrain the convolutional layers on the ImageNet classification task at half the resolution and then double the resolution for detection.



#### ✅  YOLO 논문 리뷰- Loss

- Training

  - add four convolutional layers, two fully connected layers

  - input resolution resize 448X448(fine-grained visual information)

  - final layer

    - predicts: class probabilities / bounding box coordinates

    - linear activation function

      ↔ other layers: leaky rectified linear activation function

- Loss(1)- sum-squared error

  - easy, but…

    - not align with mAP degrees
    - overpowering the gradient from cells that do contain objects

  - remedies

    - increase the loss from bounding box coordinate predictions
    - decrease the loss from confidence predictions for boxes that don’t contain objects

    ⇒ coefficient 를 각각 5, 0.5 로 조정: 실제 물체가 감지되는 bounding box 의 수치를 높여 중요성을 고려

  - conditions

    - bounding box 의 width 와 height 에 제곱근을 적용하여 단순히 차이 값만 고려하지 않음

- Loss(2)- modification & notation

  : 논문 4p 참조

  - the loss function only penalizes
    - classification error if an object is present in that grid cell
    - bounding box coordinate error if that predictor is “responsible” for the ground truth box



#### ✅  YOLO 논문 리뷰- Training

- dataset
  - training, validation: PASCAL VOC 2007, 2012
  - testing: VOC 2012(2007 년 것도 포함)
- 135 epoch(learning rate 에 따라)
  - 75 epoch: 10^(-2)
  - 30 epoch: 10^(-3)
  - 30 epoch: 10^(-4)
- how to avoid overfitting
  - dropout: 4096 의 connected layer 의 0.5 를 dropout
  - data augmentation
    - size: random scaling and translations (of up to 20% of the original image size)
    - color: exposure and saturation of image in the HSV color space
