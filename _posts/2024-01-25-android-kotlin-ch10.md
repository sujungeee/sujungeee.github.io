---
title: "[안드로이드] Ch10. 다이얼로그와 알림 이용하기"
author: sujungeee
date: 2024-01-25 14:31:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 10-1. API 레벨 호환성 고려하기

- API 레벨 호환성 문제 방지를 위한 애너테이션
  - @RequiresApi
  - @TargetApi
- Sdk 레벨에 맞는 API를 이용해야 함(직접 코드 작성으로)

### 10-2. 퍼미션 설정하기

- 퍼미션 설정과 사용 설정

  - 퍼미션: 앱의 특정 기능에 부여하는 접근 권한

  - B앱에서 A앱 사용(in 매니페스트 파일)

    - A앱: <permission> 으로 퍼미션 설정
    - B앱: <uses-permission> 으로 해당 퍼미션을 이용하겠다고 설정

  - <permission> 속성

    - name: 퍼미션의 이름

    - label, description: 퍼미션을 설명

    - protectionLevel: 보호 수준

      → normal / dangerous / signature / signatureOrSystem

  - <uses-permission> 설정(퍼미션 사용 설정)

    - ACCESS_NETWORK_STATE의 보호 수준: normal

      → 사용자에게 권한 허용을 요청하지 않아도 되므로 앱 권한에 네트워크 접근이 나타나지 않음

    - ACCESS_FINE_LOCATION의 보호 수준: dangerous

      → 사용자에게 권한 허용을 요청해야 하므로 앱 권한에 위치가 나타남

  ------

  - 사용 설정- 컴포넌트에 퍼미션 적용
    - 보호할 컴포넌트에 android:permission=”com.example.TEST_PERMISSION” 속성을 적용

  ------

  - 시스템이 보호하는 기능: p.272 참고

- 퍼미션 허용 확인

  - API 레벨 23 이후
    - 매니페스트 파일에  <uses-permission> 선언
    - 앱을 실행할 때 사용자가 퍼미션을 거부했다면 다시 퍼미션을 허용해 달라 요청해야 함
  - 퍼미션 허용 확인 함수: checkSelfPermission() 함수
    - 두 번째 매개변수: 퍼미션하는 기능 이름
    - 반환 값: PackageManager.PERMISSION_GRANTED, PackageManager.PERMISSION_DENIED

  ------

  - 퍼미션 허용 요청 클래스- ActivityResultLauncher
    - 퍼미션 허용 요청
    - 다른 액티비티를 실행하고 결과를 돌려받을 때 사용
  - 퍼미션 허용 요청 함수- registerForActivityResult()
    - 첫 번째 매개변수: 어떤 요청인지 나타내는 객체(StartActivityForResult, RequestPermission)
    - 두 번째 매개변수: 결과를 받았을 때 호출되는 콜백

  ------

  - 퍼미션 허용 요청 실행

    : 객체 이름.launch(퍼미션 이름)

### 10-3. 다양한 다이얼로그

> 다이얼로그: 사용자와 상호 작용하는 대화 상자
>
> - 토스트, 날짜 또는 시간 입력, 알림 창, 커스텀 다이얼로그, …

- 토스트 메시지 띄우기

  - makeText()

    - open static fun makeText(context: Context!, text: CharSequence!, duration: Int): Toast!
    - open static fun makeText(context: Context!, resId: Int, duration: Int): Toast!
    - 두 번째 매개변수: 출력할 문자열
    - 세 번째 매개변수: 토스트가 화면에 출력되는 시간(Toast.LENGTH_SHORT, Toast.LENGTH_LONG)

  - makeText() 함수 외에 토스트를 만들 수 있는 세터 함수들

    - open fun setDuration(duration: Int): Unit

    - open fun setText(resId: Int): Unit

      → 문자열이나 화면에 보이는 시간을 설정할 수 있음

    - open fun setGravity(gravity: Int, xOffset: Int, yOffset: Int): Unit

    - open fun setMargin(horizontalMargin: Float, verticalMargin: Float): Unit

      → 토스트가 뜨는 위치를 정할 수 있음

  - show(): 토스트를 화면에 출력하는 함수

  ------

  - 콜백 함수 추가
    - toast 객체에 addCallback() 함수를 추가
    - onToastHidden(): 화면에서 사라지는 순간 호출되는 함수
    - onToastShown(): 화면에 토스트가 뜨는 순간 호출되는 함수

