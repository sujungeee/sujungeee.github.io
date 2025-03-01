---
title: "[딥러닝] 섹션1-2: 텐서플로/컴퓨터비전 기초"
author: sujungeee
date: 2023-07-19 09:39:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  다양한 컴퓨터비전 문제영역 소개

> 컴퓨터 비전: 컴퓨터가 인간의 시각 기능을 모방할 수 있는 방법을 연구하는 연구 분야

- 컴퓨터 비전 문제 영역에 기반한 AI 기술의 응용 분야
  - Retail / Commerce: AI 와 컴퓨터 비전 기술을 이용해서 리테일 / 커머스 분야에 혁신을 일으킬 수 있음
  - Autopilot: AI 와 컴퓨터 비전 기술을 이용해서 자율주행을 수행할 수 있음
  - AI Solution: 기존 기술로 수행할 수 없던 도전적인 문제 영역을 AI 와 컴퓨터 비전 기술을 이용해서 해결할 수 있음
  - Business Intelligence: AI 와 컴퓨터 비전 기술을 이용해서 더욱 효율적인 비즈니스 전략을 구축할 수 있음



#### ✅  TensorFlow 2.0 소개

- TensorFlow 의 장점

  - 손쉬운 딥러닝 모델 구현을 가능하게 하는 Python API 제공
  - Mobile Device 로부터 멀티 GPU 클러스터까지 지원하는 폭넓은 Portability
  - 강력한 시각화를 지원하는 TensorBoard 제공
  - 전세계적으로 폭넓은 사용자 Community
  - Google 의 강력한 지원과 발빠른 신기능 업데이트

- TensorFlow 2.0

  - tf.Session 삭제 & Eager Execution 이 기본적으로 적용됨

  - tf.placeholder 삭제

  - 전역적으로 처리되던 부분이 삭제 → tf.global_variable_initializer() 삭제

  - Function 을 이용한 Programming 장려

  - Keras API 강화

    : 딥러닝 라이브러리의 백엔드를 추상화하고, 이를 손쉽게 high level API 로 구현



#### ✅  TensorFlow 2.0 케라스 서브클래싱(Keras Subclassing)

- Beginner Style
  - Sequential API 를 사용
  - 손실 함수 & 최적화 정의를 Sequential 로 구현한 model 에 compile() 메소드 사용
  - 장점: 간결하고 편함
  - 단점: 알고리즘의 디테일한 부분은 직접 컨트롤이 어려움
- Expert Style
  - Keras Subclassing 방식을 이용해서 tf.keras.model 을 상속 받는 MyModel 클래스를 생성
    - 생성자: 모델 구조 정의를 위한 연산들을 tf.keras.layers API 를 이용해서 정의
    - 호출부: 인자 값으로 인풋 데이터를 받고, 생성자 부분에서 정의한 연산들을 통해서 모델의 아웃풋을 계산한 다음 반환
  - 해당 방식을 권장*
  - 장점: 알고리즘의 디테일한 부분을 컨트롤할 수 있음
  - 단점: 복잡한 코드 구조를 직접 작성해야 함



#### ✅  다층 퍼셉트론 MLP

- 퍼셉트론: 가중치를 기반으로 한 의사 결정 모델

  - 퍼셉트론 속성

    - x: 의사 결정 고려 사항
    - w: 인풋 x 의 중요도
    - b: 바이어스
    - 활성 함수: 0과 1 의 바이너리 결과를 출력, 계단 함수 형태

  - 퍼셉트론의 한계

    - 단순한 선형분류기에 불과

    - XOR 문제를 해결할 수 없음

      → 결정 직선을 특정지을 수 없기 때문

- 다층 퍼셉트론 MLP = ANN

  - MLP 의 구조: 입력층 / 출력층 / + 은닉층

  - MLP 의 특징 및 장점

    - XOR 문제에서 결정 직선을 2개를 그어서 분류를 할 수 있음

    - 0 과 1 이 아닌 비선형적인 특징을 학습함

    - 활성함수

      → 시그모이드

      → 쌍곡 탄젠트

      → **ReLU**: 현재 주로 쓰이는 함수, Vanishing Gradient Problem 이 발생할 가능성이 낮음

    - 은닉층을 깊게 여러 번 쌓아 올리면 DNN 구조가 되며

      → 이를 곧 딥러닝 기법이라고 함



#### ✅  오토인코더(AutoEncoder) 의 개념

- 오토인코더

  : 비지도 학습을 위한 인공신경망 구조 중 하나

  - 특징
    - 데이터의 숨겨진 구조를 발견하는 것이 목표
    - 입력층의 노드 개수와 출력층의 노드 개수가 동일
    - 은닉층의 노드 개수는 입력층, 출력층의 노드 개수보다 적음
  - 은닉층의 출력 값
    - 원본 데이터에서 불필요한 특징들을 제거한 압축된 특징
    - 은닉층의 출력값은 분류기의 입력으로 사용됨