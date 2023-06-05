import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "../pages/css/App.css";
import ListGroup from 'react-bootstrap/ListGroup';
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

    revenueGrowth: false,
    operatingIncomeGrowth: false,
    netIncomeGrowth: false,
    totalAssetsGrowth: false,

    roe: false,
    roa: false,
    grossProfitMargin: false,
    operatingProfitMargin: false,
    netProfitMargin: false,

    debtRatio: false,
    currentRatio: false,
    currentDebtRatio: false

  });
  const [selectedItems, setSelectedItems] = useState([
  ]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeModal2 = () => {
    setIsModalOpen(false);
  };

  const removefilter = () => {
    setSelectedItems([]); // 리스트그룹 초기화
  };
  


  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  };


 
  
  const handleConfirm = () => {
    const selected = Object.entries(checkboxValues)
      .filter(([key, value]) => value === true)
      .map(([key, value]) => {
        const label = getLabelByKey(key); // 키(key)에 해당하는 레이블 정보를 가져옴
        return label;
      });
    setSelectedItems(selected);
    closeModal2(); // 추가: 확인 버튼을 누르면 모달을 닫도록 함
  };

  const getLabelByKey = (key) => {
    switch (key) {
      case 'marketCap':
        return '시가총액';
      case 'stockPrice':
        return '주가';
      case 'tradingVolume':
        return '거래량';
      case 'transactionVolume':
        return '거래대금';
      case 'per':
        return 'PER (최근 4분기)';
      case 'pbr':
        return 'PBR';
      case 'psr':
        return 'PSR (최근 4분기)';
      case 'pcr':
        return 'PCR (최근 4분기)';
      case 'eps':
        return 'EPS (최근 연도)';
      case 'bps':
        return 'BPS (최근 연도)';
      case 'sps':
        return 'SPS (최근 연도)';
      case 'cps':
        return 'CPS (최근 연도)';
      case 'revenueGrowth':
        return '매출액 증가율';
      case 'operatingIncomeGrowth':
        return '영업이익 증가율';
      case 'netIncomeGrowth':
        return '순이익 증가율';
      case 'totalAssetsGrowth':
        return '총자산 증가율';
      case 'roe':
        return 'ROE (최근 4분기)';
      case 'roa':
        return 'ROA (최근 4분기)';
      case 'grossProfitMargin':
        return '매출총이익률 (최근 연도)';
      case 'operatingProfitMargin':
        return '영업이익률 (최근 연도)';
      case 'netProfitMargin':
        return '순이익률 (최근 연도)';
      case 'debtRatio':
        return '부채비율 (최근 연도)';
      case 'currentRatio':
        return '유동비율 (최근 연도)';
      case 'currentDebtRatio':
        return '유동부채비율 (최근 연도)';
      default:
        return '';
    }
  };
  
 
  

  return (
    <div>
      <Button variant="outline-primary" onClick={openModal}>필터생성</Button>{' '}
      <Button variant="outline-primary" onClick={removefilter}>필터제거</Button>{' '}
      <ListGroup>
        {selectedItems.map((item, index) => (
          <ListGroup.Item key={index}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      

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
          <div>수익성</div>
          <Form.Check
            type="checkbox"
            id="roe"
            label="ROE (최근 4분기)"
            name="roe"
            checked={checkboxValues.roe}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            id="roa"
            label="ROA (최근 4분기)"
            name="roa"
            checked={checkboxValues.roa}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            id="grossProfitMargin"
            label="매출총이익률 (최근 연도)"
            name="grossProfitMargin"
            checked={checkboxValues.grossProfitMargin}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            id="operatingProfitMargin"
            label="영업이익률 (최근 연도)"
            name="operatingProfitMargin"
            checked={checkboxValues.operatingProfitMargin}
            onChange={handleCheckboxChange}
            />
            <Form.Check
            type="checkbox"
            id="netProfitMargin"
            label="순이익률 (최근 연도)"
            name="netProfitMargin"
            checked={checkboxValues.netProfitMargin}
            onChange={handleCheckboxChange}
            />
             <hr />

            <div>안정성</div>
            <Form.Check
            type="checkbox"
            id="debtRatio"
            label="부채비율 (최근 연도)"
            name="debtRatio"
            checked={checkboxValues.debtRatio}
            onChange={handleCheckboxChange}
            />
            <Form.Check
            type="checkbox"
            id="currentRatio"
            label="유동비율 (최근 연도)"
            name="currentRatio"
            checked={checkboxValues.currentRatio}
            onChange={handleCheckboxChange}
            />
            <Form.Check
            type="checkbox"
            id="currentDebtRatio"
            label="유동부채비율 (최근 연도)"
            name="currentDebtRatio"
            checked={checkboxValues.currentDebtRatio}
            onChange={handleCheckboxChange}
            />

           
           
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>닫기</Button>
            <Button variant="primary" onClick={handleConfirm}>확인</Button>{' '} {/* 추가: 확인 버튼 */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  export default CategoryFilter;
  
