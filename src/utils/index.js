export const ViewNumberFormatter = (num) => {
  let FormatNum = 0;
  if (num >= 1000 && num < 1000000) {
    FormatNum = Math.round((num / 1000) * 10) / 10 + " N";
  } else if (num >= 1000000 && num < 1000000000) {
    FormatNum = Math.round((num / 1000000) * 10) / 10 + " Tr";
  } else if (num >= 1000000000) {
    FormatNum = Math.round((num / 1000000000) * 10) / 10 + " T";
  } else {
    FormatNum = num;
  }
  return FormatNum;
};

export const ViewNumberFormatterDetails = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const TimePublishToNow = (timePublish) => {
  let FormatTime = 0;
  const fromTime = Date.parse(timePublish) / 1000;
  const toTime = Date.now() / 1000;
  const timeDifferent = (toTime - fromTime) / (3600 * 24);
  if (timeDifferent < 1.0) {
    FormatTime = Math.floor(timeDifferent * 24) + " giờ trước";
  } else if (timeDifferent >= 1 && timeDifferent < 7.0) {
    FormatTime = Math.floor(timeDifferent) + " ngày trước";
  } else if (timeDifferent >= 7.0 && timeDifferent < 30.0) {
    FormatTime = Math.floor(timeDifferent / 7) + " tuần trước";
  } else if (timeDifferent / 30 >= 1.0 && timeDifferent / 30 < 12.0) {
    FormatTime = Math.floor(timeDifferent / 30) + " tháng trước";
  } else {
    FormatTime = Math.floor(timeDifferent / 364) + " năm trước";
  }
  return FormatTime;
};

export const TimeFormatter = (time) => {
  const temp = new Date(time);
  // return temp;
  return `${temp.getDate()} thg ${temp.getMonth() + 1}, ${temp.getFullYear()}`;
};

export const DurationVideoFormatter = (duration) => {
  let FormatTime = "";
  for (var i = 0; i < duration.length; i++) {
    if (duration[i] >= "0" && duration[i] <= "9") {
      FormatTime += duration[i];
    } else if (duration[i] === "H" || duration[i] === "M") {
      FormatTime += ":";
    }
  }
  if (FormatTime === "0") {
    return FormatTime;
  } else if (FormatTime.length == 2) {
    FormatTime = "00:" + FormatTime;
  } else if (FormatTime.length < 4) {
    FormatTime = FormatTime[0] + ":" + "0" + FormatTime[2];
  } else if (FormatTime.length == 4 && FormatTime.indexOf(":") == 2) {
    FormatTime = FormatTime.substring(0, 3) + "0" + FormatTime[3];
  }
  return FormatTime;
};
