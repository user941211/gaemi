import React from "react";
import "../pages/css/ProfileContent.css";
import profileMMK from "../pages/img/profile_mmk.jpg";
import profileBJS from "../pages/img/profile_bjs.jpg";
import profileSCW from "../pages/img/profile_scw.jpg";
import profileSJH from "../pages/img/profile_sjh.jpg";
import profileKJH from "../pages/img/profile_kjh.jpg";

function ProfileContent({ name, part, content }) {
  return (
    <div>
      <div id="profile_content_container">
        <div className="profile">
          <img src={profileMMK} alt="profile"></img>
        </div>
        <div className="profileText">
          <h2>{name}</h2>
          <h4>{part}</h4>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileContent;
