import React from "react";
import "../pages/css/Profile.css";
import Header from "../pages/Header.js";
import profileMMK from "../pages/img/profile_mmk.jpg";

function Profile() {
  return (
    <div>
      <Header link="/profile"/>
      <div id="profile_container">
        <div className="profile">
          <img src={profileMMK} alt="profile"></img>
          <p>민만기</p>
        </div>
      </div>
    </div>
  )
}

export default Profile;
