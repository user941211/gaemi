import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";
import axios from 'axios';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getLocalIPAddress = () => {
    const currentURL = window.location.href;
    const domain = new URL(currentURL).hostname;
    return domain || "localhost";
};

  
    // Fetch the login status from the server when the component mounts
    const checkLoginStatus = async () => {
      const ipAddress = getLocalIPAddress();
      const url = `http://${ipAddress}:3001/checkLogin`;
      try {
        const response = await axios.get(url);
        const data = response.data;
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error("Error fetching login status:", error);
      }
    };
    useEffect(() => {
    checkLoginStatus();
    },[]);

    const handleLogout = async () => {
      try {
        // 서버 측에 로그아웃 요청 보내기
        const ipAddress = getLocalIPAddress();
        const logoutUrl = `http://${ipAddress}:3001/logout`;
  
        await axios.post(logoutUrl);
  
        // 클라이언트 측에서 로그아웃 상태로 변경
        alert("로그아웃 되었습니다");
        setIsLoggedIn(false);
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    return (
      <div id="header">
        <div className="header_container">
          <p className="Logo">Stair</p>
          <div className="link_container">
            <Link to="/">
              <p>Main </p>
            </Link>
            <Link to="/profile">
              <p>info </p>
            </Link>
            <Link to="/searchWindow">
              <p>검색</p>
            </Link>
  
            {isLoggedIn ? (
              <>
                <Link to="/myPage">
                  <p>My Page</p>
                </Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <Link to="/Login">
                <p>Login</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    );
}

export default Header;
