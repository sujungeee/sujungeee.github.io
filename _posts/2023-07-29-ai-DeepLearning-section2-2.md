---
title: "[딥러닝] 섹션2-2: CNN 표준 모델"
author: sujungeee
date: 2023-07-29 12:59:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, CNN, 이미지 추출]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  ILSVRC 대회와 표준 CNN 모델들

- ILSVRC: Image Classification rudwls eoghl

  - 1000 개의 카테고리, 120 만장의 training images, 5 만장의 validation images, 15 만장의 testing images

  - 대회 성능 측정 방식

    - Top-1: 1000 개의 Softmax 예측값 중에 가장 확신의 정도가 큰 1 개의 값이 정답과 일치하는 지를 비교
    - Top-5: 1000 개의 Softmax 예측값 중에 가장 확신의 정도가 큰 5 개의 값에 정답이 포함되어 있는지를 비교

  - 표준 CNN 모델

    : ILSVRC 대회에서 우승을 하거나 준우승을 차지한 모델들

    - AlexNet(2012)
    - VGGNet(2014)
    - GoogLeNet(Inception v1)(2014)

    ⇒ tf.keras.applications API 에서 여러 표준 CNN 모델을 제공하고 있음

    : 사이즈, 파라미터, Depth 등이 포함된 Pre-Trained 모델

  - 표준 CNN 모델들의 학습의 필요성

    - 표준 CNN 모델은 컴퓨터 비전 등 응용 분야 문제의 해결을 위한 Backbone 으로 사용됨
    - Backbone 을 어떤 모델을 선택하느냐에 따라 모델의 성능이 달라질 수 있음



#### ✅  AlexNet

- 핵심 아이디어: GPU 를 이용한 Deep Convolutional Neural Networks 를 이용해서 Image Classification 을 수행

  - Computing Power 향상
  - 모델을 트레이닝할 수 있는 이미지 데이터셋 확보

- Model Architecture

  - input: 평균값을 뺀 227X227 크기의 RGB 이미지
  - output: 1000 개의 Label 에 대한 확률

- 새로운 기법

  - ReLU Non-Linearity

    - 오버피팅을 방지하고 학습 속도가 훨씬 빨라짐
    - 기존 시그모이드, 쌍곡 탄젠트 activation function 보다 약 6배가 더 빠름

  - Multiple-GPU: 2개의 GPU 를 사용

  - Local Response Normalization

    : 강한 뉴런이 약한 뉴런의 값을 막는 현상을 억제함

    - 자기 앞뒤의 feature map 을 이용해서 Normalization
    - top-1 과 top-5 의 에러율을 각각 1.4%, 1.2% 줄임

  - Overlapping Pooling

    - 기존에는 stride 와 filter size 의 크기를 같게 하여 pooling 할 때 overlapping 이 일어나지 않게 사용함
    - 하지만, 이 논문에서는 s= 2, z= 3 을 사용하여 pooling 을 overlapping 함
    - top-1 과 top-5 의 에러율을 각각 0.4%, 0.3% 줄임

- 오버피팅 방지 기법

  - Data Augmentation

    - 이미지 개수 증가

      → 원본 이미지와 좌우 반전된 이미지의 크기인 256X256 에서 224X224 사이즈의 패치를 랜덤하게 추출

      → 테스트는 224X224 사이즈의 원본 이미지와 좌우 반전된 이미지에서 5개를 추출한 후 softmax 의 평균을 내어 추측

    - 이미지 RGB 값 변화: PCA 를 통해 테스트 이미지의 RGB 채널 강도를 변화시키는 augmentation 진행

  - Dropout: Fully Connected Layer 부분의 오버피팅을 방지(위 참고)

- 학습된 필터들

  - GPU1: 컬러와 상관없는 커널, shape 정보와 관련되어 있음
  - GPU2: 컬러와 관련있는 커널

- 성능: p. 15 참고

