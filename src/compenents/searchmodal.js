import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../pages/css/App.css';
import axios from 'axios';

function SearchModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/search', { name: inputValue });
      const data = response.data;
      setSearchResult(data);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} onKeyDown={handleOnKeyPress}>
      <div id="SearchMrodal">
        <Button variant="outline-primary" className="searchButton" onClick={handleShow}>
          찾기
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>검색어를 입력해주세요</Modal.Title>
          </Modal.Header>
          <Modal.Body id="ModalBody">
            <input
              type="search"
              className="searchSpace"
              placeholder="여섯자리 숫자코드 혹은 이름으로 입력하세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleOnKeyPress}
            />
          </Modal.Body>
          <Modal.Footer id="ModalFooter">
            <Button className="firstButton" type="submit">
              찾기
            </Button>
            <Button variant="outline-secondary" className="secondButton" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </form>
  );
}

export default SearchModal;


