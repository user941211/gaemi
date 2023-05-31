import React from "react";
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
/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
  return (
    <div>
      <Header link="/" />
      <div className="main">
        <div className="main_container">
          <div className="Left">
            <div className="Graph">
              <Chart />
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
                  <FinancialInfo />
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
                <Tab eventKey="home" title="테마종목">
                  <BalGul />
                </Tab>
                <Tab eventKey="profile" title="종목필터">
                  test
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
