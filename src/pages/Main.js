import React, { useState } from "react";
import Chart from "../compenents/chart";
import Stock from "../compenents/stock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import "./css/App.css";
import BalGul from "../compenents/balgul";
import Test from "../compenents/test";
import FinancialInfo from "../compenents/financialinfo";
import Recommendation from "../compenents/recommendation";
import Categoryfilter from "../compenents/categoryfilter";
//import SearchModal from '../compenents/searchmodal';
/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
  const [chartData, setChartData] = useState([]);
  const [finance, setfinance] = useState([]);
  const handleDataUpdate = (results, finance) => {
    setChartData(results);
    setfinance(finance);
  };
  console.log(chartData);
  return (
    <div>
      <Header link="/" onDataUpdate={handleDataUpdate} />
      <div className="main">
        <div className="main_container">
          <div className="Left">
            <div>
              <div className="presentPrice">
                <p>현재가 : </p>
                <p>7마넌</p>
              </div>
              <div className="buyPrice">
                <p>매수적정가 : </p>
                <p>7000~8000</p>
              </div>
              <div className="sellPrice">
                <p>매도적정가 : </p>
                <p>7000~8000</p>
              </div>
            </div>
            <div className="Graph">
              <Chart chartData={chartData}/>
            </div>
            <div>
              <Recommendation />
            </div>
          </div>
          <div className="Right">
            <div className="first">
              <div className="first_name">종목정보</div>
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="home" title="종목요약">
                  <Stock />
                </Tab>
                <Tab eventKey="profile" title="재무정보">
                  <FinancialInfo finance={finance} chartData={chartData}/>
                </Tab>
              </Tabs>
            </div>
            <div className="second">
              <div className="second_name">발굴분석</div>
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="profile" title="종목필터">
                  <Categoryfilter />
                </Tab>
                <Tab eventKey="home" title="테마종목">
                  <BalGul />
                </Tab>
                
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