- 날짜 또는 시간 입력받기- AlertDialog의 하위 클래스

  - 피커 다이얼로그: 앱에서 사용자에게 날짜나 시간을 입력받는 데 사용하는 다이얼로그

    - 데이트 피커 다이얼로그: 날짜를 입력받을 때 사용
    - 타임 피커 다이얼로그: 시간을 입력받을 때 사용

  - 데이트 피커 다이얼로그

    - 생성자

      DatePickerDialog(context: Context, listener: DatePickerDialog.OnDateSetListener?, year: Int, month: Inr, dayOfMonth: Int)

    - 두 번째 매개변수: DatePickerDialog.OnDateSetListener 를 등록하면 사용자가 설정한 날짜를 콜백 함수로 얻을 수 있음

  - 타임 피커 다이얼로그

    - 생성자

      TimePickerDialog(context: Context!, listener: TimePickerDialog.OnTimeSetListener!, hourOfDay: Int, minute: Int, is24HourView: Boolean)

    - 두 번째 매개변수: TimePickerDialog.OnTimeSetListener 를 지정하면 사용자가 다이얼로그에서 설정한 시간을 얻을 수 있음

    - 5번째 매개변수: false(12시간 형태, 오전/오후 선택하는 부분이 보임), true(24시간 형태)

- 알림 창 띄우기- AlertDialog

  - 알림 창의 세 가지 영역: 선택적으로 화면에 표시 가능

    - 제목
    - 내용
    - 버튼

  - 알림 창의 생성자의 접근 제한자: protected

    - 객체를 직접 생성할 수 없음
    - AlertDialog.Builder 제공

  - AlertDialog.Builder

    - 알림 창 빌더 생성

      AlertDialog.Builder(context: Context!)

    - 빌더의 세터 함수로 알림 창의 정보(아이콘, 제목, 내용)를 지정

      open fun setIcon(iconId: Int): AlertDialog.Builder!

      open fun setTitle(title: CharSequence!): AlertDialog.Builder!

      open fun setMessage(message: CharSequence!): AlertDialog.Builder!

    - 알림 창에 버튼을 지정하는 함수

      → 알림 창의 버튼은 최대 3개까지만 추가 가능

      → 첫 번째 매개변수: 버튼의 분자열

      → 두 번째 매개변수: 사용자가 버튼을 클릭했을 때 처리할 이벤트 핸들러

      open fun setPositiveButton(text: CharSequence!, listener: DialogInterface.OnClickListener!): AlertDialog.Builder!

      open fun setNegativeButton(text: CharSequence!, listener: DialogInterface.OnClickListener!): AlertDialog.Builder!

      open fun setNeutralButton(text: CharSequence!, listener: DialogInterface.OnClickListener!): AlertDialog.Builder!

  ------

  - 버튼에 이벤트 핸들러 등록- onClick()
    - 두 번째 매개변수가 이벤트가 발생한 버튼을 Int로 알려줌
    - p1 == BUTTON_POSITIVE
    - p1 == BUTTON_NEGATIVE

  ------

  - 다양한 빌더의 세터 함수

    - setItems()

      open fun setItems(items: Array<CharSequence!>!, listener: DialogInterface.OnClickListener!): AlertDialog.Builder!

    - setMultiChoiceItems()

      open fun setMultiChoiceItems(items: Array<CharSequence!>!, checkedItems: BooleanArray!, listener: DialogInterface.OnMultiChoiceClickListener!): AlertDialog.Builder!

    - setSingleChoiceItems()

      open fun setSingleChoiceItems(items: Array<CharSequence!>!, checkedItems: Int, listener: DialogInterface.OnMultiChoiceClickListener!): AlertDialog.Builder!

    - 첫 번째 매개변수: 배열 정보, 문자열의 목록

  ------

  - 알림 창의 속성을 설정하는 함수

    - setCancelable(): 뒤로 가기 버튼을 눌렀을 때

      open fun setCancelable(cancelable: Boolean): AlertDialog.Builder!

    - setCanceledOnTouchOutside(): 알림 창의 바깥 영역을 터치했을 때

      open fun setCanceledOnTouchOutside(cancel: Boolean): Unit

    - true(기본 값)→ 알림 창을 닫음

    - false→ 알림 창 유지

