---
title: "[Python] 전력망을 둘로 나누기"
author: sujungeee
date: 2024-02-20 17:02:00 +0800
categories: [코딩 테스트, 프로그래머스]
tags: [Python, 프로그래머스, Python, Review]
render_with_liquid: false




---



> 코딩테스트 합격자되기 파이썬 편- 문제 46

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/86971]( https://school.programmers.co.kr/learn/courses/30/lessons/86971)





#### ✅ 문제 접근

1. 전선 정보를 이용하여 송전탑을 2개의 집합(A, B)으로 나누고,

   A의 집합의 개수를 전체 n에서 차감하여 B의 집합의 개수를 구한다.

   - A는 전선 정보의 한 번호에서부터 연결되어있는 모든 송전탑을 집합으로 포함해야 함

     ⇒ DFS 이용



2. A와 B의 차이(절대값)를 return



#### ✅ 기능

1. 전선 정보에서의 한 번호로 깊이 우선 탐색을 진행하여 연결되어있는 송전탑의 개수를 구하기



2. 두 집합의 개수의 차가 기존 차이 값보다 작으면 갱신




#### ✅ 구현

```python
from collections import defaultdict
def solution(n, wires):
    answer= float('inf')

    adj_list=defaultdict(list)
    for u, v in wires:
        adj_list[u].append(v)
        adj_list[v].append(u)

    def dfs(node, visited): # 1. DFS(재귀 함수 이용)
        visited.add(node)
        for adj in adj_list.get(node, []):
            if adj not in visited:
                dfs(adj, visited)
        return len(visited)

    for wire in wires: # 2. 두 집합의 개수의 차(diff)가 기존 차이 값(answer)보다 작으면 갱신
        visited = set()
        adj_list[wire[0]].remove(wire[1])
        adj_list[wire[1]].remove(wire[0])

        a= dfs(wire[0], visited)
        b= n-a
        diff= (a-b if a>b else b-a)
        answer= (diff if diff<answer else answer)

        adj_list[wire[0]].append(wire[1])
        adj_list[wire[1]].append(wire[0])

    return answer
```



#### ✅ 회고

​	

: 각 전선 정보들에 대해서 그래프의 연결을 제거하고 DFS를 이용해서 집합의 개수를 구하는 방식으로 해당 문제를 구현하였다. 전선 정보가 바뀌지 않게끔 전선을 끊고 다시 연결하는 것을 DFS의 앞뒤로 배치하였는데, 이를 DFS 내에서 해결할 수 있는 방법도 차차 생각해봐야겠다.=_=;;;