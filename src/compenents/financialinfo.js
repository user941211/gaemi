import React, { useState, useEffect } from "react";
import axios from "axios";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/css/App.css";

const FinancialInfo = () => {
  return (
    <div className="stockInfo">
      <div className="stockLogo_small">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>삼성전자</p>
        </div>
      </div>
      <table className="stockTable">
        <tr className="gray-line">
          <td>2022/06</td>
          <td>2022/09</td>
          <td>2022/12</td>
          <td>2023/03</td>
        </tr>
        <tr>
          <td colSpan={4}>매출액(억)</td>
        </tr>
        <tr>
          <td>772,036</td>
          <td>772,036</td>
          <td>772,036</td>
          <td>772,036</td>
        </tr>
        <tr>
          <td colSpan={4}>영업이익(억)</td>
        </tr>
        <tr>
          <td>140,036</td>
          <td>140,036</td>
          <td>140,036</td>
          <td>140,036</td>
        </tr>
        <tr>
          <td colSpan={4}>당기순이익(억)</td>
        </tr>
        <tr>
          <td>772,036</td>
          <td>772,036</td>
          <td>772,036</td>
          <td>772,036</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>영업이익률(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>순이익률(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>자산총계(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>부채총계(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>자본총계(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>자본금(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>부채비율(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>유동비율(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>영업활동현금흐름(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>투자활동현금흐름(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>재무활동현금흐름(억)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>PER(배)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>PBR(배)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>PSR(배)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>PCR(배)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>ROE(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>ROA(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>EPS(원)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>BPS(원)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>SPS(원)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr>
          <td colSpan={4}>CPS(원)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
        <tr className="gray-line">
          <td colSpan={4}>시가배당률(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>배당성향(%)</td>
        </tr>
        <tr>
          <td>18</td>
          <td>18</td>
          <td>18</td>
          <td>18</td>
        </tr>
        <tr>
          <td colSpan={4}>DPS(원)</td>
        </tr>
        <tr>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
          <td>4,580,407</td>
        </tr>
      </table>
    </div>
  );
};

export default FinancialInfo;
