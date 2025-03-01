---
title: "[안드로이드] 02. Android UI"
author: sujungeee
date: 2024-09-19 21:09:00 +0800
categories: [안드로이드, 실습]
tags: [안드로이드, Android, Kotlin, practice]
render_with_liquid: false

---

> 안드로이드 UI(View)



### Event

```kotlin
// 1. anonymous nested class로 event handler 구현
binding.eventBtn.setOnClickListener( object: View.OnClickListener { // SAM
    override fun onClick(v: View) {
        Toast.makeText(this@StartActivity, "Hello World", Toast.LENGTH_SHORT).show()
    }
})

// 2. 람다식 적용하기
binding.eventBtn.setOnClickListener({ v: View? ->
    Toast.makeText(this, "Hello World", Toast.LENGTH_SHORT).show()
})

// 3. 최종 코드
binding.eventBtn.setOnClickListener {
    Toast.makeText(this, "Hello World" + it.javaClass.name, Toast.LENGTH_SHORT).show()
}
```



### TextView / ImageView

- Button
- EditText
- ImageView



### ViewGroup

#### 1. AdapterView

- AdapterView
  - Spinner
  - ListView
  - GridView
  
- Adapter

  - ListView

    - ArrayAdapter: 기본 문자열을 표현하는 리스트 뷰
  
      ```kotlin
      listview1 = findViewById(R.id.listview1)
      // simple_list_item_1: 하나의 데이터를 보이기 적합한 레이아웃
      val adapter1 = ArrayAdapter(this, android.R.layout.simple_list_item_1, strData)
      
      listview1.adapter = adapter1
      
      // setOnItemClickListener: 아이템 클릭 시 이벤트 처리
      listview1.setOnItemClickListener { parent, view, position, id ->
          selectedTv.text = parent.adapter.getItem(position).toString()
          Log.d(TAG, "onCreate: ${parent.adapter.getItem(position)}")
      }
      ```
  
    - CursorAdapter
  
    - SimpleAdapter: Map 등 여러 속성을 갖는 데이터를 표현하는 리스트 뷰
  
      ```kotlin
      listview2 = findViewById(R.id.listview2)
      // simple_list_item_2: 두 개의 데이터를 보이기 적합한 레이아웃
      val adapter2 = SimpleAdapter(this
                                   , mapData
                                   , android.R.layout.simple_list_item_2
                                   , arrayOf("id","name")
                                   , intArrayOf(android.R.id.text1, android.R.id.text2))
      
      listview2.adapter = adapter2
      
      listview2.setOnItemClickListener { parent, view, position, id ->
          selectedTv.text = parent.adapter.getItem(position).toString()
          Log.d(TAG, "onCreate: ${parent.adapter.getItem(position)}")
      }
      ```
  
    - CustomAdapter: 사용자 정의 화면을 갖는 리스트 뷰
  
      ```kotlin
      listview3 = findViewById(R.id.listview3)
      // R.layout.list_item_layout: 각 아이템을 정의한 레이아웃
      val adapter3 = CustomListAdapter(this,  mapData, R.layout.list_item_layout)
      
      listview3.adapter = adapter3
      
      listview3.setOnItemClickListener { parent, view, position, id ->
          selectedTv.text = parent.adapter.getItem(position).toString()
          Log.d(TAG, "onCreate: ${parent.adapter.getItem(position)}")
      }	
      ```
  
      ```kotlin
      class CustomListAdapter(val context:Context, var items: List<Map<String, String>>, val layout: Int)
          : BaseAdapter(){
      
          override fun getView(p0: Int, p1: View?, parent: ViewGroup?): View {
              // xml -> java로 inflate
              val inflater= LayoutInflater.from(context)
              val view= inflater.inflate(layout, parent, false)
      
              // view에 값 변경
              view.findViewById<TextView>(R.id.tvId).text= items.get(p0).get("id")
              view.findViewById<TextView>(R.id.tvName).text= items.get(p0).get("name")
      
              return view
          }
      
          override fun getCount(): Int {
              return items.size
          }
      
          override fun getItem(p0: Int): Any {
              return items.get(p0)
          }
      
          override fun getItemId(p0: Int): Long {
              return p0.toLong()
          }
      }
      ```
  



### Android Font, dp, sp

