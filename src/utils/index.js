// 버스 도착예정시간에서 분 가져오기
export const getMinFromArrMsg = arrMsg => {
  let arrMin = '';

  if (arrMsg.includes('분')) {
    const minStrIdx = arrMsg.indexOf('분');
    arrMin = arrMsg.slice(0, minStrIdx);
    
    if (arrMin.indexOf('[') === 0) {
      const descStr = arrMin.slice(0, arrMin.indexOf(']') + 2);
      arrMin = arrMin.replace(descStr, '')
    };
  } else {
    if (arrMsg === '곧 도착') {
      arrMin = '-1';
    } else {
      arrMin = arrMsg;
    }
  }

    return arrMin;
}
