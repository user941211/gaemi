import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BalGul = () => {
  const [stockData, setStockData] = useState(null);

  // Fetch stock item information from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://finance.naver.com/item/coinfo.naver?code=005930');
        setStockData(response.data);
      } catch (error) {
        console.error('주식 정보 패치 실패:', error);
      }
    };

    fetchData();
  }, []);

  // Render stock item information
  return (
    <div>
      {stockData ? (
        <div>
          <h2>{stockData.name}</h2>
          <p>Price: {stockData.price}</p>
          <p>Quantity: {stockData.quantity}</p>
        </div>
      ) : (
        <p>로딩중...</p>
      )}
    </div>
  );
};

export default BalGul;