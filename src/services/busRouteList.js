import api from "../api/index.js";

/**
 * 랜덤한 3개의 노선정보(노선ID) 가져오기
 */
export default async function getRandomBusRoutes() {
  let randomBusRouteIds = [];

  try {
    // 전체 노선 조회
    const resp = await api.getBusRouteList();
    if (resp.status !== 200) {
      throw new Error();
    };

    if (resp.data.msgBody.itemList) {
      const busRouteList = resp.data.msgBody.itemList;
      // 3개의 노선정보(노선ID) 무작위 추출
      for(let i = 0; i < 3; i ++) {
          const randomBusRoute = busRouteList[Math.floor(Math.random() * busRouteList.length)].busRouteId;
          randomBusRouteIds.push(randomBusRoute);
      }

    } else {
      console.log("[BUSAPI] getBusRouteList Error: busRouteList is null.", resp.data.msgHeader);
    }

  } catch (e) {
    console.log("[BUSAPI] getBusRouteList Error: ", e);
  }

  return randomBusRouteIds;
}