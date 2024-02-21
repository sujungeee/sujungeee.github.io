---
title: "[프로그래머스] 길 찾기 게임"
author: sujungeee
date: 2024-02-06 16:01:00 +0800
categories: [Python, 프로그래머스]
tags: [Python, 프로그래머스, Review]
render_with_liquid: false


---



> 코딩테스트 합격자되기 파이썬 편- 문제 33

[문제 >   https://school.programmers.co.kr/learn/courses/30/lessons/42892]( https://school.programmers.co.kr/learn/courses/30/lessons/42892)





#### ✅ 문제 접근

1. 좌표와 노드 번호의 매칭이 필요하다.

   ex) y 좌표가 가장 큰 노드가 루트 노드



2. 전위 순회: top -> left -> right 의 순서로 노드를 탐색한다.
   - 매 노드에서 왼쪽 자식 노드를 모두 탐색한 후 오른쪽 자식 노드를 모두 탐색해야 함



3. 후위 순회: left -> right -> top 의 순서로 노드를 탐색한다.
   - 왼쪽 노드가 빌 때까지 왼쪽 자식 노드로 계속 내려간 후, 
   - 왼쪽 자식 노드가 없으면 오른쪽 혹은 부모 노드를 탐색



#### ✅ 기능

1. 주어진 노드 정보로 이진 트리 생성하기: bt()



2. 생성한 이진 트리로 전위 순회와 후위 순회를 진행하기




#### ✅ 구현

```python
class Node:
    def __init__(self, info, num, left=None, right=None):
        self.info= info
        self.num= num
        self.left= left
        self.right= right

    def has_left(self):
        return self.left is not None

    def has_right(self):
        return self.right is not None

def bt(nodeinfo):
    # 노드 번호 배열
    nodeNum= [i+1 for i in range(len(nodeinfo))]
    nodeNum.sort(key=lambda x:(-nodeinfo[x-1][1], nodeinfo[x-1][0])) # 1 idx는 내림차순, 2 idx는 오름차순

    bntree= None
    for i in range(len(nodeNum)):
        if bntree == None: # 처음 루트 노드 추가
            bntree= Node(nodeinfo[nodeNum[0]-1], nodeNum[0]) # 노드 좌표, 노드 번호
        else:
            parent= bntree
            node= Node(nodeinfo[nodeNum[i]-1], nodeNum[i])

            while True: # 본인의 삽입 위치를 찾을 때까지
                if node.info[0] < parent.info[0]:
                    if parent.has_left():
                        parent= parent.left
                        continue
                    else: # 자신이 왼쪽 노드가 되어 삽입
                        parent.left= node
                        break
                if node.info[0] > parent.info[0]:
                    if parent.has_right():
                        parent= parent.right
                        continue
                    else:
                        parent.right= node
                        break

    return bntree

def pre_order(bntree):
    order = []
    stack = [bntree]
    while stack:
        node = stack.pop()
        if node is None:  # 자식 노드가 존재하지 않으면
            continue
        order.append(node.num) # top은 먼저 append
        stack.append(node.right) # right
        stack.append(node.left) # left
    return order

def post_order(bntree):
    order= []
    stack= [(bntree, False)]

    while stack:
        node, visited= stack.pop()

        if node is None:
            continue
        if visited:
            order.append(node.num)
        else:
            stack.append((node, True)) # top
            stack.append((node.right, False)) # right
            stack.append((node.left, False)) # left

    return order

def solution(nodeinfo):
    answer=[]
    bntree= bt(nodeinfo) # 노드 번호와 좌표로 이진트리 생성
    # 전위 순회
    answer.append(pre_order(bntree))

    # 후위 순회
    answer.append(post_order(bntree))

    return answer
```



#### ✅ 회고

​	

: 작성된 구현 코드는 앞선 이진 트리 생성과 전위/후위 순회를 하는 두 기능으로 나눠졌다. 이 때, 노드 번호에 대한 정렬을 먼저 진행해야 하는데 그 이유는 y 값이 같은 두 노드가 있다면, 그 두 노드도 x 값에 따라 좌우 위치가 달라지기 때문이다. 따라서 정렬을 진행한 노드 번호로 이진 트리를 생성해야 한다.(def bt())

: 그 다음 전위 및 후위 순회를 진행할 때에는 스택을 이용하였다.

: 전위 순회는 top -> left -> right

: 후위 순회는 left -> right -> top

: 으로, left, right의 앞뒤에 top만 각각 추가해주면 되기 때문에 해당 순서만 유의해주면 된다. 더불어서 스택인 점을 고려해 left 보다 right를 먼저 append 해주는 것도 잊지 않기!.!

: 내가 참고했던 코드는 클래스를 굳이 만들지 않고, 노드 번호와 좌표를 묶어 정렬하였다. 그리고 하위 레벨로 내려가면서 기준 노드의 왼쪽 노드들만 leaf node가 될 때까지 재귀 호출하는 방식을 택했다.😛 (전위 순회는 재귀 호출 전, 후위 순회는 재귀 호출 후 top 노드의 번호를 추가하였음!)  