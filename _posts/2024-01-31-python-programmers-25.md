---
title: "[프로그래머스] 메뉴 리뉴얼"
author: sujungeee
date: 2024-01-31 09:15:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false
---



> 코딩테스트 합격자되기 파이썬 편- 문제 25

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/72411]( https://school.programmers.co.kr/learn/courses/30/lessons/72411)





#### ✅ 문제 접근

1. 코스를 이루는 단품 메뉴의 개수는 주문에 따라서 코스에 사용되지 않을 수 있다.

   ex) 코스에서의 단품 메뉴가 5개이지만 메뉴 5개 이상의 주문 건수가 1개이면 코스 요리 후보로 포함되지 않음



2. 가능한 단품 메뉴 조합을 두고 가장 많이 주문한 조합을 코스 요리 후보로 추가한다.
   - 단, 구성 갯수가 같은 조합이 주문 횟수도 동일하다면 함께 코스 요리 후보로 추가



#### ✅ 기능

1. 코스의 단품 요리 개수(course)를 바탕으로 주문에서 가능한 코스 요리 후보를 만들기
   - combinations 이용
   - 이때, 메뉴들을 먼저 정렬하고 조합하여야 함(순서만 다른 같은 메뉴 조합이 나올 수 있기 때문)



2. 메뉴 조합에 대한 주문 횟수를 구하고, 주문 횟수가 가장 큰 조합을 answer로 추가
   - 단 주문 횟수는 적어도 2회 이상이어야 함
   - 출력 예시에 맞게 answer를 한번 더 정렬하여 알파벳 순으로 return



#### ✅ 구현

```python
from itertools import combinations
from collections import Counter

def solution(orders, course):
    answer= []

    for num in course:
        menu = []

        for order in orders:
            menu += combinations(sorted(order),num)
        counter= Counter(menu)

        for key, value in counter.items():
            if (value >= 2) and (value == max(counter.values())):
                answer.append("".join(key))

    return sorted(answer)
```



#### ✅ 회고

​	

: 이번 문제는 combinations와 Counter를 적절히 섞어서 구현해냈다. combinations는 이번에 처음 이용해봤고, Counter는 몇 번 사용해보았던 기능이었다. 그런데 단순 Counter 가 아닌 Counter 객체.most_common() 은 Counter와는 약간 다르다는 것을 알게 되었다.

: [이론] 먼저 Counter를 출력하면 Counter 객체 자체를 출력하며, 출력 형식은 {요소: 빈도} 의 딕셔너리 형태이다. 반면 Counter 객체.most_common()은 리스트 안에서 요소 튜플과 빈도를 튜플로 묶은 형태로 출력된다.

: [실전] Counter 만을 이용한 위의 코드에서는 가장 큰 빈도 수(주문 횟수)를 가진 값을 구하기 위해서 Counter객체의 values 중 가장 큰 값을 max로 찾아내었다. 하지만 Counter 객체.most_common() 을 이용한다면 [0][1]의 인덱스만으로 가장 큰 값을 찾아내면 된다. 가장 큰 빈도 수부터 주문이 나열되기 때문에 가장 앞([0])의 [1] 인덱스가 바로 가장 큰 주문 횟수일 것이기 때문!
