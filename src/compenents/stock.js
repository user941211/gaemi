import React, { useState, useEffect } from "react";
import axios from "axios";
import Theme from "./theme";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Stock({ chartData, rim, recommend }) {
  const [codeName, setCodeName] = useState("");
  const [code, setCode] = useState("");
  const [filteredRim, setFilteredRim] = useState([]);
  const [filteredRecommend, setFilteredRecommend] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const codeName = chartData[0].code_name;
      setCodeName(codeName);
      const code = chartData[0].code;
      setCode(code);
    }

    const filteredRim = rim && rim.filter((item) => item.종목명 === codeName);
    setFilteredRim(filteredRim);

    const filteredRecommend = recommend && recommend.filter((item) => item.종목명 === codeName);
    setFilteredRecommend(filteredRecommend);

    const filteredChartData = chartData && chartData.filter((item) => item.종목명 === codeName);
    setFilteredChartData(filteredChartData);
  }, [chartData, rim, recommend]);

  return (
    <div className="stockInfo">
      <div className="stockLogo">
        <img src={stockLogo} alt="stock" />
        <div className="stockContent">
          <p>{codeName}</p>
          <p className="cospi">코스피 {code}</p>
        </div>
      </div>
      <div className="themeLayout">
        <Theme />
        <Theme />
      </div>
      <table className="stockTable">
        <tbody>
          <tr>
            <td>적정주가</td>
            {filteredRim && filteredRim.map((item, index) => (
              <p key={index}>{item.적정주가}</p>
            ))}
          </tr>
          <tr>
            <td>적정주가 괴리율</td>
            {filteredRim && filteredRim.map((item, index) => (
              <p key={index}>{item.괴리율}</p>
            ))}
          </tr>
          <tr>
            <td>전일 거래대금</td>
            {filteredRecommend && filteredRecommend.map((item, index) => (
              <p key={index}>{item.result}</p>
            ))}
          </tr>
          <tr>
            <td>변동률</td>
            {filteredChartData && filteredChartData.map((item, index) => (
              <p key={index}>{item.d1_diff_rate}</p>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Stock;


