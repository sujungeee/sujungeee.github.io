---
title: "[Python] 표 편집"
author: sujungeee
date: 2024-01-23 15:15:00 +0800
categories: [코딩 테스트, 프로그래머스]
tags: [Python, 프로그래머스, Python, Review]
render_with_liquid: false
---



> 코딩테스트 합격자되기 파이썬 편- 문제 14

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/81303]( https://school.programmers.co.kr/learn/courses/30/lessons/81303)



#### ✅ 문제 접근

1. 효율적인 방식으로 표를 구성해야 한다.

   - 복구하는 행 번호를 자리에 맞게 삽입해야 하기 때문

   ⇒ 링크드 리스트로 삭제와 삽입하기: O(1)의 시간복잡도를 갖음



2. 처음 선택한 행을 기준으로 cmd를 따라 표의 행을 가리켜야 한다.



3. 삭제한 행은 다시 복구가 가능하도록 삭제한 행에 대한 정보가 존재해야 한다.

   - 언제 삭제되었는지에 대한 정보: **최근**에 삭제된 정보부터 복구해야 하기 때문

   - 무슨 행이 삭제되었는지에 대한 정보

   ⇒ 스택을 이용하여 삭제된 행의 정보를 담기



#### ✅ 기능

1. cmd를 따라 표의 행을 가리키면서 삭제 및 복구하기

   - 삭제: 삭제한 행의 윗 행과 아랫 행을 연결하고, 삭제한 행의 정보는 스택에 담기
   - 복구: 가장 최근에 삭제한 행을 가져와서 복구하기(윗 행 - 복구 행 - 아랫 행)

   

2. 삭제 및 복구를 마치면 제약 조건을 참고하여 행의 번호를 갱신하기



#### ✅ 구현

- 첫 번째 시도: 깨끗히 실패ㅎ 아마도 시간이 초과된 듯 하다....

```python
def solution(n, k, cmd):
    answer=''
    stackList=[]
    pointer=k
    for i in cmd:
        total=0
        if i[0]=='D':
            for element in stackList:
                if pointer <= element <= (pointer+int(i[2])):
                    total +=1
            pointer= pointer+ int(i[2])+total
        elif i[0]=='U':
            for element in stackList:
                if pointer >= element>=(pointer-int(i[2])):
                    total +=1
            pointer = pointer - int(i[2])-total
        elif i[0]=='C':
            stackList.append(pointer)
            if pointer!=n-1:
                pointer +=1
            else:
                pointer -=1
        elif i[0]=='Z':
            stackList.pop()
    for i in range(n):
        if i in stackList:
            answer+='X'
        else:
            answer+='O'
    return answer
```



- 두 번째 시도: 정확성, 효율성 테스트 통과 !

```python
def solution(n, k, cmd):
    answer=['O']*n
    cur= k

    table= {i: [i-1, i+1] for i in range(n)}
    table[0]= [None,1]
    table[n-1]= [n-2, None]

    stack= []

    for c in cmd:
        if c=='C':
            answer[cur]='X'
            prev, next= table[cur]
            stack.append([prev,cur,next])

            if next == None:
                cur= table[cur][0]
            else:
                cur= table[cur][1]

            if prev == None:
                table[next][0]= None
            elif next == None:
                table[prev][1]= None
            else:
                table[prev][1]= next
                table[next][0]= prev
        elif c=='Z':
            prev, now, next= stack.pop()
            answer[now]= 'O'
            if prev == None:
                table[next][0]= now
            elif next == None:
                table[prev][1]= now
            else:
                table[prev][1]= now
                table[next][0]= now
        else:
            c1, c2= c.split(' ')
            c2= int(c2)
            if c1 == 'D':
                for _ in range(c2):
                    cur= table[cur][1]
            else:
                for _ in range(c2):
                    cur= table[cur][0]
    return ''.join(answer)
```



#### ✅ 회고

첫 번째 시도에서 내가 구현하고자 했던 방식

: 삭제되는 행 번호만 알면 되기 때문에 가리키는 행 번호를 포인터로 두고, 삭제되는 행에 대해서는 stackList 리스트로 관리하였다. 포인터 값을 갱신할 때는 삭제된 행 번호는 제외하여야 하기 때문에 현 포인터 값에서 갱신될 포인터 값 사이에 삭제된 행 개수를 total로 두었다. 그리고 포인터가 삭제된 행을 고려할 수 있도록 U일 때는 total를 차감하고, D일 때는 total을 더하여서 구현하였다. 한마디로 리스트를 이용해서 그냥 쌩(?)구현을 한 것이다...... 효율성 테스트를 통과할 리 없다.



두 번째 시도에서의 구현 방식

: 그래서 여기저기 구글링을 한 결과 이 문제는 **양방향 링크드 리스트**의 자료구조가 필요했다. 따라서 해당 자료구조를 딕셔너리로 구현한 방식이 바로 2번째 코드이다. 다른 사람의 코드는 key를 현재 행 번호, value를 현재 행의 윗 행과 아랫 행 번호로 넣어서 테이블을 구성하였다. 그 다음 cmd에 따라 삭제 및 복구를 진행하고 이 때는 방식 1과 같이 스택을 이용했다. 

: 참고 링크 > https://kjhoon0330.tistory.com/entry/프로그래머스-표-편집-Python



추가 참고 방식

: 딕셔너리로 양방향 링크드 리스트를 구현할 수도 있지만 클래스로 구성한 자료구조 자체를 코드에 넣어 이용할 수도 있다. 이 방식은 모두 적기에 너무 많아지므로 개인적으로 살펴보고 패스하기~
