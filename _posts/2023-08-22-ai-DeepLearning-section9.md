---
title: "[딥러닝] 섹션9: Optical Character Recognition"
author: sujungeee
date: 2023-08-22 16:32:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, OCR, Text Recognition]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅ OCR(Text Recognition) 문제 영역 소개

: 컴퓨터 비전 문제 영역 중 하나

- OCR(Optical Character Recognition)

  : Text Detection 이 수행된 Bounding Box 내에 존재하는 글자가 어떤 글자인지를 인식하는 문제 영역

  - Structed Text

    : document 에서의 OCR

  - Unstructed Text*

    : 차량 번호판 등 다양한 형태가 존재하는 곳에서의 OCR

    → 난이도가 더 높음

  - License Plate Recognition: Text Detection + OCR



#### ✅  Attention OCR

: OCR 을 위한 최신 딥러닝 기법

- Method: CNN + Attention + RNN

  - CNN-based feature extraction

    : input x(프랑스 거리 간판) 에서 CNN 으로 feature vector 를 추출

    - input x 를 4 가지 버전으로 augment 한 후 CNN 을 통해 feature vector 추출
    - 4 가지 결과를 concatenate(f)

  - RNN(Char-RNN)

    - Training: 인풋 데이터에서 글자를 하나 뒤로 민 타겟 데이터로 RNNs 를 학습
    - Input Data: 전체 문장 중 일정 길이의 글자들의 배열
    - Target Data: 전체 데이터 중 Input Data 를 한 글자 뒤로 민 배열

    ⇒ Attention: attention vector 에 대한 정보 값을 char-RNN 에서 같이 받음

  > Teacher Forcing
  >
  > : Training 시점에는 정답인 예측 결과가 존재하기 때문에 틀린 값으로 예측하여도 다음 시간 축의 인풋 값을 정답 예측 값으로 넣어줌
  >
  > → Test 시점 때는 원래대로 char-RNN 모델을 적용

  - Attention

    - Spatial Attention: 최신 딥러닝 모델에서 사용되는 모듈 중 하나

      ⇒ with offset vector

    - location aware

      : spatial attention + coordinates 좌표 자체에 대한 가중치

      - coordinates (i, j)

        : input image 의 x, y 포지션 자체가 중요한 경우에서의 가중치

        ex) input image 의 정가운데에 object

        → (x, y) 들 중 중간 값의 가중치를 i, j 로 mapping

      ⇒ 즉, 위치 정보의 중요성이 추가된 것



#### ✅  CRNN(Convolutional Recurrent Neural Networks)

: CNN(Convolutional Neural Network) + RNN(Recurrent Neural Network)

- 장점

  - 모두 neural network 로 구성되어 있어서 end-to-end 트레이닝이 가능
  - 임의의 길이의 글자들을 모두 처리할 수 있음
  - 성능이 좋음
  - 작은 모델 사이즈로 인해 inference 시간이 effective

- 아키텍처

  - convolutional layer

    : feature extraction vector 생성

    ⇒ VGG 기반 CNN

  - recurrent network layer(bidirectional LSTM)

    : **contextual information** 을 추가?

    ⇒ 앞뒤 정보에 대한 character context 를 넣어야 성능이 향상

  - transcription layer(CTC Loss Layer)

    : recurrent neural network 의 예측을 종합

- CTC Loss

  : dynamic programming 에 기반하여 NLP 처리를 하는데에 제안된 알고리즘

  - 필요한 이유: NonMaximum Supression 과 유사

    ⇒ S S S → S 로 뭉쳐줌

  - 동작 원리

    - blank 를 나타내는 특수 기호를 ‘-’ 로 삽입
    - blank 가 포함된 예측 결과에서는 repeated words 형태가 나옴
    - 중복되는 글자를 하나로 뭉치고, blank 기호를 제거

- 구현 시 유의할 점

  - 트레이닝 이미지 사이즈: 100 X 32
  - 테스팅 이미지의 height = 32로 고정해야 함
  - 테스팅 이미지의 width(가변 길이) 는 적어도 100 이어야 함



#### ✅  OCR 데이터셋 소개

: supervised learning → (input x, answer label y) 형태

1. COCO-Text

2. FSNS

   : attention-OCR 의 French Street Name

- 더 많은 OCR 오픈 데이터셋
