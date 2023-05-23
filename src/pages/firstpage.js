import React, { Component } from 'react';
import './css/firstPage.css';
//import { Link } from 'react-router-dom';

/*
	현재 구현이 안되어있는 기능: 장 오픈 여부 => <span></span>태그 안에 '장이 열린 여부' 글자 대신에
	장이 열리는 시간에 맞추어 'Open' 이라는 글자 혹은 'Close'라는 문구 출력
	그리고 firstpage의 배경이미지 같은 경우에는 현재 이대로 제출하면 저작권에 위배되서
	오늘 내일[23.05.23~24중]으로 영남대학교를 아침, 점심, 저녁, 밤으로 나누어 사진을 직접 찍어서 교체할듯
	모바일 부분의 배경도 포토샵을 대충이라도 배워서 바꿔보도록 하겠습니당...
*/

const Firstpage = () => {
	const nowTime = new Date();
	const nowHour = nowTime.getHours();
	const nowMinutes = nowTime.getMinutes();

	const startTime = {hour : 9, minutes : 0};
	const endTime = {hour : 15, minutes: 30};

	const remainStartHour = startTime.hour - nowHour;
	const remainStartMinutes = startTime.hour - nowMinutes;
	const remainEndHour = endTime.hour - nowHour;
	const remainEndMinutes = endTime.hour - nowMinutes;

	return (
		<div id="wrap">
			<article>
				<p><strong>Omega</strong> Route</p>
				<em>Whatever you imagine, you will see more</em>
			</article>
		
			<figure>		
				<p>
					{
						(nowHour > 9 && nowHour < 15) ||
						(nowHour === 9 && nowMinutes >= 0) ||
						(nowHour === 15 && nowMinutes <= 30)
						? <span>OPEN</span>
						: <span>CLOSE</span>
					}
				</p>
				<p>
					{
						(nowHour > 9 && nowHour < 15) ||
						(nowHour === 9 && nowMinutes >= 0) ||
						(nowHour === 15 && nowMinutes <= 30)
						? `장 마감까지 ${remainEndHour}시 ${remainEndMinutes}분 남았습니다.`
						: `장 시작까지 ${remainStartHour}시 ${remainStartMinutes}분 남았습니다.`
					}
				</p>		
			</figure>
		</div>
	)
}

export default Firstpage