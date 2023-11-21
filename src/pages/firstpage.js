import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./css/firstPage.css";
import axios from 'axios';


const Firstpage = () => {
  const handleSearch = async () => {
    const ipAddress = getLocalIPAddress();
    const url = `http://${ipAddress}:3001/search`;

    try {
      const response = await axios.post(url, { name: inputValue });
      const data = response?.data;
      console.log(`data:${data}`);
      if (data.message) {
        alert(data.message); // 서버에서 전달한 메시지를 알림창으로 표시
      } else {
        navigate("/firstpage", {
          state: {
            jongga: data.jongga,
            trade: data.trade,
            complete: data.complete,
          },
        });
        //onDataUpdate(data.results, data.finance, data.recommend, data.rim); // 부모 컴포넌트에 전달하는 코드
      }
    } catch (error) {
      console.error("Error:", error);
      alert("해당 정보가 없습니다.");
    }
  };

  return (
    <div id="container">
      <Header link="/Main" />
      <div id="content_container">
        <p>Stair: stock prediction program</p>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <h2>종가</h2>
              <ul>종가123</ul>
              {/* <ul>{renderList(data.jongga)}</ul> */}
            </div>
            <div className="col">
              <h2>거래량</h2>
              <ul>거래량123</ul>
              {/* <ul>{renderList(data.trade)}</ul> */}
            </div>
            <div className="col">
              <h2>시가총액</h2>
              <ul>시총123</ul>
              {/* <ul>{renderList(data.complete)}</ul> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 받은 데이터를 리스트로 렌더링하는 함수
const renderList = (items) => {
  return items.map((item, index) => (
    <li key={index}>{item.종목명}</li>
  ));
};

export default Firstpage;
