---
title: "[딥러닝] 섹션3-1: Pre-Trained CNN(1)"
author: sujungeee
date: 2023-08-02 17:01:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, CNN, 이미지 추출]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  tf.train.CheckpointManager API 를 이용해서 파라미터 저장하고 불러오기

- 파라미터를 저장하는 법

  - tf.train.Checkpoint 클래스의 인자 값: 저장하고자 하는 tf.keras.Model 인스턴스와 전역 반복 횟수를 지정하여 선언

    : ckpt= tf.train.Checkpoint(step= tf.Variable(0), model= CNN_model)

  - tf.train.CheckpointManager 의 인자 값: ckpt, 중간 파라미터를 저장할 폴더 경로(directory), max_to_keep(가장 최근에 몇 개의 파일을 저장해서 남겨놓을 지를 지정)

    : ckpt_manager= tf.train.CheckpointManager(ckpt, directory= SAVER_DIR, max_to_keep= 5)

  - tf.train.CheckpointManager 의 save 메소드의 인자 값: 파라미터를 저장하고자 하는 시점에 해당 시점의 전역 반복 횟수

    : ckpt_manager.save(checkpoint_numver= ckpt.step)

  - tf.train.Checkpoint 의 전역 반복 횟수 값(ckpt.step or tf.Variable(0)) 을 매 반복마다 1씩 증가

    : ckpt.step.assign_add(1)

- 파라미터를 불러오는 법

  : 불러오면 → 1. 이어서 학습 2. 바로 추론

  - tf.train.latest_checkpoint 의 인자 값: 파라미터가 저장된 폴더 경로

    : latest_ckpt= tf.train.latest_checkpoint(SAVER_DIR)

    → 가장 최근의 체크 포인트 파일의 경로(full path) 를 가져옴

  - 선언한 tf.train.CheckpointManager 의 restore 함수의 인자 값: 불러올 체크 포인트 파일의 경로

    : ckpt.restore(latest_ckpt)



#### ✅  텐서보드(TensorBoard) 를 이용해서 학습 과정 시각화(Visualization) 하기

- tf.summary 로그의 형태

  : TensorBoard 의 대표적인 3 가지 형태의 API

  - tf.summary.scalar: scalar 값 형태의 로그 저장
  - tf.summary.histogram: histogram 형태의 로그 저장
  - tf.summary.image: 이미지 형태의 로그 저장

- TensorBoard 를 사용하기 위한 2가지 과정

  1. 텐서보드 로그를 저장

  - 인자 값으로 텐서보드 로그 파일을 저장할 경로를 지정해서 File Writer 생성

    : summary_writer= tf.summary.create_file_writer(’./tensorboard_log’)

  - 요약 정보를 남기고 싶은 값을 Writer Scope 내에서 tf.summary.* API 로 추가

    : with summary_writer.as_default():

    tf.summary.scalar(’loss’, loss, step= optimizer.iterations)

  1. 텐서보드 실행 방법

  - 텐서보드를 실행하는 터미널 명령어

    : tensorboard --logdir= path\to\log-directory

  - 웹브라우저에서 텐서보드의 실행 결과를 확인

    : localhost:6006



#### ✅  ResNet

- 핵심 아이디어: Degradation Problem 을 해결하기 위한 residual block architecture 를 제안하고 이의 정당성을 실험적으로 입증함

- Degradation Problem

  : 더 깊은 레이어일수록 파라미터 수가 증가하기 때문에 optimization 이 제대로 수행되지 않는 문제

  - 레이어가 깊어질수록 성능이 떨어지는 현상이 관찰됨
  - 트레이닝 에러에 대해서도 발생하는 현상이어서 오버피팅 문제가 아님

- Residual Block Architecture(Identity Mapping)

  : input 의 shortcut 을 추가해서 최적화할 파라미터의 수를 줄임

  ⇒ 깊은 레이어임에도 불구하고 최적화할 파라미터 수가 줄기 때문에 성능이 개선됨

- ResNet 의 아이디어

  - 늘어난 차원만큼 zero-padding 을 적용

  - W_s 곱셈을 통해 차원 변경을 수행한 이후에 덧셈을 수행

    : y= F(x, {W_i}) + W_s*x

  ⇒ error rate 가 비슷하기 때문에 연산량이 적은 zero-padding 방법을 권장

> Deeper Bottleneck Architectures
>
> : 1X1 Convolution 을 이용해서 연산량을 줄인 디자인

- ResNet 의 의의

  - Identity Mapping 을 추가한 Shortcut 을 추가함으로써 Layer Depth 를 획기적으로 늘리는 창의적인 아이디어를 제안

  - 이후 100-depth 이상의 깊은 CNN 모델 시대를 여는 시초가 됨

  - Faster R-CNN 의 Backbone 을 VGG-16 에서 ResNet 으로 바꾸게 됨(?)

  - 1202 depth 는 110 depth 와 비교하였을 때 오히려 error rate 가 높게 나옴

    ⇒ 오버피팅의 문제가 아닐까 하는 open problem 을 남김



#### ✅  EfficientNet

- CNN 의 성능을 높일 수 있는 요소

  : 각 요소들의 scaling 에 집중

  - baseline CNN 모델을 선택
  - CNN 의 Width(필터의 개수) 를 늘림
  - CNN 의 Depth(레이어의 개수) 를 늘림
  - CNN 의 인풋 이미지의 Resolution(크기) 을 늘림

- Compound Scaling Method

  : Width, Depth, Resolution 의 세 요소를 조화롭게 scaling

  - 세 depth, width, resolution 을 적절히 설정하고, 𝜙 를 할당하면 𝜙 에 비례한 CNN 모델을 만들 수 있음
  - 𝜙 이 작으면→ EfficientNet-B0: 성능은 떨어지지만 속도는 향상
  - 𝜙 이 크면→ EfficientNet-B7: 성능은 향상되지만 속도는 떨어짐
  - 각각의 요소를 설정하는 것보다 세 요소를 compound 하여 설정하면 천천히 saturation 이 이뤄짐

- Model Architecture & Experiments

  : 실제 문제에 적용할 때 기존 모델에 비해 훨씬 효율적

  - 속도 향상
  - 정확도 향상

- EfficientNet 의 의의

  - 적은 수의 파라미터를 가지면서 좋은 성능을 보여주는 State-of-the-art(SOTA) CNN 모델을 제안
  - Depth, Width, Resolution 을 조화롭게 늘리는 Compound Scaling Method 를 제안
