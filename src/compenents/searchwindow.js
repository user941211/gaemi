import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pages/css/SearchWindow.css"
import Header from "../pages/Header";
import { useLocation } from "react-router-dom";
//{ onDataUpdate }
function SearchWindow({ list }) {
  const location = useLocation();
  const initialSearchValue = location.state?.name || "";
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(initialSearchValue);
  const [searchResults, setSearchResults] = useState([]);

  
  const getLocalIPAddress = () => {
    const currentURL = window.location.href;
    const domain = new URL(currentURL).hostname;
    return domain || "localhost";
  };
  const handleSearch = async () => {
    const ipAddress = getLocalIPAddress();
    const url = `http://${ipAddress}:3001/search`;

    try {
      const response = await axios.post(url, { name: inputValue });
      const data = response?.data;
      console.log(data);
      if (data.message) {
        alert(data.message); // 서버에서 전달한 메시지를 알림창으로 표시
      } else {
        navigate("/main", {
          state: {
            results: data.results,
            results2: data.results2,
            finance: data.finance,
            recommend: data.recommend,
            rim: data.rim,
          },
        });
        //onDataUpdate(data.results, data.finance, data.recommend, data.rim); // 부모 컴포넌트에 전달하는 코드
      }
    } catch (error) {
      console.error("Error:", error);
      alert("해당 정보가 없습니다.");
    }
  };
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
      //handleClose();
    }
  };

  const handleSubmit = (event) => {
    handleSearch(event); // Call handleSearch function
    //handleClose(); // Call handleClose function
  };

  return (
    <div id="container">
      <Header link="/searchwindow" />
      <div id="search_container">
        <div className="logo">
          <p>Stair</p>
        </div>
      <input
        autoFocus
        type="search"
        className="searchSpace"
        placeholder="여섯자리 숫자코드 혹은 이름으로 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleOnKeyPress}
      />
      </div>
        
    </div>
  );
}

export default SearchWindow;
