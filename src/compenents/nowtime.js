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
            const endTime = { hour: 15, minutes: 30, second: 0 };

            let remainHour = 0;
            let remainMinutes = 0;
            let remainSeconds = 0;
            let startEnd = "";

            if (
                (nowHour > 9 && nowMinutes < 15) ||
                (nowHour === 9 && nowMinutes >= 0 && nowSecond >= 0) ||
                (nowHour === 15 && nowMinutes <= 30 && nowSecond <= 0)
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

            if (remainHour < 0) remainHour += 24;
            if (remainMinutes < 0) {
                remainMinutes += 60;
                remainHour--;
            }
            if (remainSeconds < 0) {
                remainSeconds += 60;
                remainMinutes--;
            }

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
