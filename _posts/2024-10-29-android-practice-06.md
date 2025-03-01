---
title: "[안드로이드] 06. Fragment"
author: sujungeee
date: 2024-10-29 21:33:00 +0800
categories: [안드로이드, 실습]
tags: [안드로이드, Android, Kotlin, practice]
render_with_liquid: false

---

> Fragment



### Fragment 생명주기

- onAttach()
  - 프래그먼트가 액티비티에 붙을 때 호출됨



- onCreate()
  - 프래그먼트가 액티비티의 호출을 받아 생성되는 단계
  - 받을 arguments들이 있다면 이 단계에서 값을 세팅



- onCreateView()
  - 뷰바인딩 진행, onDestroyView()에서 null로 해제



- onViewCreated()
  - UI 초기화 진행(화면 컴포넌트에 대한 초기화 및 이벤트 처리 수행)
  - View 생성이 완료되었을 때 호출되는 메소드



- onStart()
  - 액티비티는 started 상태
  - 프래그먼트는 사용자에게 보여지기 직전에 호출되는 단계



- onResume()
  - 프로그램이 일시정지되면 onPause()가 호출되고, 다시 재개되면 onResume()을 다시 호출



- onPause()
  - 사용자가 해당 Fragment로 돌아오지 않을 수도 있으므로, 지속되어야하는 변경 사항을 onPause에서 저장



- onStop()
  - 화면이 더 이상 보여지지 않게 되는 상황에서 호출됨



- onDestroyView()
  - 프래그먼트와 연결된 View Layer가 제거될 때 호출



- onDestroy()
  - 프래그먼트가 제거되기 직전 단계



- onDetach()
  - 프래그먼트가 액티비티에서 최종 제거되는 단계



### FragmentManager

- Explanations
  - 액티비티와 프래그먼트의 중간에서 서로를 이어주는 역할
  - FragmentManager를 통해 Fragment Transaction을 수행
  - 백 스택(Back Stack)에 프래그먼트 추가 / 교체 / 삭제 작업에 의한 변경 사항을 push 및 pop



- supportFragmentManager: FragmentManager 인스턴스(액티비티 <-> 호스트 프래그먼트)
- parentFragmentManager: 하위 프래그먼트에서 호스트 프래그먼트를 참조하고 싶을 경우
- childFragmentManager: 호스트 프래그먼트에서 하위 프래그먼트를 호출하고 싶을 경우



- FragmentManager를 통해 기존 프래그먼트 찾기

  - findFragmentById(): 프래그먼트 컨테이너 내의 현재 프래그먼트 참조

    ```kotlin
    val currentFragment= supportFragmentManager.findFragmentByid(R.id.fragment_container)
    ```

  - findFragmentByTag(): 프래그먼트에 고유한 태그를 부여한 후 태그를 이용해 프래그먼트 참조

    ```kotlin
    binding.buttonAdd.setOnClickListener {
      	childFragmentManager
            .beginTransaction()
            .replace(R.id.view_stub, CFragment(), "newFragmentC")
            .commit()
    }
    
    binding.buttonRemove.setOnClickListener {
      	var addedFragment= childFragmentManager.findFragmentByTag("newFragmentC")
      	if (addedFragment != null) {
          	childFragmentManager
          		.beginTransaction()
          		.remove(addFragment)
          		.commit()
        }
    }
    ```

    

### 프래그먼트 간 통신

> by ViewModel or 인터페이스

- 인터페이스를 활용한 프래그먼트 간 통신

   - 인터페이스에 콜백 함수 등록

     ```kotlin
     interface CommunicationCallback {
         fun onPlusCount()
     }
     ```

   - 액티비티에서 프래그먼트에 listener를 주입 & 함수 기능 구현

     ```kotlin
     communicationFragment = CommunicationFragment().apply {
         this.listener= this@CommunicationActivity
     }
     ...
     override fun onPlusCount() {
         count++
         binding.countTv.text= "Count : $count"
     }
     ```

   - 프래그먼트에서 함수 호출

     ```kotlin
     var listener: CommunicationCallback?= null
     
     binding.plusButton.setOnClickListener {
          listener?.onPlusCount()
     }
     ```

     

- Bundle을 활용한 프래그먼트 간 통신

  - 액티비티에서 프래그먼트를 호출할 때 NewInstance에 param을 전달

  - 프래그먼트에서 param 전달 받기

    ```kotlin
    value = arguments?.getString(PARAM) ?:"no result"
    
     companion object{
        @JvmStatic
        fun newInstance(param:String) =
            Fragment1().apply{
                arguments = Bundle().apply{
                    putString(PARAM, param)
                }
            }
    }
    ```

    

- FragmentResult를 활용한 프래그먼트 간 통신

  - 작동 원리

    - 프래그먼트 B -> 프래그먼트 A로 데이터 전달
    - 프래그먼트 B는 setFragmentResult로 키와 번들을 전달
    - 프래그먼트 A는 setFragmentResultListener의 키를 통해 키와 번들을 전달받아 사용

  - gradle에 jetpack 의존성 추가

  - 프래그먼트 B

    ```kotlin
    setFragmentResult("key",
        bundleOf("Address" to binding.addressInput.text.toString())
    )
    ```

  - 프래그먼트 A

    ```kotlin
    setFragmentResultListener("key"){_, bundle ->
        val result = bundle.getString("Address")
        binding.addressText.text = result
    }
    ```

    

### TabLayout TabItem

- 구성
  - TabLayout- TabItems
  - FrameLayout
    - tab!!.position으로 접근



### BottomNavigationView

- res > menu > menu.xml (탭 구성 요소) 이 필요
- xml
  - 프래그먼트를 위한 FrameLayout이 필요
  - BottomNavigationView가 필요
- 이벤트 처리
  - setOnItemSelectedListener로 각 아이템을 클릭했을 때 해당하는 프래그먼트가 호출
