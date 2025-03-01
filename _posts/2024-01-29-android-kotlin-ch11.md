---
title: "[안드로이드] Ch11. 제트팩 라이브러리"
author: sujungeee
date: 2024-01-29 22:16:00 +0800
categories: [안드로이드, 이론]
tags: [안드로이드, Android, Kotlin, doc]
render_with_liquid: false
---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 11-1. 제트팩과 androidx 소개

- 플랫폼 API

  - Explanation
    - ART에서 제공하는 안드로이드 앱의 핵심 라이브러리
    - 안드로이드 앱은 런타임 때 ART에 의해 실행되므로 플랫폼 API로 개발
    - 호환성 문제가 발생할 수 있음

- 제트팩

  - 패키지명: androidx.~

  - 정의

    > 개발자가 관심 있는 코드에 집중할 수 있도록 권장 사항 준수, 상용구 코드 제거, 모든 안드로이드 버전과 기기에서 일관되게 작동하는 코드를 작성할 수 있도록 돕는 라이브러리 모음

  - 목적

    - 앱을 개발하는데 필요한 권장 아키텍처를 제공
    - API 레벨의 호환성 문제를 해결
    - 플랫폼 API에서 제공하지 않는 다양한 기능을 제공

- androidx 라이브러리

  - 제트팩에 존재하는 androidx 패키지명으로 시작하는 다양한 라이브러리
  - 화면 구성과 관련된 androidx 라이브러리
    - androidx.appcompat: 앱의 API 레벨 호환성을 해결
    - androidx.fragment: 액티비티처럼 동작하는 뷰를 제공
    - androidx.recyclerview: 목록 화면을 구성
    - androidx.viewpager2: 스와이프로 넘기는 화면을 구성
    - androidx.drawlerlayout: 옆에서 서랍처럼 열리는 화면을 구성

### 11-2. appcompat 라이브러리- API 호환성 해결

- appcompat 라이브러리

  - 안드로이드 앱의 화면을 구성하는 액티비티를 만듦
  - appcompat의 AppCompatActivity 클래스를 상속받아 작성
  - appcompat에서 제공하는 다양한 클래스: 액션바, 툴바, …

- 액션바

  - 화면 위 쪽에 타이틀 문자열이 출력되는 영역

  - 액티비티가 출력되는 전체 창: 액션바 영역 / 콘텐츠 영역

  - 액션바의 구성

    - 내비게이션 아이콘
    - 타이틀
    - 액션 아이템
    - 오버플로 메뉴

  - 액션바 색상 설정

    - 기본 테마 설정: 매니페스트 파일에서 스타일 지정**

  - 액션바 숨기기 설정

    - “Theme.MaterialComponents.DayNight.NoActionBar” 를 parent로 하여 상속 받기
    - <item name=”windowActionBar”>false</item>

  - 업 버튼 설정

    - 액티비티 화면이 앱의 첫 화면이 아닐 때 이전 화면으로 되돌아가는 기능

    - 매니페스트 파일에서 업 버튼 설정: parentActivityName 속성

      → 업 버튼을 설정한 후 이전 화면으로 돌아가기 전에 실행할 로직 정의: onSupportNavigateUp() 함수에서

    - 액티비티 코드로 업 버튼 설정

      supportActionBar?.setDisplayHomeAsUpEnabled(true)

      onSupportNavigateUp() 에 onBackPressed() 를 추가하여 이전 코드로 되돌아갈 수 있게 함

- 메뉴 구성

  - 메뉴: 오버플로 메뉴 / 액션 아이템

    - 액션 아이템: 오버플로 메뉴 중에서 몇몇은 액션바에 아이콘으로 나오게 할 수 있음

  - 액티비티에 메뉴 추가: 액티비티의 메뉴를 구성할 때 자동으로 호출

    - onCreateOptionsMenu(): 액티비티가 실행되면서 처음 한 번만 호출(정적)

      → 대부분 해당 함수로 액티비티의 메뉴를 구성

    - onPrepareOptionsMenu(): 액티비티가 실행되면서 한 번 호출되고, 오버플로 메뉴가 나타날 때마다 반복해서 호출(동적)

  - 메뉴를 선택했을 때의 이벤트 처리: onOptionsItemSelected() 함수

  - 리소스로 메뉴 구현: res-menu-menu_main.xml

    - <item> 태그로

    - 속성 showAsAction: 액션바에 아이콘으로 나오게 하기 위한 속성(액션 아이템)

      → naver, ifRoom, always

    - menu_main.xml로 메뉴를 구현한 후 액티비티 코트에 메뉴 XML을 적용해야 함(p.329 참고)

  - 액션 뷰 이용

    - 액션 뷰를 메뉴에 적용: actionViewClass 속성

      ex) app:actionViewClass=”androidx.appcompat.widget.SearchView”

    - MenuItem 객체에 아이템의 식별 값을 등록: menuItem

    - 등록한 menuItem 객체로부터 SearchView 객체(searchView)를 구하기

    - 검색과 관련된 이벤트 처리: setOnQueryTextListener()

