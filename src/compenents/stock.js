import React, { useState, useEffect } from "react";
import axios from "axios";
import Theme from "./theme";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Stock({chartData}) {
  const [data, setData] = useState([]);
  const [code_name, setCodeName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    updateChartData();
  }, [chartData]);
  const updateChartData = () => {
    if (chartData.length > 0) {
      setCodeName(chartData[0].code_name);
      setCode(chartData[0].code);
    }
  };
  //const codeName = chartData[0].code_name;
  return (
    <div className="stockInfo">
      <div className="stockLogo">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>codename</p>
          <p className="cospi">코스피 {code}</p> {/* 수정: inputValue를 출력 */}
        </div>
      </div>
      <div className="themeLayout">
        <Theme />
        <Theme />
      </div>
      <table className="stockTable">
        <tbody> {/* 수정: tbody 요소 추가 */}
          <tr>
            <td>시가총액</td>
            <td>{data[0]}</td>
          </tr>
          <tr>
            <td>408조</td>
            <td>{data[1]}</td>
          </tr>
          <tr>
            <td>주식수</td>
            <td>{data[2]}</td>
          </tr>
          <tr>
            <td>10000</td>
            <td>{data[3]}</td>
          </tr>
          <tr>
            <td>산업군</td>
            <td>{data[4]}</td>
          </tr>
          <tr>
            <td>반도체/반도체장비</td>
            <td>{data[5]}</td>
          </tr>
          <tr>
            <td>52주 최저</td>
            <td>{data[6]}</td>
          </tr>
          <tr>
            <td>52주 최고</td>
            <td>{data[7]}</td>
          </tr>
        </tbody> {/* 수정: tbody 요소 닫기 */}
      </table>
    </div>
  );
}

export default Stock;
