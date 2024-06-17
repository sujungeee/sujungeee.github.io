---
title: "[안드로이드] Ch6. 뷰를 이용한 화면 구성"
author: sujungeee
date: 2024-01-05 11:58:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 인프런 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 06-1. 화면을 구성하는 방법

- 액티비티-뷰 구조
  - 액티비티: 화면을 출력하는 컴포넌트
  - 뷰 클래스: 화면 구성과 관련한 클래스를 통칭
    - TextView 클래스
    - ImageView 클래스
    - …(EditText, Button, Spinner, ListView 등)
- 액티비티에서 뷰로 화면을 구성하는 방법
  - 액티비티 코드로 작성하는 방법
  - 레이아웃 XML 파일로 작성하는 방법

### 06-2. 뷰 클래스

- 뷰 클래스의 기본 구조

  - 뷰 객체의 계층 구조
    - View: 모든 뷰 클래스의 최상위 클래스, 액티비티는 View의 서브 클래스만 화면에 출력
    - ViewGroup: 다른 뷰 여러 개를 묶어서 제어, 컨테이너 기능을 담당
  - 레이아웃 클래스: 다른 뷰 여러 개를 포함해 화면을 구성
    - 한꺼번에 출력하거나 정렬하는 등 편리하게 제어할 수 있음
  - 레이아웃 중첩: 여러 개의 레이아웃을 중첩하여 구성
    - 컴포지트 패턴(문서 객체 모델): 객체를 계층 구조로 만들어 이용하는 패턴

- 레이아웃 XML의 뷰를 코드에서 사용하기(id)

  - XML의 객체를 MainActivity.kt 에서 사용하려면 뷰 클래스 객체에 id 를 붙여줘야 함
    - android:id=”@+id/text1”
  - MainActivity.kt에서 위 객체를 사용하고 싶다면
    - val textView1: TextView= findViewById(R.id.text1)
    - val textView1= findViewById<TextView>(R.id.text1)

- 뷰의 크기를 지정하는 방법

  - 뷰의 크기는 필수 속성
  - 속성 값
    - 수치: 단위(px, dp) 꼭 작성
    - match_parent: 상위 계층의 크기 전체
    - wrap_content: 뷰 콘텐츠의 크기

- 뷰의 간격 설정

  - margin: 뷰와 뷰 사이의 간격
    - layout_marginLeft, layout_marginRight, layout_marginTop, layout_marginBottom
  - padding: 뷰의 콘텐츠와 테두리 사이의 간격
    - paddingLeft, paddingRight, paddingTop, paddingBottom

- 뷰의 표시 여부 설정

  - visibility: 뷰가 화면에 출력되어야 하는지를 설정

  - 속성 값

    - visible: 뷰가 화면에 출력됨
    - invisible: 뷰가 화면에 보이지 않지만 자리는 차지
    - gone: 뷰가 화면에 보이지 않으며 자리도 차지하지 않음

  - invisible, gone의 존재 이유

    - 처음에는 화면에 보이지 않다가 어떤 순간이 되면 보이게 처리하기 위해서

  - 코드에서 visibility 속성 값 변경

    ```kotlin
    visibleBtn.setOnClickListener{
    		targetView.visibility= View.VISIBLE
    }
    invisibleBtn.setOnClickListener{
    		targetView.visibility= View.INVISIBLE
    }
    ```

### 06-3. 기본적인 뷰 살펴보기

- 텍스트 뷰(TextView)

  - 문자열을 화면에 출력하는 뷰
  - android:text 속성
    - TextView에 출력할 문자열을 지정
  - android:textColor 속성
    - 문자열의 색상을 지정
    - 16진수 RGB 형식
  - android:textSize 속성
    - 문자열의 크기 지정
    - 단위: px, dp, sp
  - android:textStyle 속성
    - 문자열의 스타일 지정
    - 속성 값: bold, italic, normal
  - android:autoLink 속성
    - android:text 속성 값에 링크가 있으면 화면 출력에서 링크 문자열을 실제 브라우저로 매핑
    - 여러 개 함께 설정 가능
  - android:maxLines 속성
    - 문자열이 길 때 특정 줄까지만 나오도록 설정
    - ex) android:maxLines=”3”: 문자열이 3행까지만 출력됨
  - android:ellipsize 속성
    - maxLines 속성에서 출력되지 않은 문자열이 있다는 것을 “…” 로 표시하기 위한 속성
    - 속성 값: end, start, middle
    - 속성 값이 start 또는 middle 이면 singleLine=”true” 일 때만 “…”가 출력됨