- 커스텀 다이얼로그 만들기- AlertDialog 사용

  - LayoutInflater 클래스

    - 레이아웃 XML 파일을 코드에서 초기화하는 기능을 제공

      → XML 파일을 기반으로 뷰 객체를 생성해서 메모리에 할당

    - 초기화: XML 파일에 선언한 뷰를 코드에서 이용하고자 생성하는 작업

    - 액티비티의 화면을 구성하는 레이아웃 XML 파일을 제외한 XML 파일에서 해당 클래스를 주로 이용

  - 커스텀 다이얼로그 생성 및 적용

    - XML 파일 초기화

      1. LayoutInflater 를 얻어 inflate 함수를 호출하여 XML 파일 초기화

      → rootView: XML 의 루트 태그에 해당하는 객체(LinearLayout, …)

      ```xml
      val inflater= getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
      val rootView= inflater.inflate(R.layout.activity_one, null)
      ```

      1. 뷰 바인딩을 적용한 XML 파일 초기화

      ```xml
      val binding= ActivityOneBinding.inflate(layoutInflater)
      val rootView= binding.root
      ```

    - 커스텀 다이얼로그 구성(with XML 파일)

    - 커스텀 다이얼로그 출력: setView의 매개변수로 뷰 객체를 전달

      ```xml
      val dialogBinding= DialogInputBinding.inflate(layoutInflater)
      ...
      		setView(dialogBinding.root)
      		...
      ...
      }
      ```

### 10-4. 소리와 진동 알림

- 소리 알림

  - 안드로이드 시스템이 제공하는 소리

    - 알림(NOTIFICATION)
    - 알람(ALARM)
    - 벨소리(RINGTONE)
    - …

  - 앱에서 자체 음원을 준비해서 재생하는 방법

    - 음원 파일 저장 위치: res/raw

    - 음원을 재생하는 클래스: MediaPlayer

    - 음원 재생하기

      ```xml
      val player: MediaPlayer= MediaPlayer.create(this, R.raw.fallbackring)
      player.start()
      ```

- 진동 알림

  - 진동 퍼미션 얻기(in 매니페스트)

    ```xml
    <uses-permission android:name="android.permission.VIBRATE" />
    ```

  - Vibrator 클래스

    - API 31 버전 이전: 시스템 서비스(VIBRATOR_SERVICE) 이용
    - API 31 버전 이후: 시스템 서비스(VibratorManager- VIBRATOR_MANAGER_SERVICE) 를 얻어 서비스에서 Vibrator 이용
    - 진동 객체 얻기: p.291 참고

  - 시간과 패턴을 지정해 진동 울리기(API 레벨 1부터 제공하는 함수)

    - 26 버전부터는 이 함수를 deprecated

    - 26 버전 이전 사용자를 위한 함수

    - vibrate()

      open fun vibrate(milliseconds: Long): Unit

      → 매개변수: 진동이 울리는 시간

      open fun vibrate(pattern: LongArray!, repeat: Int): Unit

      → 첫 번째 매개변수: 진동 패턴

      → 두 번째 매개변수: 이 패턴을 얼마나 반복할지 지정(-1, 0)

  - 진동의 세기까지 지정해 진동 울리기(API 레벨 26부터 제공하는 함수)

    - 진동 정보(세기 포함)를 VibrationEffect 객체로 지정할 수 있음

    - vibrate()

      open fun vibrate(vibe: VibrationEffect!): Unit

    - createOneShot: 진동 정보를 지정하여 VibrationEffect 객체에 담음

      open static fun createOneShot(milliseconds: Long, amplitude: Int): VibrationEffect!

      → 첫 번째 매개변수: 시간

      → 두 번째 매개변수: 세기(0-255 / VibrationEffect.DEFAULT_AMPLITUDE)

    ------

    - 반복해서 진동을 울리는 함수: createWaveform()

      open static fun createWaveform(timings: LongArray!, amplitudes: IntArray!, repeat: Int): VibrationEffect!

