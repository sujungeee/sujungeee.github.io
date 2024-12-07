---
title: "[안드로이드] 01. Android Architecture"
author: sujungeee
date: 2024-08-29 20:31:00 +0800
categories: [Android App, 실습]
tags: [Android, Kotlin, practice]
render_with_liquid: false

---

> 개발 환경 설정



### 앱의 폴더와 파일 구조

<img src="./assets/img/0829/directory_architecture.png" alt="directory architecture" style="zoom:33%;" />

- AndroidManifest.xml
- MainActivity.java
- res: 앱의 모든 리소스 파일들이 위치
  - res/drawable
  - res/layout
  - res/mipmap
  - res/values



### AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.Practice"
        tools:targetApi="31">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

| 속성                  | 설명                                                         |
| --------------------- | ------------------------------------------------------------ |
| android:allowBackup   | 백업 및 복구 기능을 사용할 것인가의 여부(default: true)      |
| android:icon          | 어플리케이션 전체를 위한 아이콘과 각각의 컴포넌트를 위한 아이콘 |
| android:label         | 어플 이름                                                    |
| android:roundIcon     | 적응형 아이콘 적용                                           |
| android:supportsRtl   | 어플리케이션의 RTL(오른쪽에서 왼쪽으로 글씨를 읽는 경우 지원) 지원 여부 |
| android:theme         | 어플리케이션 안의 모든 기능들의 기본 테마 정의               |
| &lt;activity&gt;      | 어플리케이션의 시각적 UI 요소인 액티비티 선언<br>android:name - 액티비티의 클래스명 설정<br>android:exported - 이 액티비티가 외부에서 실행(호출)될 수 있는지 없는지를 설정 |
| &lt;intent-filter&gt; | 수신할 Intent를 지정<br>&lt;action&gt; 수신할 action 명을 지정 / 런처에서 클릭하면 첫 액티비티로 해당 액티비티를 시작 / action 태그는 하나만 존재 가능<br>&lt;category&gt; 액션과 함께 수신할 Intent의 특징을 나타내는 항목 / category 태그는 여러 개 존재할 수 있음 |



### MainActivity.kt

```kotlin
class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main)) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom)
            insets
        }
    }
}
```

|                          | 설명                                                         |
| ------------------------ | ------------------------------------------------------------ |
| AppCompatActivity()      | Activity의 서브 클래스                                       |
| onCreate()               | 액티비티가 실행될 때 시스템이 호출하는 함수                  |
| setContentView()         | 매개변수에 해당하는 xml로 화면을 구성<br>layout 디렉토리에 xml을 추가하면, xml에 해당하는 int형 변수가 R.java에 생성 |
| enableEdgeToEdge, insets | 화면을 꽉 채우기 위한 설정                                   |



### activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```



### Gradle

<img src="/assets/img/0829/gradle.png" alt="gradle" style="zoom:33%;" />

|                                     | 설명                                  |
| ----------------------------------- | ------------------------------------- |
| build.gradle.kts(Project: practice) | 모든 모듈을 위한 최상위 설정을 목적   |
| build.gradle.kts(Module.app)        | 모듈에 대한 특성 정의                 |
| proguard-rules.pro                  | 난독화 설정                           |
| gradle.properties                   | gradle 설정 파일                      |
| gradle-wrapper.properties           | 사용하는 gradle의 버전 정보 등이 지정 |
| libs.versions.toml                  | gradle에서 사용하는 버전 정보 저장    |



### viewBinding

- module 수준의 gradle에 viewBinding 속성 추가

  ```
  viewBinding {
  	enable= true
  }
  ```

- .kt: binding.(id명)으로 접근

  ```kotlin
  class MainActivity : AppCompatActivity() {
      private lateinit var binding: ActivityMainBinding
  
      override fun onCreate(savedInstanceState: Bundle?) {
          super.onCreate(savedInstanceState)
          binding= ActivityMainBinding.inflate(layoutInflater)
          setContentView(binding.root)
      }
  }
  ```

  

### Intent

- startActivity()
  - 단방향
  - 새로운 액티비티를 담은 intent를 매개변수로 전달
- setResult()
  - 현재의 Activity를 호출한 Activity에게 결과를 전달함
    - 호출한 Activity에서는 registerForActivityResult로 결과를 전달 받음
- finish()
  - 현재 Activity 종료
