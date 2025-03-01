---
title: "[안드로이드] Ch14. 브로드캐스트 리시버 컴포넌트"
author: sujungeee
date: 2024-02-12 13:49:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 14-1. 브로드캐스트 리시버 이해하기

- 브로드캐스트 리시버
  - 이벤트 모델로 실행되는 컴포넌트
  - 이벤트: 시스템의 특정한 상황(ex: 부팅이 완료되는 것)
- 브로드캐스트 리시버 만들기
  - 브로드캐스트 리시버의 생명주기 함수: onReceive()
    - onReceive() 함수가 실행을 마치면 브로드캐스트 리시버 객체는 소멸
  - 매니페스트 파일 - <receiver> - name 속성(필수 X)
- 동적 등록과 해제
  - 브로드캐스트 리시버를 매니페스트 파일로 등록하는 대신
    - 리시버 객체 생성
    - 동적 등록: registerReceiver(), unregisterReceiver()
- 브로드캐스트 리시버 실행하기
  - 브로드캐스트 리시버를 실행하는 인텐트: sendBroadcast() 함수로 시스템에 전달
  - 액티비티 수
    - 없음: 오류 발생 X
    - 1개: 정상 실행
    - 여러 개: 모두 실행

### 14-2. 시스템 상태 파악하기

- 부팅 완료

  - 앱에서 부팅이 완료되고 특정한 작업을 수행하고 싶을 때
  - 브로드캐스트 리시버와 인텐트 필터 등록
  - 권한 설정: <uses-permission>

- 화면 켬/끔

  - 안드로이드 기기의 화면을 켜거나 끌 때 이를 감지하는 리시버
  - ACTION_SCREEN_ON, ACTION_SCREEN_OFF
  - 리시버(동적) 등록: registerReceiver(), unregisterReceiver()

- 배터리 상태

  - 배터리와 관련된 정보나 상태 변화를 앱에서 감지
  - BATTERY_LOW, BATTERY_OKAY, BATTERY_CHANGED, ACTION_POWER_CONNECTED, ACTION_POWER_DISCONNECTED
  - 리시버 등록

  ------

  - 상태 변경 없이 배터리 정보를 알고싶을 때
    - intentFilter 객체를 registerReceiver() 의 매개변수로 전달
    - 인텐트의 엑스트라로 배터리 상태 파악하기: 충전 형태, 배터리 충전량, …

### 14-3. 배터리 정보 앱 만들기 Do it! (실습)

> 정리
>
> - 브로드캐스트 리시버는 이벤트 모델로 실행되는 컴포넌트
> - 브로드캐스트 리시버는 BroadcastReceiver를 상속받아 onReceive()의 생명주기 함수를 재정의해서 작성
> - 브로드캐스트 리시버를 실행하려면 sendBroadcast() 함수를 이용해 인텐트를 시스템에 전달해야 함
> - 브로드캐스트 리시버를 이용하면 부팅을 완료한 순간, 화면을 켜거나 끄는 순간, 배터리 상태가 변경되는 순간 등 시스템의 상태 변화를 감지할 수 있음
