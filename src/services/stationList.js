import api from "../api/index.js";

/**
 * 특정 노선의 전체 경유 정류소 ID 가져오기
 */
export default async function getAllStationIdByRoute(busRouteId) {
  let arriveStationIds = [];

  try {
    const resp = await api.getStationByRoute({ busRouteId: busRouteId });
    if (resp.status !== 200) {
      throw new Error();
    };

    if (resp.data.msgBody.itemList) {
      const busRouteStationList = resp.data.msgBody.itemList;

      busRouteStationList.map(routeStationItem => {
        arriveStationIds.push(routeStationItem.arsId);
      });

    } else {
      console.log("[BUSAPI] getStaionByRoute Error: busRouteStationList is null.", resp.data.msgHeader);
    }

  } catch (e) {
    console.log("[BUSAPI] getStaionByRoute Error: ", e);
  }

  return arriveStationIds;
}