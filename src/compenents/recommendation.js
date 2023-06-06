import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import stockLogo from "../pages/img/stockLogoEx.jpeg";
import "../pages/css/App.css";

function Recommendation({recommend} ) {
  console.log(recommend);
  return (
    <div id="Recommendation">
      <div className="left">
        <div id="RecommendationResult">Good!</div>
        <div id="RecommendationOther">
          <span>Good인 주식</span>
          <div id="stockLogo_reco">
          {recommend.map((item, index) => (
              <div className="stockLogo" key={index}>
                <img src={stockLogo} alt="stock" />
                <div className="stockContent">
                  <p key={index}>{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;