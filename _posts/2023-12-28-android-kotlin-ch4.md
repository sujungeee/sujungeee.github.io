---
title: "[안드로이드] Ch4. 코틀린 객체지향 프로그래밍"
author: sujungeee
date: 2023-12-28 10:56:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 04-1. 클래스와 생성자

- 클래스 선언

  - [형식] class User {}

  - 클래스의 멤버: 생성자, 변수, 함수, 클래스

  - 생성자

    ```kotlin
    class User{
    		constructor(name: String){
    				this.name= name
    		}
    }
    ```

  - 클래스: 클래스 안에 다른 클래스를 선언할 수 있음

    ```kotlin
    class User{
    		class SomeClass {}
    }
    ```

- 주 생성자

  - Explanation

    - 코틀린 클래스의 생성자는 주 생성자와 보조 생성자로 구분된다.
    - 주 생성자 선언은 필수는 아니지만 한 클래스에 하나만 가능함
    - 주 생성자 선언을 하지 않으면 컴파일러가 매개변수가 없는 주 생성자를 자동으로 추가

  - 주 생성자의 본문- init 영역

    - init 키워드로 주 생성자의 본문을 구현할 수 있음

    - 객체를 생성하면 자동으로 실행됨

    - (나중에) 보조 생성자로 객체를 생성할 때도 init 으로 실행 가능

    - 주 생성자로 받는 매개변수는 init에만 적용되는 지역 변수이므로,

      → 클래스 내의 다른 함수에서도 매개변수를 이용하고 싶다면 클래스 멤버 변수를 선언해야 함

      → 또는 그냥 주 생성자의 매개변수에 var이나 val 키워드를 선언하면 바로 클래스 멤버 변수 이용 가능(원래 함수는 매개변수 선언 시 var이나 val 키워드를 추가할 수 없음)

    ```kotlin
    class User(val name: String, val count: Int){
    		init{
    				println("i am init")
    		}
    		fun someFun(){
    				println("name: $name, count: $count")
    		}
    }
    
    fun main(){
    		val user= User("kkang", 10)
    		user.someFun()
    }
    // 실행 결과:
    // i am unit
    // name: kkang, count: 10
    ```

- 보조 생성자

  - Explanation

    - 클래스의 본문에 constructor 키워드로 선언하는 함수
    - 객체를 생성하면 자동으로 실행됨

  - 보조 생성자에 주 생성자 연결

    : 클래스에서 두 생성자를 모두 선언할 시에는 반드시 생성자끼리 연결해주어야 함

    - 보조 생성자(1개)에서 주 생성자 호출

      ```kotlin
      class User(name: String){
      		constructor(name: String, count: Int): this(name){
      				(...)
      		}
      }
      fun main(){
      		val user= User("kkang", 10)
      }
      ```

    - 보조 생성자(여러개)에서 주 생성자 호출

      ```kotlin
      class User(name: String){
      		init{
      				(...)
      		}
      		constructor(name: String, count: Int): this(name){
      				(...)
      		}
      		constructor(name: String, count: Int, email: String): this(name, count){
      				(...)
      		}
      }
      fun main(){
      		val user= User("kkang", 10, "a@a.com")
      }
      ```

### 04-2. 클래스를 재사용하는 상속

- 상속과 생성자

  - 클래스 상속 형식: 상위 클래스에는 open 키워드 필수**

    ```kotlin
    open class Super{
    
    }
    class Sub: Super(){
    
    }
    ```

  - 하위 클래스에서의 상위 클래스 생성자 호출

    - 하위 클래스에 보조 생성자가 없는 경우

      ```kotlin
      open class Super(name: String){
      
      }
      class Sub(name: String): Super(name){
      
      }
      ```

    - 하위 클래스에 보조 생성자가 있는 경우

      ```kotlin
      open class Super(name: String){
      
      }
      class Sub(name: String){
      		constructor(name: String): super(name){
      				// 보조 생성자에서는 상위 클래스의 맨 앞이 소문자
      		}
      }
      ```

- 오버라이딩- 재정의

  - Explanation

    - 상위 클래스에 선언된 변수나 함수를 같은 이름으로 하위 클래스에서 다시 선언하는 것
    - 상위 클래스는 변수나 함수 앞에 open 키워드를 작성해야 함
    - 하위 클래스는 변수나 함수 앞에 override 키워드를 작성해야 함

  - 예시

    ```kotlin
    open class Super{
    		open var someData= 10
    		open fun someFun(){
    				println("i am super class function: $someData")
    		}
    }
    class Sub: Super(){
    		override var someData= 20
    		override fun someFun(){
    				println("i am sub class function: $someData")
    		}
    }
    
    fun main(){
    		val obj= Sub()
    		obj.someFun()
    }
    // 실행 결과: i am sub class function: 20
    ```

