import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import ThemeList from "./themelist";

const BalGul = () => {
  const [stockData, setStockData] = useState(null);

  // Fetch stock item information from an API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://alphasquare.co.kr/home/market/market-summary?code=005930"
        );
        setStockData(response.data);
      } catch (error) {
        console.error("주식 정보 패치 실패:", error);
      }
    };

    fetchData();
  }, []);

  // Render stock item information
  return (
    <div>
      <ListGroup>
        <ThemeList />
        <ThemeList />
      </ListGroup>
      {stockData ? (
        <div>
          <h2>{stockData.name}</h2>
          <p>Price: {stockData.price}</p>
          <p>Quantity: {stockData.quantity}</p>
        </div>
      ) : (
        <Spinner animation="border" variant="primary" />
      )}
    </div>
  );
};

export default BalGul;
