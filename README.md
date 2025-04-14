# pick-frontend
🐙 고성연 🪨 김석희 🐊 이청민 🦝 장시원 🦭 정민선 🐧 최혜민
# 🗝️ Pick

<center>
     <img src = "https://github.com/user-attachments/assets/3f41e611-297b-4a40-94a4-a7e1927e6f93" width = "80%" />

</center>

<br><br>

## 👨‍💻 DEVELOPERS

|<img src="https://github.com/user-attachments/assets/96ccc0c2-83b7-492c-9315-75ac3cc51009" width="100" height = "100"> |<img src="https://github.com/user-attachments/assets/edc7debb-83c4-43fd-b39b-fc928318163a" width="100" height = "100"> | <img src="https://github.com/user-attachments/assets/2c0ab92a-c6c3-4d29-afba-73c8c5b3b6aa" width="100" height = "100">|<img src="https://github.com/user-attachments/assets/202b8b37-2b11-4228-8c95-f26eca6dbef3" width="100" height = "100"> | <img src="https://github.com/user-attachments/assets/1b342174-3c7d-4e68-8aa2-773e017e7ad2" width="100" height = "100"> | <img src="https://github.com/user-attachments/assets/daa3e58c-512a-4b01-a289-c84feed2c0b9" width="100" height = "100">|
| :------------------------------------: | :-------------------------------------: | :-----------------------------------: | :--------------------------------------: | :-----------------------------------: | :------------------------------------------: |
| [고성연](https://github.com/Gombo2) | [김석희](https://github.com/yehang218) | [이청민](https://github.com/Bluesky3125) | [장시원](https://github.com/swjang7269) | [정민선](https://github.com/minsun24) | [최혜민](https://github.com/HMYIEN) |

<br>

## 🔖 목차

#### [💡 Tech Stack](#-Tech-Stack) <br>
#### [📢 프로젝트 개요](#-프로젝트-개요) <br>
#### [🛠️ 주요 기능](#-주요-기능) <br>
#### [📅 WBS](#-WBS) <br>
#### [🙆‍♀️ 요구사항 명세서](#-요구사항-명세서) <br>
#### [💭 DDD 설계](#-DDD-설계) <br>
#### [🗃️ DB 모델링](#-DB-모델링) <br>
#### [🪄 MSA 아키텍처](#-MSA-아키텍처) <br>
#### [🛜 Server](#-Server) <br>
#### [🚩 단위 테스트](#-단위-테스트) <br>
#### [📱 API 테스트](#-API-테스트) <br>
#### [📑 API 명세서](#-API-명세서) <br>
#### [🔜 향후 확장 계획](#-향후-확장-계획) <br>
#### [🍪 동료 평가](#-동료-평가) <br>

<br>

## 💡 Tech Stack
### 🌿 Backend
<img src="https://img.shields.io/badge/java-007396?style=flat-square&logo=java&logoColor=white"/> <img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=flat-square&logo=Spring&logoColor=white"/> <img src="https://img.shields.io/badge/JPA-0769GE?style=flat-square&logo=JPA&logoColor=white"/> <img src="https://img.shields.io/badge/Hibernate-61DAFB?style=flat-square&logo=Hibernate&logoColor=white"/> <img src="https://img.shields.io/badge/gradle-0769AD?style=flat-square&logo=gradle&logoColor=white"/> <img src="https://img.shields.io/badge/security-F7DF1E?style=flat-square&logo=security&logoColor=white"/>

### 🗂️ DB
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=flat&logo=mariadb&logoColor=white) <img src="https://img.shields.io/badge/MyBatis-FFCA28?style=flat-square&logo=MyBatis&logoColor=white"/>

### 🛜 Server
<img src="https://img.shields.io/badge/Eureka-430098?style=flat-square&logo=Eureka&logoColor=white"/> <img     src="https://img.shields.io/badge/gateway-147EFB?style=flat-square&logo=gateway&logoColor=white"/>

### 🔧 Tools
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"> <img src="https://img.shields.io/badge/ERD%20cloud-%230000FF.svg?style=flat&logo=erlang&logoColor=white"> <img src="https://img.shields.io/badge/DA%23-0B6121.svg?style=flat&logo=draw.io&logoColor=white"> ![IntelliJ IDEA](https://img.shields.io/badge/IntelliJIDEA-2A2A2A.svg?style=flat&logo=intellij-idea&logoColor=white) <img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white"/> 

