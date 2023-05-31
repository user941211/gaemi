import React from "react";
import Theme from "./theme";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Stock() {
  return (
    <div className="stockInfo">
      <div className="stockLogo">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>삼성버섯</p>
          <p className="cospi">코스피 980908</p>
        </div>
      </div>
      <div className="themeLayout">
        <Theme />
        <Theme />
      </div>
      <table className="stockTable">
        <tr>
          <td>시가총액</td>
          <td>기업순위</td>
        </tr>
        <tr>
          <td>408조</td>
          <td>코스피 1위</td>
        </tr>
        <tr>
          <td>주식수</td>
          <td>외국인 비중</td>
        </tr>
        <tr>
          <td>10000</td>
          <td>52.19%</td>
        </tr>
        <tr>
          <td>산업군</td>
          <td>세부산업군</td>
        </tr>
        <tr>
          <td>반도체/반도체장비</td>
          <td>하드웨어/IT장비</td>
        </tr>
        <tr>
          <td>52주 최저</td>
          <td>52주 최고</td>
        </tr>
        <tr>
          <td>51,800</td>
          <td>62,000</td>
        </tr>
      </table>
    </div>
  );
}

export default Stock;
