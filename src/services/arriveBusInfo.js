import api from "../api/index.js";

/**
 * 특정 정류소에 도착 예정인 버스 정보 (노선 번호, 버스 차 번호, 도착 예정 시간) 가져오기
 */
export default async function getArriveBusInfo({ stId, busRouteId, ord }) {
  let result = [];

  try {
    const resp = await api.getArrivedInfo({ stId: stId, busRouteId: busRouteId, ord: ord });
    if (resp.status !== 200) {
      throw new Error();
    };

    if (resp.data.msgBody.itemList) {
      // 해당 정류소의 해당 노선 도착 정보
      const arrivedInfos = resp.data.msgBody.itemList;

      // 결과 데이터
      result = arrivedInfos.map(item => ({ busNumber: item.busRouteAbrv, plateNumber: item.plainNo1, ETA: item.arrmsg1 }));

    } else { 
      console.log("[BUSAPI] getArrivedInfo Error: arrivedInfoList is null.", resp.data.msgHeader);
    }

  } catch (e) {
    console.log("[BUSAPI] getArrivedInfo Error: ", e)
  }

  return result;
}