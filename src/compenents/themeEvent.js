import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "../pages/css/App.css";

const ThemeEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [isDivVisible, setIsDivVisible] = useState(false);

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

  const handleCategoryClick = (category) => {
    setIsDivVisible(prevState => !prevState); // 현재 값의 반대로 업데이트
  };
  

  return (
    <div className='theme-event-container'>
       <h2 onClick={() => handleCategoryClick()}>업종 카테고리</h2>
      <div style={{ display: isDivVisible ? 'block' : 'none' }}>
      <ul className='theme-event-fontsize'>
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
    <table className="table theme-event-table">
      <thead>
        <tr>
          <th>종목명</th>
          <th>종가</th>
        </tr>
      </thead>
      <tbody>
        {selectedCompanies.map((company, index) => (
          <tr key={index}>
            <td>{company.종목명}</td>
            <td>{company.종가}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </div>
  );
};

export default ThemeEvent;
