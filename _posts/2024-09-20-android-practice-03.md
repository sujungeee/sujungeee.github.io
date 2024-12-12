---
title: "[안드로이드] 03. Service"
author: sujungeee
date: 2024-09-20 21:31:00 +0800
categories: [Android App, 실습]
tags: [Android, Kotlin, practice]
render_with_liquid: false

---

> Android Service



### Android Service

- 서비스의 특징
  - 액티비티의 생명주기에 종속되어 있지 않음
  - 호스팅 프로세스의 메인 스레드에서 작동
  - 액티비티가 비활성화되면 액티비티보다 우선순위가 높음



- startService vs bindService

  | startService                                                 | bindService                                                |
  | ------------------------------------------------------------ | ---------------------------------------------------------- |
  | 앱 내의 액티비티같은 컴포넌트가 호출됐을 때 실행됨           | 자신을 호출했던 컴포넌트와 interaction을 주고 받을 수 잇음 |
  | 백그라운드에서 한 가지 일을 하며, 결과를 호출했던 컴포넌트에게 보내지 않음 | 처리한 결과를 주고 받을 수 있음                            |
  | startForegroundService()로도 시작 가능(API Level 26 이상)    | 서로 다른 프로세스 상에 있어도 처리 가능                   |



- startService

  - 컴포넌트에서 호출

    ```kotlin
    val intent = Intent(this, MyService::class.java)
    
    binding.startServiceBtn.setOnClickListener {
        intent.putExtra("hello", "from Activity")
        startService(intent)
        Log.d(TAG, "onCreate: startService()")
    }
    
    binding.stopServiceBtn.setOnClickListener {
        stopService(intent);
        Log.d(TAG, "onCreate: StopService()")
    }
    ```

  - MyService::class.java

    ```kotlin
    class MyService : Service() {
    
        override fun onCreate() {
            super.onCreate()
            Log.d(TAG, "onCreate: ")
        }
    
        override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
            Log.d(TAG, "onStartCommand: ")
    //        return super.onStartCommand(intent, flags, startId)
            return START_STICKY
        }
    
        override fun onBind(intent: Intent): IBinder {)
        }
    
        override fun onDestroy() {
            super.onDestroy()
            Log.d(TAG, "onDestroy: ")
        }
    }
    ```

  - return 값

    - START_NOT_STICKY: 서비스가 시스템에 의해 종료되었을 때, PendingIntent가 따로 있지 않으면 다시 생성 X
    - START_STICKY: 시스템에 의해 종료되어도 다시 서비스가 생성되지만, 마지막 인텐트를 전해주지는 않음(default)
    - START_REBUILDER_INTENT: 시스템에 의해 종료되어도 서비스 + 전달되었던 인텐트 값까지 전부 유지됨

​	

- bindService

  > 이 친구는 나중에..



### Foreground Service

- AndroidManifest.xml 설정

  ```xml
  <!-- push전송 permission -->
  <uses-permission android:name="android.permission.POST_NOTIFICATIONS" /> <!-- foreground 서비스 권한 -->
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
  
  <service
          android:name=".MyForegroundService"
          android:foregroundServiceType="mediaPlayback" />
  ```

  - 서비스 타입(foregroundServiceType)을 지정해야 함



- 컴포넌트에서 서비스 호출

  ```kotlin
  // 알림 허용 팝업권한 체크 & 팝업 띄우기.
  val permission = ContextCompat.checkSelfPermission(this, android.Manifest.permission.POST_NOTIFICATIONS)
  Log.d(TAG, "onCreate: $permission")
  if(permission != PackageManager.PERMISSION_GRANTED){
      ActivityCompat.requestPermissions(this, arrayOf(android.Manifest.permission.POST_NOTIFICATIONS), 100)
  }
  
  val intent = Intent(this, MyForeService::class.java)
  
  binding.startServiceBtn.setOnClickListener {
      intent.putExtra("hello", "from Activity")
      startService(intent)
      Log.d(TAG, "onCreate: startService()")
  }
  
  binding.stopServiceBtn.setOnClickListener {
      stopService(intent);
      Log.d(TAG, "onCreate: StopService()")
  }
  ```

  

- MyForeService::class

  ```kotlin
  private fun startForegroundService() {
          val manager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
          val notificationIntent = Intent(this, StartServiceActivity::class.java)
          val pendingIntent =
              PendingIntent.getActivity(this, 0, notificationIntent, PendingIntent.FLAG_IMMUTABLE)
          val builder = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
              val CHANNEL_ID = "notification_channel"
              val channel = NotificationChannel(
                  CHANNEL_ID,
                  "Notification Channel",
                  NotificationManager.IMPORTANCE_LOW // 알람만 (소리 X)
              )
              manager.createNotificationChannel(channel)
              NotificationCompat.Builder(this, CHANNEL_ID)
          } else {
              NotificationCompat.Builder(this)
          }
  
          builder.setSmallIcon(R.drawable.ic_outline_play_arrow_24)
              .setContentTitle("MyMusic Foreground")
              .setContentText("music play.....")
              .setAutoCancel(true)
              .setContentIntent(pendingIntent)
          startForeground(101, builder.build())
  }
  ```

  
