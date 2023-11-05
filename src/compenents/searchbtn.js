import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../pages/Header";

const Searchbtn = ({ list }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isInputVisible, setInputVisible] = useState(false);
    const [isSearching, setSearching] = useState(false);

    const handleSearchButtonClick = () => {
        setInputVisible(true);
    };

    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const getLocalIPAddress = () => {
    const currentURL = window.location.href;
    const domain = new URL(currentURL).hostname;
    return domain || "localhost";
  };

  const handleSearch = async () => {
    const ipAddress = getLocalIPAddress();
    const url = `http://${ipAddress}:3001/search`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      if (data.message) {
        alert(data.message);
      } else {
        navigate("/main", {
          state: {
            results: data.results,
            finance: data.finance,
            recommend: data.recommend,
            rim: data.rim,
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("해당 정보가 없습니다.");
    }
  };

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

    return (
        <header className="bg-gray-900 text-white py-2">
            <div className="flex justify-between items-center container mx-auto">
                <div className="flex items-center space-x-4">
                    {!isInputVisible && (
                        <button onClick={handleSearchButtonClick} className="px-4 py-1 bg-white text-black rounded-md hover:bg-gray-300">
                            검색
                        </button>
                    )}
                    {isInputVisible && (
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleOnKeyPress}
                                className="px-4 py-1 bg-gray-800 border border-gray-700 rounded-md"
                            />
                            <button onClick={handleSearch} className="px-3 py-1 bg-white text-black rounded-md hover-bg-gray-300">
                                검색
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Searchbtn;
