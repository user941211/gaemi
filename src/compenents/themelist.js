import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/css/App.css";

const ThemeList = () => {
  return (
    <div>
      <ListGroup.Item>
        <div id="ThemeListMain">
          <div className="ThemeName">철</div>
          <div className="ThemeRate">+34%</div>
          <div className="ThemeProgress">
            <ProgressBar>
              <ProgressBar striped variant="success" now={35} key={1} />
              <ProgressBar variant="warning" now={20} key={2} />
            </ProgressBar>
          </div>
        </div>
      </ListGroup.Item>
    </div>
  );
};

export default ThemeList;