### 10-5. 알림 띄우기

- 알림 채널

  - 알림: 상태 바에 앱의 정보를 출력하는 것

    - 앱에서 시스템에 의뢰하면 시스템에서 관리하는 상태 바에 앱의 알림을 출력할 수 있음

  - 알림을 위한 API

    - NotificationChannel로 알림 채널을 만들기
    - 알림 채널 정보를 NotificationCompat.Builder에 대입 → 여기까지 알림 빌더 작성
    - Notification.Builder로 Notification 객체를 만들어 NotificationManager의 notify() 에 대입

  - NotificationCompat.Builder를 만드는 방법

    - 26 버전 이전 생성자: Builder(context: Context!)

      → NotificationChannel 정보가 필요하지 않음

    - 26 버전 생성자: Builder(context: Context!, channelId: String!)

      → 두 번째 매개변수: NotificationChannel의 식별값

  - NotificationChannel(26 버전)

    - 앱의 알림을 채널로 구분

    - 알림 채널 생성자: NotificationChannel(id: String!, name: CharSequence!, importance: Int)

      → 첫 번째 매개변수: 채널의 식별값

      → 두 번째 매개변수: 설정 화면에 표시할 채널 이름을 문자열로 지정

      → 세 번째 매개변수: 이 채널에서 발생하는 알림의 중요도(p.296 참고)

  - 알림 빌더 작성(p.297 참고)

- 알림 객체

  > 빌더로 Notification 객체를 만들기

  - 알림 객체 설정(p.298 참고)
  - 알림 발생
    - manager.notify(11, builder.build())
    - builder.build()가 Notification 객체를 만들고 알림이 발생
    - 첫 번째 매개변수: 알림을 식별하는 데 사용하는 숫자
  - 알림 취소: manager.cancel(11)
    - 알림을 터치하여 자동으로 사라지게 함(취소)
    - 알림을 손가락으로 밀어서(스와이프) 사라지게 함(취소)
  - 알림 취소 막기: 빌더의 세터 함수로 지정해야 함
    - builder.setAutoCancel(false): 알림을 터치할 때 이벤트는 발생하지만 알림은 사라지지 않음
    - builder.setOngoing(true): 사용자가 알림을 스와이프해도 사라지지 않음
    - 두 세터 함수가 모두 true이면 cancel()로 알림을 없애야 함

