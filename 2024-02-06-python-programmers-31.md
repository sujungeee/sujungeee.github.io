---
title: "[프로그래머스] 양과 늑대"
author: sujungeee
date: 2024-02-06 12:48:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false


---



> 코딩테스트 합격자되기 파이썬 편- 문제 31

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/92343]( https://school.programmers.co.kr/learn/courses/30/lessons/92343)





#### ✅ 문제 접근

1. 루트 노드에서부터 트리를 타고 내려가다가 양보다 늑대의 수가 같거나 많으면 같은 레벨의 다른 노드를 탐색한다. (DFS??)



2. 다른 노드를 탐색하고 본래 노드로부터 트리를 내려가면서 다시 양과 늑대의 수를 파악해야 한다.

   - 다른 노드에서 양의 수가 늘어 늑대의 총합이 양의 총합보다 적을 수 있기 때문

     ⇒ 다시 탐색하여 양의 수를 더 늘릴 수 있다.

   - 다른 노드를 탐색하기 전에, 기존에 탐색했던 노드에 대한 정보를 저장해야 추후에 다시 탐색할 수 있음



#### ✅ 기능

1. 루트 노드에서부터 갈 수 있는 노드를 찾아 트리를 내려가면서 늑대와 양의 수를 파악하기

   - 양의 수보다 늑대의 수가 같거나 더 많으면 탐색 중지

   - 늑대 수가 더 많기 시작한 트리의 레벨 - 1 까지의 양의 수는 현재 최대 양의 수

   - 현재 최대 양의 수를 가진 노드까지는 탐색이 되었으므로, 탐색 여부에 대한 정보를 따로 저장(visited)

     ∵ 탐색된 노드는 양과 늑대의 수를 세는데 있어서 추가로 더해지지 않아야 하기 때문에



2. 남은 노드들이 트리를 전부 내려갔음에도 늑대의 수가 더 같거나 많으면 탐색을 중지하고 최대 양의 수를 return





#### ✅ 구현

```python
from collections import deque
def bfs(start, end, maps):
    cost= 0
    direction= [[0,-1],[0,1],[-1,0],[1,0]] # 좌표 이동을 위한 좌우상하

    X = len(maps)
    Y = len(maps[0])
            
    visited = [[False] * Y for _ in range(X)]
    que= deque()
    # 시작 지점 설정
    for i in range(X):
        for j in range(Y):
            if maps[i][j] == start:
                sx, sy= i, j
                que.append([sx,sy,0])
                visited[sx][sy] = True

    while que:
        x, y, cost= que.popleft()

        if maps[x][y] == end:
            return cost

        for dir in direction:
            nx= x+dir[0]
            ny= y+dir[1]

            if 0<=nx<X and 0<=ny<Y and maps[nx][ny]!='X':
                if not visited[nx][ny]:
                    que.append([nx,ny,cost+1])
                    visited[nx][ny]= True
    return -1

def solution(maps):
    startToLever= bfs('S','L', maps)
    leverToExit= bfs('L','E', maps)

    if startToLever!= -1 and leverToExit!= -1:
        return startToLever+leverToExit

    return -1
```



#### ✅ 회고

​	

: 상하좌우 중 이동할 수 있는 좌표들을 deque에 담고, deque의 가장 앞에 있는 것을 뽑아(popleft()) 다시 이동할 수 있는 좌표들을 append 하는 작업을 반복한다. 이 과정은 너비 우선 탐색으로 최단 경로의 거리를 찾고자할 때 주로 진행한다. 현재 가능한 경우들을 모두 추가하고, 가장 먼저 추가한 이동 좌표에 대해서 다시 경우의 수를 생각하는 작업의 반복이 바로 너비 우선 탐색을 deque으로 구현하는 방법이다!

: 물론 이 과정에서 지나간 곳은 다시 지나가면 안되기 때문에 visited 조건은 추가로 달아주어야 한다. 해당 조건과 함께 이동 가능 범위(map 안, 'X' 아님) 내로 움직일 수 있다면 cost를 추가하여 경로의 거리를 1씩 늘려가도록 구현하였다.

: 마지막으로 START 지점에서 레버까지의 경로와 레버에서 EXIT까지의 경로를 나눈 이유는 visited 뿐만 아니라 deque의 남은 경로들도 깔끔히 초기화시키고 싶었기 때문! 

: ps) 밑의 블로그를 참고하여서 공부하였다 .. ! 덱으로 BFS 구현해보는 알찬 경험(?)이었다 후후

