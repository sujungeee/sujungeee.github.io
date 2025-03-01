---
title: "[딥러닝] 섹션6: Text Detection"
author: sujungeee
date: 2023-08-15 23:41:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, Text Detection, EAST, CRAFT]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  Text Detection 문제 영역 소개

- Text Detection: 이미지 내에 텍스트가 존재하는 영역의 위치 정보를 Bounding Box 로 찾는 문제 영역

  - rotation angle 까지 고려하여 detection

  - Bounding Box 모양이 정사각형으로 한정되지 않음

    (Object Detection 은 Bounding Box 모양이 정사각형)



#### ✅  EAST(Efficient and Accuracy Scene Text detector)

- EAST 의 구조

  - Stem Layer(Feature extractor stem)

    : 원본 텍스트가 포함된 이미지 내에서 어떤 특징이 추출된 feature map 을 만들어주는 레이어

  - Merging Branch

    : 작은 글자, 큰 글자를 모두 잘 찾을 수 있도록 feature 를 merging 하여 합성된 feature map 을 만들어주는 레이어

    ⇒ 작은 크기의 feature map + 큰 크기의 feature map

    ⇒ 다양한 feature map 의 크기가 전부 합산된 feature map 형태가 feature-merging branch 에 들어오게됨(최상단)

  - Output Layer

    : 두 가지 type(RBOX, QUAD) 중 하나을 택하여 score map 의 prediction 을 진행

    > score map
    >
    > :  text 가 있는 영역에 대한 확신의 정도를 나타내는 binary mask map 을 예측

    - RBOX

      : 밑 5개의 dimension vector 로 text 의 영역을 detection

      → 사각형의 상하좌우 distance 값을 가지고 있는 color channel map 을 4개 만듦 + rotation angle

    - QUAD

      → 상하좌우 꼭짓점 각각의 x, y 좌표에 대한 차이 distance 를 만들어서

      → 8개 channel 로 text 의 영역을 detection

- Loss Function

  > L = L_s + λ_g*L_g

  - L_s(score map 에 대한 Loss Function)

    : 정답 binary mask map 과 prediction mask map 의 차이를 계산

  - L_g(geometry 에 대한 Loss Function)

    : RBOX 혹은 QUAD 방식의 정답과 prediction 값의 차이를 계산

    > 정답 bounding box 와 prediction bounding box 의 손실 함수를 바로 계산: scale 에 대한 가중치가 같게 곱하여짐
    >
    > ⇒ 같은 오차 값이어도 데이터셋의 크기에 따라 loss 비율이 다름을 고려하지 않음

    - Intersection over Union(IoU) Metric

      : 두 개의 bounding box 간의 겹치는 정도를 0-1 (Normalization) 로 표현

    - rotation angle 의 정답과 prediction 값의 차이(손실 함수)를 계산

  - λ_g= 1 로 지정

    : L_s 와 L_g 의 coefficient 를 같게 하여 동일한 가중치를 적용

- Balanced Cross-Entropy

  : 일반 크로스 엔트로피 함수 앞에 β 를 coefficient 로 두어 곱함

  > ⇒ negative example 이 많아지면 학습이 제대로 이루어지지 않음
  >
  > ⇒ positive / negative example 의 보정을 위함
  >
  > - negative example: 한 장의 이미지 내에서 정답이 포함되지 않은 prediction 결과가 종종 생길 경우
  > - positive example: 한 장의 이미지 내에서 정답이 포함된 bounding box prediction 값이 종종 생길 경우

  - 수식

    - 분자: 해당 sample 타입(positive: 작은 값, negative: 큰 값)

      → positive example 의 경우 1-(작은 값) 이므로 가중치가 크게 적용

      → negative example 의 경우 1-(큰 값) 이므로 가중치가 작게 적용

    - 분모: 전체 sample

- Precision, Recall, F1

  - Precision: 정밀도는 검색된 결과들 중 관련 있는 것으로 분류된 결과물의 비율
  - Recall: 재현율은 관련 있는 것으로 분류된 항목들 중 실제 검색된 항목들의 비율
  - F1: Precision 과 Recall 을 한 번에 확인할 수 있는 Metric



#### ✅  CRAFT(Character Region Awareness For Text detection)

- CRAFT

  : 유연한 형태의 Bounding Box 로 Text 를 Detection 하는 모델

  - 구성(output layer)

    - Region Score: localize individual character

      → 단어, 문장 단위가 아닌 문자 단위로 text detection

    - Affinity Score: group each character into a single instance

      → detection 된 문자들을 의미가 존재하는 단어, 문장의 단위로 묶음

    ⇒ 2 번의 prediction