- Font

  <img width="218" alt="font" src="https://github.com/user-attachments/assets/5f4e39b3-e3ca-4ccc-ae4a-13949d37cab7">

  - /res/font에 여러 굵기의 폰트를 삽입

  - .xml로 fontFamily 파일 생성

    ```xml
    <?xml version="1.0" encoding="utf-8"?>
    <font-family 
                 xmlns:android="http://schemas.android.com/apk/res/android"
                 xmlns:app="http://schemas.android.com/apk/res-auto">
        <font
            android:font="@font/poppins_black"
            android:fontStyle="normal"
            android:fontWeight="900"
            app:font="@font/poppins_black"
            app:fontStyle="normal"
            app:fontWeight="900" />
    		
      	...
      	
        <font
            android:font="@font/poppins_regular"
            android:fontStyle="normal"
            android:fontWeight="300"
            app:font="@font/poppins_regular"
            app:fontStyle="normal"
            app:fontWeight="300" />
    
    </font-family>
    ```

  - 텍스트에 font 적용(fontFamily)

    [적용 결과]

    <img width="143" alt="폰트 적용" src="https://github.com/user-attachments/assets/47da0f32-3edf-490c-9d78-a04be0b2339a">

    ```xml
    <Button
            android:id="@+id/main_btn"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="main 버튼"
            android:fontFamily="@font/poppins_medium"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent" />
    ```



- dp / sp
  - dp: 픽셀에 독립적인 단위, 어떤 화면의 크기에서도 동일한 크기로 나타난다!
  - sp: dp와 비슷하지만, 사용자가 선택한 글꼴 크기에 의해 크기가 조절됨



### Android Layout

- layout_gravity 속성과 gravitiy 속성

  - layout_gravity

    - 부모 layout 내에서 View 위치가 정렬되는 위치를 결정하는 속성

    - 값의 종류

      | 상수                     | 설명                                                         |
      | ------------------------ | ------------------------------------------------------------ |
      | Bottom / clip_horizontal | 사이즈를 바꾸지 않고 객체를 바닥으로 내림                    |
      | Center / clip_vertical   | 수직 / 수평 방향의 중앙으로 사이즈를 바꾸지 않고 객체를 이동시킴 |
      | center_horizontal / end  | 사이즈를 바꾸지 않고 수평 방향 가운데로 객체를 위치          |
      | center_vertical /fill    | 사이즈를 바꾸지 않고 수직 방향 가운데로 객체를 위치          |
      | fill_horizontal          | 해당 위젯의 가로를 부모 뷰그룹의 사이즈에 맞게 늘려 채워줌   |
      | fill_vertical            | 해당 위젯의 세로를 부모 뷰그룹의 사이즈에 맞게 늘려 채워줌   |

      [적용 결과]

      <img width="302" alt="layout_gravity" src="https://github.com/user-attachments/assets/7a4691aa-1d27-46a5-8ec4-7c3773fb842b">

      ```xml
      <Button
              android:id="@+id/center_btn"
              android:layout_width="300dp"
              android:layout_height="wrap_content"
              android:layout_gravity="center"
              android:gravity="right"
              android:text="안녕하세요.는 right, layout_gravity는 center"/>
      
          <Button
              android:id="@+id/center_horizontal_btn"
              android:layout_width="300dp"
              android:layout_height="wrap_content"
              android:layout_gravity="center_horizontal"
              android:gravity="right"
              android:text="안녕하세요.는 right, layout_gravity는 center_horizontal"/>
      ```

  - gravity

    - TextView 위젯 안에 표시되는 텍스트가 TextView 내에서 어디에 정렬될 것인가를 지정하기 위한 속성
    - View 내부에서 남은 공간 활용



- layout_weight

  - 가중치를 이용한 영역 분할

    [적용 결과]

    <img width="303" alt="layout_weight" src="https://github.com/user-attachments/assets/4ba72cc7-332f-47d1-bb45-3be017d1d704">

    ```xml
    <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal"
            android:layout_marginTop="30dp">
    
            <TextView
                android:id="@+id/text1"
                ...
                android:layout_weight="1"/>
    
            <TextView
                android:id="@+id/text2"
                ...
                android:layout_weight="1"/>
    
            <TextView
                android:id="@+id/text3"
                ...
                android:layout_weight="1"/>
    
        </LinearLayout>
    ```



#### RelativeLayout / FrameLayout / TableLayout / GridLayout

|                | 레이아웃                                                     | 설명                                                         | 속성                                              |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| RelativeLayout | 화면에 이미 배치된 뷰를 기준으로 다른 뷰의 위치를 지정하는 레이아웃 |                                                              | 상대 위치를 지정하는 속성 / align 속성            |
| FrameLayout    | FrameLayout 레이아웃에 포함된 뷰들을 같은 영역에 겹쳐서 배치할 때 사용 | z축처럼 해당 공간에서 위로 view가 쌓이는 형태                |                                                   |
| TableLayout    | 뷰를 테이블 구조로 나열하는 레이아웃                         | &lt;TableRow&gt;로 개행<br>, 셀의 개수를 예측할 수 없어서 데이터가 가변적일 때는 화면 구성이 복잡함 |                                                   |
| GridLayout     | 뷰를 테이블 구조로 나열                                      | android:coloumnCount로 자동 개행                             | rowCount(최대 행 개수), columnCount(최대 열 개수) |



