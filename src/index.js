import * as Services from './services/index.js';
import { getMinFromArrMsg } from "./utils/index.js";


export async function solution() {
  let result = [];

  let busRouteIds = [];
  let arriveStationIds = [];
  let arrivedInfoList = [];
  let arriveBusInfos = []

  // 3개의 노선 정보 무작위 추출
  try {
    busRouteIds = await Services.getRandomBusRoutes();
  } catch (e) {
    console.log("getRandomBusRoutes Error: ", e)
  }

  // 추출한 노선들의 전체 경유 정류소 ID
  await Promise.all(busRouteIds.map(async (busRouteId) => {
    try {
      arriveStationIds = await Services.getAllStationIdByRoute(busRouteId);
    } catch (e) {
      console.log("getAllStationIdByRoute Error: ", e);
    }
  }));

  // 추출한 정류소들의 버스들 중 5분 내로 도착하는 버스 도착 정보 
  await Promise.all(arriveStationIds.map(async (arsId) => {
    try {
      arrivedInfoList = await Services.getArrInfoIn5minByStation(arsId);
    } catch (e) {
      console.log("getArrInfoIn5minByStation Error: ", e)
    }
  }));

  // 5분 내로 도착하는 버스가 가장 많은 정류소 3개 선별
  arrivedInfoList = arrivedInfoList.sort((a, b) => b.busLength - a.busLength);
  const resultList = arrivedInfoList.slice(0, 3);

  // 선별한 3개의 정류소에 도착하는 모든 버스 목록
  resultList.map(item => {
    item.busItems.map(busItem => {
      arriveBusInfos.push(busItem);
    })
  });

  // 도착 예정 버스 정보 조회 시 파라미터 가공 (정류소 고유ID, 버스 노선 번호, 순번)
  const resultDataInfo = arriveBusInfos.map(item => ({ stId: item.stId, busRouteId: item.busRouteId, ord: item.staOrd }));

  // 도착 예정 버스 정보 조회
  await Promise.all(resultDataInfo.map(async (info) => {
    try {
      const arriveBusInfos = await Services.getArriveBusInfo({ stId: info.stId, busRouteId: info.busRouteId, ord: info.ord });
      
      arriveBusInfos.map(item => {
        result.push(item);
      })
      
    } catch (e) {
      console.log("getArriveBusInfo Error: ", e)
    }
  }));

   // 가장 빨리 도착하는 버스 순으로 정렬
   result = result.sort((a, b) => getMinFromArrMsg(a.ETA) - getMinFromArrMsg(b.ETA));

   // 결과 출력
   console.log("RESULT: ", result); 
}


solution();