- 알림 구성

  - 알림 터치 이벤트- 개념
    - 알림을 터치했을 때 앱의 액티비티 화면을 실행
    - 사용자가 알림을 터치했을 때 실행해야 하는 정보→ Notification 객체에 저장
    - 실제 이벤트가 발생→ 객체에 저장된 내용을 **시스템이 실행**

  > 인텐트: 앱의 컴포넌트를 실행하는 데 필요한 정보

  - 알림 터치 이벤트- 과정
    - 앱의 코드에서 인텐트를 준비하여 Notification 객체에 저장
    - 이벤트가 발생하는 시점에 인텐트를 실행해달라고 시스템에 의뢰 by PendingIntent 클래스
    - 코드(알림 객체에 액티비티 실행 정보 등록): p.301 참고

  ------

  - 액션: 전화 수신 및 거부

    - 알림에서 간단한 이벤트는 액션으로 처리

    - 인텐트 정보를 PendingIntent로 구성하여 등록해야 함(알림 터치 이벤트와 동일)

    - 액션 등록: addAction()

      open fun addAction(action: Notification.Action!): Notification.Builder

      → Action 객체는 Action.Builder로 만듦

    - 액션 빌더 생성자

      Builder(icon: Int, title: CharSequence!, intent: PendingIntent!)

    - 액션 등록하기: p.302 참고

  ------

  - 원격 입력: 카카오톡처럼 알림 창에서 답장

    - 액션의 한 종류

    - builder에 들어가는 정보

      → RemoteInput에 사용자 입력을 받는 정보를 식별 값으로 설정한 후 액션에 추가

      → RemoteInput에 힌트 문자열의 정보도 담김

    - 20버전 이전의 호환을 위한 라이브러리: androidx.core.app.RemoteInput

    - 위와 같이 PendingIntent로 인텐트 정보를 구성하고 원격 입력의 액션을 등록해야 함(p.304 참고)

    - 사용자가 입력한 글을 받는 코드

      val replyTxt= RemoteInput.getResultsFromIntent(intent)?.getCharSequence(”key_text_reply”)

      → getCharSequence() 매개변수의 문자열은 remoteInput의 식별값과 동일해야 함

    - 입력 글을 받으면 알림을 갱신해야 하며, 갱신 후에 입력 부분이 사라짐

      manager.notify(11, builder.build())

  ------

  - 프로그레스(서버로 파일을 올리거나 내려받는 경우)

    - 빌더에 setProgress() 함수 추가

      open fun setProgress(max: Int, progress: Int, indeterminate: Boolean): Notification.Builder

      → 세 번째 매개변수(true): 프로그레스 바가 왼쪽에서 오른쪽으로 계속 흘러가듯이 표현됨

    - 프로그레스 바의 진행 값을 증가시키는 스레드(p.305 참고)

- 알림 스타일

  - 큰 이미지 스타일: 스크린샷

    - BigPictureStyle 이용
    - p.306 참고

  - 긴 텍스트 스타일: 이메일 제목 및 내용 일부

    - BigTextStyle 이용
    - p.306 참고

  - 상자 스타일

    - 문자열을 목록으로 출력하는 InboxStyle을 이용
    - 하나의 알림에 문자열을 여러 개 나열할 때 유용
    - style.addLine(”~”)

  - 메시지 스타일

    - 여러 사람이 주고 받은 메시지를 구분해서 출력할 때 사용

    - 각 메시지를 Message 객체로 표현

    - Message 객체

      Message(text: CharSequence, timestamp: Long, sender: Person?)

      → 세 번째 매개변수 Person: 알림에 출력될 한 사람의 정보를 담는 클래스

    - Person 클래스

      → API 레벨 28 버전에 추가된 클래스

      → 호환성을 위한 라이브러리: androidx.core.app.Person

    - 생성한 Message 객체를 MessageStyle에 대입(p.308 참고)

### 10-6. 카카오톡 알림 만들기 Do it!(실습)

> 정리
>
> - minSdk 보다 상위 버전에서 제공하는 API를 이용한다면 API 레벨 호환성을 고려하여 작성해야 함
> - <permission> 으로 보호받는 기능을 이용하는 앱은 매니페스트 파일에 <uses-permission> 을 선언해주어야 함
> - 안드로이드 다이얼로그의 기본은 AlertDialog이며 화면에 문자열 이외에 다양한 뷰를 출력할 수 있음
> - 알림은 Notification 정보이며 기본 정보 이외에 BigTextStyle, BigPictureStyle, InboxStyle, MessageStyle 등의 스타일로 구성할 수 있음
