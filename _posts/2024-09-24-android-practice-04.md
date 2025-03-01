---
title: "[안드로이드] 04. BroadcastReceiver"
author: sujungeee
date: 2024-09-24 19:58:00 +0800
categories: [안드로이드, 실습]
tags: [안드로이드, Android, Kotlin, practice]
render_with_liquid: false

---

> BroadcastReceiver



### 등록 방식에 따른 종류

- 정적 리시버
   - AndroidManifest.xml 파일에 등록되며 라이프 사이클과 무관하게 동작
   - 앱이 설치되면 즉시 사용 가능하며 등록과 해지가 자유롭지 못함



- 동적 리시버
  - Activity와 같은 컴포넌트에서 프로그래밍적으로 등록하며 라이프사이클 내에서 등록 및 삭제 처리 필요
  - 해당 코드가 실행될 때 사용 가능하며 코드 내에서 필요에 따라 등록 및 삭제 가능



### 정적 리시버

- 시스템 Broadcast를 받아서 처리하는 정적 리시버 구현
  - BroadcastReceiver를 상속받아 구현
  - manifest.xml 내부에 receiver 태그 속성으로 receiver 추가
  - android.intent.action.LOCALE_CHANGED: 시스템의 locale 정보 변경 시 발생되는 broadcast 수신
  - locale 변경할 때 로그 확인



### 동적 리시버

- 동적 리시버 등록
  - registerReceiver()로 동적으로 등록
  - unregisterReceiver() 로 동적으로 해제



### 사용자 정의 리시버

- 사용자 정의 Broadcast의 발송과 수신

  - 발송

    ```kotlin
    intent.action = "example.MY"
    intent.putExtra("content", "보내요.")
    sendBroadcast(intent)
    ```

  - 수신

    ```kotlin
    override fun onReceive(context: Context, intent: Intent) {
        Log.d(TAG, "onReceive: receive 받기: ${intent.action}") // example.MY
        Log.d(TAG, "onReceive: extra: ${intent.getStringExtra("content")}") // 보내요.
    }
    ```

    

- 사용자 정의 Broadcast의 발송과 수신 + Permissions

  - 사용자 정의 permission 선언

    ```xml
    <!-- 사용자 정의 permission 선언 -->
    <permission
        android:name="com.android.practice.news.funny.PRIVATE"
        android:protectionLevel="signature" /> <!-- permission 사용 선언 -->
    <uses-permission android:name="com.android.practice.news.funny.PRIVATE" />
    ```

  - 발송

    ```kotlin
    intent.action = "com.android.practice.news.funny"
    intent.putExtra("content", "permission 보내요.")
    sendBroadcast(intent)
    ```

  - 수신

    ```kotlin
    override fun onReceive(context: Context, intent: Intent) {
        Log.d(TAG, "onReceive: receive 받기: ${intent.action}") // com.android.practice.news.funny
        Log.d(TAG, "onReceive: extra: ${intent.getStringExtra("content")}") // permission 보내요.
    }
    ```

    

### Alarm

- PendingIntent Flag

  - FLAG_UPDATE_CURRENT: 현재 PendingIntent를 유지, extra data는 새로 전달된 Intent로 교체

  - FLAG_CANCEL_CURRENT: 현재 Intent는 삭제하고 다시 등록

  - FLAG_NO_CREATE: 이미 Intent가 있다면, 아무것도 하지 않음

  - FLAG_ONE_SHOT: 한 번 사용되면 다음에 다시 사용되지 않음

  - FLAG_IMMUTABLE: 한 번 보내면 수정되지 않음

  - FLAG_MUTABLE: 수정 가능



- AlarmManager AlarmType
  - ELAPSED_REALTIME: 기기가 부팅된 후 경과한 시간을 기준으로 알람을 발생시킴
    - 절전 모드 시에는 알람을 발생시키지 않음
  - ELAPSED_REALTIME_WAKEUP: ELAPSED_REALTIME과 동일하지만 절전 모드일 때 알람을 발생시킴
  - RTC: Real Time Clock을 사용하여 알람을 발생시킴
    - 절전 모드 시에는 알람을 발생시키지 않음
  - RTC_WAKEUP: RTC와 동일하지만 절전 모드일 때 알람을 발생시킴



- 반복 알람 보내기
  - INTERVAL_FIFTEEN_MINUTES: 15분
  - INTERVAL_HALF_HOUR: 30분
  - INTERVAL_HOUR: 1시간
  - INTERVAL_HALF_DAY: 12시간
  - INTERVAL_DAY: 1일
