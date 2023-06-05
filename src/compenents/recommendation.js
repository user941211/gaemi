import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Recommendation() {
  return (
    <div id="Recommendation">
      <div className="left">
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
    </div>
  );
}

export default Recommendation;
