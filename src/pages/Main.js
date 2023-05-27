import React from "react";
import './css/App.css';
import Header from "./Header";
import Chart from '../compenents/chart'
import stockLogo from './img/stockLogoEx.JPG'
import Theme from "../compenents/theme";

/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
    return(
        <div>
            <Header />
            <div className="main">
                <div className="main_container">
                    <div className="Left">
                        <div className="Graph">
                            <Chart />
                        </div>
                    </div>
                    <div className="Right">
                        <div className="first">
                            <div className="stockInfo">
                                <div className="first_name">종목정보</div>
                                <div className="stockLogo">
                                    <img src={stockLogo}/>
                                    <div className="stockContent">
                                        <p>삼성전자</p>
                                        <p className="cospi">코스피 980908</p>
                                    </div>
                                </div>
                                <div className="themeLayout">
                                    <Theme/>
                                    <Theme/>
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
                        </div>
                        <div className="second">
                            <div className="second_name">발굴분석</div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;