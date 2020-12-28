export const ViewNumberFormatter = (num) => {
  let FormatNum = 0;

  if (num >= 1000 && num < 1000000) {
    FormatNum = Math.round((num / 1000) * 10) / 10 + " N lượt xem";
  } else if (num >= 1000000 && num < 1000000000) {
    FormatNum = Math.round((num / 1000000) * 10) / 10 + " Tr lượt xem";
  } else if (num >= 1000000000) {
    FormatNum = Math.round((num / 1000000000) * 10) / 10 + " T lượt xem";
  } else {
    FormatNum = num;
  }
  return FormatNum;
};

export const TimePublishToNow = (timePublish) => {
  let FormatTime = 0;
  const fromTime = Date.parse(timePublish) / 1000;
  const toTime = Date.now() / 1000;
  const timeDifferent = (toTime - fromTime) / (3600 * 24);
  if (timeDifferent < 7.0) {
    FormatTime = Math.floor(timeDifferent * 24) + " giờ trước";
  } else if (timeDifferent >= 7.0 && timeDifferent < 30.0) {
    FormatTime = Math.floor(timeDifferent / 7) + " tuần trước";
  } else if (timeDifferent / 30 >= 1.0 && timeDifferent / 30 < 12.0) {
    FormatTime = Math.floor(timeDifferent / 30) + " tháng trước";
  } else {
    FormatTime = Math.floor(timeDifferent / 364) + " năm trước";
  }
  return FormatTime;
};