### Android Menu

#### Options Menu

> 앱 바의 옵션 버튼을 이용하는 메뉴

1) 메뉴 구성을 위한 xml을 생성

   ```xml
   <menu xmlns:android="http://schemas.android.com/apk/res/android"
       xmlns:app="http://schemas.android.com/apk/res-auto">
       <item
           android:id="@+id/example_item"
           android:title="안녕 메뉴아이템"
           android:icon="@drawable/android_icon"
           app:showAsAction="ifRoom"/>
   
       <group android:id="@+id/example_group">
           <item
               android:id="@+id/example_item2"
               android:title="그룹 내부 아이템 1" />
           <item
               android:id="@+id/example_item3"
               android:title="그룹 내부 아이템 2" />
       </group>
       <item android:id="@+id/example_submenu" android:title="상위 메뉴">
           <menu>
               <item android:id="@+id/item_exit" android:title="종료" />
           </menu>
       </item>
   </menu>
   
   ```

2) 상단 Toolbar가 보이게끔 Theme 수정

   ```xml
   <style name="Base.Theme.Practice" parent="Theme.Material3.DayNight">
       <!-- Customize your dark theme here. -->
       <!-- <item name="colorPrimary">@color/my_dark_primary</item> -->
   </style>
   ```

3) onCreateOptionsMenu / onOptionsItemSelected

   ```kotlin
   override fun onCreateOptionsMenu(menu: Menu?): Boolean {
           val inflater= menuInflater
           inflater.inflate(R.menu.menu_option, menu)
           return super.onCreateOptionsMenu(menu)
       }
   
   // 전달된 MenuItem의 id로 아이템 구분
   override fun onOptionsItemSelected(item: MenuItem): Boolean {
       if (item.itemId == R.id.item_exit){
           finish()
       } else {
           Toast.makeText(this, "Hello menu, ${item.title}", Toast.LENGTH_SHORT).show()
       }
   
       return super.onOptionsItemSelected(item)
   }
   ```

   



#### Context Menu

> 특정 뷰를 이용하는 메뉴, 특정 뷰를 사용자가 길게 눌렀을 때 활성화

- registerForContextMenu(getListView())
- onCreateContextMenu()
- onContextItemSelected()

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
        ...

        // long click 시 context 메뉴를 연결할 view 등록
        registerForContextMenu(binding.contextMenuBtn)
}

override fun onCreateContextMenu(menu: ContextMenu?, v: View?, menuInfo: ContextMenu.ContextMenuInfo?) {
        super.onCreateContextMenu(menu, v, menuInfo)

        menuInflater.inflate(R.menu.menu_context, menu)
}

override fun onContextItemSelected(item: MenuItem): Boolean {
        when(item.itemId){
            R.id.context_menu_blue -> binding.contextMenuBtn.setTextColor(Color.BLUE)
            R.id.context_menu_red -> binding.contextMenuBtn.setTextColor(Color.RED)
            R.id.context_menu_green -> binding.contextMenuBtn.setTextColor(Color.GREEN)
        }
        return super.onContextItemSelected(item)
}
```



#### Popup Menu

> 특정 뷰를 이용하는 메뉴, 특정 뷰를 눌렀을 때 활성화

- PopupMenu를 생성, inflate, show()

```kotlin
binding.popupMenuBtn.setOnClickListener {
    val popupMenu = PopupMenu(applicationContext, it)
    menuInflater.inflate(R.menu.menu_popup, popupMenu.menu)
    popupMenu.setOnMenuItemClickListener { menuItem ->
        when(menuItem.itemId){
            R.id.popup_menu1 -> {
                Toast.makeText(this@MenuActivity, "메뉴 1 클릭", Toast.LENGTH_SHORT).show()
            }
            R.id.popup_menu2 -> {
                Toast.makeText(this@MenuActivity, "메뉴 2 클릭", Toast.LENGTH_SHORT).show()
            }
            else -> {
                Toast.makeText(this@MenuActivity, "메뉴 3 클릭", Toast.LENGTH_SHORT).show()
            }
        }
        false
    }
    popupMenu.show();
}
```
