import api from "../api/index.js";
import { getMinFromArrMsg } from "../utils/index.js";

/**
 * 특정 정류소에서 5분 내로 도착하는 버스 도착 정보 (정류소ID, 도착 버스 대수, 도착 버스 정보) 가져오기
 */
export default async function getArrInfoIn5minByStation(arsId) {
  let arrivedInfoList = [];

  try {
    // 특정 정류소의 모든 버스 도착 정보 조회
    const resp = await api.getStationByUid({ arsId: arsId });
    if (resp.status !== 200) {
      throw new Error();
    };

    if (resp.data.msgBody.itemList) {
      // 해당 정류소의 모든 버스 도착 정보
      const busArriveInfoList = resp.data.msgBody.itemList;

      // 해당 정류소의 버스들 중 5분 내로 도착하는 버스 도착 정보
      const filteredBusArrInfoList = busArriveInfoList.filter(item => getMinFromArrMsg(item.arrmsgSec1) < 5);

      arrivedInfoList.push({ stationId: arsId, busLength: filteredBusArrInfoList.length, busItems: filteredBusArrInfoList });
    } else { 
      console.log("[BUSAPI] getStaionByRoute Error: busRouteStationList is null.", resp.data.msgHeader);
    }

  } catch (e) {
    console.log("[BUSAPI] getStationByUid Error: ", e)
  }

  return arrivedInfoList;
}