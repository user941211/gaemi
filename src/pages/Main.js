import React, { useState } from "react";
import Chart from "../compenents/chart";
import Stock from "../compenents/stock";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./css/App.css";
import "./css/Main.css";
import { useLocation } from "react-router-dom";
import BalGul from "../compenents/balgul";
import Price from "../compenents/price";
import Test from "../compenents/test";
import FinancialInfo from "../compenents/financialinfo";
import Recommendation from "../compenents/recommendation";
import Categoryfilter from "../compenents/categoryfilter";
/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
  // const [chartData, setChartData] = useState([]);
  // const [finance, setfinance] = useState([]);
  // const [recommend, setrecommend] = useState([]);
  // const [rim, setrim] = useState([]);
  // const [userId, setUserId] = useState(
  //   location.state?.userId
  // );

  const location = useLocation();
  const [chartData, setChartData] = useState(location.state?.results || []);
  const [finance, setfinance] = useState(location.state?.finance || []);
  const [recommend, setrecommend] = useState(location.state?.recommend || []);
  const [rim, setrim] = useState(location.state?.rim || []);

  //console.log(state);

  const handleDataUpdate = (results, finance, recommend, rim) => {
    setChartData(results);
    setfinance(finance);
    setrecommend(recommend);
    setrim(rim);
  };

  console.log(recommend);
  return (
    <div id="container">
      <Header link="/" onDataUpdate={handleDataUpdate} disabledQ="true" />
      <div className="main">
        <div className="main_container">
          <div className="Left">
            <Price rim={rim} chartData={chartData} />
             <Chart chartData={chartData} />
              <Recommendation recommend={recommend} />
                  <Stock chartData={chartData} rim={rim} />
                  <FinancialInfo
                    finance={finance}
                    chartData={chartData}
                    recommend={recommend}
                  />
                  <BalGul />
                  <Categoryfilter />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Main;
