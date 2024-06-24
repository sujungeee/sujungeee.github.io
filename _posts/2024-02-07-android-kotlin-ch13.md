---
title: "[안드로이드] Ch13. 액티비티 컴포넌트"
author: sujungeee
date: 2024-02-07 02:11:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 13-1. 인텐트 이해하기

- 인텐트란?

  - 컴포넌트를 실행하려고 시스템에 전달하는 메시지

- 인텐트 엑스트라 데이터

  - 엑스트라 데이터: 인텐트에 담는 부가 정보
  - putExtra
  - getIntExtra, getStringExtra, getDoubleExtra

- 액티비티 화면 되돌리기- startActivityForResult

  - startActivity(): 사후 처리가 필요 없을 때
  - startActivityForResult(): 사후 처리가 필요할 때(전통적인 방법- 패스..)
  - ActivityResultLauncher(): 사후 처리가 필요할 때(권장)

- 액티비티 화면 되돌리기- ActivityResultLauncher

  - Contract
  - ActivityResultLauncher
  - launch

- 인텐트 필터

  - 명시적 인텐트: 클래스 타입 레퍼런스 정보를 활용한 인텐트
  - 암시적 인텐트: 인텐트 필터 정보를 활용한 인텐트
    - 외부 앱의 컴포넌트에서 해당 인텐트를 이용

  ------

  - 암시적 인텐트 필터: 매니페스트 파일에서 지정하는 방법, 인텐트의 프로퍼티로 지정하는 방법
    - <action>
    - <category>
    - <data>: android:scheme, android:host, android:port, android:mimeType

- 액티비티 인텐트 동작 방식

  : 인텐트로 실행할 액티비티가 없을 때, 1개일 때, 여러 개일 때

  - 해당 액티비티가 없을 때: 예외 처리
  - 액티비티가 여러 개일 때: 다이얼로그를 띄움
    - 특정 앱의 액티비티를 바로 실행: setPackage()

- 패키지 공개 상태

  - 외부 앱의 정보에 접근할 때

    - 외부 앱의 정보를 가져오는 코드 작성

    - 매니페스트 파일 <quries> 하위 태그에 외부 앱의 정보에 접근하려는 패키지를 선언(권장*)

      or

      <uses-permission>

### 13-2. 액티비티 생명주기

- 액티비티의 상태

  - 활성
  - 일시 정지
  - 비활성
    - 루트 액티비티가 아니면 뒤로 가기 버튼으로 onDestroy() 까지 호출되어 종료
    - 루트 액티비티이면 뒤로 가기 버튼을 눌러도 onStop() 까지만 호출, 액티비티가 종료되지 않음

- 액티비티의 상태 저장

  - 액비비티를 종료할 때 저장했다가 복원해야 할 데이터가 있다면 

    Bundle

    이라는 객체에 담기

    - onCreate
    - onRestoreInstanceState
    - onSaveInstanceState

### 13-3. 액티비티 제어

- 소프트 키보드 제어하기

  - InputMethodManager: 특정한 순간에 키보드를 올리거나 내리고 싶을 때

    - hideSoftInputFromWindow
    - showSoftInput
    - toggleSoftInput: 키보드 반대로 제어

    ------

    - requestFocus(): 뷰에 포커스를 강제로 지정

  - 입력 모드 설정

    - 매니페스트 파일 - <activity> - windowSoftInputMode 속성

      : adjustPan, adjustResize, adjustUnspecified,stateHidden, stateVisible, stateUnspecified

- 방향과 전체 화면 설정하기

  - 화면 방향 고정하기: 매니페스트 파일 - <activity> - screenOrientation 속성

    : landscape, portrait

  - 액티비티를 전체 화면으로 표시

    - 액션바 출력하지 않기

    - 액티비티 코드에서 전체 화면으로 출력되게 설정(p.430 참고)

      → API 30 이후는 WindowInsetsController 클래스의 함수 이용하기

### 13-4. 태스크 관리

: 액티비티를 어떻게 생성하고 관리하는지를 제어하는 일

- 시스템에서 태스크 관리
  - 액티비티 태스크: 앱이 실행될 때 시스템에서 액티비티의 각종 정보를 저장하는 공간
  - 다른 태스크에서 같은 액티비티가 실행되면 액티비티 객체가 각 태스크에 등록된다.
- 태스크 제어
  - 태스크 제어 방식
    - 매니페스트 파일 - <activity> - launchMode 속성
    - 인텐트의 flags 정보를 설정하여 제어
  - launchMode
    - standard
    - singleTop - onNewIntent()
    - singleTask
    - singleInstance

### 13-5. 액티비티 ANR 문제와 코루틴

- ANR 문제란?
  - ANR: 액티비티가 응답하지 않는 오류 상황
- 코루틴으로 ANR 오류 해결
  - 코루틴이란?
    - 비동기 경량 스레드
    - 어떤 작업을 함께 처리한다는 의미
  - 비동기 처리 구현 방식: RX 프로그래밍, 코루틴
  - 안드로이드에서 코루틴 이용
    - 코루틴 등록
    - 코루틴으로 작성한 소스: 디스패처, send(), receive(), consumeEach()

### 13-6. 할 일 목록 앱 만들기 Do it! (실습)

> 정리
>
> - 인텐트는 컴포넌트를 실행하려고 시스템에 띄우는 메시지
> - 인텐트는 명시적 인텐트와 암시적 인텐트로 구분
> - 액티비티는 활성, 일시 정지, 비활성 상태가 있음
> - launchMode 속성을 이용해 액티비티의 태스크가 어떻게 관리되는지 조절할 수 있음
> - ANR은 액티비티가 사용자 이벤트에 반응하지 않는 오류
