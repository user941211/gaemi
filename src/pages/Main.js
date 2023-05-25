import React from "react";
import './css/App.css';
import Header from "./Header";
import Chart from '../compenents/chart'

/*
    종목분석과 발굴분석은 알파스퀘어를 최대한 모방할건데
    한 페이지로 한꺼번에 볼 수 있도록만 변경한다.
*/

function Main() {
    return(
        <div>
            <Header />
            <div className="main">
                <div className="container">
                    <div className="Left">
                        <Chart />
                        <div className="Graph">
                            
                        </div>
                    </div>
                    <div className="Right">
                        <div className="first">
                            <div className="first_name">종목정보</div>
                            <div></div>
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