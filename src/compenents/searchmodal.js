import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../pages/css/App.css';
import axios from 'axios';
function SearchModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputValue, setInputValue] = useState(null);

  const handleSearch = (e) => {
    setInputValue(e.value);

    fetchinputValue();
  };
  const fetchinputValue = async () => {
    try {
      const response = await axios('http://localhost:3001/search', {
        name : inputValue
      });
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div id="SearchModal">
      <Button variant="primary" className="searchButton" onClick={handleShow}>
        Search
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>검색어를 입력해주세요</Modal.Title>
        </Modal.Header>
        <Modal.Body id="ModalBody">
          <input
            type="search"
            className="searchSpace"
            placeholder="search"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer id="ModalFooter">
          <Button className="firstButton" onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant="outline-secondary"
            className="secondButton"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SearchModal;