- 툴바

  - 액션바와 달리 툴바는 개발자가 직접 제어하는 뷰

  - androidx.appcompat.widget.Toolbar 클래스 이용

  - 툴바 적용 과정

    - 액션바가 화면에 출력되지 않도록 설정

    - XML에 툴바를 등록(p.332 참고)

    - 액션바의 내용을 툴바에 적용(이해 X.. 왜 액션바를 숨겼으면서 툴바에 적용하는지가 이해안됨ㅠㅠ)

      setSupportActionBar(binding.toolbar)

- 호환성을 고려한 기본 뷰 클래스

  - 호환성을 고려해야 하는 플랫폼 API는 코드가 다소 길어질 수 있음
  - 따라서 appcompat 라이브러리 사용을 통해 API 레벨의 호환성을 고려하지 않도록 함
    - ex) binding.appcompatTextView.lineHeight= 50

### 11-3. 프래그먼트- 액티비티처럼 동작하는 뷰(*)

- Overview- Explanation

  - androidx.fragment 라이브러리를 이용해 구현

- 프래그먼트 소개

  - 프래그먼트: 액티비티처럼 동작하는 뷰 클래스
  - 뷰 클래스들을 조합하여 액티비티를 구성
    - 액티비티에 구현되는 내용을 프래그먼트 클래스로 담아 뷰 클래스로
    - 즉, 프래그먼트 클래스 = 뷰 클래스
    - 프래그먼트 사용 사례: 탭, 뷰 페이저 화면
  - 프래그먼트 구조: p.336 참고

- 프래그먼트 구현

  - androidx.fragment 라이브러리에서 제공

  - 프래그먼트 선언: dependencies 에서

  - 프래그먼트 화면을 구성하는 레이아웃 XML 작성

  - 프래그먼트 구현

    - onCreateView()가 자동 호출
    - 반환한 View 객체가 화면에 출력

  - 액티비티의 레이아웃 XML에 등록하여 프래그먼트 출력

    - <fragment> 태그로 액티비티 화면에 프래그먼트를 출력
    - name 속성에 프래그먼트 클래스 지정

  - 액티비티 코드에서 프래그먼트 출력

    - 프래그먼트를 출력할 뷰 준비

    - 코드에서 프래그먼트를 동적으로 제어

      → FragmentManager 를 FragmentTransaction 클래스의 함수에 이용

      → commit() 을 호출하는 순간 화면에 적용됨

    - 동적으로 프래그먼트를 제거하는 함수: add(), replace(), remove()

  - 프래그먼트 생명주기

    - 프래그먼트의 생명주기 = 액티비티의 생명주기

    - 액티비티의 생명주기 함수: onCreate(), onStart(), onResume(), onPause(), onStop(), onDestroy()

    - 액티비티의 onStart() 함수가 호출되는 순간 해당 액티비티가 출력하는 프래그먼트의 onStart() 함수도 호출됨

    - 프래그먼트의 생명주기

      1. 초기화(Initialized): 프래그먼트의 화면을 구성할 뷰가 준비되지 않은 상태

      2. 생성(created): 프래그먼트의 화면을 구성할 뷰를 준비

      3. 시작(started): 프래그먼트 화면이 사용자에게 보임

      4. 재개(resumed): 포커스를 가지고 사용자의 이벤트를 처리

      5. 소멸(destroyed)

         1. 백 스택 사용 X: 프래그먼트가 교체될 때 기존의 프래그먼트는 onDestroy() 까지 호출되어 소멸

         2. 백 스택 사용

            → 기존 프래그먼트는 제거되지 않고 onDestroyView() 까지만 호출

            → onDestroyView() 까지만 호출된 기존 프래그먼트가 다시 화면에 출력된다면 onCreateView() 부터 다시 차례대로 호출

    - 백 스택: 프래그먼트가 화면에 보이지 않는 순간 제거하지 않고 저장했다가 다시 이용할 수 있는 기능

      → 백 스택 사용 설정: transaction.addToBackStack(null)

### 11-4. 리사이클러 뷰- 목록 화면 구성

- 리사이클러 뷰 기초 사용법

  - RecyclerView 클래스 +

    - ViewHolder(필수): 항목에 필요한 뷰 객체를 가짐
    - Adapter(필수): 항목을 구성
    - LayoutManager(필수): 항목을 배치
    - ItemDecoration(옵션): 항목을 꾸밈

  - 리사이클러 뷰 이용

    - 선언 in 그래들 파일

      implementation ‘androidx.recyclerview:recyclerview:1.2.1’

    - 리사이클러 뷰를 XML에 등록

      android:id=”@+id/recyclerView”

  - 뷰 홀더 준비

    class MyViewHolder(val binding: ItemMainBinding): RecyclerView.ViewHolder(binding.root)

    - RecyclerView.ViewHolder를 상속받아 작성

  - 어댑터 준비

    - 뷰 홀더의 뷰에 데이터를 출력해 각 항목을 만들어 주는 역할

    - RecyclerView.Adapter를 상속받아 작성

    - 어댑터에 재정의해야 하는 함수

      : getItemCount(), onCreateViewHolder(), onBindViewHolder()

  - 리사이클러 뷰 출력

    : 리사이클러 뷰에 어댑터와 레이아웃 매니저를 등록

    ```kotlin
    binding.recyclerView.layoutManager= LinearLayoutManager(this)
    binding.recyclerView.adapter= MyAdapter(datas)
    binding.recyclerView.addItemDecoration(DividerItemDecoration(this, LinearLayout Manager.VERTICAL))
    ```

  - 항목을 동적으로 추가, 제거

    - 항목을 구성하는 데이터에 새로운 데이터를 추가하거나 제거
    - notifyDataSetChanged() 함수 호출

