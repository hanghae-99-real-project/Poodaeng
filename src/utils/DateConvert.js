const dateConvert1 = (date) => {
  const createdDate = new Date(date);
  const formattedDate = createdDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return formattedDate;
};

const dateConvert2 = (date) => {
  // console.log('date >>>', date)
  const createdDate = new Date(date);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const day = createdDate.getDate();
  let hour = createdDate.getHours();
  const minute = createdDate.getMinutes();
  let ampm = "오전"
  
  /* padStart를 사용하여 minute를 2자리로 맞춰줄 수 있음 */
  const formattedDateV1 = `${year}. ${month}. ${day} ${hour}:${minute.toString().padStart(2, '0')}`;
  if (hour >= 12) {
    hour -= 12;
    ampm = "오후"
  }
  const formattedDateV2 = `${year}년 ${month}월 ${day}일 ${ampm} ${hour}:${minute.toString().padStart(2, '0')}`;
  const formattedDateV3 = `${year}.${month.toString().padStart(2,0)}.${day.toString().padStart(2,0)}`

  return [formattedDateV1, formattedDateV2, formattedDateV3];
};

// console.log(dateConvert2(new Date()));

const getDateDiff = (createdAt) => {
  // const createdAt = "2023-06-05T05:33:40.000Z";
  const currentTime = new Date();
  const createdTime = new Date(createdAt);

  /* getTime()이 더 정확하지 않을까...? */
  const timeDiff = Math.abs(currentTime - createdTime); // 현재 시간과 생성 시간의 차이를 계산합니다.
  const minutesDiff = Math.floor(timeDiff / (1000 * 60)); // 분 단위로 차이를 계산합니다.
  const hoursDiff = Math.floor(minutesDiff / 60); // 시간 단위로 차이를 계산합니다.
  const daysDiff = Math.floor(hoursDiff / 24); // 일 단위로 차이를 계산합니다.

  let formattedTime;

  if (daysDiff > 0) {
    formattedTime = `${daysDiff}일 전`;
  } else if (hoursDiff > 0) {
    formattedTime = `${hoursDiff}시간 전`;
  } else {
    formattedTime = `${minutesDiff}분 전`;
  }

  return formattedTime;
}


export {dateConvert1, dateConvert2, getDateDiff};