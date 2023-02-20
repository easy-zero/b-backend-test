# blockodyssey-backend
### **블록오디세이 백엔드 포지션 과제 테스트**

<br />

## Install
<br />

1. 패키지 설치
   ```sh
   npm install
   ```
   <br />
2. 환경 설정
   ```sh
   # config 파일 복사
   cp config.json.example config.json
   
   # 그대로 실행 또는 필요 시 api key 변경
   ```
   <br />
4. 실행
   ```sh
   npm start
   ```

<br />


## Source Structure
```text
.
├── config.json.example           // config example
└── src
    ├── api                       // 공공 데이터 API
    │   ├── helper.js             // axios instance
    │   └── index.js              // 구현에 필요한 공공 데이터 API 
    ├── index.js                  // main
    ├── services                  // 구현에 필요한 Services
    │   ├── arriveBusInfo.js      
    │   ├── arriveInfoList.js     
    │   ├── busRouteList.js
    │   ├── index.js
    │   └── stationList.js
    └── utils                     // util 함수
        └── index.js
```

<br />

## Test Description
### Step1. 
   Extract 3 routes information randomly from Seoul bus routes by interfacing with government data portal on a real time basis.
   
   For the detail, please refer to below link.
   
   https://www.data.go.kr/index.do


### Step2. 
    Pull out 3 bus stations with the most scheduled buses to arrive in 5 minutes among extracted routes information from step 1.


### Step3. 
    Arrange bus information (bus number, plate number, and ETA (estimate time of arrival)) sorting by fastest arriving bus regardless of station in pulled data from step2.


### [Requirement]

1. Programming framework should be node.js only (you can use nest.js as well.)

2. It should not be any dependency issues in your source code during npm install.

3. Send your repository link with the answers about below questions.

   1) In which point, did you feel hard?
   2) If you have more time to do this, what will you improve in your code?

