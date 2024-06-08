---
title: "[딥러닝] 섹션10: 모델 성능 개선 방법"
author: sujungeee
date: 2023-08-28 22:48:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, 딥러닝 모델, 성능]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "차량 번호판 인식 프로젝트와 TensorFlow로 배우는 딥러닝 영상인식 올인원" 을 참고하여 작성하였습니다.



#### ✅  딥러닝 모델의 성능 평가- 정량적 평가(Quantitative Result) & 정성적 평가(Qualitative Result)

- ocr 모델에서의 정량적 평가(Quantitative Result)

  : keras_ocr.evaluation.score() 함수를 이용하여 AWS / GCP / keras-ocr 의  precision, recall 을 측정

  - Keras OCR Score 의 Measure argument

    : score_kwargs 로 반영

    - iou_threshold: detection 결과의 정답 판정에서 사용할 iou 임계치

      → 높을수록 정확한 detection 결과 도출: precision 높, recall 낮

      → 낮을수록 부정확한 detection 결과 도출: precision 낮, recall 높

    - similarity_threshold: 정답 단어와 비교해서 얼마나 일치할 경우 맞춘 것으로 간주할 지에 대한 임계치

      ex) = 0.5: 2 개 중 한 개를 맞추면 정답으로 간주

- ocr 모델에서의 정성적 평가(Qualitative Result)

  : visualization 과 같은 방식으로 성능 측정



#### ✅  딥러닝 모델의 성능을 개선하는 법

딥러닝을 이용한 실무 프로젝트 진행 방법- 초기 모델 개발 이후의 과정

- 성능 측정 지표 설정
  - 정량적 성능 측정 지표 설정(e.g. Accuracy, F-Score)
  - 정성적 성능 측정 지표 설정(Data Visualization)
- 성능 개선 방안 고민
  - 버그 혹은 오류가 없는지 검토
  - 성능이 잘 나오지 않은 테스트 데이터에 대한 원인 분석
  - Hyper-parameter Tuning
  - 개선된 모델로 모델 교체: 리스크가 있음
  - 추가 데이터 수집: 성능 향상의 가장 큰 요소
  - Data Augmentation
- 새로운 모델 버저닝 및 Trade Off 고려
  - 새로운 모델 버저닝
  - 성능과 속도의 Trade Off 고려
- 새로운 버전의 모델 배포
  - Local Prediction
  - Server-Client(직접 구성)
  - Server-Client(외부 플랫폼 사용- e.g. GCP AI Platform)
