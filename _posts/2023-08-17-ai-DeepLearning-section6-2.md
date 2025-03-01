---
title: "[딥러닝] 섹션6-2: CRAFT, EAST 실습 진행"
author: sujungeee
date: 2023-08-17 10:30:00 +0800
categories: [인공지능, 딥러닝]
tags: [인공지능, AI, 딥러닝, 머신러닝, TensorFlow, Text Detection, EAST, CRAFT]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  실전 프로젝트 진행 방법 소개

- 딥러닝 학습의 5단계
  - 머신러닝/딥러닝의 기본 원리와 ANN, CNN, RNN, LSTM 등의 기초 모델을 학습하는 단계
  - TensorFlow/PyTorch 와 같은 머신러닝 라이브러리를 통해서 머신러닝 알고리즘을 구현하는 방법을 학습하는 단계
  - Toy Project 를 통해 응용 능력을 기르는 단계
  - 최신 논문을 읽고 직접 구현하는 단계
  - 최신 논문을 적용한 실무 프로젝트를 진행하는 단계
- 딥러닝을 이용한 실무 프로젝트 진행 방법
  - 데이터 수집
    - 공개 Dataset 정제
    - 직접 Labelling / 외주를 이용한 Labelling
  - 딥러닝 모델 구현
    - 논문 공개 구현체 사용
    - 직접 구현(by TensorFlow or PyTorch)
  - 딥러닝 모델 학습
    - 처음부터 학습(Learning from scratch)
    - Transfer Learning(Fine-Tuning)
  - 딥러닝 모델 배포
    - Local Prediction
    - Server-Client(직접 구성)
    - Server-Client(외부 플랫폼 사용- e.g. GCP AI Platform)
- 실전 프로젝트 진행 방법
  - 다양한 최신 딥러닝 모델들을 다양한 Custom Dataset 에 학습해보는 방법을 실습
  - 실전 프로젝트를 통한 응용 능력 배양



#### ✅  실습 진행 방식 소개

- 최신 논문 공개 구현체를 찾는 방법
  - State-of-the-Art(SOTA): 현재 시점에서 전세계에서 해당 문제 영역에서 가장 좋은 성능을 보여주는 모델
  - Papers with Code
- 최신 프로젝트 진행을 위해 필요한 능력
  - 기본적인 Python Programming 능력(변수 설정, if 문, for 문, 함수 정의, 클래스 정의)
  - 기본적인 Python 자료구조 숙지- list, tuple, dict 사용법
  - Python 에서 파일을 읽고 쓰는 능력(os, glob 등 라이브러리 활용법)
  - 기본적인 Numpy, Pandas 라이브러리 사용법



#### ✅  실습 환경 구성 안내

- 실습 환경 구성
  - 기초 예제(GPU 필요 X): MNIST, CIFAR-10, …
    - 로컬 환경 사용
    - Colab 사용
  - 실전 프로젝트 예제(GPU 필요 O): Custom Dataset
    - GPU 가 포함된 로컬 환경 사용
    - Colab 으로 여러 번에 나눠서 학습
    - 제공된 Pre-Trained 모델을 다운로드 받아서 실습
