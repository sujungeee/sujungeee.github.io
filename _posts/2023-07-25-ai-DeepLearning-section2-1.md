---
title: "[딥러닝] 섹션2-1: CNN 개념"
author: sujungeee
date: 2023-07-25 20:34:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, CNN, 이미지 추출]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  컴퓨터 비전 문제의 어려움과 CNN 기반 컴퓨터비전 시대의 도래

- Semantic Gap

  : 저차원적인 특징(pixel intensity) 에서 고차원적인 정보를 추출해야만 함

  - 저차원적인 특징
    - Encoding
    - Resolution
    - Color
    - Texture
  - 고차원적인 특징
    - Keyword
    - Category
    - Concept
    - Ontology

- Image Recognition’s Challenge

  - Illumination(밝기 변화): 배경과 object 영역 구분에 있어서 모호함을 유발(ex: 그림자)
  - Deformation(변형): object 는 다양한 자세(특징)를 가짐
  - Occlusion(가림): object 를 가리는 방해 요소가 존재
  - Background Clutter(배경 장애): 배경과 object 의 영역을 구분하기가 모호함
  - Intraclass variation: 같은 클래스라도 다양한 형태로 보임

- 기존의 Computer Vision Approach vs Deep Learning

  - Handcrafted Feature(기존의 Approach)

    - 사람이 직접(손으로) 특징들을 정제
    - 예외를 수용하지 못하는 경우 정확도가 떨어질 수 있음

  - End-To-End Learning(Deep Learning)

    - 딥러닝에 기반한 종단간 학습

    - 입력 및 출력 데이터 값을 제공하면 중간의 딥러닝 모델이 특징을 자동으로 학습

      → CNNs 은 해당 아이디어를 중심으로 개발됨



#### ✅  컨볼루션 신경망의 핵심 개념- 컨볼루션(Convolution), 풀링(Pooling)

- 컨볼루션 신경망(CNN)

  - 구성: 컨볼루션층, 풀링층(= 서브샘플링)
  - CNN 구조
    1. 컨볼루션 과정과 풀링 과정을 반복하여서 특징을 추출
    2. 풀링 과정을 거친 k 개의 커널의 각 특징 intensity 를 n 차원 벡터로 flattening
    3. flattening 한 결과를 ANN 의 은닉층으로 넘김
    4. 결과 값을 softmax regression 함수로 정제하여서 확신의 정도를 계산

- 컨볼루션층

  : 컨볼루션 연산을 통해서 이미지의 특징을 추출해내는 역할

  - 원본 이미지에 커널을 이용해서 컨볼루션을 수행하면 → 활성화 맵이 추출됨
  - 커널의 종류에 따라 다양한 맵 추출 가능
  - 최근 커널의 성분을 파라미터로 두어서 원하는 조건에 따라 최적의 커널을 만들어 내는 경향

- 풀링

  : 차원을 축소하는 연산을 수행

  - 종류: 최댓값 풀링, 평균값 풀링, 최솟값 풀링

    - 최댓값 풀링 사용: 이미지의 강한 특징만을 추출해낼 수 있음

      → edge detection 커널로 1차 특징 추출

      → 최댓값 풀링으로 2차 특징 추출

- 컨볼루션 및 풀링 과정의 연산

  : 강의 자료 p.9, 11 참조

  - Hyper Parameter: F, P, S, K
  - F: 필터의 크기
  - P(제로 패딩): 0의 성분을 채워줌
    - 좌우 함께 적용되므로 연산에서 2P 를 더해주어야 함
  - S(스트라이드): 컨볼루션 연산 시 건너뛰는 정도
  - K: 컨볼루션 커널 개수, 몇 개의 특징을 추출할 것인지 지정



#### ✅  드롭아웃(Dropout)

- Regularization 기법

  : 오버피팅을 방지할 수 있도록 만들어주는 기법

  - Regularization 기법의 종류: Dropout / Batch Normalization / Data Augmentation / …
  - Dropout(드롭아웃): 대표적인 Regularization 기법

- 드롭아웃

  : 학습 과정에서 일부 노드를 사용하지 않는 형태로 만들어서 오버피팅을 방지할 수 있도록 하는 기법

  - 유의할 점

    : Training Data 에 대해서는 드롭아웃을 수행하지만, Test Data 에 대해서는 드롭아웃을 수행하지 않음

  - tf.nn.dropout API

    : tf.nn.dropout(x, rate, noise_shape= none, seed= None, name= None)

    - x: 드롭하고 싶은 노드가 속한 layer

    - rate: 드롭하고 싶은 percentage 를 지정

      → 0.5: 50% 드롭



#### ✅  TensorFlow 2.0 을 이용한 CIFAR-10 이미지 분류를 위한 CNN 구현

- tf.squeeze API: 차원 요소 값이 1 인 dimension(dummy dimension) 을 삭제하는 API

  - ex) [1, 32, 33, 3] → [32, 33, 3]

- tf.expand_dims API: tf.squeeze 와 반대되는 API

  - ex) [10, 10, 3] → [1, 10, 10, 3]

  - tf.expand_dims API 를 쓰는 패턴

    : batch dimension 을 더미로 만들기 위해 해당 API 사용

    - training 할 때는 mini-batch 로 batch_size(50) 를 정하여 [50, 10, 10, 3]  의 Array 를 구성
    - test 를 할 때는 batch shuffle 이 없이 순차적으로 테스트를 진행
    - 따라서 batch 차원에서의 손실을 막기 위해 tf.expand_dims 로 더미 값을 생성