- 이미지 뷰(ImageView)

  - 이미지를 화면에 출력하는 뷰

  - android:src 속성

    - ImageView에 출력할 **리소스** 이미지를 설정
    - ImageView: 리소스 이미지, 파일 이미지, 네트워크 이미지 등
    - android:src=”@drawable/image3”

  - android:maxWidth 속성

    android:maxHeight 속성

    android:adjustViewBounds 속성

    - ImageView가 출력하는 이미지의 최대 크기를 지정함

    - 위의 android:maxWidth 속성과 android:maxHeight 속성을 사용하려면 android:adjustViewBounds 속성과 같이 사용해야 함

    - android:adjustViewBounds=”true”이면

      → 이미지의 가로, 세로 길이와 비례해 뷰의 크기를 맞춤

- 버튼, 체크박스, 라디오 버튼

  - Button: 사용자 이벤트를 처리하는 뷰

  - CheckBox: 다중 선택을 제공하는 뷰

  - RadioButton: 단일 선택을 제공하는 뷰

    - 하나만 선택할 수 있으므로 여러 개를 묶어서 처리해야 함

      ⇒ RadioGroup과 함께 사용하며 그룹으로 묶은 라디오 버튼 중 하나만 선택 가능

- 에디트 텍스트(EditText)

  - android:lines 속성
    - 설정한 값만큼의 줄을 입력 받을 수 있음
    - ex) android:lines=”3”: 3줄로 고정되어 더 늘어나지 않음
  - android:maxLines 속성
    - 설정한 값만큼의 줄을 입력 받을 수 있음
    - ex) android:lines=”3”: 1~3줄 입력 가능
  - android:inputType 속성
    - 키보드로 한 줄 입력을 강제하고 싶거나 키보드를 전화번호 입력 모드로 지정하고 싶을 때 사용
    - ex) android:inputType=”phone”: 전화번호 입력 모드, 한 줄 입력으로 강제됨
    - inputType의 속성 값: p.166 참고

### 06-4. 뷰 바인딩

> XML의 뷰 객체를 한번에 관리하여 사용

- 그래들 파일에 뷰 바인딩 설정

  - android 영역에 buildFeatures 선언
  - viewBinding= true 설정
  - XML 파일에 등록된 뷰 객체를 포함하는 클래스가 자동으로 만들어짐
    - 클래스의 이름: activity_main.xml → ActivityMainBinding

  ```xml
  android{
  		...
  		viewBinding{
  				enabled= true
  		}
  }
  ```

- 바인딩 객체 이용법

  - 자동으로 생성되는 클래스.inflate(layoutInflater)로 객체를 생성할 수 있음

    val binding= ActivityMainBinding.inflate(layoutInflater)

  - 바인딩 객체.root로 액티비티 화면을 출력할 수 있음

    setContentView(binding.root)

  - 뷰  객체 이용

    binding.(뷰 id).~~ 이런 식으로 이용하면 됨

  - 그래들 파일에 뷰 바인딩 설정하면 XML 마다 뷰 바인딩 클래스가 자동으로 생성됨

    → 바인딩 클래스로 만들 필요가 없으면 XML 루트 태그에 tool:viewBindingIgnore=”true” 추가

### 06-5. 카카오톡 비밀번호 확인 화면 만들기(실습)

> 정리
>
> - 액티비티가 실행되어 뷰를 화면에 출력
>
> - 뷰를 액티비티 코드에서 직접 생성하거나 레이아웃(XML)에 명시해서 화면 구성해도 됨
>
> - 화면을 구성하는 뷰 객체들은 계층 구조를 이룸
>
> - 뷰의 종류로는 문자열 출력을 위한 TextView, 이미지 출력을 위한 ImageView, 사용자 이벤트를 위한 Button, 사용자 글 입력을 위한 EditText 등이 있음
>
> - 레이아웃 XML에 등록되어 있는 뷰 객체를 코드에서 얻으려면 id 속성을 설정해야 하며,
>
>   → findViewById() 함수를 이용해 얻어도 되고
>
>   → 뷰 바인딩 기법을 이용해도 됨
