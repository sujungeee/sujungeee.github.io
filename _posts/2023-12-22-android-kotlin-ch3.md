---
title: "[안드로이드] Ch3. 코틀린 시작하기"
author: sujungeee
date: 2023-12-22 19:37:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 03-1. 코틀린 언어 소개

- 코틀린의 등장 배경
  - Explanation
    - 코틀린 컴파일러가 .kt 파일을 컴파일하면 자바 바이트 코드가 만들어짐
  - 코틀린의 이점
    - 표현력과 간결함
    - 안전한 코드(널 안전성)
    - 상호 운용성
    - 구조화 동시성(코루틴)
- 코틀린 파일 구성
  - 패키지
    - 다른 경로의 패키지를 선언하면, 컴파일된 클래스 파일은 선언한 패키지 경로에 생성됨
  - 임포트
  - 멤버(변수, 함수, 클래스)
    - 같은 패키지 내의 서로 다른 .kt 파일에서는 import 구문 없이 참조가 가능
    - 세 멤버들은 최상위에 선언이 가능

### 03-2. 변수와 함수

- 변수 선언하기

  - 초깃값 할당

    - 최상위에 선언한 변수나 클래스의 멤버 변수: 선언과 동시에 초깃값 할당 필수*

  - 초기화 미루기: lateinit & lazy 키워드

    - lateinit

      → 이후에 초깃값을 할당할 것임을 명시적으로 선언

      → var 키워드로 선언한 변수에만 사용할 수 있음

      → Int, Long, Short, Double, Float, Boolean, Byte 타입에는 사용할 수 없음

    - lazy

      → lazy로 선언한 변수가 최초로 사용되는 순간 중괄호로 묶은 부분이 자동으로 실행됨

      → 중괄호의 마지막 값이 변수의 초깃값이 됨

      ```kotlin
      val data4: Int by lazy{
      		println("in lazy......")
      		10
      }
      
      fun main(){
      		println("in main......")
      		println(data4+10)
      		println(data4+10)
      }
      // 실행 결과
      // in main......
      // in lazy......
      // 20
      // 20
      ```

- 데이터 타입

  > 코틀린의 모든 변수는 객체

  - 기초 타입 객체- Int, Short, Long, Double, Float, Byte, Boolean

    - 기초 데이터를 객체로 표현하는 타입

  - 문자와 문자열- Char, String

    - Char- Number 타입으로 표현 불가능(아스키코드 안된다는 뜻인듯?)
    - String: “”- 이스케이프 문자로 들여쓰기 등을 사용 / “””- 작성 그대로 들여쓰기 반영
    - .trimIndent(): 삼중 따옴표 뒤에 해당 함수를 사용하면 문자열 앞에 공백을 없애줌

  - 모든 타입 가능- Any

    - Any 클래스는 최상위 클래스이므로 모든 타입의 데이터를 할당

  - 반환문이 없는 함수- Unit

    - 데이터의 형식이 아닌 특수한 상황을 표현하려는 목적으로 사용
    - Unit 타입으로 선언한 변수에는 Unit 객체만 대입 가능
    - 주로 함수의 반환 타입으로 사용: 반환문이 없음을 명시적으로 나타냄

  - null이나 예외를 반환하는 함수- Nothing

    - Unit과 마찬가지로 특수한 상황을 표현하려는 목적으로 사용

    - Nothing으로 선언한 변수에는 null만 대입 가능

      → 즉, Nothing 타입으로 선언한 변수는 의미가 존재하지 않음

    - 주로 함수의 반환 타입으로 사용: 반환문이 null이거나 throw Exception()

      → 반환문이 null이면 반환 타입을 Nothing? 으로 해주어야함

- 함수 선언하기

  - 형식

    fun 함수명(매개변수명: 타입): 반환 타입 { … }

  - 함수의 매개변수

    - 자동으로 val이 적용
    - 기본값 선언 가능: 명명된 매개변수

- 컬렉션 타입

  : 여러 개의 데이터를 표현하는 방법으로, Array, List, Set, Map이 있음

------

- Array- 배열

  - 생성자

    <init>(size: Int, init: (Int) → T)

  - 예시- Array<Int> = Array(3, {0})

  - 배열의 데이터에 접근

    - 대괄호: []
    - set(), get()

  - 기초 타입의 배열

    - 선언: 제네릭으로 명시하는 대신 기초 타입의 배열 클래스를 이용하여 선언

      ex) val data1: IntArray = IntArray(3, {0})

    - 선언 및 할당: 제네릭 및 기초 타입의 arrayOf() 함수를 이용하여 선언

      ex) val data1 = arrayOf<Int>(10, 20, 30)

      val data1 = intArrayOf(10, 20, 30)

