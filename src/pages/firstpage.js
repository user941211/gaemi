import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import "./css/firstPage.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Firstpage = () => {
  const [jusic, setJusic] = useState({
    jongga: [],
    trade: [],
    complete: [],
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const getLocalIPAddress = () => {
      const currentURL = window.location.href;
      const domain = new URL(currentURL).hostname;
      return domain || "localhost";
    };

    const handleSearch = async () => {
      const ipAddress = getLocalIPAddress();
      const url = `http://${ipAddress}:3001/firstpage`;

      try {
        const response = await axios.post(url, {});
        const data = response?.data;
        console.log(data.complete);
        setJusic(data);
      } catch (error) {
        console.error("Error:", error);
        alert("해당 정보가 없습니다.");
      }
    };

    handleSearch();
  }, []); // 빈 의존성 배열을 사용하여 한 번만 실행

  return (
    <div id="container">
      <Header link="/Main" />
      <div id="content_container">
        <p>Stair: stock prediction program</p>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <h2>종가</h2>
              <ul>{renderList(jusic.jongga)}</ul>
            </div>
            <div className="col">
              <h2>거래량</h2>
              <ul>{renderList(jusic.trade)}</ul>
            </div>
            <div className="col">
              <h2>시가총액</h2>
              <ul>{renderList(jusic.complete)}</ul>
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
    <li key={index}>
      {index + 1}. {item.종목명}
    </li>
  ));
};

export default Firstpage;