import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../pages/css/App.css";
import { Link } from "react-router-dom";

function CategoryFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState({
    marketCap: false,
    stockPrice: false,
    tradingVolume: false,
    transactionVolume: false,
    per: false,
    pbr: false,
    psr: false,
    pcr: false,
    eps: false,
    bps: false,
    sps: false,
    cps: false,
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };

  return (
    <div>
      <Button variant="outline-primary" onClick={openModal}>필터생성</Button>{' '}

      <Modal
        show={isModalOpen}
        onHide={closeModal}
        dialogClassName="modal-dialog-custom"
        contentClassName="modal-content-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>기본적 지표</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>가격/수급 </p>
          <Form className="checkbox-form">
            <div className="checkbox-row">
              <Form.Check
                type="checkbox"
                id="marketCap"
                label="시가총액"
                name="marketCap"
                checked={checkboxValues.marketCap}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="stockPrice"
                label="주가"
                name="stockPrice"
                checked={checkboxValues.stockPrice}
                onChange={handleCheckboxChange}
              />
            </div>
            <div className="checkbox-row">
              <Form.Check
                type="checkbox"
                id="tradingVolume"
                label="거래량"
                name="tradingVolume"
                checked={checkboxValues.tradingVolume}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="transactionVolume"
                label="거래대금"
                name="transactionVolume"
                checked={checkboxValues.transactionVolume}
                onChange={handleCheckboxChange}
              />
            </div>

            <div className="checkbox-row">
              <Form.Check
                type="checkbox"
                id="foreignOwnership"
                label="외국인지분"
                name="foreignOwnership"
                checked={checkboxValues.foreignOwnership}
                onChange={handleCheckboxChange}
              />
            </div>
            <hr />
            <div> 가치 </div>
            <div className="checkbox-row">
              <Form.Check
                type="checkbox"
                id="per"
                label="PER (최근 4분기)"
                name="per"
                checked={checkboxValues.per}
                onChange={handleCheckboxChange}
              />
              <Form.Check
                type="checkbox"
                id="pbr"
                label="PBR"
                name="pbr"
                checked={checkboxValues.pbr}
                onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="psr"
                  label="PSR (최근 4분기)"
                  name="psr"
                  checked={checkboxValues.psr}
                  onChange={handleCheckboxChange}
                />
              </div>
  
              <div className="checkbox-row">
                <Form.Check
                  type="checkbox"
                  id="pcr"
                  label="PCR (최근 4분기)"
                  name="pcr"
                  checked={checkboxValues.pcr}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="eps"
                  label="EPS (최근 연도)"
                  name="eps"
                  checked={checkboxValues.eps}
                  onChange={handleCheckboxChange}
                />
              </div>
  
              <div className="checkbox-row">
                <Form.Check
                  type="checkbox"
                  id="bps"
                  label="BPS (최근 연도)"
                  name="bps"
                  checked={checkboxValues.bps}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="sps"
                  label="SPS (최근 연도)"
                  name="sps"
                  checked={checkboxValues.sps}
                  onChange={handleCheckboxChange}
                />
              </div>
    
              <div className="checkbox-row">
                <Form.Check
                  type="checkbox"
                  id="cps"
                  label="CPS (최근 연도)"
                  name="cps"
                  checked={checkboxValues.cps}
                  onChange={handleCheckboxChange}
                />
              </div>
            </Form>

            <hr />
            <div> 성장성
            <Form.Check
                  type="checkbox"
                  id="revenueGrowth"
                  label="매출액 증가율"
                  name="revenueGrowth"
                  checked={checkboxValues.revenueGrowth}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="operatingIncomeGrowth"
                  label="영업이익 증가율"
                  name="operatingIncomeGrowth"
                  checked={checkboxValues.operatingIncomeGrowth}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="netIncomeGrowth"
                  label="순이익 증가율"
                  name="netIncomeGrowth"
                  checked={checkboxValues.netIncomeGrowth}
                  onChange={handleCheckboxChange}
                />
                <Form.Check
                  type="checkbox"
                  id="totalAssetsGrowth"
                  label="총자산 증가율"
                  name="totalAssetsGrowth"
                  checked={checkboxValues.totalAssetsGrowth}
                  onChange={handleCheckboxChange}
                />



               </div>

            <hr />
            <p>시가총액, 주가, 거래대금, 거래량 등 체크박스 추가하기</p>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>닫기</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  export default CategoryFilter;
  
