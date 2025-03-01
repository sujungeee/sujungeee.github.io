---
title: "[딥러닝] Yolo 모델 개요"
author: sujungeee
date: 2023-08-31 11:31:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, 객체 탐지, 컴퓨터 비전, Object Detection]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "YOLO 구현으로 배우는 딥러닝 논문 구현 with TensorFlow 2.0" 을 참고하여 작성하였습니다.



#### ✅  YOLO 모델 리뷰

- YOLO

  : 이미지를 한 번만 보고 바로 Object Detection 수행

  - YOLO 모델의 기본 컨셉

    : 이미지를 SXS Grid Cell 로 나누고 Grid Cell 별로 B 개의 Bounding Box 를 예측

  - YOLO 모델의 최종 Output

    : S X S X (5*B + C)

    1. x: grid cell 내의 x 위치(0-1 사이의 값)
    2. y: grid cell 내의 y 위치(0-1 사이의 값)
    3. w: 전체 이미지 대비의 width(0-1 사이의 값)
    4. h: 전체 이미지 대비의 height(0-1 사이의 값)
    5. confidence: 이미지 내에 Object 가 있을 것이라고 확신하는 정도(0-1 사이의 값)

    - S: Grid Cell SXS

    - B: Bounding Box 의 개수

    - C: Class 개수

      → 각 Class 는 Softmax Regression 확신의 정도를 나타냄

  - 특징

    - 정확성은 낮지만
    - 속도(FPS) 는 향상

  > Bounding Box 개수: S X S X 2 개(의 20 dimension vector)
  >
  > → Non-Maximum Suppression
  >
  > → n 개의 Bounding Box 중 가장 대표성을 띄는 일부 Bounding Box 만 남겨짐



#### ✅  Non-Maximum Suppression(NMS)

- Non-Maximum Suppression

  : n 개의 Bounding Box 중 필요한 부분만 남기는 선별 과정에 관련된 알고리즘

  ⇒ 대부분의 Object Detection 알고리즘의 마지막 Processing 과정에서 사용됨

  - 동작 과정

    1. confidence ≤ 0.6 이하의 Bounding Box 를 제거(threshold 는 임의 지정)

    2. class 별로 confidence 가 가장 높은 Bounding Box 가 앞으로 오도록 전체 Bounding Box 를 내림차순 정렬

    3. 가장 confidence 가 높은 Bounding Box 와 나머지 Bounding Box 를 비교해서 2 개의 Bounding Box 의 IoU ≥ 0.5 라면 confidence 가 작은 Bounding Box 를 제거

       : confidence 가 큰 Bounding Box 가 confidence 가 작은 Bounding Box 를 포함하므로 대표성을 띄는 Bounding Box 만 남겨놓기

    4. 제거되지 않은 Bounding Box 중에서 confidence 가 가장 높은 Bounding Box 와 나머지 Bounding Box 간에 3번 과정을 반복

    5. 3,4 과정을 전체 Bounding Box 에 대해서 진행

       → score 가 0 이상인 Bounding Box 만을 남겨두어 draw

    6. 2,5 과정을 전체 class 에 대해서 진행



#### ✅  일반적인 딥러닝 논문 구성 및 논문 읽는 법

- Abstract: 논문의 전체적인 컨셉을 요약 설명

- Introduction: 논문의 아이디어 전개 방식 등에 대한 설명

- Method: 논문의 기법에 대한 설명

  - Model
  - Loss
  - Techniques: 새롭게 도입한 기술 설명

- Experiment: 논문의 기법의 성능에 대한 평가

  - SOTA: 현재 가장 좋은 성능이라고 평가 받는 모델

    e.g) 논문에서의 이 모델이 Experiment 하였을 때 SOTA 이다 → 라는 뉘앙스의 전개 방식

- Conclusion: 논문의 내용을 정리 및 향후 연구 방향 제시

⇒ 읽는 순서: Abstract, Conclusion → Introduction, Experiment → Method
