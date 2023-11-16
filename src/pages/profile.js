import React from "react";
import "../pages/css/Profile.css";
import Header from "../pages/Header.js";
import ProfileContent from "../compenents/profileContent";

function Profile() {
  return (
    <div id="container">
      <Header link="/profile" />
      <div id="profile_container">
        <ProfileContent name="김종헌" content="데이터전처리" 순서="4" />
        <ProfileContent
          name="민만기"
          content="어플리케이션의 테마 설계 및 css"
          순서="0"
        />
        <ProfileContent
          name="변재성"
          content="차트구현,서버구성,데이터 딥러닝"
          순서="1"
        />
        <ProfileContent name="서청우" content="필터기능 구현" 순서="2" />
        <ProfileContent
          name="손지훈"
          content="데이터수집 및 DB설계,S-RIM 알고리즘을 통한 적정주가 제공,재무정보 구현"
          순서="3"
        />
      </div>
    </div>
  );
}

export default Profile;
