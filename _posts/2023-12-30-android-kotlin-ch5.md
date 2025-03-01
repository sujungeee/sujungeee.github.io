---
title: "[안드로이드] Ch5. 코틀린의 유용한 기법"
author: sujungeee
date: 2023-12-30 18:03:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 05-1. 람다 함수와 고차 함수

> 람다 함수: 익명 함수 정의 기법으로, 주로 함수를 간단히 정의할 때 이용
>
> 고차 함수: 함수를 매개변수로 전달받거나 반환하는 함수

- 람다 함수

  - 람다 함수 선언과 호출

    - [형식] { 매개변수 → 함수 본문 }
    - 람다 함수를 사용하는 규칙

    1. 람다 함수는 {} 로 표현
    2. {} 안에 화살표 → 가 있으며 화살표 왼쪽은 매개변수, 오른쪽은 함수 본문
    3. 함수의 반환 값은 함수 본문의 마지막 표현식

    - 선언: val sum= { no1: Int, no2: Int → no1 + no2 }

    - 호출

      → sum(10, 20)

      → { no1: Int, no2: Int → no1 + no2 } (10, 20)

  - 매개변수 없는 람다 함수

    - 매개변수가 없으면 화살표 왼쪽을 비워두면 됨

    - 화살표도 생략해도 됨

    - 예시

      ```kotlin
      	{ -> println("function call") }
      { println("function call") }
      ```

  - 매개변수가 1개인 람다 함수

    - 매개변수가 1개인 람다 함수는 매개변수를 선언하지 않아도 함수로 전달된 값을 쉽게 이용 가능

    - it이 가리키는 데이터는 Int 타입의 매개변수

    - 예시- 둘 다 같은 의미

      ```kotlin
      fun main(){
      		val some= { no: Int -> println(no) }
      		some(10)
      }
      ```

      ```kotlin
      fun main(){
      		val some: (Int) -> Unit= { println(it) }
      		some(10)
      }
      ```

  - 람다 함수의 반환

    - 람다 함수에서는 return 문 사용 X
    - 람다 함수에서의 반환 값은 화살표 오른쪽인 본문에서 마지막 줄의 실행 결과

    ```kotlin
    fun main(){
    		val some= {no1: Int, no2: Int ->
    				println("in lambda function")
    				no1*no2
    		}
    		println("result: ${some(10, 20)}")
    }
    // 실행 결과
    // in lambda function
    // result: 200
    ```

- 함수 타입과 고차 함수

  - 함수 타입 선언

    - 변수에 함수를 대입하려면 변수를 함수 타입으로 선언해야 한다.

    - val some: (Int, Int) → Int= { no1: Int, no2: Int → no1 + no2 }

      → 함수 내용: { no1: Int, no2: Int → no1 + no2 }

  - 타입 별칭- typealias

    - 함수 타입을 typealias로 선언

    - typealias

      → 타입의 별칭을 선언하는 키워드

      → 함수 타입 뿐만 아니라 데이터 타입을 선언할 때도 사용

    - 예시

      ```kotlin
      typealias MyFunType= (Int, Int) -> Boolean
      
      fun main(){
      		val someFun: MyFunType= { no1: Int, no2: Int -> no1 > no2 }
      		println(someFun(10, 20)) // false
      		println(someFun(20, 10)) // true
      }
      ```

  - 매개변수 타입 생략: 매개변수 타입을 유추할 수 있다면 타입의 선언을 생략해도 됨

    - 예시-1: typealias 사용

      ```kotlin
      typealias MyFunType= (Int, Int) -> Boolean
      val someFun: MyFunType= { no1, no2 -> no1 > no2 }
      ```

    - 예시-2: typealias 사용 X

      ```kotlin
      val someFun: (Int, Int) -> Boolean= { no1, no2 -> no1 > no2 }
      ```

    - 예시-3: typealias 사용 X + 함수 타입 생략

      ```kotlin
      val someFun= { no1: Int, no2: Int -> no1 > no2 }
      ```

  - 고차 함수: 함수가 매개변수 또는 반환 타입이 되는 함수

    - hofFun()을 호출하려면 인자로 함수를 전달해야 함
    - 호출 결과는 함수로 result에 저장
    - result()로 String 결괏값을 반환받아 출력(println)

    ```kotlin
    fun hofFun(arg: (Int) -> Boolean): ()-> String{
    		val result= if(arg(10)){
    				"valid"
    		} else{
    				"invalid"
    		}
    		return {"hofFun result: $result"}
    }
    fun main(){
    		val result= hofFun({ no -> no > 0 })
    		println(result())
    }
    ```

### 05-2. 널 안전성

- 널 안전성이란?

  - 널(null)

    - null을 가지는 변수는 주소를 가지지 못하여 이용할 수 없음
    - null인 변수(객체)를 이용하면 널 포인트 예외가 발생

  - 널 안정성: 널 포인트 예외가 발생하지 않도록 코드를 작성하는 것

    - 코틀린의 널 안전성 지원: 객체가 널인 상황에서 널 포인터 예외가 발생하지 않도록 연산자를 비롯해 여러 기법을 제공

    ```kotlin
    fun main(){
    		var data: String?= null
    		val length= if (data= null){
    				0
    		} else{
    				data.length
    		}
    		println("data length: $length")
    }
    // 실행 결과: data length: 0
    ```

    ```kotlin
    fun main(){
    		var data: String?= null
    		println("data length: ${data?.length ?: 0}")
    }
    ```

- 널 안전성 연산자

  - 널 허용- ? 연산자

    - 타입 뒤에 ? 을 붙이면 null을 허용

    - var data2: String?= “kkang”

      data= null

  - 널 안전성 호출- ?. 연산자

    - 널 허용으로 선언한 변수에 접근할 때는 반드시 ?. 연산자를 이용해야 함

    - ?. 연산자는 변수가 null이 아니면 멤버에 접근하지만

    - null이면 멤버에 접근하지 않고 null을 반환

    - var data: String?= “kkang”

      var length= data?.length

  - 엘비스- ?: 연산자

    - 변수가 널일 때 대입해야 하는 값이나 실행해야 하는 구문을 ?: 뒤에 작성
    - 널이 아닐 경우는 ?: 앞을 실행

    ```kotlin
    fun main(){
    		var data: String?= "kkang"
    		println("data= $data: ${data?.length ?: -1}")
    		data= null
    		println("data= $data: ${data?.length ?: -1}")
    }
    // 실행 결과
    // data = kkang : 5
    // data = kkang : -1
    ```

  - 예외 발생- !! 연산자

    - !!은 객체가 널일 때 널 포인트 예외를 발생시키는 연산자
    - some() 에 null을 전달하면 data!!.length 코드로 예외 메시지를 출력

    ```kotlin
    fun some(data: String?): Int{
    		return data!!.length
    }
    
    fun main(){
    		println(some("kkang"))
    		println(some(null))
    }
    // 실행 결과
    // 5
    // Exception in thread "main" java.lang.NullPointerException
    ```

> 정리
>
> - 람다 함수는 익명 함수
> - 매개변수가 1개인 람다 함수는 함수에서 매개변수를 it 키워드로 이용할 수 있음
> - 람다 함수에는 명시적으로 return 문을 사용할 수 없으며 함수의 마지막 실행문의 결괏값을 반환
> - 함수를 매개변수로 받거나 반환하는 함수를 고차함수라고 함
> - 널 안정성이란 널 포인트 예외가 발생하지 않게 프로그래밍해야 한다는 의미이며,
> - 코틀린에서는 이를 지원하는 ? / ?. / ?: / !! 등의 연산자를 제공
