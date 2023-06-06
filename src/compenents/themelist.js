import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/css/App.css";

const ThemeList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <ListGroup.Item action variant="light" onClick={handleShow}>
        <div id="ThemeListMain">
          <div className="ThemeName">철</div>
          <div className="ThemeRate">+34%</div>
          <div className="ThemeProgress">
            <ProgressBar>
              <ProgressBar striped variant="danger" now={35} key={1} />
              <ProgressBar variant="info" now={20} key={2} />
            </ProgressBar>
          </div>
        </div>
      </ListGroup.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>우량주 목록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>우량주이름1</div>
          <div>우량주이름2</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThemeList;
