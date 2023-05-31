import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Recommendation() {
  return (
    <div id="Recommendation">
      <div className="left">
        <div id="RecommendationFigure">
          <ProgressBar variant="success" now={40} />
          <ProgressBar variant="info" now={20} />
          <ProgressBar variant="warning" now={60} />
          <ProgressBar variant="danger" now={80} />
        </div>
        <div id="RecommendationResult">Good!</div>
        <div id="RecommendationOther">
          <span>Good인 주식</span>
          <div id="stockLogo_reco">
            <div className="stockLogo">
              <img src={stockLogo} alt="stock" />
              <div className="stockContent">
                <p>삼성버섯</p>
              </div>
            </div>
            <div className="stockLogo">
              <img src={stockLogo} alt="stock" />
              <div className="stockContent">
                <p>엘지버섯</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <table>
          <tr>
            <td>
              <div className="circle green"></div>
            </td>
            <td>평가기준1</td>
          </tr>
          <tr>
            <td>
              <div className="circle blue"></div>
            </td>
            <td>평가기준2</td>
          </tr>
          <tr>
            <td>
              <div className="circle yellow"></div>
            </td>
            <td>평가기준3</td>
          </tr>
          <tr>
            <td>
              <div className="circle red"></div>
            </td>
            <td>평가기준4</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Recommendation;
