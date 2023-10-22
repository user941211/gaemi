import React from "react";
import "../pages/css/Profile.css";
import Header from "../pages/Header.js";
import ProfileContent from "../compenents/profileContent";

function Profile() {
  return (
    <div id="container">
      <Header link="/profile" />
      <div id="profile_container">
        <ProfileContent name="김종헌" part="직책1" content="내용1" 순서="4" />
        <ProfileContent name="민만기" part="직책2" content="내용2" 순서="0"/>
        <ProfileContent name="변재성" part="직책3" content="내용3" 순서="1"/>
        <ProfileContent name="서청우" part="직책4" content="내용4" 순서="2"/>
        <ProfileContent name="손지훈" part="직책5" content="내용5" 순서="3"/>
      </div>
    </div>
  );
}

export default Profile;