- Lisr, Set, Map- Collection 타입 클래스

  > Collection 타입 클래스: Collection 인터페이스를 타입으로 표현한 클래스

  - 각 클래스의 정의

    - List: 순서가 있는 데이터 집합으로 데이터의 중복을 허용
    - Set: 순서가 없으며 데이터의 중복을 허용하지 않음
    - Map: 키와 값으로 이루어진 데이터 집합으로 순서가 없으며 키의 중복은 허용하지 않음

  - Collection 타입 클래스: 가변 클래스와 불변 클래스로 나뉨

    - 가변 클래스: size(), get(), + add(), set()
    - 불변 클래스: size(), get()

    ![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/172bb018-ccf7-4f0a-8e54-377bfd23b24d/54388362-0832-4628-8a3c-3bfc58a1048c/Untitled.jpeg)

  - Map 객체

    - Pair 객체

    - 키 to 값

    - 예시

      ```kotlin
      fun main(){
      		var map = mapOf<String, String>(Pair("one", "hello"), "two" to "world")
      		println("map size: ${map.size}")
      		println("map data: ${map.get("one")}, ${map.get("two")}")
      } 
      ```

### 03-3. 조건문과 반복문

- 조건문 if-else와 표현식

  - 표현식: 결괏값을 반환하는 계산식

  - if-else 표현식

    - else는 생략할 수 없음
    - if-else의 형태이거나 if-else if-else의 형태여야함

  - 예시

    ```kotlin
    fun main(){
    		var data = 10
    		val result = if(data > 0){
    				println("data > 0")
    				true
    		} else{
    				println("data <= 0")
    				false
    		}
    		println(result)
    }
    ```

- 조건문 when

  : when 키워드 다음의 소괄호() 안에 넣은 데이터가 조건이 되고 이 값에 따라 각 구문을 실행

  - 소괄호() 가 있는 when문

    ```kotlin
    fun main(){
    		var data: Any = 10
    		when(data){
    				is String -> prinln("data is String")
    				20, 30 -> println("data is 20 or 30")
    				in 1..10 -> println("data is 1..10") // 출력 결과
    				else -> println("data is not valid")
    		}
    }
    ```

  - 소괄호가 없는 when 문

    - 조건만 명시

    ```kotlin
    fun main(){
    		var data = 10
    		when{
    				data <= 0 -> println("data is <=0")
    				data > 100 -> println("data is > 100")
    				else -> println("data is valid") // 출력 결과
    		}
    }
    ```

    - 표현식 사용: when 문에서의 표현식은 else를 생략할 수 있음

    ```kotlin
    fun main(){
    		var data = 10
    		val result = when{
    				data <= 0 -> "data is <= 0"
    				data > 100 -> "data is > 100"
    				else -> "data is valid"
    		}
    		println(result)
    }
    ```

- 반복문 for와 while

  - for문의 조건

    - for (i in 1..10): 1부터 10까지 1씩 증가
    - for (i in 1 until 10): 1부터 9까지 1씩 증가(10은 미포함)
    - for (i in 2..10 step 2): 2부터 10까지 2씩 증가
    - for (i in 10 downTo 1): 10부터 1까지 1씩 감소

  - 반복 조건- .indices

    : 컬렉션 타입의 인덱스

    ```kotlin
    fun main(){
    		var data = arrayOf<Int>(10, 20, 30)
    		for(i in data.indices){
    				print(data[i])
    				if(i != data.size-1) print(", ")
    		}
    }
    // 실행 결과: 10, 20, 30
    ```

  - 반복조건- .withIndex()

    : 인덱스와 실제 데이터를 함께 가져오기

    ```kotlin
    fun main(){
    		var data = arrayOf<Int>(10, 20, 30)
    		for((index, value) in data.withIndex()){
    				print(value)
    				if(index != data.size-1) print(", ")
    		}
    }
    // 실행 결과: 10, 20, 30
    ```

  - while문: 조건이 참이면 중괄호{} 로 지정한 영역을 반복해서 실행

    ```kotlin
    fun main(args: Array<String>){
    		var x = 0
    		var sum1 = 0
    		while(x<10){
    				sum1 += ++x
    		}
    		println(sum1)
    }
    // 실행 결과: 55(10까지 더한 결과, x는 11이 됨)
    ```

> 정리
>
> - 코틀린 소스 파일에는 패키지, 임포트, 변수, 함수, 클래스 등을 선언한다.
> - 코틀린에서는 변수, 함수를 소스의 최상위에 선언할 수 있다.
> - 코틀린의 변수는 var와 val 키워드로 선언하며 각각 가변과 불변으로 구분된다.
> - 코틀린의 모든 타입은 객체
> - 코틀린의 List, Set, Map 타입은 가변과 불변으로 구분해서 사용
> - 코틀린에서는 if, when 조건문을 표현식으로 사용할 수 있음.
>   - if는 else 생략 불가
>   - when은 else 생략 가능
