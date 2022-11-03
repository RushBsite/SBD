# SBD
<div class="stack">
<a href="#"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/NodeJS-339933?style=for-the-badge&logo=Node.js&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/Amazon EC2-FF9900?style=for-the-badge&logo=AmazonEC2&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/k8s-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/mariadb-003545?style=for-the-badge&logo=mariadb&logoColor=white"></a>
</div>


## **프로젝트 소개**

공동 배달 주문 서비스

## **프로젝트 목표**

인접 지역 / 같은 가게에서 음식배달을 시켜먹는 사람들을 모아 배달비를 줄일 수 있게 하는 서비스

## **지원 기능**

게시판 형식 / 시간제한 플랫폼


## **repository 규칙**

### **repo 구성**
|폴더|설명|
|-|-|
`front`|  React F.E test 작업물
`nanum-baedal`| 본 프로젝트 폴더
`NodeJS`|  B.E 작업물
`src`|  기타 필요 외부 소스 저장 _(ex)img)_

### **commit 규칙**

|말머리(커밋 타입, 헤더)|설명|
|-|-|
`feat`|  새로운 코드 추가시 말머리
`fix`|  버그 수정시 말머리
`docs`|  문서 수정시 말머리
`refact`| 리팩토링시 말머리

#### **commit 구성**
```markdown
<header> > 말머리와 요약
<body> > 추가 설명부
<footer> > 이슈 참조(closing 하는 이슈 -> close #[이슈번호])
```

헤더 내용에 수정 내용 모두 표현시 body 생략 가능

_예시_
```markdown
feat : Add calc.js              
계산기 로직 추가 
close #123
```

## **담당 업무**

|역할|팀장 최시원 | 박경현 | 심민규 | 이민재 | 이승규 | 허수정
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|개발|B.E 설계/구현(Login 기능), F.E구현|B.E 설계/구현(API연결부),F.E구현 | F.E설계/구현 | B.E 설계/구현(Login 기능) ,F.E구현 | B.E 설계/구현(API 연결부) ,F.E구현 | F.E설계/구현
|인프라|-|-|k8s, AWS 환경 구축|-|-|k8s, AWS 환경 구축
|PM|보고서작성|-|모니터링/테스트|Git repo 관리|-|모니터링/테스트
