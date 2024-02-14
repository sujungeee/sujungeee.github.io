---
title: "[프로그래머스] 오픈채팅방"
author: sujungeee
date: 2024-01-26 15:15:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false
---



> 코딩테스트 합격자되기 파이썬 편- 문제 22

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/42888]( https://school.programmers.co.kr/learn/courses/30/lessons/42888)



#### ✅ 문제 접근

1. 유저 아이디와 닉네임은 짝지어서 관리

   - 중복된 닉네임을 가진 유저 아이디의 구분을 위함




#### ✅ 기능

1. record 명령에 따라 유저 아이디와 닉네임을 짝짓기
   - 명령어가 Enter와 Change 인 경우에 진행



2. record 명령에서 명령어와 유저 아이디에 따라 answer에 차례대로 추가



#### ✅ 구현

```python
def solution(record):
    answer= []
    uidName={}

    for r in record:
        command=r.split()

        if command[0] in ['Enter', 'Change']:
            uidName[command[1]]= command[2]

    for r in record:
        command= r.split()
        uid= command[1]
        if command[0] == 'Enter':
            answer.append(uidName[uid] + "님이 들어왔습니다.")
        elif command[0] == 'Leave':
            answer.append(uidName[uid] + "님이 나갔습니다.")

    return answer
```



#### ✅ 회고

​	

: 처음에 문제를 어떻게 풀어야 할까 생각할 때 바로 answer를 생성하고, record를 한 번만 돌면서 Change가 나오면 닉네임을 바꾸려고 했다. 하지만 이 방식대로 하면 중복 닉네임이 생길 경우 유저 아이디를 구분하여 바꿀 수 있는 방법은 없었고.. 아무튼 이 방법은 무리라고 생각했다. 

: 그래서 record를 두 번 훑어서 첫 번째는 유저 아이디와 최종 닉네임을 딕셔너리의 키, 값으로 넣어두고, 두 번째는 유저 아이디의 닉네임과 명령어로 answer를 생성했다.😝 