- AlexNet 의 의의

  - 딥러닝 기반 컴퓨터 비전 기법의 시작과 딥러닝의 붐을 일으킨 기념비적인 모델
  - 초기 모델이다 보니 개선할 부분은 많이 존재



#### ✅  VGGNet

- 핵심 아이디어: Filter Size 가 3 인 Convolution 을 이용한 Deep CNNs 를 제안

  - 11-19 의 depth 를 고안하면서 depth 가 성능에 중요한 영향을 끼치는 것을 증명

    : Convolution Filter Size 가 크면 depth 를 늘리는데 한계가 있기 때문(성능 때문인가?)

  - GoogLeNet-Inception v1- 에 비해 훨씬 간단한 구조로 준우승임에도 널리 사용됨

- Model Architecture

  - 6개의 타입: A, A-LRN, B, C, D, E
  - D, E 타입을 많이 씀
  - conv1: 픽셀 단위이므로 특징 추출이 잘 안됨
    - 사용하는 목적
      1. Dimension Reduction
      2. Conv → ReLU: 모델의 Non-Linearity 를 증가시킴

- Experiment Result

  - 깊이가 깊을수록 성능이 좋아짐
  - Local Response Normalization(LRN) 은 성능에 별 영향을 주지 못해서 제거함
  - 1X1 Conv Layer 은 모델의 Non-Linearity 를 증가시킴 → 성능 향상

- VGGNet 의 의의

  - 간결하면서도 강력한 딥러닝 구조를 제안함
  - 작은 필터 사이즈(e.g. 3X3) 도 깊게 쌓으면 충분히 효율적인 특징 추출이 가능함을 입증함



#### ✅ GoogLeNet(Inception V1)  

- 핵심 아이디어: AlexNet 에 비해 12배나 적은 파라미터로 더욱 좋은 성능을 보임

  ⇒ Inception v1 모델을 제안

  - 최대한 파라미터를 줄이면서 네트워크를 깊고 넓게 디자인하고자 함
  - 연결은 sparse 하게, 연산은 dense 하게(dummy 연산으로 인한 낭비가 없도록)

- Model Architecture

  - Stem Layer: 기존 conv, pooling layer

  - Inception Modules

    - Naive Version

      : 4개의 연산을 병렬적으로 수행한 뒤 Concatenate 로 합침

      → 4개의 연산 결과인 Feature Map 의 크기가 다 다르기 때문에 zero padding 의 값으로 사이즈를 통일시켜 주어야 함

      → output: 3차원 filter concatenate

    - Dimension Reduction Version

      : 1X1 Convolution 을 이용해서 Dimension Reduction 을 수행해서 연산량을 축소함

      > 1X1 Convolution 의 장점
      >
      > 1. Demension Reduction
      > 2. More ReLU(More Non-Linearity)

  - Auxiliary Classifiers

    - 레이어가 깊어지면서(22 depth) Vanishing Gradient Problem 을 방지하고자 Auxiliary Classifier 를 추가
    - 해당 Auxiliary Classifier 들과 Output Classifier 를 합산하여 back propagation 수행
    - Test 시에는 이를 사용하지 않음

  - Output Classifier

> Average Pooling
>
> : Feature Map 하나 당 하나의 스칼라 값
>
> - 장점
>   - 학습해야 할 파라미터 개수가 줄어듦에 따라 오버피팅의 가능성이 낮아짐
>   - Spatial 정보의 평균을 취하므로 Input 의 translation 에 강함

- Experiment Result

  - 대회에서는 GoogLeNet 7개를 앙상블 러닝하여 제출

  - Data Augmentation 을 광범위하게 적용

    : 한 이미지 당 144(4X3X6X2) 개의 크롭 이미지 사용

- GoogLeNet(Inception v1) 의 의의

  - 적은 파라미터 수로도 높은 성능을 발휘하는 Inception Module 이라는 창의적인 딥러닝 구조를 제안함
  - 마지막 Feature Map 에서 활용할 수 있는 Global Average Pooling 기법을 제안함
