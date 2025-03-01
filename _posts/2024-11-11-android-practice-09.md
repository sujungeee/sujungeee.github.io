---
title: "[안드로이드] 09. Jetpack- ViewModel, DataBinding"
author: sujungeee
date: 2024-11-11 22:57:00 +0800
categories: [안드로이드, 실습]
tags: [안드로이드, Android, Kotlin, practice]
render_with_liquid: false

---

> Jetpack- ViewModel, DataBinding



### ViewModel

- ViewModel- Explanations
  - 안드로이드의 액티비티 생명주기에서 분리시켜, 액티비티가 재실행되어도 데이터가 소멸되지 않도록 함
    - 액티비티가 파괴되면 ViewModel 자원도 자연히 소멸됨

  - ViewModel 객체는 액티비티의 Lifecycle 상태가 종료될 때까지 소멸되지 않음
    - Rotation으로 재실행되는 경우에도 ViewModel은 소멸되지 않음

  - MVVM의 ViewModel과 다름
  - 장점
    - Activity와 데이터를 분리할 수 있음
    - Activity는 LiveData를 이용하여 ViewModel의 데이터를 관찰할 수 있음


> 주의사항
>
> ViewModel 객체에 Context를 인자로 전달하거나,
>
> Activity, Fragment, View 객체나 Context를 ViewModel에 저장하면 안됨



- ViewModel 실습 1: 회전되어도 데이터 소실이 되지 않는 액티비티를 만들기

  > ViewModel로 문제 해결!

  - MainViewModel.kt

    ```kotlin
    class MainViewModel : ViewModel(){
        var cnt= 0
            private set
    
        fun increase() {
            cnt++
        }
    }
    ```

  - MainActivity.kt

    ```kotlin
    // ViewModel 선언
    private val viewModel: MainViewModel by lazy{
        ViewModelProvider(this).get(MainViewModel::class.java)
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        ...
        binding.increaseBtn.setOnClickListener {
            viewModel.increase()
            binding.cntText.text = viewModel.cnt.toString()
        }
    }
    ```

    

- ViewModel 실습 2: 앱이 비정상 종료되어도 데이터 소실이 되지 않는 액티비티를 만들기

  > SavedState ViewModel 사용!

  - SavedState ViewModel

    - 앱이 비정상 종료되어도 데이터 유지
    - SavedStateHandle의 handle은 key-value 의 형태인 map으로 저장

  - MainViewModel.kt

    ```kotlin
    class MainViewModel(val handle: SavedStateHandle): ViewModel() {
        var cnt = handle.get<Int>("cnt") ?: 0
            private set (value) {
                handle.set("cnt", value)
                field= value
            }
    
        fun increase(){
            cnt++
        }
    }
    ```

  - MainActivity.kt: 위 코드와 동일



- ViewModel 초기화 방법 1- 파라미터 X (in 액티비티, 프래그먼트)

  > 액티비티, 프래그먼트에는 파라미터가 없으나 MainViewModel에는 파라미터에 handle이 있기도 한듯?

  - Activity

    ```kotlin
    private val viewModel: MainViewModel by viewModels()
    ```

  - Fragment: activityViewModels 활용

    - 자신의 viewModel에 접근

      ```kotlin
      private val viewModel: NewActivityViewModel by viewModels()
      ```

      

    - host activity의 viewModel에 접근

      ```kotlin
      private val viewModel: NewActivityViewModel by activityViewModels()
      ```



- ViewModel 초기화 방법 2- 파라미터 O(in 액티비티, 프래그먼트)

  - 방법1, 2- no handle

    ```kotlin
    private val viewModel by lazy {
      	ViewModelProvider(this, object: ViewModelProvider.Factory) {
          	override fun <T: ViewModel> create(modelClass: Class<T>): T {
              	return MainViewModel(0) as T
            }
        }).get(MainViewModel::class.java)
    }
    ```

    ```kotlin
    private val viewModel by viewModel<MainViewModel> {
    		object: ViewModelProvider.Factory {
          	override fun <T: viewModel> create (modelClass: Class<T>): T {
              	return MainViewModel(0) as T // 인자로 숫자 0 전달
            }
        }		
    }
    ```

  - 방법 3, 4: handle

    ```kotlin
    private val viewModel: ViewModel by viewModels()
    ```

    ```kotlin
    private val viewModel: ViewModel by viewModels<ViewModel> {
      	SavedStateViewModelFactory(this.application, this, intent.extras)
    }
    ```



### DataBinding

- DataBinding- Explanations
  - 코틀린 -> 레이아웃, 레이아웃 -> 코틀린의 데이터를 직접 참조하는 라이브러리
  - 코틀린에서 레이아웃 파일에 의존적인 부분이 많이 사라지고 MVVM 등의 패턴과 함께 사용할 수 있음
  - findViewById를 하지 않아도 xml과 view를 연결할 수 있음
  - View와 Data가 양방향 일치
  - DTO를 설정하면, RecyclerView의 각 item에 데이터를 넣을 수 있음



- DataBinding 예제

  - 값의 데이터 바인딩

    - data class(.kt)

      ```kotlin
      data class User (val firstName :String, val lastName:String)
      ```

    - xml: @{} 로 field에 접근

      ```xml
      <data>
          <variable
              name= "user"
              type="com.practice.databinding.User" />
      </data>
      ...
      <TextView
                ...
                android:text="@{user.lastName == `홍` ? `다음`: `Next`}"
                ...
      />
      
      ```

    - MainActivityDataBinding.kt

      ```kotlin
      // 방법 1
      binding= DataBindingUtil.setContentView(this, R.layout.activity_main_databinding)
      
      // 방법 2
      binding= ActivityMainDatabinding.inflate(layoutInflater)
      
      ...
      binding.user= userList[rand] // user는 xml에서의 variable name = "user"
      ```

  - 이벤트 데이터 바인딩

    - xml

      ```xml
      <data>
          <variable
              name="activity"
              type="com.practice.databinding.MainActivityWithDataBinding" />
      </data>
      ...
      <Button
              ...
              android:onClick="@{activity::onButtonClick}"
              ... />
      ```

    - MainActivityDataBinding.kt

      ```kotlin
      fun onButtonClick(view: View) {
          startActivity(Intent(this, MainActivity::class.java))
      }
      ```

      

- One-way Binding, Two-way Binding

  - One-way Binding

    - 데이터의 흐름이 단방향

    - ex) 유튜브 리스트를 서버에서 받아와서 화면에 보여주기

      : Code -> VIew

  - Two-way Binding

    - 데이터의 흐름이 양방향

    - ex) 검색어로 'android'를 입력하면 android 관련 영항 리스트를 보여줌

      : Code <-> View



- observable을 이용한 데이터 바인딩

  - Explanations

    - EditText에 문자를 입력하면 그 내용이 바로 TextView에 보여지게 함
    - by TextWatcher → by Binding, Observer

  - DTO

    ```kotlin
    class TextDto(): BaseObservable() {
        @get:Bindable
        var textString = ""
            set(value) {
                field = value
                notifyPropertyChanged(BR.textString)
            }
    }
    ```

  - xml:  “=” - EditText에서 DTO에 값을 입력하기 위해서 필요함

    ```xml
    <EditText
            android:text="@={dto.textString}"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"/>
    ```

  - MainActivity.kt: editText 데이터 초기화

    ```kotlin
    binding.dto= TextDto("initial") // editText의 초기 값
    ```

    
