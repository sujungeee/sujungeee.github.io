---
title: "[프로그래머스] 크레인 인형 뽑기 게임"
author: sujungeee
date: 2024-01-21 16:15:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false
---



> 코딩테스트 합격자되기 파이썬 편- 문제 13

[문제 >  https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=python3](https://school.programmers.co.kr/learn/courses/30/lessons/64061?language=python3)

 

#### ✅ 문제 접근

1. 크레인이 board 번호를 따라 움직이는 moves 배열로 바구니에 인형을 밑부터 차곡차곡 쌓아올려야 한다. 

   연속해서 두 개의 같은 인형이 바구니에 쌓였을 때 맨 위의 두 인형은 모두 사라져야 한다.

   - 스택 이용



2. 주어진 board 배열에서 0이 빈 칸임을 고려하여 격자 구성을 생각해야 한다.



3. 주어진 board 배열을 바구니에 즉시 담을 수 있는 리스트(스택)로 구성해야 한다.
   - board 배열을 순회하면서 값이 0이 아니라면 1. 행과 열을 바꾸고 2. 바뀐 열에서의 값을 격자 크기 N-1에서 빼야 한다. (배열과 격자의 행과 열이 서로 바뀌어 있고, 스택의 특성 상 맨 위의 값이 리스트의 마지막에 와야 하기 때문)



#### ✅  기능

1. Board 배열을 스택으로 구성하기: def stackList()

2. 구성한 스택으로 moves 배열에 따라 바구니에 인형을 넣기

   연속으로 같은 인형이 들어오면 두 번 pop 하고 사라진 인형의 개수(answer)를 2 더해주기: def solution()

   

#### ✅  구현

```python
def stackList(board):
    N = len(board[0])
    stackList = [[0 for _ in range(N)] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            if board[i][j] != 0:
                stackList[j][N - 1 - i] = board[i][j]
            else:
                stackList[j].pop(N - 1 - i)
    return stackList

def solution(board, moves):
    answer=0
    stack= stackList(board)
    blanket=[]
    for i in moves:
        # 인형 넣기
        if stack[i-1]:
            new= stack[i-1].pop()
            blanket.append(new)
        if len(blanket)>=2 and blanket[-2]==new:
            blanket.pop()
            blanket.pop()
            answer+=2
    return answer
```

​	

#### ✅  회고

: 내가 구현한 코드는 board 배열을 스택으로 재구성하여서 바구니에 넣었다. 

하지만, 가장 좋아요를 많이 받은 다른 사람의 코드는 빈 stackList를 만들어 바로 바구니에 인형을 넣어 사라진 인형의 개수를 셌다. 굳이 2번에 걸쳐서 하지 않고 board 자체를 스택으로 여겨 바로 답을 구현하는 깔끔한 코드인 것 같다 !

```python
def solution(board, moves):
    stacklist = []
    answer = 0

    for i in moves:
        for j in range(len(board)):
            if board[j][i-1] != 0:
                stacklist.append(board[j][i-1])
                board[j][i-1] = 0

                if len(stacklist) > 1:
                    if stacklist[-1] == stacklist[-2]:
                        stacklist.pop()
                        stacklist.pop()
                        answer += 2     
                break

    return answer
```

