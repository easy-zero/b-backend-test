import helper from './helper.js';
import config from '../../config.json' assert { type: 'json'};

const BUS_ROUTE_INFO_SERVICE_KEY = config.api_key.busRouteInfo;
const STATION_INFO_SERVICE_KEY = config.api_key.stationInfo;
const ARRIVE_SERVICE_KEY = config.api_key.arrive;

export default {
  // 전체 노선정보 조회
  getBusRouteList : (resultType = 'json') => 
    helper.API().get(`/busRouteInfo/getBusRouteList?serviceKey=${BUS_ROUTE_INFO_SERVICE_KEY}&resultType=${resultType}`),
  // 특정 노선의 전체 경유 정류소 조회
  getStationByRoute : ({ busRouteId }, resultType = 'json') => 
  helper.API().get(`/busRouteInfo/getStaionByRoute?serviceKey=${BUS_ROUTE_INFO_SERVICE_KEY}&busRouteId=${busRouteId}&resultType=${resultType}`),
  // 특정 정류소의 버스 도착 정보 조회 
  getStationByUid : ({ arsId }, resultType = 'json') => 
  helper.API().get(`/stationinfo/getStationByUid?serviceKey=${STATION_INFO_SERVICE_KEY}&arsId=${arsId}&resultType=${resultType}`),
  // 특정 정류소에서 특정 노선의 도착예정정보 조회
  getArrivedInfo : ({ stId, busRouteId, ord }, resultType = 'json') => 
  helper.API().get(`/arrive/getArrInfoByRoute?serviceKey=${ARRIVE_SERVICE_KEY}&stId=${stId}&busRouteId=${busRouteId}&ord=${ord}&resultType=${resultType}`),
}
