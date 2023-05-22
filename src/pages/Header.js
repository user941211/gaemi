import React from "react";
import logo from './img/YUlogo.png';
import Firstpage from "./firstpage";
import {Link, BrowserRouter} from 'react-router-dom';
import './css/App.css';


function Header(){
    return(
    <BrowserRouter>
      <div className="header">
            <div className="container">
            <Link to ="/Main">
                <div className="logo">
                    <img src={logo} alt="logo"></img>
                    <p>Omega Route</p>
                </div>
            </Link>
            </div>
        </div>
    </BrowserRouter>
    );
}

export default Header;