import React from "react";
import "../pages/css/ProfileContent.css";

function ProfileContent({ name, part, content, 순서 }) {
  const 사진 = [
    //mmk, bjs, scw, sjh, kjh
    require("../pages/img/profile_mmk.jpg"),
    require("../pages/img/profile_bjs.jpg"),
    require("../pages/img/profile_scw.jpg"),
    require("../pages/img/profile_sjh.jpg"),
    require("../pages/img/profile_kjh.jpg"),
  ];
  return (
    <div>
      <div id="profile_content_container">
        <div className="profile">
          <img src={사진[순서]} alt="profile"></img>
          <div className="profileText">
            <h2>{name}</h2>
            <h4>{part}</h4>
            <p>{content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
