import React from "react";
import {Link} from 'react-router-dom';
import Firstpage from "./Firstpage";
function Main() {
    return(
        <div className="Main" style={{display: 'flex'}}>
            <div className="Left"><p>그래프출력됩니다</p></div>
            <div className="Right">
                <div className="first">첫번째</div>
                <div className="second">두번째</div>
            </div>
        </div>
    );
}

export default Main;