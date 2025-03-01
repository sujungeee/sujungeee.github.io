---
title: "[안드로이드] Ch8. 사용자 이벤트 처리하기"
author: sujungeee
date: 2024-01-18 19:37:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 08-1. 터치와 키 이벤트

> 콜백 함수: 어떤 이벤트가 발생하거나 시점에 도달했을 때 시스템에서 자동으로 호출하는 함수

- 터치 이벤트

  - 콜백 함수

    - onTouchEvent()

    - 매개변수: MotionEvent 객체

      → 해당 객체에 터치의 종류와 발생 지점이 담김

  - 터치 이벤트의 종류

    - ACTION_DOWN: 화면을 손가락으로 누른 순간의 이벤트
    - ACTION_UP: 화면에서 손가락을 떼는 순간의 이벤트
    - ACTION_MOVE: 화면을 손가락으로 누른 채로 이동하는 순간의 이벤트

  - 터치 이벤트 발생 좌표 얻기

    - x: 이벤트가 발생한 뷰의 X 좌표
    - y: 이벤트가 발생한 뷰의 Y 좌표
    - rawX: 화면의 X 좌표
    - rawY: 화면의 Y 좌표

- 키 이벤트

  - 콜백 함수

    - onKeyDown: 키를 누른 순간의 이벤트

    - onKeyUp: 키를 떼는 순간의 이벤트

    - onKeyLongPress: 키를 오래 누르는 순간의 이벤트

    - 매개변수: keyCode(Int), MotionEvent 객체

      → KeyCode로 사용자가 어떤 키를 눌렀는지 식별할 수 있음

  - 키로 취급되는 요소

    - 하드웨어 키보드
    - 안드로이드 시스템 버튼: 뒤로가기, 볼륨 조절 버튼

  - 뒤로가기 버튼을 눌렀을 때 호출할 수 있는 함수

    - KeyCode

      KeyEvent.KEYCODE_BACK → Log.d(”kkang”, “BACK Button을 눌렀네요”)

    - onBackPressed()

      override fun onBackPressed(){

      Log.d(”kkang”, “BACK Button을 눌렀네요”)

      }

### 08-2. 뷰 이벤트

- Explanation

  - 뷰를 사용자가 터치했을 때의 이벤트 처리
    - 각 뷰에서 이벤트를 별도로 제공
    - 터치 이벤트를 이용하지 않음

- 뷰 이벤트의 처리 구조

  - 뷰 이벤트 처리 구조

    : 이벤트 소스와 이벤트 핸들러로 역할이 나뉘며 둘을 리스너로 연결

    - 이벤트 소스: 이벤트가 발생한 객체
    - 이벤트 핸들러: 이벤트 발생 시 실행할 로직이 구현된 객체
    - 리스너: 이벤트 소스와 이벤트 핸들러를 연결해 주는 함수

  - 이벤트 핸들러: 지정된 인터페이스를 구현한 객체를 이벤트 핸들러로 등록

    - 인터페이스를 구현한 object 클래스
    - 액티비티 자체에서 인터페이스를 구현
    - 이벤트 핸들러를 별도의 클래스로 만들어 처리
    - 코틀린의 SAM 기법을 이용

- 클릭과 롱클릭 이벤트 처리

  - 뷰에 정의된 이벤트(가장 많이 이용하는 이벤트)

    - ClickEvent: 뷰를 짧게 클릭할 때 발생

      → 코틀린으로 작성한 이벤트 핸들러

      ```xml
      binding.btn.setOnClickListener(object: View.OnClickListener{
      		override fun onClick(p0: View?){
      
      		}
      })
      ```

    - LongClickEvent: 뷰를 길게 클릭할 때 발생

  - **SAM 기법(*****)**

    - 자바 API를 코틀린에서 활용할 때 람다 표현식으로 쉽게 이용할 수 있게 해주는 기법
    - 하나의 추상 함수를 포함하는 인터페이스를 활용하는 방법

    1. 인터페이스와 인터페이스 구현 객체를 자바로 작성

    2. 코틀린에서 람다 함수의 형태로 자바 함수 호출

       - SAM X

         ```xml
         obj.setInterface(object: JavaInterface1 {
         		override fun callback(){
         				println("hello kotlin")
         		}
         })
         ```

       - SAM

         ```xml
         obj.setInterface { println("hello SAM") }
         ```

    - SAM 기법을 이용한 이벤트 핸들러 구조

      ```xml
      binding.btn.setOnClickListener{
      		...
      }
      ```

### 08-3. 시계 앱의 스톱워치 기능 만들기 Do it!(실습)

> 정리
>
> - 터치 이벤트의 콜백 함수는 onTouchEvent
> - 키 이벤트의 콜백 함수는 onKeyDown, onKeyUp, onKeyLongPress
> - 뷰 이벤트는 이벤트 소스와 이벤트 핸들러를 리스너로 연결하여 처리