<br>

## 📢 프로젝트 개요
### 1. 프로젝트 주제
평생 공부해야 하는 개발자를 위한 <b>사이드 프로젝트 매칭 & 관리 플랫폼</b> <br>

### 2. 프로젝트 필요성
<pre>
<b>사이드 프로젝트란?</b>
규모와 수익성과는 상관없이 스스로 원해서 개발해 보고 싶은 서비스, 적용해 보고 싶은 기술 스택 등을
수련하며 스스로 자기 계발을 하는 기회를 마련하는 나만의 프로젝트
</pre>
사이드 프로젝트를 진행할 때는 팀원 간의 협업과 커뮤니케이션이 매우 중요하며, 모집부터 실제 실행, 완성까지 꽤 많은 시간과 노력이 필요합니다. <br>

기존에 사용되던 팀원 매칭 플랫폼인 비사이드는 팀 구성에 용이하지만, 이후의 <b>협업과 프로젝트 관리 기능이 부족</b>하다는 한계가 있습니다. Jira는 체계적인 프로젝트 관리를 도와주지만, 팀원 모집이나 매칭 기능은 전혀 제공하지 않아 <b>초기 팀 구성에 어려움</b>이 있습니다. <br>

이러한 두 플랫폼의 아쉬운 점을 보완하고, 각각의 장점만을 살려 <b>팀원 매칭부터 프로젝트 관리까지 한 번에 가능한 올인원 플랫폼, Pick</b>이 탄생했습니다. Pick은 효율적인 팀 구성과 유연한 협업, 체계적인 진행 관리를 모두 지원하여, 사이드 프로젝트의 시작부터 완성까지 모든 과정을 더 쉽고 효율적으로 만들어줍니다.

<br>

## 🛠️ 주요 기능

<img src="https://github.com/user-attachments/assets/97ae910c-cab7-4453-9c15-062e07119700" width="800"/><br>
매칭을 희망하는 회원이 매칭을 신청하면, 미리 생성된 방의 레벨과 비교하여 레벨 범위에 맞는 방에 <b>신청자 매칭</b>

  
<img src="https://github.com/user-attachments/assets/cd4d605b-a154-49ff-8738-bf45e56247f2" width="800"/><br>
프로젝트 방이 생성되면, 참가자에게 <b>문서화와 일정 관리 서비스</b> 제공.<br>프로젝트가 끝나면 각 팀원은 프로젝트와 서로에 대한 후기 작성 -> 포트폴리오 & 피드백이 됨


<img src="https://github.com/user-attachments/assets/5e264d2e-04a7-4c54-bcf1-032ec0c602f9" width="800"/><br>
매일매일 반복적으로 달성할 수 있는 <b>단기 목표</b> 부여 -> 일정 횟수 반복 시 도전 과제 달성 -> 업적 뱃지 제공<br>
경력, 전공, 자격증 등 스펙 증명 시 <b>스펙 뱃지</b> 제공 <br>


## 📅 WBS
🔗 <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vScA7f_mLFChQQ5SMSU5AAC6-O3h8PYJg0H-dxRvMKHrePOtW3VIgnlNMcAEWP1Xy8O8LcMe4OFuCWe/pubhtml?gid=88084636&single=true"> WBS 자세히 보기</a><br> <br>
<img src="https://github.com/user-attachments/assets/6677a334-9d8f-4d8d-a756-e98de9b2968f" width = "1000"/>

<br><br>

## 🙆‍♀️ 기능 명세서
  
  🔗 <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vScA7f_mLFChQQ5SMSU5AAC6-O3h8PYJg0H-dxRvMKHrePOtW3VIgnlNMcAEWP1Xy8O8LcMe4OFuCWe/pubhtml?gid=0&single=true"> 요구사항 명세 자세히 보기 </a>
  
  <br>
  
  <img src = "" width = "900"/>
  
  <br><br>

<br>
<br>


## 🗃️ 프론트 화면 구성 단계

### 1. 와이어 프레임
<img src=""/>
<br>

### 2. 스토리 보드
<img src=""/>
<br>

<br>

## 🪄 MSA 아키텍처

<img src = "" width = "900"/>

<br><br>

## 🛜 Server
### 1. Eureka 서버 + Config 서버 + GateWay

<img src = "" width = "900"/>

### 2. Actuator
<img src = "" width = "900"/>

<br>

