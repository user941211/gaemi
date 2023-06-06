import React, { useState, useEffect } from "react";
import axios from "axios";

const Price = () => {
  return (
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
  );
};

export default Price;
