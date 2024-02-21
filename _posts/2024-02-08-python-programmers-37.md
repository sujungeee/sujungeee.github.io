---
title: "[프로그래머스] 섬 연결하기"
author: sujungeee
date: 2024-02-08 20:59:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false


---



> 코딩테스트 합격자되기 파이썬 편- 문제 37

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/42861]( https://school.programmers.co.kr/learn/courses/30/lessons/42861)





#### ✅ 문제 접근

1. 모든 섬을 방문해야 하고, 이 때 거쳐야 할 다리의 개수는 n-1 이다. (n: 섬의 전체 개수)

   - n-1 개의 다리가 선택될 때까지 섬을 방문

   - 최소 비용으로 섬을 방문해야 하므로 작은 비용을 가진 섬부터 차례대로 다리를 연결한다.



2. 특정 섬 A로부터 다른 C 섬으로 이동할 때에는 B섬을 경유하여도 된다.
   - 하지만, 섬끼리 서로 사이클을 형성하는 것은 안됨
   - 사이클은 최소 비용을 보장하지 못함!



#### ✅ 기능

1. cost가 작은 것 부터 오름차순으로 배열들을 정렬한다.
   - 정렬된 costs의 맨 앞은 다리(노드)를 연결할 때 최소의 비용을 갖음



2. 정렬된 costs를 돌면서 다리 개수가 n-1개가 될 때까지 다리를 연결

   - n-1가 되지 않았다면 아직 모든 다리를 연결하지 않았다는 의미이므로 costs를 계속 돌아야 함

   - 다리를 연결한다는 것 = 노드를 부모-자식의 트리 관계처럼 잇는다는 것

     ⇒ 최소 비용을 갖는 두 노드의 연결에서 각 노드는 마치 트리의 부모-자식이 되어 한 집합에 속해야 한다!

     ⇒ 이때, 사이클 형성은 최소 비용을 보장하지 못하므로 연결하지 않아야 함



3. 사이클이 형성되는지 확인하기
   - 연결하고자 하는 두 다리(노드)의 부모 혹은 루트 노드가 같으면 사이클이 형성됨



#### ✅ 구현

```python
def find(parent, i):
    if parent[i] == i:
        return i
    else:
        return find(parent, parent[i])

def solution(n, costs):
    minCost= 0 # 최소 비용
    costs.sort(key= lambda x: x[2])
    parent= list(range(n))

    bridges= 0 # 다리 개수

    for x,y,cost in costs:
        # 두 집합이 다르면 합치기
        if find(parent, x) != find(parent, y):
            minCost+= cost
            bridges+= 1
            parent[find(parent,x)]= y # x의 루트 노드의 부모를 y로
        if bridges == n-1:
            break
    return minCost
```



#### ✅ 회고

​	

: 본 문제는 그리디 알고리즘 중 크루스칼 알고리즘을 구현하는 문제였다. 사실 용어 자체는 처음 들어보긴 하지만 최소 신장 비용의 개념은 나름 익숙했던걸로🤣

: 구현할 때 유의했던 점은 아무래도 사이클 형성 여부를 따지면서 정렬된 앞에서부터 차례대로 집합을 합쳤던 것이다. 정렬된 costs에서 맨 앞 최소 비용을 가진 간선 정보가 사이클이 형성되지 않을 경우, 즉 노드끼리 연결이 가능할 경우 최적의 해를 만족하게 된다. 그렇게 다리 개수가 n-1가 될 때까지 costs를 마저 돌면서 최적의 해를 집합의 형태로 합치기 때문에 그리디(크루스칼) 알고리즘의 개념을 만족하는 코드라 할 수 있다!!