## 🚩 단위 테스트
### - Member Service
<img src = "" width = "600" />
<br>

### - Matching Service
<img src = "" width = "600" />
<br>

### - Core
#### Mission, Matching, Post, ProjectRoom, Report
<img src = "" width = "600" />
<br>

## 📱 API 테스트
### 👤 회원

<details>
     <summary><b>회원</b></summary>
     <details>
          <summary>회원 가입</summary>
          <details>
	          <summary>성공</summary>
	          <p alian="center">
	          <img src="" width = "600"/>
	          </p>
          </details>
          <details>
	          <summary>실패 400 이메일 중복</summary>
	          <p alian="center">
	          <img src="" width = "600" />
	          </p>
          </details>
     </details>
     <details>
	     <summary>로그인(성공 시 토큰 반환)</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>로그아웃(토큰 제거)</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>회원 정보 수정</summary>
          <details>
               <summary>수정1</summary>
	          <p alian="center">
	          <img src="" width = "600"/>
	          </p>
          </details>
          <details>
               <summary>수정2</summary>
	          <p alian="center">
	          <img src="" width = "600"/>
	          </p>
          </details>
     </details>
     <details>
	     <summary>비밀번호 찾기</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>이메일 찾기</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>회원 전체 조회</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>ID로 회원 조회</summary>
	     <p alian="center">
	     <img src=""/>
	     </p>
     </details>
     <details>
	     <summary>이메일 중복 체크</summary>
          <details>
               <summary>사용 가능 이메일</summary>
     	     <p alian="center">
     	     <img src="" width = "600"/>
     	     </p>
          </details>
          <details>
               <summary>사용 불가능 이메일</summary>
     	     <p alian="center">
     	     <img src="" width = "600"/>
               </p>
          </details>
     </details>
     <details>
	     <summary>전화번호 중복 체크</summary>
          <details>
               <summary>사용 가능 전화번호</summary>
     	     <p alian="center">
     	     <img src="" width = "600"/>
     	     </p>
          </details>
          <details>
               <summary>사용 불가 전화번호</summary>
     	     <p alian="center">
     	     <img src="" width = "600"/>
               </p>
          </details>
     </details>
     <details>
	     <summary>회원 상태 조회</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
          <details>
	     <summary>회원 권한 조회</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
</details>

<details>
     <summary><b>프로필</b></summary>
     <details>
          <summary>회원 프로필 조회</summary>
          <p align="center">
          <img src="" width = "600"/>
          </p>
     </details>
     <details>
          <summary>회원 프로필 정보 수정</summary>
          <p align="center">
          <img src="" width = "600"/>
          </p>
     </details>
</details>

<details>
     <summary><b>프로그래밍 언어</b></summary>
     <details>
          <summary>프로그래밍 언어 조회</summary>
          <p align="center">
          <img src="" width = "600"/>
          </p>
     </details>
     <details>
          <summary>프로그래밍 언어 추가</summary>
          <details>
               <summary>성공(권한 있음)</summary>
               <p align="center">
               <img src="" width = "600"/>
               </p>
          </details>
          <details>
               <summary>실패(권한 없음)</summary>
               <p align="center">
               <img src="" width = "600"/>
               </p>
          </details>   
     </details>
     <details>
	     <summary>프로그래밍 언어 삭제</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
	     </p>
     </details>
     <details>
	     <summary>회원별 사용 언어 조회</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
		     기능 개발 예정
	     </p>
     </details>
     <details>
	     <summary>회원별 사용언어 추가</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
		     기능 개발 예정
	     </p>
     </details>
     <details>
	     <summary>회원별 사용언어 수정</summary>
	     <p alian="center">
	     <img src="" width = "600"/>
		     기능 개발 예정
	     </p>
     </details>
</details>

### 🔔 미션
<details>
	<summary><b>도전과제</b></summary>
	<details>
		<summary>도전과제 목록 전체 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>도전과제 추가</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>도전과제 수정</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>도전과제 삭제</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>도전과제 진행도 증가</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>회원별 도전과제 목록 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>회원이 달성한 도전과제 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>			
	<details>
		<summary>회원이 달성하지 못한 도전과제 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
</details>

<!-- 뱃지 -->
<details>
	<summary><b>뱃지</b></summary>
	<details>
		<summary>뱃지 목록 전체 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>뱃지 추가</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>뱃지 수정</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>뱃지 삭제</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>			
	<details>
		<summary>뱃지 부여 및 레벨 증가</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
	<details>
		<summary>챌린지별 뱃지 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>	
	<details>
		<summary>회원이 획득한 뱃지 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>	