- 레이아웃 매니저

  - Explanation
    - 어댑터로 만든 항목을 리사이클러 뷰에 배치
    - RecyclerView.LayoutManager를 상속받은 클래스
  - LinearLayoutManager: 항목을 가로나 세로 방향으로 배치
    - 해당 레이아웃 매니저를 가장 많이 이용
  - GridLayoutManager: 항목을 그리드로 배치
  - StaggeredGridLayoutManager: 항목을 높이가 불규칙한 그리드로 배치
    - 뷰를 그리드 구조로 배치
    - 각 뷰의 크기가 다르면 지그재그 형태로 배치

- 아이템 데코레이션

  - 라이브러리에서 제공하는 아이템 데코레이션: DividerItemDecoration(구분선 출력)
  - 커스템 데코레이션: ItemDecoration 을 상속받아 개발자 클래스를 생성
    - onDraw(): 항목이 배치되기 전에 호출
    - onDrawOver(): 항목이 모두 배치된 후 호출
    - getItemOffsets(): 개별 항목을 꾸밀 때 호출
  - 만든 아이템 데코레이션 객체를 리사이클러 뷰에 적용: addItemDecoration() 이용

### 11-5. 뷰 페이저2- 스와이프로 넘기는 화면 구성(*)

- Overview- Explanation

  - 플랫폼 API에서 제공하지 않는 라이브러리
    - androidx 라이브러리를 이용해 개발해야 함

- 뷰 페이저 2 이용

  - 선언 in 그래들 파일

    implementation ‘androidx.viewpager2:viewpager2:1.0.0’

  - 뷰 페이저 2를 XML에 등록

    <androidx.viewpager2.widget.ViewPager2

    … />

- 어댑터

  - 사용 가능한 2가지 어댑터
    - RecyclerView.Adapter: 리사이클러 뷰에 적용한 어댑터 원리와 동일하게 적용
    - FragmentStateAdapter: 항목을 프래그먼트로 작성 → FragmentStateAdapter로 뷰 페이저2 구현
  - 프래그먼트 어댑터 이용
    - FragmentStateAdpater 상속받아 어댑터를 작성
    - getItemCount()
    - createFragment()

- 뷰 페이저2 에서의 화면 방향 설정: default- 가로

  binding.viewpager.orientation= ViewPager2.ORIENTATION_VERTICAL

### 11-6. 드로어 레이아웃- 옆에서 열리는 화면 구성

- Overview- Explanation

  - 액티비티 화면에 보이지 않던 내용이 밀려나오는 기능
  - androidx 의 라이브러리

- 드로어 레이아웃 이용

  - 선언 in 그래들 파일

    implementation ‘androidx.drawerLayout:drawerlayout:1.1.1’

  - 드로어 레이아웃을 XML에 등록

    - 액티비티 레이아웃 XMl 파일의 루트 태그를 DrawerLayout으로 선언

    - DrawerLayout 아래에 2개의 뷰를 선언

      → 첫 번째 태그에 해당하는 뷰가 default로 나오고

      → 사용자가 화면 끝을 밀면 두 번째 태그에 해당하는 화면이 나타남

    - 두 번째 태그→ android:layout_gravity: 화면에서 나오는 방향 지정

  - 드로어 메뉴 토글 버튼

    - ActionBarDrawerToggle 클래스에서 제공

    - 토클 버튼으로 드로어를 제어하려면 토글 버튼의 이벤트를 처리해주어야 함

      → onOptionItemSelected()

### 11-7. 제트팩을 이용해 화면 구성하기 Do it!(실습)

> 정리
>
> - 제트팩은 구글에서 안드로이드 앱 개발을 위해 제공하는 다양한 라이브러리의 모음
> - androidx.appcompat은 API 레벨 호환성을 제공하는 라이브러리(+액션바, 툴바)
> - androidx.fragment는 액티비티처럼 동작하는 뷰를 제공하는 라이브러리
> - androidx.recyclerview는 목록 화면을 구성하는 라이브러리
> - androidx.viewpager2는 스와이프로 화면 전환을 제공하는 라이브러리
> - androidx.drawlayout은 손가락으로 화면을 탭해서 옆으로 밀면 서랍처럼 메뉴가 열리도록 화면을 구성하는 라이브러리
