---
title: "[안드로이드] Ch12. 머터리얼 라이브러리"
author: sujungeee
date: 2024-02-02 18:22:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 12-1. 앱바 사용하기

- 머터리얼 라이브러리

  - 머터리얼 디자인
  - 머터리얼 라이브러리 선언

- 앱바 레이아웃- 화면 위쪽 영역 꾸미기

  - 툴바 포함하기
  - 크기 확장하기
  - 이미지 넣기

- 코디네이터 레이아웃- 뷰끼리 상호 작용하기

  > 제트팩의 androidx 라이브러리에서 제공

  - 스크롤 연동하기: 앱바 + 메인 콘텐츠 상호작용, 비헤이비어(behavior)
  - 중첩 스크롤 뷰 사용하기

- 컬랩싱 툴바 레이아웃- 앱바 접히는 형태 설명하기

  - 스크롤 설정하기: scrollFlags- enterAlways, enterAlwaysCollapsed, exitUntilCollapsed
  - 개별 뷰의 스크롤 설정하기: collapseMode- pin, parallax

### 12-2. 탭 레이아웃- 탭 버튼 구성

- 탭 레이아웃 등록~탭 버튼 이벤트 처리
  - 탭 레이아웃 등록
  - 코드에서 탭 버튼 정의
  - XML 파일에서 탭 버튼 정의
  - 탭 버튼 이벤트 처리: addOnTabSelectedListener
- 탭 버튼 정렬하기: tabGravity
- 스크롤 설정하기: tabMode
- 뷰 페이저 연동하기
  - 탭 레이아웃과 뷰 페이저 등록
  - 탭 레이아웃과 뷰 페이저 연동: TabLayoutMediator

### 12-3. 네비게이션 뷰- 드로어 화면 구성

- 네비게이션 뷰 등록
- 항목 선택 이벤트 핸들러: setNavigationItemSelectedListener()

### 12-4. 확장된 플로팅 액션 버튼

- 확장된 플로팅 액션 버튼
- 확장된 플로팅 액션 버튼 조절: binding.extendedFab.setOnClickListener, binding.extendFab.isExtended

### 12-5. 머터리얼 라이브러리로 화면 구성하기 Do it! 실습

> 정리
>
> - AppBarLayout은 툴바를 포함하여 화면에서 위쪽 영역을 다양하게 꾸미는 레이아웃
> - CoordinatorLayout을 이용하면 화면의 뷰끼리 상호작용을 할 수 있음
> - TabLayout은 탭 버튼을 다양한 형태로 배치하는 레이아웃으로 스크롤이나 정렬 등을 설정할 수 있음
> - ExtendedFloatingActionButton을 이용하면 화면에 떠 있는 듯한 버튼을 제공할 수 있음
