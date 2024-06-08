---
title: "[딥러닝] 섹션3-2: Pre-Trained CNN(2)"
author: sujungeee
date: 2023-08-04 13:35:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, CNN, 이미지 추출]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  Fine-Tuning(Transfer Learning) 의 개념

: 실무적인 상황에서 광범위하게 사용되는 기법

⇒ 이미 학습된 Neural Networks 의 파라미터를 새로운 Task 에 맞게 다시 미세조정

→ 어떤 Task 에서의 초기 파라미터 값을 랜덤으로 지정하지 않고 다른 비슷한 Task 의 트레이닝된 파라미터 값으로 설정

⇒ Fine-Tuning 을 다른 말로 Transfer Learning(전이 학습) 이라고도 함

- Fine-Tuning 과정
  - 어디까지를 학습 대상으로 삼을지를 결정해서 Fine-Tuning 을 진행
  - 상황에 맞게 어디까지를 Fine-Tuning 대상으로 삼을지를 결정해서 Fine-Tuning 을 진행



#### ✅  Google Colab 소개

: Google 에서 데이터 과학자와 연구자를 위해 공개한 서비스

- 장점

  - 구성이 필요하지 않음

    : Pandas, Numpy, scikit-learn, Matplotlib, Seaboarn, TensorFlow, PyTorch, … 등의 머신러닝을 위한 여러 라이브러리들을 제공

  - GPU 무료 액세스

  - 간편한 공유



#### ✅  초보자 스타일 구현(Beginners Style Implementation)- fit() 함수를 통한 트레이닝

: TensorFlow 2.0 을 이용한 딥러닝 알고리즘 구현의 2가지 방법 중 하나

- Beginners Style
  - 트레이닝 데이터, 테스트 데이터 준비
  - Sequential 모델 선언
  - .compile()
  - .fit(): 파라미터를 최적화하는 과정
  - evaluate() 혹은 predict(): 모델의 성능을 테스트 데이터로 확인
    - evaluate(): 전체 테스트 이미지 데이터셋에 대해 성능을 확인
    - predict(): 하나의 이미지 데이터셋에 대해 성능을 확인



#### ✅  Pre-Trained CNN 모델을 이용한 Image Classification- tf.keras.applications 모듈을 이용한 VGGNet 을 이용한 Cats vs Dogs Dataset 분류

: pre-trained cnn 모델에 새로운 데이터셋의 image classification 을 수행

→ pre-trained cnn 모델: VGGNet

→ 원본 데이터셋: ImageNet

→ 새로운 데이터셋: Cat/Dog Dataset

- Image Classification 진행 순서
  - 10 epoch: training softmax classifier
  - 10 epoch: fine-tuning with last 3 layers
- 코드 설명에 앞서서 기존에 궁금했던 질문들
  - vgg16 구조에서 16 layer 가 어떻게 나오는지?
  - vgg16 구조가 23개인데 어떤 16개 때문에 16개의 계층이 되는지?
  - randomly initialized의 주어
  - 기존 A 데이터셋과 새로운 B 데이터셋을 트레이닝하는 공용 모델로 A 데이터셋을 학습을 진행하였음. 그럼 frozen 부분은 새로운 분류기 부분에 어떤 방식으로 관여하는건지

- 코드 해설

  - A 데이터셋: ImageNet Dataset, B 데이터셋: cat vs dog Dataset

    - B 데이터셋을 가져와 가공

  - base_model: A 데이터셋을 VGG16 모델에 적용

  - feature_batch: B 데이터셋(트레이닝 데이터셋)을 base model 에 적용

  - model: base_model(19 Layers) + global_average_pooling2d + dense

  - model 을 최적화하기 위해 앞서서 컴파일 진행

    : 이 경우에 validation dataset 으로 성능을 측정하면 최적화가 진행되지 않았기 때문에 loss 값이 높고, 정확도가 떨어짐

  - fit()- Training: 파라미터를 최적화하는 과정

    1. Training Softmax Classifier- Fine Tuning

    - B 데이터셋(트레이닝 데이터셋)을 model 의 fit 으로 진행하면 바로 classifier 부분만 Fine Tuning 됨

      : global_average_pooling2d 가 새로운 분류기이기 때문

    - 10 번의 epoch 만큼 fit() 수행

    1. Fine-Tuning with last 3 layers

       : block5_conv1 부터 파라미터 갱신 대상에 포함

    - for 문으로 layer 의 이름이 block5_conv1 이 되면 set_trainable 값을 true 로 지정
    - set_trainable 값이 true 가 되면 black5_conv1 layer 부터 트레이닝이 된다는 뜻
    - 파라미터 갱신 대상 지정이 완료되면 러닝레이트를 재조정하여 다시 컴파일을 진행
    - 20번의 epoch 만큼 fit() 수행



#### ✅  Keras Callbacks 사용법

- Keras Callbacks

  : Beginners Style 의 구현을 이용할 경우 사용할 수 있는 유용한 기능

  , Experts Style 처럼 수동 구현을 할 필요가 없음

- Callbacks 기능들의 종류

  - Base Callback class
  - ModelCheckpoint
  - TensorBoard
  - EarlyStopping
  - LearningRateScheduler
  - ReduceLROnPlateau
  - RemoteMonitor
  - LambdaCallback
  - TerminateOnNaN
  - CSVLogger
  - ProgbarLogger

------

- ModelCheckpoint

  - filepath: epoch 마다 설정한 경로에 파라미터 정보를 파일로 저장
  - save_best_only(True): epoch 마다 monitor 갱신에서 최신의 좋은 것만 남기고 전의 것은 삭제

- TensorBoard

  : epoch 별 accuracy 또는 loss 변화량 등의 정보를 자동으로 log_dir 에 저장

- EarlyStopping

  : 오버피팅이 발생하는 시점에 설정한 epoch 수를 벗어나서 학습을 중단

  - patience: 일시적인 노이즈 현상임을 고려하여 지정한 값만큼의 epoch 동안 변화량을 살펴봄

    ex) patience= 3 → 3 번의 epoch 동안? 아니면 3 번의 epoch 이 지나고도 validation error 가 지속하여 커질 경우 학습을 중단

- LearningRateScheduler

  : 학습(epoch) 이 진행되면서 러닝레이트 값을 하향 조정

- CSVLogger

  : epoch 별 loss 값 또는 accuracy 값을 파일 형태로 저장

⇒ 해당 기능들을 Beginners Style 의 fit 함수에 리스트의 형태로 넣어주면됨

model.fit(x_train, y_train, epochs= EPOCHS, callbacks= [model_checkpoint_callback, tensorboard_callback, learning_rate_callback, csv_logger])
