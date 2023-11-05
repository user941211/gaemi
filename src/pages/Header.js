import React, { useEffect, useState } from "react";
import SearchModal from "../compenents/searchmodal";
import { Link, useLocation } from "react-router-dom";
import Searchbtn from "../compenents/searchbtn";
import "./css/Header.css";

/*
    로고는 직접만들라고 했으나 창의력의 한계로 인해 어차피 영남대학교 졸업작품이니 영대로고를 png로 다운로드 받아서 배경만 지워서 사용했습니당
    Header에 있는 'YUlogo' 혹은 'Omega Route'를 클릭시에는 firstpage로 이동이 된다.
*/

function Header(props) {
  const [visible, setVisible] = useState(props.disabledQ);
  const location = useLocation();
  let content;

  if (location.pathname === '/main') {
    // 페이지 주소가 '/main' 일 때 <abc/> 컴포넌트를 렌더링
    content = (
      <Link to="/searchWindow">
        <p>검색</p>
      </Link>
    );
  } else {
    // 다른 경우에는 'start' 링크를 표시
    content = (
      <Link to="/searchWindow">
        <p>start</p>
      </Link>
    );
  }
  return (
    <div id="header">
      <div className="header_container">
        {/* <div className="logo"> */}
        <p className="Logo">Stair</p>
        {/* <Link to={props.link}> */}
        <div className="link_container">
          <Link to="/">
            <p>Main </p>
          </Link>
          <Link to="/profile">
            <p>info </p>
          </Link>
          {content}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
