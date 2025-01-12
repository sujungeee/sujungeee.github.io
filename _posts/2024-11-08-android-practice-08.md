---
title: "[안드로이드] 08. Thread & Coroutines"
author: sujungeee
date: 2024-11-08 23:46:00 +0800
categories: [Android App, 실습]
tags: [Android, Kotlin, practice]
render_with_liquid: false

---

> Thread & Coroutines



### Thread

- 안드로이드 UI 스레드

  - 안드로이드의 UI 스레드 == 메인 스레드
  - 다른 스레드에서 UI 관련 작업을 수행하려면, 메인 스레드로 메시지를 전송해야 함
  - Looper
    - 메시지 큐에서 대기하고 있는 메시지를 handler로 전달
    - HandlerThread: 메인 스레드의 Looper를 사용하지 않고, **독립된 Looper를 가지는 스레드**에서 생성
  - Handler
    - Looper가 보낸 메시지 혹은 Runnable 객체를 처리

   - 예시 코드 1- in 다른 스레드

     ```kotlin
     val handler = Handler(Looper.getMainLooper()) // 메인 스레드의 Looper와 연결된 Handler를 생성
     inner class ThreadClass : Thread() {
         override fun run() {
             while(isRunning) {
                 sleep(100)
                 handler.post(object: Runnable{
                     override fun run(){
                         binding.helloTextview.text = System.currentTimeMillis().toString()
                     }
                 })
             }
         }
     }
     ```

   - 예시 코드 2- in 메인 스레드

     ```kotlin
     val handler = Handler(Looper.getMainLooper())
     Thread {
         for(i in ImageList) {
             Thread.sleep(1000)
             handler.post {
                 binding.imgg.setImageResource(i)
             }
         }
     }.start()
     ```

     - 메인 스레드에서 start()를 하면 새로운 백그라운드 스레드에서 Thread.sleep(100)이 비동기로 실행됨
     - UI 관련 작업은 handler를 통해 메인 스레드로 post하여 처리할 수 있게 함

   - Thread{}.start()와 run() 의 차이점

     - Thread{}.start(): 메인 스레드에서 스레드를 생성하고 시작하면, **새로운 스레드**가 실행됨
     - run(): 현재 스레드에서 동기적으로 실행됨



- runOnUiThread
  - 메인 스레드에서 runOnUiThread가 호출되면
    - Runnable의 run 메소드가 호출되어 블록 {} 안의 작업이 즉시 실행됨
  - 메인 스레드가 아닌 백그라운드 스레드에서 runOnUiThread가 실행되면
    - 내부적으로 Handler.post()를 통해 {} 블록을 메인 스레드의 메시지 큐에 전달



### Coroutine

- Coroutine
  - 진입점을 여러 개 허용하는 서브 루틴
  - event loops, iterators, 무한 리스트, 파이프 같은 것을 구현하는 데 적합



- blocking, nonblocking, sync, async

  |             | 특징                                                         |
  | ----------- | ------------------------------------------------------------ |
  | blocking    | - 호출한 스레드가 작업이 끝날 때까지 멈춰있음.<br>- 작업이 완료될 때까지 다른 일을 하지 못하고 기다려야 함. |
  | nonblocking | - 호출한 스레드가 작업이 끝날 때까지 기다리지 않고, 바로 다음 작업을 수행함.<br>- 작업이 완료되면 결과를 별도의 콜백이나 메커니즘으로 전달받음. |
  | sync        | 순차적으로 작업 실행, 하나의 작업이 끝나야 다음 작업 시작    |
  | async       | 작업이 병렬적으로 실행, 결과를 기다리는 동안 다른 작업 수행 가능 |

  
