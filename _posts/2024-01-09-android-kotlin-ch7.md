---
title: "[안드로이드] Ch7. 뷰를 배치하는 레이아웃"
author: sujungeee
date: 2024-01-09 13:49:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 07-1. 선형으로 배치- LinearLayout

- LinearLayout 배치 규칙

  - Explanation
    - 뷰를 가로나 세로 방향으로 나열하는 레이아웃 클래스
    - 속성: orientation
    - 속성 값: horizontal(가로로 나열), vertical(세로로 나열)
    - 중첩 레이아웃으로 배치가 가능

- 여백을 채우는 layout_weight 속성

  - 뷰 1개로 전체 여백 채우기

  - 뷰 여러 개로 여백을 나누어 채우기

    - layout_weight 값을 비율로 면적을 채움

  - 중첩된 레이아웃에서 여백 채우기

    - layout_weight 속성은 같은 영역에 있는 뷰끼리만 여백을 나누어 차지함

  - 여백 채우기로 뷰의 크기 설정하기

    - orientation=”vertical”

      → 뷰가 2개 이상,

      → layout_height를 0으로 설정,

      → layout_weight를 1로 모두 설정하면 뷰가 n등분되어 표시

    - orientation=”horizontal”

      → 뷰가 2개 이상,

      → layout_width를 0으로 설정,

      → layout_weight를 1로 모두 설정하면 뷰가 n등분되어 표시

- 뷰를 정렬하는 gravity, layout_gravity 속성

  - Explanation

    - 두 속성을 사용하지 않을 때의 default 값: left/top
    - 왼쪽 위를 기준으로 정렬

  - 뷰에 gravity와 layout_gravity 속성 적용하기

    - gravity 속성의 정렬 대상: 콘텐츠
    - layout_gravity 속성의 정렬 대상: 뷰 자체

  - 레이아웃에 gravity 속성 적용하기

    - 뷰를 감싸고 있는 LinearLayout의 방향과 뷰의 layout_gravity 방향이 같으면 layout_gravity가 적용되지 않음

    - LinearLayout의 orientation과 같은 방향으로 정렬하려면

      → 뷰를 감싸고 있는 LinearLayout에 gravity 속성을 부여해야 함

      → ex) android:gravity=”center”

### 07-2. 상대 위치로 배치- RelativeLayout

- RelativeLayout 배치 규칙
  - RelativeLayout
    - 상대 뷰의 위치를 기준으로 정렬하는 레이아웃 클래스
    - 화면에 이미 출력된 특정 뷰를 기준으로 방향을 지정하여 배치
    - 기준이 되는 뷰의 id로 속성 값을 설정
  - 속성
    - android:layout_above: 기준 뷰의 위쪽에 배치
    - android:layout_below: 기준 뷰의 아래쪽에 배치
    - android:layout_toLeftOf: 기준 뷰의 왼쪽에 배치
    - android:layout_toRightOf: 기준 뷰의 오른쪽에 배치
- 맞춤 정렬하는 align 속성
  - Explanation
    - 기준이 되는 뷰의 id로 속성 값을 설정
  - 속성- 상대 뷰의 어느 쪽에 맞춰서 정렬할지 정하는 속성
    - android:layout_alignTop: 기준 뷰와 위쪽을 맞춤
    - android:layout_alignBottom: 기준 뷰와 아래쪽을 맞춤
    - android:layout_alignLeft: 기준 뷰와 왼쪽을 맞춤
    - android:layout_alignRight: 기준 뷰와 오른쪽을 맞춤
    - android:layout_alignBaseline: 기준 뷰와 텍스트 기준선을 맞춤
  - 속성- 상위 레이아웃을 기준으로 맞춤 정렬하는 속성
    - android:layout_alignParentTop: 부모의 위쪽에 맞춤
    - android:layout_alignParentBottom: 부모의 아래쪽에 맞춤
    - android:layout_alignParentLeft: 부모의 왼쪽에 맞춤
    - android:layout_alignParentRight: 부모의 오른쪽에 맞춤
    - android:layout_centerHorizontal: 부모의 가로 방향 중앙에 맞춤
    - android:layout_centerVertical: 부모의 세로 방향 중앙에 맞춤
    - android:layout_centerInParent: 부모의 가로/세로 중앙에 맞춤

### 07-3. 겹쳐서 배치- FrameLayout

- FrameLayout
  - 뷰를 겹쳐서 출력하는 레이아웃 클래스
  - 함께 쓰는 속성: visibility
  - 주로 탭 화면을 만들 때 사용

### 07-4. 표 형태로 배치- GridLayout

- GridLayout 배치 규칙

  - GridLayout

    - 행과 열로 구성된 테이블 화면을 만드는 레이아웃 클래스
    - LinearLayout처럼 orientation 속성으로 가로나 세로 방향으로 뷰를 나열
    - LinearLayout과 다르게 줄바꿈을 자동으로 해줌

  - 기본 속성

    - orientation: 방향 설정

    - rowCount: 세로로 나열할 뷰 개수

      → orientation 값이 vertical일 경우

    - columnCount: 가로로 나열할 뷰 개수

      → orientation 값이 horizontal일 경우

- GridLayout 속성

  - 특정 뷰의 위치 조정하기
    - layout_row: 뷰가 위치하는 세로 방향 인덱스
    - layout_column: 뷰가 위치하는 가로 방향 인덱스
    - 두 속성으로 값을 설정하면 해당 인덱스부터 뷰가 나옴
  - 특정 뷰의 크기 확장하기: layout_gravity 속성
    - fill: 뷰의 가로/세로를 확장해서 출력
    - fill_horizontal: 뷰의 가로를 확장해서 출력
    - fill_vertical: 뷰의 세로를 확장해서 출력
    - right: 표시할 인덱스의 오른쪽 정렬로 출력
  - 열이나 행 병합하기
    - 어떤 뷰가 테이블에서 여러 칸을 차지할 수 있도록 설정
    - layout_columnSpan: 가로로 열 병합
    - layout_rowSpan: 세로로 행 병합

### 07-5. 계층 구조로 배치- ConstraintLayout

- ConstraintLayout

  - Explanation

    - androidx에서 제공하는 라이브러리

    - build.gradle 파일의 dependencies 설정

      : implementation ‘androidx.constraintlayout:constraintlayout:2.1.1’

    - 레이아웃 xml 의 기본 레이아웃

- 레이아웃 편집기에서 레이아웃 구성하기(실습)

  > 구성 방식: 코드 < 레이아웃 편집기

  - 레이아웃 편집기 구성 요소
    - 팔레트, 컴포넌트 트리, 툴바, 디자인 편집기, 속성, 보기 모드, 화면 조절
  - 이미지 추가
    - 뷰의 기본 속성: id, layout_width, layout_height
    - 여백: Constraint Widget의 margin
  - 제목 추가
  - 날짜 추가

### 07-6. 전화 앱의 키패드 화면 만들기 Do it!(실습)

> 정리
>
> - LinearLayout은 뷰를 가로나 세로 방향으로 배치하는 레이아웃
> - RelativeLayout은 뷰를 다른 뷰의 상대 위치에 맞춰 배치하는 레이아웃
> - FrameLayout은 뷰를 같은 위치에 겹쳐서 배치하는 레이아웃
> - GridLayout은 뷰를 행과 열이 있는 테이블 구조로 배치하는 레이아웃
> - ConstraintLayout은 레이아웃 편집기를 이용해 화면을 구성하는 레이아웃
