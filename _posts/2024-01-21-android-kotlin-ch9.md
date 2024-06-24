---
title: "[안드로이드] Ch9. 리소스 활용하기"
author: sujungeee
date: 2024-01-21 15:58:00 +0800
categories: [Android App, 이론]
tags: [Android, Kotlin, doc]
render_with_liquid: false

---



※ 본 포스팅은 "깡샘의 안드로이드 앱 프로그래밍 with 코틀린" 을 참고하여 작성하였습니다.



### 09-1. 리소스의 종류와 특징

- Overview- Explanation

  - 리소스
    - 앱 리스소
    - 플랫폼 리소스

- 앱 리소스 사용하기

  - Explanation

    - 개발자가 직접 추가한 리소스
    - res(drawable, layout, mipmap, values) 디렉토리에 리소스 파일을 생성

  - 안드로이드 앱의 리소스 종류

    - animator- 속성 애니메이션 XML
    - anim- 트윈 애니메이션 XML
    - color- 색상 상태 목록 정의 XML
    - drawable- 이미지 리소스
    - mipmap- 앱 실행 아이콘 리소스
    - layout- 레이아웃 XML
    - menu- 메뉴 구성 XML
    - raw- 원시 형태로 이용되는 리소스 파일
    - values- 단순 값으로 이용되는 리소스
    - xml- 특정 디렉토리가 정의되지 않은 나머지 XML 파일
    - font- 글꼴 리소스

  - 레이아웃 리소스- layout 디렉토리

    : 화면을 구성하는 레이아웃 XML 파일을 저장하는 디렉토리

  - 이미지 리소스- drawable 디렉토리

    - 이미지 리소스를 저장하는 디렉토리
    - ImageView 등에서 이용 가능
    - XML 이미지 태그

    | 태그       | 설명                                                         |
    | ---------- | ------------------------------------------------------------ |
    | <shape>    | 도형을 의미하여 android:shape=”rectangle” 처럼 shape 속성을 이용해 도형의 타입을 지정. shape 값은 rectangle, oval, line, ring 중에서 선택할 수 있음 |
    | <corners>  | 둥근 모서리를 그리는 데 사용. shape 값이 rectangle일 때만 적용 |
    | <gradient> | 그라데이션 색상 지정                                         |
    | <size>     | 도형의 크기 지정                                             |
    | <solid>    | 도형의 색상 지정                                             |
    | <stroke>   | 도형의 윤곽선 지정                                           |

  - 실행 아이콘 리소스- mipmap 디렉토리

    : 앱을 실행할 때 실행 아이콘의 이미지 리소스가 저장되는 디렉토리

  - 값 리소스- values 디렉토리

    - 문자열, 색상, 크기, 스타일, 배열 등의 값
    - 값 리소스의 식별자는 값을 지정한 태그의 name 속성 값이 됨
    - <style> 로 뷰에 중복되는 속성들을 한꺼번에 지정 가능

  - 색상 리소스- color 디렉토리

    - 특정 뷰의 상태를 표현
    - 그 상태에 적용되는 색상을 등록할 때 사용

  - 글꼴 리소스- font 디렉토리

    - 글꼴 리스소스를 저장
    - TTF, OTF 파일을 저장하고, 글꼴을 적용할 뷰를 이용하면 됨

- 플랫폼 리소스 사용하기

  - Explanation
    - 플랫폼 리소스: 안드로이드 플랫폼이 제공하는 자체 리소스
    - Package - Libraries 항목
  - 코드에서 플랫폼 리소스 사용
    - android.R.drawable.alert_dark_frame
  - XML에서 플랫폼 리소스 사용
    - @android:drawable/alert_dark_frame

### 09-2. 리소스 조건 설정

- 리소스 조건 설정이란?

  - Explanation
    - 어떤 리소스를 특정 환경에서만 적용되도록 설정하는 것
  - 실행 아이콘에서의 리소스 조건 설정(mipmap)
    - res - mipmap-mdpi
    - res - mipmap-hdpi 처럼 - 뒤에 조건을 지정해주면
    - 조건에 따라 실행 아이콘을 표시
    - ic_launcher 밑에 자동 생성
  - 다른 리소스 디렉토리에서의 리소스 조건 설정
    - 표 9-4(p.247) 참고
    - 조건을 여러 개 명시하고 싶은 경우 순서에 맞춰서 나열해야 함

- 화면 회전에 대응하기

  - Explanation
    - 리소스 조건으로 화면 회전에 대응하는 UI 생성 가능
  - 과정
    - 회전에 대응하는 세로, 가로 화면을 각각 제작
    - layout 디렉토리에 있는 xml 파일은 세로 방향의 UI
    - layout-land 디렉토리에 있는 xml 파일은 가로 방향의 UI

- 국제 언어 제공하기(values - strings - strings.xml)

  - 기본이 영어고 한국어를 추가 제공

    - values 디렉토리의 strings.xml: 영어 문자열 리소스

      → values 디렉토리 이므로 name 속성을 적용

    - values-ko-rKR 디렉토리의 strings.xml: 한국어 문자열 리소스

### 09-3. 폰 크기의 호환성

- Overview- Explanation

  - 폰 크기의 호환성
    - 안드로이드 시스템 내에서 지원
    - 개발자가 직접 코드에서 구현
  - 안드로이드 기기의 크기

- 논리적인 단위 알아보기

  > dpi: dot per inch
  >
  > - 1인치 안에 있는 도트의 개수

  - 안드로이드 기기의 크기 구분

    - ldpi
    - mdpi
    - hdpi
    - xhdpi
    - xxhdpi
    - xxxhdpi

  - 논리적인 단위: 콘텐츠의 크기를 지정할 때는 dp, sp의 논리적인 단위를 사용해야 함

    - dp: 스크린의 물리적 밀도에 기반을 둔 단위(일반 크기)
    - sp: dp와 유사하며 글꼴 크기에 적용

  - 물리적인 단위: px

  - dp 사용

    - 시스템에서 기기의 dpi를 보고 크기를 조정하여 출력

    - 기기의 크기에 따라 px이 달라짐

      ex) mdpi→ 1dp = 1px

      ex) xxhdpi → 1dp = 3px

- 화면 정보 가져오기

  - 개발자가 직접 기기에 따른 크기의 호환성을 구현할 때 먼저 기기의 크기 정보를 가져와야 함
  - 기기의 크기 정보 가져오기
    - 30버전 이전: DisplayMetrics로 크기 정보 가져오기
    - 30버전 이후: WindowMetrics로 크기 정보 가져오기

  > Build.VERSION.SDK_INT: 앱이 실행되는 기기의 버전 값
  >
  > Build.VERSION_CODES.R: 안드로이드 11버전, API 레벨 30 버전

### 09-4. 메신저 앱의 인트로 화면 만들기 Do it! (실습)

> 정리
>
> - 안드로이드에서 제공하는 리소스에는 anim, animator, layout, drawable, mipmap, values, menu, raw, xml, color, font 등이 있음
> - 리소느는 res 디렉토리의 하위 디렉토리에 위치하며 지정된 디렉토리 명을 이용해야 함
> - values 디렉토리의 리소스들은 파일명으로 식별되지 않고 파일의 태그에 등록한 name 속성 값으로 식별됨
> - 리소스 디텍토리명에 - 를 추가해 디렉토리의 리소스를 어떤 환경에서 이용해야 하는지 조건을 명시할 수 있음
> - dp, sp 등의 논리적인 단위를 이용하면 시스템에서 크기를 늘리거나 줄임
