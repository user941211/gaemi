import React from "react";
import logo from './img/YUlogo.png';
import './css/App.css';
import { Link } from 'react-router-dom';
/*
    로고는 직접만들라고 했으나 창의력의 한계로 인해 어차피 영남대학교 졸업작품이니 영대로고를 png로 다운로드 받아서 배경만 지워서 사용했습니당
    Header에 있는 'YUlogo' 혹은 'Omega Route'를 클릭시에는 firstpage로 이동이 된다.
*/

function Header(){
    return(
      <div className="header">
            <div className="container">
                <div className="logo">
                <Link to={`/Main`}><img src={logo} alt="logo"></img></Link>
                    <p>Omega Route</p>
                </div>
            </div>
        </div>
    );
}

export default Header;