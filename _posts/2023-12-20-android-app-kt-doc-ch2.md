---
title: Ch2. 안드로이드 앱의 기본 구조
author: sujungeee
date: 2023-12-20 14:10:00 +0800
categories: [Blogging, android-doc]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



### 02-2. 안드로이드 앱 개발의 특징

- 컴포넌트를 기반으로 한 개발
    - Explanation
        - 컴포넌트의 형태: JAR, DLL
        - 하나의 클래스로 하나의 컴포넌트를 개발
        - 컴포넌트의 구성은 자유롭게
        - 컴포넌트는 앱 안에서 독립된 실행 단위
        - 앱 실행 시점이 다양함
          
            → 메인 함수 개념이 없음
            
        - 애플리케이션 라이브러리를 사용할 수 있음
    - 클래스
        - 컴포넌트 클래스: 생명주기를 안드로이드 시스템에서 관리
        - 일반 클래스: 생명주기 관리를 개발자 코드에서 진행(임의의 목적으로 생성된 클래스)
    - 컴포넌트의 종류
        - 액티비티: 화면을 구성하는 컴포넌트
        - 서비스: 백그라운드 작업을 하는 컴포넌트
        - 콘텐츠 프로바이더: 앱의 데이터를 공유하는 컴포넌트
        - 브로드캐스트 리시버: 시스템 이벤트가 발생할 때 실행되게 하는 컴포넌트

- 리소스를 활용한 개발
    - 리소스
        - 코드에서 정적인 값을 분리한 것
        - 앱에서 발생하는 데이터가 항상 똑같은 값이면 굳이 코드에 담지 않고 분리해서 개발
        - 대부분의 리소스는 xml 파일로 작성
        - 문자열, 색상, 크기, 레이아웃, 이미지, 메뉴 등 많은 요소를 리소스로 활용 가능
    - 사용 예
      
        ```xml
        <string name="mytxt">
        		안드로이드 앱 프로그래밍을
        		코틀린으로 해볼것이에요.
        </string>
        
        textView.text = resources.getString(R.string.mytxt)
        ```
        

### 02-3. 앱 구성 파일 분석

- 프로젝트의 폴더 구성 알아보기
  
    > 모듈명 → src → main
    > 
    - 프로젝트: 단위- 모듈
    - 모듈: 단위- 앱

- 모듈의 폴더 구성 알아보기
    - build.gradle: 빌드 설정 파일
    - AndroidManifest.xml: 앱의 메인 환경 파일
    - res: 리소스 폴더
    - activity_main.xml: 레이아웃 XML 파일
    - MainActivity.kt: 메인 액티비티 파일

- 그래들 빌드 설정 파일(build.gradle)
    - 그래들: 안드로이드 앱의 빌드 도구
    - 그래들의 설정 파일: build.gradle
        - 앱을 빌드하는 데 필요한 설정을 이 파일에 등록
        - in Gradle Scripts(코끼리)
        - 대부분의 빌드 설정- 모듈 수준의 그래들 파일에 작성
    
    ---
    
    - 중요 설정
        - 플러그인 선언
          
            ```xml
            plugins{
            		id 'com.android.application'
            		id 'kotlin-android'
            }
            ```
            
        - 컴파일 버전 설정: 안드로이드 SDK 31 버전을 적용해서 컴파일하라는 의미
          
            ```xml
            compileSdk 31
            ```
            
        - 앱의 식별자 설정: 설정한 문자열은 앱의 고유 식별자가 되어 중복 허용이 불가능하다.
          
            ```xml
            applicationId "com.example.androidlab"
            ```
            
        - SDK 버전 설정: later in 10 chapter(API 개발 호환성)
          
            ```xml
            minSdk 21 # 이 앱을 설치할 수 있는 기기의 최소 SDK 버전(21~)
            targetSdk 31 # 31 버전의 SDK로 개발
            ```
            
        - 앱의 버전 설정: 초깃값 1 → 업데이트 시 버전을 올려 다시 배포
          
            ```xml
            versionCode 1
            versionName "1.0"
            ```
            
        - 컴파일 옵션: 개발 언어의 버전(자바 버전 선언 생략 시의 default 버전: 1.6 v)
          
            ```xml
            compileOptions{
            		sourceCompatibility JavaVersion.VERSION_1_8
            		targetCompatibility Javaversion.VERSION_1_8
            }
            kotlinOptions{
            		jvmTarget = '1.8'
            }
            ```
            
        - 라이브러리 설정: SDK 가 아닌 라이브러리는 모두 dependencies에 선언해야 함
          
            ```xml
            dependencies{
            		implementation 'androidx.core:core-ktx:1.7.0'
            		implementation 'androidx.appcompat:appcompat:1.4.0'
            		implementation 'com.google.android.material:material:1.4.0'
            		implementation 'androidx.constraintlayout:constraintlayout:2.1.2'
            		testImplementation 'junit:junit:4.+'
            		androidTestImplementation 'androidx.test.ext:junit:1.1.3'
            		androidTestImplementation 'androidx.test.espresso:espresso-core:3.4.0'
            }
            ```
    
