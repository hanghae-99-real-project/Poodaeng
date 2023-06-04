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
  const createdDate = new Date(date);
  const year = createdDate.getFullYear();
  const month = createdDate.getMonth() + 1;
  const day = createdDate.getDate();
  const hour = createdDate.getHours();
  const minute = createdDate.getMinutes();

  /* padStart를 사용하여 minute를 2자리로 맞춰줄 수 있음 */
  const formattedDate = `${year}. ${month}. ${day} ${hour}:${minute.toString().padStart(2, '0')}`;

  return formattedDate;
};

console.log(dateConvert2(new Date()));


export {dateConvert1, dateConvert2};