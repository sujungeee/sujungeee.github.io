---
title: "[딥러닝] Object Detection"
author: sujungeee
date: 2023-08-31 11:31:00 +0800
categories: [AI, 딥러닝]
tags: [AI, 딥러닝, 머신러닝, TensorFlow, 객체 탐지, 컴퓨터 비전, Object Detection]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "YOLO 구현으로 배우는 딥러닝 논문 구현 with TensorFlow 2.0" 을 참고하여 작성하였습니다.



#### ✅  Object Detection 문제영역 소개

- 컴퓨터 비전

  : 인간의 시각과 관련된 부분을 컴퓨터 알고리즘을 이용해서 구현하는 방법을 연구하는 분야

  - 컴퓨터 비전의 대표적인 문제들

    - Image Classification

    - Semantic Image Segmentation

      : 전체 픽셀에 대한 분류

    - Object Detection

      : 물체 픽셀? 에 대한 분류

  - 딥러닝의 여러 구조 중 CNN 이 많이 사용됨

- Object Detection

  : 물체가 있는 영역의 위치 정보를 Bounding Box 로 찾고 Bounding Box 내에 존재하는 사물의 라벨(Label) 을 분류하는 문제 영역

  - Object Detection 문제 영역의 출력값

    : x_min, y_min, x_max, y_max, class, confidence

    - x_min: 물체의 Bounding Box 의 왼쪽 위(Left-Top) x 좌표
    - y_min: 물체의 Bounding Box 의 왼쪽 위(Left-Top) y 좌표
    - x_max: 물체의 Bounding Box 의 오른족 아래(Right-Bottom) x 좌표
    - y_max: 물체의 Bounding Box 의 오른족 아래(Right-Bottom) y 좌표
    - class: Bounding Box 에 속한 물체의 class
    - confidence: Bounding Box 에 실체 물체가 있을 것이라고 확신하는 정도를 나타내는 값(0.0~1.0 사이의 값)

  > 절대 좌표와 상대 좌표
  >
  > - 절대 좌표: 4분면 절댓값
  > - 상대 좌표: 전체 width, height 길이를 절대 좌표로 나눈 좌표 값



#### ✅  Object Detection Metric- IoU, mAP

[참고]

[EAST(Efficient and Accuracy Scene Text detector)](https://www.notion.so/EAST-Efficient-and-Accuracy-Scene-Text-detector-19a59357e4764188a4eb38547de33dd0?pvs=21)

> Ground Truth Data
>
> : 사람이 지정한 Bounding Box 와 Class Label
>
> ⇒ Ground Truth Data 와 예측 값을 비교하여 성능을 측정하기 위한 Metric 이 필요

- Metric 1- IoU(Intersection over Union) Metric

  : Bounding Box 의 정확성을 측정

  - 1 개의 Bounding Box 와 1 개의 Bounding Box 가 얼마나 일치하는 지를 0.0-1.0 사이의 값으로 표현
  - 2 개의 Bounding Box 가 일치할수록 1.0 에 가까운 값이 되고, 일치하지 않을수록 0.0 에 가까운 값이 나옴

- Metric 2

  - Precision, Recall, F1

    - Precision: 정밀도(Precision) 는 검색된 결과들 중 관련있는 것으로 분류된 결과물의 비율

    - Recall: 재현율(Recall) 은 관련있는 것으로 분류된 항목들 중 실제 검색된 항목들의 비율

    - F1: Precision 과 Recall 의 조화 평균

      → Precision 과 Recall 을 한꺼번에 비교 가능

    ⇒ Precision 과 Recall 이 모두 높아야 좋은 성능을 발휘

    ⇒ F1 이 높아야 좋은 성능을 발휘

  - Average Precision(AP)

    - Positive 판단 기준: 일정한 임계치의 IoU(e.g. =0.5) 를 넘기면 맞춘 것으로 간주
    - Average Precision(AP): Recall 별 Precision 의 평균

    → Precision 과 Recall 은 보통 반비례의 수치를 가짐

  - Mean Average Precision(mAP)

    : class 들의 Average Precision 의 평균

  - AP 와 mAP

    1. AP

    - 단일 클래스나 객체 유형에 대한 평균 정밀도를 측정하는 지표
    - Precision-Recall 곡선 아래의 면적을 계산

    1. mAP

    - 다수의 클래스나 객체 유형에 대한 AP 값을 평균내는 것
    - 여러 클래스에 대한 모델의 종합적인 성능을 나타냄
    - AP 의 평균 값: mAP 값

- Metric 3- MS COCO Metric

  : 좀 더 엄밀한 측정을 위해 다양한 평가 Metric 제안

  - AP 의 IoU 값을 구간 별로 설정하여 계산한 값을 평균낸 값
  - AP 한 object 를 크기별로
  - AR 기준을 여러 개로 나눠 계산한 값을 평균낸 값
  - AR 의 object 를 크기별로



#### ✅  Object Detection Datasets- Pascal VOC, MS COCO, KITTI, Open Images

: Pascal VOC, MS COCO 데이터셋 등 …

- Pascal VOC Dataset

  - VOC 2007
    - 9,963 장의 이미지
    - 24,640 개의 Bounding Box
  - VOC 2012
    - 11,530 장의 이미지
    - 27,450 개의 Bounding Box
  - 20 개의 클래스(label), 4 개의 카테고리

- MS-COCO

  : Microsoft 사에서 구축한 Object Detection 용 데이터셋

  - 80,000 장의 training 이미지
  - 40,000 장의 validation 이미지
  - 20,000 장의 test 이미지
  - 80 개 label(Pascal VOC 의 20 개의 label 이 포함되어 있음)

- KITTI

  : 자율 주행 연구를 위한 이미지로 구성된 데이터셋

  - 21 개의 트레이닝 동영상 파일(training sequence)
  - 29 개의 테스트 동영상 파일(test sequence)
  - 8 개 label

- Open Images Dataset v4

  : Google 사의 Open Images Dataset

  - 1,743,042 장의 training 이미지
  - 41,620 장의 validation 이미지
  - 125,436 장의 test 이미지
  - 14,610,229 개의 Bounding Box
  - 600 개의 label

  ⇒ Explorer 를 통해 Open Images Dataset 의 Label 들을 볼 수 있음