- 접근 제한자

  | 접근 제한자 | 최상위에서 이용       | 클래스 멤버에서 이용               |
  | ----------- | --------------------- | ---------------------------------- |
  | public      | 모든 파일에서 가능    | 모든 클래스에서 가능               |
  | internal    | 같은 모듈 내에서 가능 | 같은 모듈 내에서 가능              |
  | protected   | 사용 불가             | 상속 관계의 하위 클래스에서만 가능 |
  | private     | 파일 내부에서만 이용  | 클래스 내부에서만 이용             |

  ```kotlin
  open class Super{
  		var publicData= 10
  		protected var protectedData= 20
  		private var privateData= 30
  }
  class Sub: Super(){
  		fun subFun(){
  				publicData++ // 성공
  				protectedData++ // 성공
  				privateData++ // 오류
  		}
  }
  fun main(){
  		val obj= Super()
  		obj.publicData++ // 성공
  		obj.protectedData++ // 오류
  		obj.privateData++ // 오류
  }
  ```

### 04-3. 코틀린의 클래스 종류

- 데이터 클래스

  - Explanation

    - data 키워드로 선언
    - 자주 사용하는 데이터를 객체로 묶어줌
    - 데이터 클래스는 VO 클래스를 편리하게 이용할 수 있게 해줌

  - [형식] data class DataClass(val name: String, val email: String, val age: Int)

  - VO 클래스- equals(): 객체의 데이터가 같은지 비교

    - 멤버 변수 값이 같은 일반 클래스의 객체를 비교하면 결괏값은 false
    - 멤버 변수 값이 같은 데이터 클래스의 객체를 비교하면 결괏값은 true

    ⇒ 주 생성자에 선언한 멤버 변수의 데이터만 비교 대상으로 삼음

  - VO 클래스- toString()

    - 일반 클래스의 객체.toString()의 출력 값은 의미있는 데이터가 아님
    - 데이터 클래스의 객체.toString()의 출력 값은 객체가 포함하는 멤버 변수의 데이터를 출력

    ⇒ 주 생성자의 매개변수에 선언된 데이터만 출력 대상

- 오브젝트 클래스

  - Explanation

    - object 키워드로 선언
    - 익명 클래스를 만들 목적으로 사용
    - 클래스 이름이 없으므로 클래스를 선언하면서 동시에 객체를 생성해야 함

  - [형식] 객체 이름= object: 타입 { … }

    - object는 콜론(:) 뒤에 타입을 명시하여 선언해야 함
    - 타입을 명시하지 않으면 객체는 Any 타입이 되고,
    - Any 타입에 선언된 멤버가 없으므로 오류

  - 사용 예시

    ```kotlin
    open class Super{
    		open var data= 10
    		open fun some(){
    				println("i am super some(): $data")
    		}
    }
    
    val obj= object: Super(){
    		override var data= 20
    		override fun some(){
    				println("i am object some(): $data")
    		}
    }
    
    fun main(){
    		obj.data= 30
    		obj.some()
    }
    // 실행 결과: i am object some(): 30
    ```

- 캠패니언 클래스

  - Explanation

    - 클래스 내부에 companion object { … } 의 형식으로 선언
    - 객체를 생성하지 않고서도 클래스 이름으로 특정 멤버를 이용할 수 있음

  - 예시- companion object {} 를 감싸는 클래스 이름(MyClass)으로 멤버에 접근할 수 있음

    ```kotlin
    class MyClass{
    		companion object{
    				var data= 10
    				fun some(){
    						println(data)
    				}
    		}
    }
    fun main(){
    		MyClass.data= 20 // 성공
    		MyClass.some() // 성공
    }
    ```

> 정리
>
> - 클래스의 생성자는 주 생성자와 보조 생성자로 구분된다.
> - 주 생성자의 매개변수에 var이나 val 키워드를 추가하면 클래스의 멤버 변수가 된다.
> - 클래스가 상속을 허용하려면 open 키워드를 추가해서 선언해야 한다.
> - 멤버 변수나 함수를 재정의하려면 override 키워드를 추가해서 선언하여 구현해야 한다.
> - 접근 제한자: public, internal, protected, private
> - data 키워드로 선언한 클래스의 equal() 은 객체 자체가 아니라 객체의 데이터를 비교한다.
> - data 키워드로 선언한 클래스의 toString()은 객체의 주 생성자의 멤버 데이터들의 값을 출력한다.
> - object 키워드로 익명 클래스를 정의한다.
> - companion 키워드로 객체를 생성하지 않고 바로 클래스의 멤버에 접근한다.
