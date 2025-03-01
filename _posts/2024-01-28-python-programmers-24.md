---
title: "[Python] 신고 결과 받기"
author: sujungeee
date: 2024-01-28 15:15:00 +0800
categories: [코딩 테스트, 프로그래머스]
tags: [Python, 프로그래머스, Python, Review]
render_with_liquid: false

---



> 코딩테스트 합격자되기 파이썬 편- 문제 24

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/92334]( https://school.programmers.co.kr/learn/courses/30/lessons/92334)



#### ✅ 문제 접근

1. 문제 예시처럼 유저 ID, 유저가 신고한 ID, 정지된 ID에 대한 정보가 필요
   - 정지된 ID는 유저가 신고한 ID 중에서 신고 횟수가 2회 이상인 ID



2. 유저가 동일한 유저를 여러 번 신고할 때는 신고 횟수를 1회로 제한



#### ✅ 기능

1. report로 유저 ID와 유저가 신고한 ID, 유저 ID와 신고 당한 횟수에 대한 정보 만들기
    + 중복 신고는 제외해야 함



2. 신고 당한 횟수가 k 번 이상이라면 신고한 유저에게 +1을 적용



#### ✅ 구현

```python
def solution(id_list, report, k):
    answer = []
    dic= {} # 키: 유저 ID, 값: 유저가 신고한 ID
    rpNumDic= {} # 키: 유저 ID, 값: 신고당한 횟수(중복 제외)


    for r in report:
        cmd= r.split(' ')
        if cmd[0] in dic:
            if cmd[1] in dic[cmd[0]]: # 중복 신고 한 경우
                continue
            else:
                dic[cmd[0]].append(cmd[1])
        else:
            dic[cmd[0]]= [cmd[1]]

        rpNumDic[cmd[1]] = rpNumDic.get(cmd[1], 0) + 1

    for uid in id_list:
        cnt= 0
        if uid in dic:
            for i in dic[uid]:
                if rpNumDic[i]>= k:
                    cnt+= 1
                else:
                    continue
        else:
            cnt= 0
        answer.append(cnt)

    return answer
```



#### ✅ 회고

​	

: 초기 구현 코드는 {유저 ID: 유저가 신고한 ID 리스트}의 딕셔너리와, {유저 ID: 신고 당한 횟수} 의 두 딕셔너리를 만들었다. 그리고 id_list를 돌면서 해당 유저가 신고한 ID들이 k번 이상 신고 당하였으면 cnt를 1씩 늘려 answer 배열을 완성시켰다. 로직 자체는 괜찮았던 것 같다! 

: 코드를 제출하고 다른 사람의 코드를 보니 중복 신고 제거를 set으로 구현하였다. 처음에 문제를 풀 때 동일한 유저 신고는 제한된다는 것을 보고 set를 떠올리긴 했지만 막상 코드에 적용시키지는 못했다. 코드를 모두 살펴보고 나니 어차피 동일 신고는 report 자체가 똑같기 때문에 set만 한 번 적용하면 중복에 대한 예외 처리는 더 이상 신경 쓰지 않아도 됐다는 것을 깨달았다. 허허;;

: 그리고 주저리주저리 tmi 를 달자면 문제를 풀 때 당연히 문제 자체에 집중하는 것이 좋다고 생각한다. 그런데 생각한 것 이상으로 주어진 값들을 **효율적으로** 관리하여서 특정 형태의 답을 도출하는 것도 중요하다고 느꼈다. 효율적으로 관리할 수 있는 대상은 코드 뿐만이 아닌 데이터도 포함이라는 것...을 점차 깨닫고 있는 중이다.😿 물론 저 두 대상도 결국 관련이 있다는 것 또한 말이다. ㅎㅎㅎ ;; 

