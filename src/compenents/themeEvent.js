import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../pages/css/App.css";

const ThemeEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]);

  const categories = [
    '금융',
    '보험',
    '영화',
    '출판',
    '광고',
    '반도체',
    '컴퓨터 프로그래밍',
    '소프트웨어',
    '식품',
    '의료',
    '의약품 제조업',
    '의복',
    '일차전지',
    '자동차',
    '가구',
    '건설',
    '건축',
    '토목',
  ];

  useEffect(() => {
    if (selectedCategory) {
      // 서버에서 데이터를 가져오는 요청을 보내는 부분
      axios.get(`http://localhost:3001/api/companies?category=${selectedCategory}`)
        .then(response => {
          setSelectedCompanies(response.data);
          setShowModal(true);
        })
        .catch(error => {
          console.error('Error fetching company data:', error);
        });
    }
  }, [selectedCategory]);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
    setSelectedCompanies([]);
  };

  return (
    <div>
      <h2>업종 카테고리</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => setSelectedCategory(category)}>
            {category}
          </li>
        ))}
      </ul>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCategory}산업에 속한 회사들</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {selectedCompanies.map((company, index) => (
              <li key={index}>{company.종목명}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ThemeEvent;
