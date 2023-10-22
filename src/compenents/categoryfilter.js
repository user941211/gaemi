import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "../pages/css/App.css";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import axios from "axios";
import { color } from "@mui/system";

function CategoryFilter() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isVisible, setIsVisible] = useState({
    marketCap: false,
    stockPrice: false,
    tradingVolume: false,
    transactionVolume: false,
    ForeignerShareRatio: false,

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
    currentDebtRatio: false,
  });
  const [checkboxValues, setCheckboxValues] = useState({
    //초기 체크박스의 값을 false로 설정 setCheckboxValues를 통해 업데이트가능
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
    currentDebtRatio: false,
  });

  const toggleVisibility = (event,title) => {
    event.preventDefault();  // 기본 동작 방지 (폼이 닫히지 않도록)
    
    const updatedVisibility = { ...isVisible };
    // 클릭한 속성 반전
    for (const key in updatedVisibility) {
      if (Object.prototype.hasOwnProperty.call(updatedVisibility, key)) {
        updatedVisibility[key] = false;
      }
    }
    updatedVisibility[title] = !updatedVisibility[title];
  
    setIsVisible(updatedVisibility);
};

  
  

  const [selectedItems, setSelectedItems] = useState([]); //리스트 그룹 상태 정의

  const openModal = () => {
    //모달 오픈함수
    setIsModalOpen(true);
  };

  const closeModal = () => {
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
    closeModal(); // 추가: 확인 버튼을 누르면 모달을 닫도록 함
  };

  const [filterValues, setFilterValues] = useState({
    marketCap: { minValue: "", maxValue: "" },
    stockPrice: { minValue: "", maxValue: "" },
    tradingVolume: { minValue: "", maxValue: "" },
    transactionVolume: { minValue: "", maxValue: "" },
    per: { minValue: "", maxValue: "" },
    pbr: { minValue: "", maxValue: "" },
    psr: { minValue: "", maxValue: "" },
    pcr: { minValue: "", maxValue: "" },
    eps: { minValue: "", maxValue: "" },
    bps: { minValue: "", maxValue: "" },
    sps: { minValue: "", maxValue: "" },
    cps: { minValue: "", maxValue: "" },
    revenueGrowth: { minValue: "", maxValue: "" },
    operatingIncomeGrowth: { minValue: "", maxValue: "" },
    netIncomeGrowth: { minValue: "", maxValue: "" },
    totalAssetsGrowth: { minValue: "", maxValue: "" },
    roe: { minValue: "", maxValue: "" },
    roa: { minValue: "", maxValue: "" },
    grossProfitMargin: { minValue: "", maxValue: "" },
    operatingProfitMargin: { minValue: "", maxValue: "" },
    netProfitMargin: { minValue: "", maxValue: "" },
    debtRatio: { minValue: "", maxValue: "" },
    currentRatio: { minValue: "", maxValue: "" },
    currentDebtRatio: { minValue: "", maxValue: "" },
  });

  const handleFilterValueChange = (event, key) => {
    const { name, value } = event.target;
    setFilterValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...prevValues[key],
        [name]: value,
      },
    }));
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get("/search", {
        params: filterValues,
      });
      // 결과 처리 로직
    } catch (error) {
      console.error(error);
    }
  };

  const getLabelByKey = (key) => {
    switch (key) {
      case "marketCap":
        return (
          <>
            <span>시가총액 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                name="minValue"
                placeholder="최소값 입력"
                value={filterValues.marketCap.minValue}
                onChange={(event) =>
                  handleFilterValueChange(event, "marketCap")
                }
              />
              <input
                type="text"
                name="maxValue"
                placeholder="최대값 입력"
                value={filterValues.marketCap.maxValue}
                onChange={(event) =>
                  handleFilterValueChange(event, "marketCap")
                }
              />
            </div>
          </>
        );
      case "stockPrice":
        return (
          <>
            <span>주가 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "tradingVolume":
        return (
          <>
            <span>거래량 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "transactionVolume":
        return (
          <>
            <span>거래대금 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "per":
        return (
          <>
            <span>PER 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "pbr":
        return (
          <>
            <span>PBR 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "psr":
        return (
          <>
            <span>PSR 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "pcr":
        return (
          <>
            <span>PCR 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "eps":
        return (
          <>
            <span>EPS 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "bps":
        return (
          <>
            <span>BPS 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "sps":
        return (
          <>
            <span>SPS 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "cps":
        return (
          <>
            <span>CPS 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "revenueGrowth":
        return (
          <>
            <span>매출액 증가율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "operatingIncomeGrowth":
        return (
          <>
            <span>영업이익 증가율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "netIncomeGrowth":
        return (
          <>
            <span>순이익 증가율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "totalAssetsGrowth":
        return (
          <>
            <span>총자산 증가율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "roe":
        return (
          <>
            <span>ROE 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "roa":
        return (
          <>
            <span>ROA 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "grossProfitMargin":
        return (
          <>
            <span>매출총이익률 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "operatingProfitMargin":
        return (
          <>
            <span>영업이익률 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "netProfitMargin":
        return (
          <>
            <span>순이익률 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "debtRatio":
        return (
          <>
            <span>부채비율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "currentRatio":
        return (
          <>
            <span>유동비율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      case "currentDebtRatio":
        return (
          <>
            <span>유동부채비율 범위</span>
            <div className="input-wrapper">
              <input type="text" placeholder="최소값 입력" />
              <input type="text" placeholder="최대값 입력" />
            </div>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div>
      <Button
        variant="outline-light"
        onClick={openModal}
        style={{ marginRight: "3%" }}
      >
        필터생성
      </Button>{" "}
      <Button variant="outline-light" onClick={removefilter}>
        필터제거
      </Button>{" "}
      <ListGroup>
        {selectedItems.map((item, index) => (
          <ListGroup.Item key={index}>{item}</ListGroup.Item>
        ))}
      </ListGroup>
      <Button
        variant="light"
        onClick={handleFetchData}
        style={{ marginTop: "3%",marginBottom:"3%"}}
      >
        확인
      </Button>{" "}
      <Modal
        size="lg"
        show={isModalOpen}
        onHide={closeModal}
        dialogClassName="modal-dialog-custom"
        contentClassName="modal-content-custom"
      >
        <Modal.Header closeButton>
          <Modal.Title>기본적 지표</Modal.Title>
        </Modal.Header>
        <div className="">
          <Modal.Body className="modal-body-custom">
            <div
              className="Align-right"
                            >
            
            <p style={{ display: isVisible.marketCap ? 'block' : 'none' }}>
          <h6>시가총액(Market Capitalization)</h6>
          <div class="custom-hr"></div>

          <h5>Key point</h5>
          <ul>
            <li>
              주가와 발행주식수를 곱한 것으로 상장기업의 규모와 가치를
              평가하는 지표이며 전체 주식의 가치를 시장가격(현재 주가)으로
              평가한 금액이다
            </li>
            <li>
              주가가 비슷하더라도 발행주식 수가 많으면 시가 총액이 더
              크다.
            </li>
            <li>
              시가총액의 변화와 시가총액 순위 변화를 통해 성장하는 산업과
              시장의 기대치가 높은 산업의 선호도를 파악할 수 있다.
            </li>
          </ul>
          <div class="custom-hr"></div>
          <h6>계산식</h6>
          <span>시가총액 = 주가 X 발행주식수</span>
        </p>

        <p style={{ display: isVisible.stockPrice ? 'block' : 'none' }}>
          <h6>주가(Stock Price)</h6>
          <div class="custom-hr"></div>
          <h5>Key point</h5>
          <ul>
            <li>
            주식 거래 장 중에는 전일 종가, 장 마감 이후에는 해당 일의 종가가 주가를 의미한다.
            </li>
            <li>
              주가가 비슷하더라도 발행주식 수가 많으면 시가 총액이 더
              크다.
            </li>
            <li>
            근본적으로 주식은 회사의 주주가 가지는 권리이므로 이 권리의 가치에 따라 값도 변화한다.
            </li>
          </ul>
        </p>

        <p style={{ display: isVisible.tradingVolume ? 'block' : 'none' }}>
          <h6>거래량(Volume)</h6>
          <div class="custom-hr"></div>
          <h5>Key point</h5>
          <ul>
            <li>
            주식시장에서 일정 기간동안 주식의 매수/매도 거래가 성립되어 이뤄진 주식이 거래된 양을 의미한다.
            </li>
            <li>
            주가지수와 함께 시장의 장세를 판단하는 중요한 가격 지표이다.
            </li>
            <li>
            주가가 낮을수록 거래량은 높게 나타나는 단점이 있어 거래대금과 함께 분석해보는 것이 좋다.
            </li>
          </ul>
        </p>

        <p style={{ display: isVisible.transactionVolume ? 'block' : 'none' }}>
          <h6>거래대금(Trading Value)</h6>
          <div class="custom-hr"></div>
          <h5>Key point</h5>
          <ul>
            <li>
            주식거래 장 중 체결 거래량과 종목의 체결 가격을 곱한 값으로 해당 종목이 일정시간동안 거래된 총 거래금액을 의미한다.
            </li>
            <li>
            주가가 낮을수록 높게 나타나는 거래량의 단점을 보완하여 시장에서 거래된 절대적인 금액을 나타내는 지표이다.
            </li>
            <li>
            거래대금의 증가와 감소는 투자시장 전반적인 흐름과 상태 혹은 상황을 추정하고 분석하는데 활용될 수 있다.
            </li>
          </ul>
          <div class="custom-hr"></div>
          <h6>계산식</h6>
          <span>거래대금 = 거래량 X 체결가격</span>
        </p>

        <p style={{ display: isVisible.ForeignerShareRatio ? 'block' : 'none' }}>
          <h6>외국인지분(Foreigner Share Ratio)</h6>
          <div class="custom-hr"></div>
          <h5>Key point</h5>
          <ul>
            <li>
            해당 종목의 전체 유통주식 중 외국인들이 실제 보유하고 있는 주식 비중을 나타낸다.
            </li>
            <li>
            외국인 지분 보유율이 높을수록 외국인이 많은 관심을 가지고 투자를 하고 있다는 의미이다.
            </li>
            <li>
            통계적으로 외국인보유비율이 높은 기업은 전체 매출액에서 수출이 차지하는 비중이 높은 경향이 있다.
            </li>
          </ul>
        </p>

            </div>

            <div className="checkbox-row">가격/수급 </div>
            <Form className="checkbox-form">
              <div className="checkbox-row">
                <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="marketCap"
                  name="marketCap"
                  checked={checkboxValues.marketCap}
                  onChange={handleCheckboxChange}
                  
                />
                  <button className="buttonmargin" onClick={(event) => toggleVisibility(event,'marketCap')}>시가총액</button>
                </div>
                <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="stockPrice"
                  name="stockPrice"
                  checked={checkboxValues.stockPrice}
                  onChange={handleCheckboxChange}
                />
                <button className="buttonmargin" onClick={(event) => toggleVisibility(event, 'stockPrice')}>주가</button>
                </div>
              </div>
              <div className="checkbox-row">
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="tradingVolume"
                  name="tradingVolume"
                  checked={checkboxValues.tradingVolume}
                  onChange={handleCheckboxChange}
                />
                <button className="buttonmargin" onClick={(event) => toggleVisibility(event, 'tradingVolume')}>거래량</button>
                </div>
                <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="transactionVolume"
                  name="transactionVolume"
                  checked={checkboxValues.transactionVolume}
                  onChange={handleCheckboxChange}
                />
                <button className="buttonmargin" onClick={(event) => toggleVisibility(event, 'transactionVolume')}>거래대금</button>
              </div>
              </div>
              <div className="checkbox-row">
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="foreignOwnership"
                  name="foreignOwnership"
                  checked={checkboxValues.foreignOwnership}
                  onChange={handleCheckboxChange}
                />
                <button className="buttonmargin" onClick={(event) => toggleVisibility(event, 'ForeignerShareRatio')}>외국인지분</button>
              </div>
              </div>

              <div></div>
              <hr />
              <div className="checkbox-row"> 가치 </div>
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
            <div className="checkbox-row">
              {" "}
              성장성
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
            <div className="checkbox-row">
              수익성
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
            </div>
            <hr />

            <div className="checkbox-row">
              안정성
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
            </div>
          </Modal.Body>
        </div>
        

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            확인
          </Button>{" "}
          {/* 추가: 확인 버튼 */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryFilter;
