import React, { useState, useEffect } from "react";

function NowTime() {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nowTime = new Date();
      const nowHour = nowTime.getHours();
      const nowMinutes = nowTime.getMinutes();
      const nowSecond = nowTime.getSeconds();

      const startTime = { hour: 9, minutes: 0, second: 0 };
      const endTime = { hour: 10, minutes: 30, second: 0 };

      var remainHour = 0;
      var remainMinutes = 0;
      var remainSeconds = 0;
      var startEnd = "";

      if (
        (nowHour > 9 && nowHour < 10) ||
        (nowHour === 9 && nowMinutes >= 0) ||
        (nowHour === 10 && nowMinutes < 30)
      ) {
        remainHour = endTime.hour - nowHour;
        remainMinutes = endTime.minutes - nowMinutes;
        remainSeconds = endTime.second - nowSecond;
        startEnd = "마감";
      } else {
        remainHour = startTime.hour - nowHour;
        remainMinutes = startTime.minutes - nowMinutes;
        remainSeconds = startTime.second - nowSecond;
        startEnd = "시작";
      }
      if (remainSeconds < 0) {
        remainSeconds += 60;
        remainMinutes--;
      }
      if (remainMinutes < 0) {
        remainMinutes += 60;
        remainHour--;
      }
      if (remainHour < 0) remainHour += 24;

      if (remainHour < 10) remainHour = "0" + remainHour;
      if (remainMinutes < 10) remainMinutes = "0" + remainMinutes;
      if (remainSeconds < 10) remainSeconds = "0" + remainSeconds;
      const remainingTimeString = `장 ${startEnd}까지 ${remainHour}:${remainMinutes}:${remainSeconds}`;
      setRemainingTime(remainingTimeString);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <div>{remainingTime}</div>;
}

export default NowTime;