- 메인 환경 파일(AndroidManifest.xml)
    - Explanation
        - 안드로이드 앱의 메인 환경 파일
        - 이 파일에서 설정한대로 사용자의 폰에서 앱을 실행
    - 중요 환경
        - 네임스페이스 선언- manifest
          
            → manifest: 매니페스트 파일의 루트 태그<>
            
            → xmlns: XML의 네임스페이스 선언
            
            → URL이 "http://schemas.android.com/apk/res/android" 이면 표준 네임스페이스
            
            → package: 매니페스트 파일에 선언한 컴포넌트 클래스의 기본 패키지명
            
            ```xml
            <manifest xmlns:android="http://schemas.android.com/apk/res/android"
            		package="com.example.androidLab">
            ```
            
        - 네임스페이스 선언- application: 앱 전체를 대상으로 하는 설정
          
            > xml의 속성 값이 @으로 시작하면 리소스를 의미
            > 
            
            ```xml
            <application
            		android:allowBackup= "true"
            		android:icon= "@mipmap/ic_launcher" # 앱을 설치한 사용자에게 보이는 실행 아이콘
            		android:label= "@string/app_name" # 앱의 이름
            		android:roundIcon= "@mipmap/ic_launcher_round"
            		android:supportsRtl= "true"
            
            		# theme.xml에 Theme.AndroidLab의 이름을 가진 테마를 적용
            		android:theme= "@style/Theme.Android:Lab"> 
            		...
            </application>
            ```
            
        - 액티비티 선언
          
            ```xml
            <activity android:name= ".MainActivity"> # 클래스 이름-> 액티비티 컴포넌트 이름
            		<android:exported= "true">
            		<intent-filter> # 해당 태그는 생략 가능
            				# 앱 아이콘을 클릭했을 때 실행되는 액티비티
            				<action android:name= "android.intent.action.MAIN" />
            				<category android:name= "android.intent.category.LAUNCHER" />
            		</intent-filter>
            </activity> 
            ```
    
- 리소스 폴더(res)
    - Explanation
        - 앱의 리소스를 등록하는 목적
    - res 하위 폴더
        - drawable: 이미지 리소스
        - layout: UI 구성에 필요한 XML 리소스
        - mipmap: 앱 아이콘 이미지
        - values: 문자열 등의 값으로 이용되는 리소스
    - R.java
      
        : res 폴더에서 선언된 리소스들을 변수로 사용할 수 있도록 int형 상수 변수로 관리하는 파일
        
        - R.java/drawable 클래스
          
            : res/drawable/send.png 는 R.java/drawable 클래스에 R.drawable.send의 int형 변수로 선언되어 이용할 수 있음
            
        - R.java/layout 클래스
          
            : : res/layout/test.xml 는 R.java/layout 클래스에 R.drawable.test의 int형 변수로 선언되어 이용할 수 있음
            
        - R.java에서 리소스 선언 시 지켜야 할 규칙
            1. res 하위의 폴더 명은 지정된 폴더명을 사용해야 함(drawable, layout, …)
            2. 각 리소스 폴더에 다시 하위 폴더를 정의할 수는 없음
            3. 리소스 파일명은 자바의 이름 규칙을 위배할 수 없음
            4. 리소스 파일명에는 알파벳 대문자를 이용할 수 없음

- 레이아웃 XML 파일(activity_main.xml)
  
    : 화면을 구성하는 레이아웃 XML 파일
    
    - <androidx.constraintlayout.widget.ConstraintLayout>
    - <TextView>: 화면에 문자열을 출력하는 역할
    
- 메인 액티비티 파일(MainActivity.kt)
  
    : 매니페스트 파일의 설정 값에 따라 폰에 앱을 설치한 후 앱 아이콘 터치 → MainActivity.kt 파일이 실행
    
    - MainActivity: AppCompatActivity(Activity의 하위 클래스)를 상속받아 정의
        - 즉, MainActivity 클래스는 액티비티 컴포넌트를 의미
    - setContentView():  매개변수에 지정한 내용을 액티비티 화면에 출력
        - R.layout.activity_main을 지정하였으므로 activity_main.xml 의 구성을 액티비티 화면에 출력
        

> 정리
> 
> - 안드로이드 앱은 ART가 실행한다.
> - 안드로이드 앱은 자바나 코틀린 언어를 이용해 개발한다.
> - build.gradle은 대체로 모듈 단위의 설정 파일
> - AndroidManifest.xml은 앱의 메인 환경 파일
> - 리소스는 R.java 파일에 상수 변수로 등록되고 이 변수로 코드에서 리소스를 이용한다.
> - activity_main은 레이아웃 XML 파일이며 MainActivity.kt는 액티비티 컴포넌트 파일이다.
> - 안드로이드는 액티비티, 서비스, 콘텐츠 프로바이더, 브로드캐스트 리시버 등 네 종류의 컴포넌트로 앱을 개발한다.



* [깡쌤의 안드로이드 앱 프로그래밍 with 코틀린] 교재를 참고하여 작성하였음.