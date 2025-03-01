---
title: "[Python] 다단계 칫솔 판매"
author: sujungeee
date: 2024-02-02 17:58:00 +0800
categories: [코딩 테스트, 프로그래머스]
tags: [Python, 프로그래머스, Python, Review]
render_with_liquid: false

---



> 코딩테스트 합격자되기 파이썬 편- 문제 29

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/77486](https://school.programmers.co.kr/learn/courses/30/lessons/77486)





#### ✅ 문제 접근

1. 각 노드에서 부모, 자식 관계를 찾아 트리를 거슬러 올라가면서 분배할 수익을 계산해야 한다.
   - 부모가 "-", 즉 루트 노드이거나
   - 분배할 금액이 1원 미만이 되면 수익 분배를 멈추어야 함



2. 다른 판매원으로부터 발생한 이익은 분배한 금액에 합산된다.



#### ✅ 기능

1. enroll(모든 판매원)과 referral(추천한 사람)를 부모 자식 관계로 하여 딕셔너리 형성(zip 이용)



2. seller를 돌면서 이익을 계산한 후, 해당 판매원의 부모를 찾아 수익을 분배한다.
   - 위 조건처럼 부모가 루트 노드이면 수익 분배를 멈추어야 함
   - 또는 분배할 금액이 1원 미만이 되면 모든 이익을 당사자가 가지면서 수익 분배가 끝남(더 이상 분배할 금액이 없으므로)



#### ✅ 구현

```python
def solution(enrolls, referral, sellers, amount):
    answer= {enroll: 0 for enroll in enrolls}

    pc= dict(zip(enrolls, referral))

    for i in range(len(sellers)):
        profit= amount[i]*100
        seller= sellers[i]

        while seller!= '-' and profit>0:
            answer[seller] += profit- profit//10
            seller= pc[seller]
            profit//= 10

    return [value for _, value in answer.items()]
```



#### ✅ 회고

​	

: 이진 트리의 부모, 자식 관계를 딕셔너리의 키와 값으로 나타내어 구현하였다. 처음에 구현하기 위한 제한 조건이나 필요한 기능들은 잘 생각하였는데 직접 구현할 때 조금 버벅거렸다. ㅠㅠ 아직 성장할 구석이 이만치=_= ;; ;;
