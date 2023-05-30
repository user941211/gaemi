import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../pages/css/App.css';

function SearchModal() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div id='SearchModal'>
     <Button variant="primary" className="searchButton" onClick={handleShow}>
        Search
    </Button>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>검색어를 입력해주세요</Modal.Title>
    </Modal.Header>
    <Modal.Body id='ModalBody'>
        <input type="search" className="searchSpace" placeholder="검색"/>
    </Modal.Body>
    <Modal.Footer id='ModalFooter'>
        <Button className='firstButton' onClick={handleClose}>
            Search
        </Button>
        <Button variant="outline-secondary" className='secondButton' onClick={handleClose}>
            Close
        </Button>
    </Modal.Footer>
  </Modal>
  </div>
  );
}

export default SearchModal;