</details>

<!-- 일일미션 -->
<details>
	<summary><b>일일미션</b></summary>
	<details>
		<summary>일일미션 목록 전체 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>	
	<details>
		<summary>일일미션 추가</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>	
	<details>
		<summary>일일미션 수정</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>		
	<details>
		<summary>일일미션 삭제</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>		
	<details>
		<summary>회원에게 일일미션 부여</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>		
	<details>
		<summary>회원별 일일미션 목록 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>		
	<details>
		<summary>회원이 수행한 일일미션 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>		
	<details>
		<summary>회원이 수행하지 못한 일일미션 조회</summary>
		<p alian="center">
		<img src="" width="600" />
		</p>
	</details>
</details>

### 📜 게시글
<!-- 게시글 -->
<details>
	<summary><b>게시판</b></summary>
	<details>
		<summary>게시글 조회</summary>
		<p alian="center">
		<img src=""  width="600"/>
		</p>
	</details>
	<details>
		<summary>단일 글, 댓글 사진 조회</summary>
		<p alian="center">
		<img src=""  width="600"/>
		</p>
	</details>
	<details>
		<summary>제목으로 검색</summary>
		<p alian="center">
		<img src=""  width="600"/>
		</p>
	</details>
	<details>
		<summary>카테고리 별 조회</summary>
		<p alian="center">
		<img src=""  width="600"/>
		</p>
	</details>
	<details>
		<summary>게시글 등록</summary>
		<p alian="center">
		<img src=""  width="600"/>
		</p>
	</details>
	<details>
		<summary>게시글 삭제</summary>
		<details>
			<summary>규제에 의한 삭제</summary>
			<p alian="center">
			<img src=""  width="600"/>
			</p>
		</details>
		<details>
			<summary>삭제 성공</summary>
			<p alian="center">
			<img src=""  width="600"/>
			</p>
		</details>
		<details>
			<summary>없는 게시글 삭제 시도</summary>
			<p alian="center">
			<img src=""  width="600"/>
			</p>
		</details>
		<details>
			<summary>이미 삭제된 게시글 삭제 시도</summary>
			<p alian="center">
			<img src=""  width="600"/>
			</p>
		</details>
	</details>
</details>

### 🤼 매칭
<details>
<summary><b>매칭</b></summary>
     
<details>
     <summary>전체 매칭방 목록 조회</summary>
     <p align="center">
          <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 id로 매칭방 조회</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>기술 카테고리 id로 매칭방 조회</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 등록</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 수정</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 삭제</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>조건에 맞은 매칭방 조회</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 신청</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>매칭방 신청 취소</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>신청자 수락</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>

<details>
     <summary>수락한 신청자만 조회</summary>
     <p align="center">
       <img src=""  width="600"/>
     </p>
</details>
</details>

<details>
     <summary><b>기술 카테고리</b></summary>
     
<details>
          <summary>기술 카테고리 전체 조회</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>기술 카테고리 id로 조회</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>상위 카테고리만 조회</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>기술 카테고리 id로 하위 카테고리 조회</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>기술 카테고리 등록</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>기술 카테고리 수정</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>

<details>
          <summary>기술 카테고리 삭제</summary>
          <p align="center">
            <img src=""  width="600"/>
          </p>
</details>
</details>

### 🗂️ 프로젝트
<details>
     <summary><b>프로젝트</b></summary>
     <details>
          <summary>전체 프로젝트 목록 조회</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>진행중인 프로젝트 목록 조회</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>매칭 중인 프로젝트 목록 조회</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>프로젝트 이름 키워드로 검색</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>프로젝트 기술 분류 키워드로 검색</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>프로젝트 이름 & 기술 분류키워드로 검색</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>프로젝트 상세 조회</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>참여 중인 프로젝트 정보 조회 (프로젝트 방 입장)</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>프로젝트 방 생성</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
</details>


<details>
     <summary><b>회의록</b></summary>
     <details>
          <summary>프로젝트별 회의록 목록 조회</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>팀원이 아닐 경우</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
     <details>
          <summary>회의록 작성</summary>
          <p align="center">
            <img src="" width="600"/>
          </p>
     </details>
</details>

### 🚨 신고
<details>
	
