import React, { useEffect,useState } from "react";
import axios from 'axios';
import Header from "../pages/Header";
import { useNavigate } from "react-router-dom";


function MyPage() {
    const [userId, setuserId]=useState('');
    const [point, setPoint]=useState('');
    const [jusic, setjusic]=useState('');
    const [jusicPrice, setjusicPrice]=useState('');
    const [nowPrice, setnowPrice]=useState('');
    const [isJusic, setisJusic] = useState(false);
    const [textBoxValue, setTextBoxValue] = useState("");
    const navigate = useNavigate();

    const updatedPoint = Math.floor(point * (nowPrice / jusicPrice));
    const getLocalIPAddress = () => {
        const currentURL = window.location.href;
        const domain = new URL(currentURL).hostname;
        return domain || "localhost";
    };

    useEffect(()=>{
        const handleUser = async ()=>{
            const ipAddress = getLocalIPAddress();
            const url = `http://${ipAddress}:3001/mypage`;

            try{
                const response = await axios.post(url,{});
                const data = response?.data;
                setuserId(data.userId);
                setPoint(data.point);
                if(data.jusic){
                setjusic(data.jusic);
                setjusicPrice(data.jusicPrice);
                setnowPrice(data.nowPrice);
                setisJusic(true);
                }

            }catch(error){
                console.error("error:",error);
                alert("오류가 발생했습니다");
            }
        };
        handleUser();
    });
    const handleChange = (e) => {
        setTextBoxValue(e.target.value);
      };
      const startJusic = async () => {
        const ipAddress = getLocalIPAddress();
        const url = `http://${ipAddress}:3001/startJusic`;
      
        // 서버로 전송할 데이터
        const requestData = { textBoxValue ,userId};
      
        try {
          // axios.post로 변경
          await axios.post(url, requestData);
      
          // 성공적으로 모의투자 시작이 완료되었을 때의 처리
          alert("모의투자가 완료되었습니다.");
          window.location.reload();
        } catch (error) {
          console.error("Error starting jusic:", error);
          // 실패 시에 대한 처리
          alert("모의투자 시작에 실패했습니다.");
        }
      };
    const handleClosing = async () => {
        const ipAddress = getLocalIPAddress();
        const url = `http://${ipAddress}:3001/mypageClosing`;

        
        await axios.post(url,{userId,updatedPoint});
        
        alert("결산이 완료되었습니다.");
        window.location.reload();
      };
  return (
    <div>
        <Header/>
        <h2>
            {userId}번 이용자님 환영합니다!
        </h2>
        <h3>
            보유 point : {point}
        </h3>
        {isJusic?(
            <div>
             <h3>
             투자 하신 주식 : {jusic}
         </h3>
         <h3>
             투자 당시 주가 : {jusicPrice}
         </h3>
         <h3>
            현재 주가 : {nowPrice}
        </h3>
        <h3>
            결산이후 예상 포인트 : {updatedPoint}
        </h3>
        <button onClick={handleClosing}>결산</button>
         </div>
        ):(
            <div>
          <input
            type="text"
            placeholder="주식명을 입력하세요"
            value={textBoxValue}
            onChange={handleChange}
          />
          <button onClick={startJusic}>모의투자 시작</button>
        </div>
        )}
    </div>
  );
}

export default MyPage;
