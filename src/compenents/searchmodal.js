import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../pages/css/App.css';
import axios from 'axios';
function SearchModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //위는 ㅁㅁㄱ 작성
  const [inputValue, setInputValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  
  const handleSearch = async (e) => {
    e.preventDefault();

    setInputValue(e.value);
    try {
      const response = await axios.post('http://localhost:3001/search', {term : inputValue});
      const data = response.data;
      setSearchResult(data); //검색 결과 부모한테 ㄱㄱ
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch(e); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  return (
    <form onSubmit={handleSearch} onKeyDown={handleOnKeyPress}>
      <div id="SearchMrodal">
          <Button variant="primary" className="searchButton" onClick={handleShow}>
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
              <Button className="firstButton" onClick={handleSearch} type='submit'>
                찾기
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
    </form>
    
  );
}

export default SearchModal;