<summary><b>신고</b></summary>
	<details>
		<summary>모든 신고 목록 조회</summary>
		<img src="" width="600"/>
	</details>
	<details>
		<summary>특정 회원 신고 목록 조회</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>상태별 신고 목록 조회</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>삭제 여부에 따른 신고 목록 조회</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>신고 사유 등록</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>신고 등록</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>신고 내역 삭제(soft delete)</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>신고 처리 상태 수정</summary>
		<img src="" width="600" />
	</details>
</details>

<details>
<summary><b>규제</b></summary>
	<details>
		<summary>모든 규제 목록 조회</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>특정 회원 규제 목록 조회</summary>
		<img src="" width="600" />
	</details>
 	<details>
		<summary>삭제 여부에 따른 규제 목록 조회</summary>
		<img src="" width="600" />
	</details>
  	<details>
		<summary>규제 등록</summary>
		<img src="" width="600" />
	</details>
  	<details>
		<summary>규제 삭제(soft delete)</summary>
		<img src="" width="600" />
	</details>
</details>

## 📑 API 명세서
<details>

<summary>API 명세서</summary>
<img src = ""/>
</details>

## 🔜 향후 확장 계획
`#Webhook` `#회의록 템플릿` `챗봇` `깃허브 파트너십 체결`

<br>

# 🍪 동료 평가
### 🐙 고성연
<table>
  <tr>
    <td>평가자</td>
    <td align="center"> 내용 </td>
  </tr>
  <tr>
    <td>김석희</td>
    <td>
</td>
  </tr>
  <tr>
    <td>이청민</td>
    <td>  </td>
  </tr>
  <tr>
    <td>장시원</td>
    <td></td>
  </tr>
  <tr>
    <td>정민선</td>
    <td></td>
  </tr>
  <tr>
    <td>최혜민</td>
    <td></td>
  </tr>
</table>


### 🪨 김석희
<table>
  <tr>
    <td>평가자</td>
    <td align="center">내용</td>
  </tr>
  <tr>
    <td>고성연</td>
    <td> </td>
  </tr>
  <tr>
    <td>이청민</td>
    <td> </td>
  </tr>
  <tr>
    <td>장시원</td>
    <td></td>
  </tr>
  <tr>
    <td>정민선</td>
    <td> </td>
  </tr>
  <tr>
    <td>최혜민</td>
    <td></td>
  </tr>
</table>

### 🐊 이청민
<table>
  <tr>
    <td>평가자</td>
    <td align="center">내용</td>
  </tr>
  <tr>
    <td>고성연</td>
    <td></td>
  </tr>
  <tr>
    <td>김석희</td>
    <td>
</td>
  </tr>
  <tr>
    <td>장시원</td>
    <td></td>
  </tr>
  <tr>
    <td>정민선</td>
    <td></td>
  </tr>
  <tr>
    <td>최혜민</td>
    <td> </td>
  </tr>
</table>

### 🦝 장시원
<table>
  <tr>
    <td>평가자</td>
    <td align="center">내용</td>
  </tr>
  <tr>
    <td>고성연</td>
    <td></td>
  </tr>
  <tr>
    <td>김석희</td>
    <td>
</td>
  </tr>
<tr>
    <td>이청민</td>
    <td></td>
  </tr>
  <tr>
    <td>정민선</td>
    <td> </td>
  </tr>
  <tr>
    <td>최혜민</td>
    <td></td>
  </tr>
</table>

### 🦭 정민선
<table>
  <tr>
    <td>평가자</td>
    <td align="center">내용</td>
  </tr>
  <tr>
    <td>고성연</td>
    <td></td>
<tr>
    <td>김석희</td>
    <td>
</td>
  </tr>
<tr>
   <td>이청민</td>
    <td></td>
  </tr>
  <tr>
    <td>장시원</td>
    <td></td>
  </tr>
  <tr>
    <td>최혜민</td>
    <td></td>
  </tr>
</table>

### 🐧 최혜민
<table>
  <tr>
    <td>평가자</td>
    <td align="center">내용</td>
  </tr>
  <tr>
    <td>고성연</td>
    <td></td>
  </tr>
  <tr>
    <td>김석희</td>
    <td></td>
  </tr>
  <tr>	
    <td>이청민</td>
    <td></td>
  </tr>
  <tr>
    <td>장시원</td>
    <td></td>
  </tr>
  <tr>
    <td>정민선</td>
    <td> </td>
  </tr>
</table>
