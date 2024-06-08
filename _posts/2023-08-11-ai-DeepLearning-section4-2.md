---
title: "[딥러닝] 섹션4-2: RNN 모델"
author: sujungeee
date: 2023-08-11 21:26:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, RNN
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  Bidirectional RNN

- Bidirectional RNN

  : 이전 time-step 의 상태 뿐만 아니라, 다음 time-step 의 상태까지 고려하는 확장된 RNNs

  ⇒ 즉, 이전 정보와 이후 정보를 모두 저장할 수 있음

  - 특징

    - Hidden Layer 가 2개(Forward, Backward)
    - 모든 RNN 에서 활용 가능

    ```python
    model= tf.keras.Sequential([
    				tf.keras.layers.Embedding(encoder.vocab_size, 64),
    			  tf.keras.layers.Bidirectonal(tf.keras.layers.LSTM(64)),
    				tf.keras.layers.Dense(64, activation= 'relu'),
    				tf.keras.layers.Dense(1)
    		])
    ```

    



#### ✅  RNN 의 다양한 구성 형태- one to one, one to many, many to one, many to many

: 시계열 time step 을 어느 형태로 묶을 것인지에 따라 다양한 형태로 RNN 구조를 만들 수 있음

- one-to-one: 1 개의 인풋을 받아서 1 개의 아웃풋을 출력

  ex) Char-RNN

  one: ‘h’

  one: ‘e’

- one-to-many: 1 개의 time-step 의 인풋을 받아서 여러 개의 time-step 의 아웃풋을 출력

  ex) Image-Captioning

  one: image

  many: 이미지에 대한 여러 설명 문장들

- many-to-one: 여러 개의 time-step 의 인풋을 받아서 1 개의 time-step 의 아웃풋을 출력

  ex) Sentiment Classification

  many: 여러 개의 문장 데이터

  one: 감정 상태 중 하나(긍정, 부정, …)

- many-to-many: 여러 개의 time-step 의 인풋을 받아서 여러 개의 time-step 의 아웃풋을 출력

  - Seq2Seq

    - 인풋 데이터의 특징을 인코딩한 뒤 이를 순차적으로 디코딩
    - 시간 축이 약간 엇갈려 있음

    ex) Machine Translation

    many 1: 여러 한국어 문장들

    many 2: 번역된 여러 영어 문장들

  - !(Seq2Seq)

    - 동일한 시간 축 내에서 수행

    ex) Video Classification

    many 1: Video Frame

    many 2: Classifications’ Output



#### ✅  IMDB Movie Review 데이터셋에 대한 RNN 을 이용한 Sentiment Classification

Sentiment Classification: many to one(sequence of words → sentiment) 형태의 RNN

→ Binary(긍정/부정) 형태
