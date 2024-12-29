---
title: "[안드로이드] 07. ContentProvider"
author: sujungeee
date: 2024-11-03 17:12:00 +0800
categories: [Android App, 실습]
tags: [Android, Kotlin, practice]
render_with_liquid: false

---

> ContentProvider



###  ContentProvider

- 동작 원리

  > ContentResolver에서 아래 메소드들 중 하나를 호출하면 ,
  >
  > ContentResolver가 ContentProvider에게 해당 기능을 수행하라고 알려줌

   - query(): 데이터 읽기

     ```kotlin
     public final @Nullable Cursor query(@RequirePermission.Read @NonNull Uri uri,
     	@Nullable String[] projection, @Nullable String selection,
     	@Nullable String[] selectionArgs, @Nullable String sortOrder){
       return query(uri, projection, selection, selectionArgs, sortOrder)
     }
     ```

  	- insert(): 데이터에 행 추가
  	- update(): 데이터 갱신
  	- delete(): 데이터로부터 행 삭제



### 주소록 가져오기

- Intent로 다른 앱 호출

  ```kotlin
  // 연락처 등록
  binding.button2.setOnClickListener{
    val intent = Intent().apply{
        action= Intent.ACTION_INSERT
        data= Uri.parse("content://com.android.contacts/contacts")
    }
  
    startActivity(intent)
  }
  ```

  

- URI Query로 접근

  ```kotlin
  private fun init() {
      val textview = findViewById<TextView>(R.id.textview)
      val URI = ContentUris.withAppendedId(ContactsContract.Contacts.CONTENT_URI, "1".toLong())
  
      val cursor= contentResolver.query(contactsURI, arrayOf<String>("_id", "display_name"), null, null, null)
  
      cursor.use{
          it?.let{
              while(it.moveToNext()){
                  for (i in 0..it.columnCount-1){
                      Log.d(TAG, "index: $i, name: ${it.getColumnName(i)}, value: ${it.getString(i)}")
                  }
              }
          }
      }
  }
  ```

  

- Adapter + 

  ```kotlin
      val adapter1 = CursorAdapter(
                  this,
                  R.layout.item_list,
                  cursor!!,
                  from,
                  to,
                  FLAG_REGISTER_CONTENT_OBSERVER
              )
      listview.adapter = adapter1
      ...
  }
  
  inner class CursorAdapter(
          context: Context, layout:Int, cursor:Cursor, from:Array<String>, to:IntArray, flag:Int
      ) : CursorAdapter(context, layout, cursor, from, to, flag){
  
      override fun onContentChanged() {
          super.onContentChanged()
          Log.d(TAG, "onContentChanged: ")
  
          val newCursor = contentResolver.query(URI, null, null, null, null)
          changeCursor(newCursor)
      }
  }
  ```

  

### ContentResolver로 갤러리에 접근하기

- 구현 과정

  - AndroidManifest에 권한 설정

    ```xml
    <uses-permission
            android:name="android.permission.READ_EXTERNAL_STORAGE"
            android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    ```

  - 권한 설정 추가: checkPermission()

    - 퍼미션 획득 성공일 때: (SELECT _id, title, data taken FROM images ORDER BY datataken DESC LIMIT 2)

      ```kotlin
      getImage()?.use { cursor ->
                       ...
                  		}
      }
      
      private fun getImage(): Cursor? {
              val resolver = contentResolver
              var queryUri = MediaStore.Images.Media.EXTERNAL_CONTENT_URI
      
              val what = arrayOf(
                  MediaStore.Images.ImageColumns._ID,
                  MediaStore.Images.ImageColumns.TITLE,
                  MediaStore.Images.ImageColumns.DATE_TAKEN
              )
         			...
              return resolver.query(queryUri, what, bundle, null, orderBy) // android 버전에 따라 정렬 & 건수 제한 (위의 경우는 이전 버전)
      }
      ```

    - 권한 없으면 창 띄우기: checker.requestPermissionLauncher.launch(runtimePermissions)



### ContentResolver로 미디어에 접근하기

- 구현 과정

  - AndroidManifest에 권한 설정

    ```xml
    <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
    ```

  - 권한 설정 추가: checkPermission()

    - 퍼미션 획득 성공일 때

      ```kotlin
      getAudio()?.use { cursor ->
                       ...
                  		}
      }
      
      private fun getAudio(): Cursor {
              val resolver = contentResolver
              val queryUri = MediaStore.Audio.Media.EXTERNAL_CONTENT_URI
      
              val sortOrder = MediaStore.Audio.Media.TITLE + " ASC";
      
              val what = arrayOf(
                  MediaStore.Audio.Media._ID,
                  MediaStore.Audio.Media.ALBUM_ID,
                  MediaStore.Audio.Media.TITLE,
                  MediaStore.Audio.Media.ARTIST,
              )
              return resolver.query(queryUri, what, null, null, sortOrder)!!
          }
      ```

    - 권한 없으면 창 띄우기: checker.requestPermissionLauncher.launch(runtimePermissions)

  - adapter 구성

    ```kotlin
    val musicAdapter = MusicAdapter(musicList)
    findViewById<RecyclerView>(R.id.recyle_view).apply{
        adapter = musicAdapter
        this.layoutManager = LinearLayoutManager(this@MediaActivity)
    }
    ```

    

### 같은 프로젝트에서 ContentProvider, ContentResolver 호출

- ContentProvider 작성
  - AndroidManifest.xml에 등록
  - 필수 메소드 구현
    - query()
    - insert()
    - update()
    - delete()
    - getType()
    - onCreate()



- ContentResolver 작성

  ```kotlin
  private fun saveState() {
      val values = ContentValues()
      values.put(Notes.TITLE, mTitleText.text.toString())
      values.put(Notes.BODY, mBodyText.text.toString())
  
      if (mRowId == -1L) {
              contentResolver.insert(Notes.CONTENT_URI, values)!!
      } else {
          val uri = ContentUris.withAppendedId(Notes.CONTENT_URI, mRowId)
          contentResolver.update(uri, values, null, null)
      }
  }
  ```

  



### ContentProvider와 ContentResolver를 분리해서 호출

- Provider의 AndroidManifest.xml

  > NotesDbHelper는 Provider 쪽에만 존재

  ```xml
  <provider android:name=".NotesDbHelper"
          android:authorities="com.android.contentprovider.note"
          android:exported="true"/>
  ```



- Resolver의 AndroidManifest.xml

  ```xml
  <queries>
      <provider android:authorities="com.android.contentprovider.note" />
  </queries>
  ```
