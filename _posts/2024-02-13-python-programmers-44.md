---
title: "[프로그래머스] 배달"
author: sujungeee
date: 2024-02-13 20:59:00 +0800
categories: [Programming, Python(프로그래머스)]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false



---



> 코딩테스트 합격자되기 파이썬 편- 문제 44

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/12978]( https://school.programmers.co.kr/learn/courses/30/lessons/12978)





#### ✅ 문제 접근

1. "모든" 마을이 k 거리(가중치) 내에 있는 지의 여부를 알아야 한다. 



2. 간선 개수가 아닌 가중치의 합을 기준으로 최단 경로를 탐색해야 한다.

   ⇒ 다익스트라, 벨만-포드, 플로이드-워셜 알고리즘, ...



#### ✅ 기능

1. 그래프 정보를 딕셔너리로 표현: {노드: (이웃 노드, 가중치)}



2. 각 노드 값의 최단 거리를 구하기
   - 다익스트라 알고리즘 이용



3. 거리가 k 이내인 노드의 개수를 return




#### ✅ 구현

```python
import heapq

def solution(N, road, K):
    distances= [float("inf")]*(N+1)
    distances[1]= 0
    
    heap= []
    heapq.heappush(heap, (0, 1))

    dic= {i: [] for i in range(1,N+1)}
    for a,b, weight in road:
        dic[a].append((b, weight))
        dic[b].append((a, weight))

    while heap:
        distance, node= heapq.heappop(heap)

        for ad_node, weight in dic[node]:
            dist= distance+ weight
            if dist < distances[ad_node]:
                distances[ad_node]= dist
                heapq.heappush(heap, (dist, ad_node))

    return len([i for i in distances if i<=K])
```



#### ✅ 회고

​	

: 가중치를 가진 그래프에서 각 노드의 최단 거리를 알기 위해 사용할 수 있는 알고리즘은 문제 접근에서 명시하였듯이 여러 개가 있다. 따라서 여러 알고리즘 중 가중치는 자연수라는 제약 조건을 보고 다익스트라를 이용해 구현해야 겠다고 생각했다. 알고리즘을 구현하기 전 노드의 연결 정보를 가진 road 배열을 딕셔너리로 먼저 바꾸었더니 다익스트라를 구현하기 훨씬 수월해졌다.
