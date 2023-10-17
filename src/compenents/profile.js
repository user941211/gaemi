import React from "react";
import "../pages/css/Profile.css";
import profileMMK from "../pages/img/profile_mmk.jpg";

function Profile() {
  return (
    <div id="profile_container">
      <div className="profile">
        <img src={profileMMK} alt="profile"></img>
        <p>민만기</p>
      </div>
    </div>
  );
}

export default Profile;
