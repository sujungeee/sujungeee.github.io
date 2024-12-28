---
title: "[안드로이드] 05. Intent & Permissions"
author: sujungeee
date: 2024-10-27 23:45:00 +0800
categories: [Android App, 실습]
tags: [Android, Kotlin, practice]
render_with_liquid: false

---

> Intent



### 명시적 인텐트

> 실행하고자 하는 컴포넌트 이름과 클래스명이 명시적으로 작성되어 호출할 대상을 확실히 알 수 있는 경우에 사용

```kotlin
val intent = Intent(this, NextActivity::class.java)
intent.putExtra("Key", "MainActiviy에서 명시적 인텐트 전달")
startActivity(intent)
```

- 단방향: startActivity()



### 암시적 인텐트

> 인텐트의 액션과 데이터를 지정하긴 했지만, 호출할 대상이 달라질 수 있는 경우에 사용

```kotlin
val intent= Intent(Intent.ACTION_VIEW, Uri.parse("http://www.google.com/"))
startActivity(intent)
```



- 전화 연결(Call)
  - Ted Permission 라이브러리 등록
  - PermissionListener로 권한 획득 / 실패 시의 수행할 동작 정의
  - AndroidManifest.xml에 사용하려는 권한을 선언



### Permission

- Install time permissions
- Runtime Permissions
- Special Permissions



### 권한 요청

- 구현

  - AndroidManifest.xml 파일에 선언

    ```xml
    <!-- 위치관련 권한을 설정. -->
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    ```

  - 권한이 부여되었는지 확인하는 메소드: ContextCompat.checkSelfPermission()

    - 호출 결과: PERMISSION_GRANTED / PERMISSION_DENIED

  - 권한이 없을 때 권한 요청 창 띄우기

    ```kotlin
    ActivityCompat.requestPermissions(this, RUNTIME_PERMISSIONS, PERMISSION_REQUEST_CODE);
    ```

  - 권한 요청에 응답할 때 콜백 메소드 호출

    ```kotlin
    override fun onRequestPermissionsResult( requestCode: Int, permissions: Array<String>, grantResults: IntArray  ) {
            super.onRequestPermissionsResult(requestCode, permissions, grantResults)
            when (requestCode) {
                PERMISSION_REQUEST_CODE -> {
                    Log.d(TAG, "onRequestPermissionsResult: 건수 : $grantResults")
              
                    if(grantResults.isNotEmpty() && !grantResults.contains(PackageManager.PERMISSION_DENIED)){ //전체 권한 획득된 경우.
                        Toast.makeText(this, "모든 권한이 허가되었습니다.", Toast.LENGTH_SHORT).show()
                        init()
                    }else{ //거절된 경우
                        Toast.makeText(this, "권한이 부족합니다.", Toast.LENGTH_SHORT).show()
                    }
                }
            }
        }
    ```

  - 사용자가 권한을 최종 거부한 경우: dialog로 권한 설정 화면으로 안내하기

    ```kotlin
    val intent = Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS).setData(
                    Uri.parse("package:" + this.getPackageName())
                )
    this.startActivity(intent)
    ```

    

### Flags

- Intent.FLAG_ACTIVITY_SINGLE_TOP
  - top 액티비티와 동일한 액티비티가 호출될 때 기존 액티비티를 재사용함



- Intent.FLAG_ACTIVITY_NO_HISTORY

  - 해당 액티비티는 task 스택에 쌓이지 않음

  

- Intent.FLAG_ACTIVITY_CLEAR_TASK / Intent.FLAG_ACTIVITY_NEW_TASK

  - task 내에서 다른 액티비티를 모두 삭제함

  - 예시: 로그인 성공 시 기존의 모든 액티비티(예: 스플래시 화면, 로그인 화면)를 제거하고, 메인 화면만 새로운 태스크로 시작

    ```kotlin
    // LoginActivity에서 MainActivity로 이동
    val intent = Intent(this, MainActivity::class.java).apply {
        flags = Intent.FLAG_ACTIVITY_CLEAR_TASK or Intent.FLAG_ACTIVITY_NEW_TASK
    }
    startActivity(intent)
    ```

    - 기존 태스크에 있던 모든 액티비티(예: `SplashActivity`, `LoginActivity`)가 제거됨
    - `MainActivity`가 새로운 태스크의 **루트**가 됨
    - 백 버튼을 눌러도 이전 액티비티로 돌아갈 수 없음



- Intent.FLAG_ACTIVITY_CLEAR_TOP
  - **기존 백스택에 동일한 액티비티가 존재하는 경우** 해당 액티비티 위의 모든 액티비티를 제거하고, 그 액티비티를 **최상단으로 가져오는 플래그**
