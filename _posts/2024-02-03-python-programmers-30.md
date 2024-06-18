---
title: "[프로그래머스] 미로 탈출"
author: sujungeee
date: 2024-02-03 10:32:00 +0800
categories: [Programming, Python(프로그래머스)]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false

---



> 코딩테스트 합격자되기 파이썬 편- 문제 30

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/159993]( https://school.programmers.co.kr/learn/courses/30/lessons/159993)





#### ✅ 문제 접근

1. 레버를 지나치고 난 다음 출구를 지나갈 수 있다.

    ⇒ (START ~ 레버까지의 최단 거리) + (레버 ~ EXIT까지의 최단 거리)



2. START에서 레버까지의 길과 레버에서 EXIT까지의 길 중 어느 하나라도 이동하지 못하는 구간이 있다면 -1을 반환해야 한다.



3. 한 번 지나간 칸은 다시 지나갈 수 없다. 
   - 단, 레버까지 지나온 칸과 EXIT까지 지나온 칸은 겹칠 수도 있음



#### ✅ 기능

1. map으로 시작 지점, 도착 지점, 레버 위치를 파악
   - 가능한 경로 범위: (0, 0)~(n-1, m-1) (map의 크기: m*n)
   - 이동 가능한 범위:  상/하/좌/우 (단, 벽에 부딪히거나 X가 나오면 이동하지 못함)



2. 각 시작 점부터 목적지까지의 최단 거리 구하기

   - 시작 점부터 이동할 수 있는 경로의 경우의 수를 구한다.

   - 경우의 수를 늘려가면서 거리를 잰다.

   - 가장 먼저 레버가 나온 경우의 수가 최단 경로를 갖음.

     ⇒ 해당 경우의 수의 거리는 곧 최단 거리가 됨

     ⇒ 더 이상 경우의 수가 나오지 않으면 이동이 불가능한 것이므로 -1을 반환

     ❗️ 한 번 지나간 칸은 다시 지나갈 수 없음



3. 두 최단 거리를 더해서 return



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



[참고 코드 >   https://velog.io/@ggb05224/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%AF%B8%EB%A1%9C-%ED%83%88%EC%B6%9C-python]( https://velog.io/@ggb05224/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%AF%B8%EB%A1%9C-%ED%83%88%EC%B6%9C-python)