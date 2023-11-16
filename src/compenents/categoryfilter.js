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
  const [response, setResultData] = useState({ data: [] });

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const open_resultModal = () => {
    // 모달 관련 작업이 필요하면 추가
    setShowModal(true);
  };
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

  const toggleVisibility = (event, title) => {
    event.preventDefault(); // 기본 동작 방지 (폼이 닫히지 않도록)

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

  const handleFetchData = async () => {
    try {
      console.log(filterValues);
      const response = await axios.post(
        "http://localhost:3001/filterData",
        filterValues
      );
      console.log("Data saved successfully:", response.data);
      console.log("response는 뭐지?", response);
      setResultData(response);
    } catch (error) {
      console.error("Error saving data:", error);
    }

    open_resultModal();
  };

  const getLabelByKey = (key) => {
    const handleInputChange = (category, valueName, event) => {
      const newValue = event.target.value;
      setFilterValues((prevFilterValues) => ({
        ...prevFilterValues,
        [category]: {
          ...prevFilterValues[category],
          [valueName]: newValue,
        },
      }));
    };

    switch (key) {
      case "marketCap":
        return (
          <>
            <span>시가총액 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );

      case "stockPrice":
        return (
          <>
            <span>주가 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "tradingVolume":
        return (
          <>
            <span>거래량 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "transactionVolume":
        return (
          <>
            <span>거래대금 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "per":
        return (
          <>
            <span>PER 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "pbr":
        return (
          <>
            <span>PBR 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "psr":
        return (
          <>
            <span>PSR 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "pcr":
        return (
          <>
            <span>PCR 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "eps":
        return (
          <>
            <span>EPS 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "bps":
        return (
          <>
            <span>BPS 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "sps":
        return (
          <>
            <span>SPS 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "cps":
        return (
          <>
            <span>CPS 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "revenueGrowth":
        return (
          <>
            <span>매출액 증가율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "operatingIncomeGrowth":
        return (
          <>
            <span>영업이익 증가율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "netIncomeGrowth":
        return (
          <>
            <span>순이익 증가율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "totalAssetsGrowth":
        return (
          <>
            <span>총자산 증가율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "roe":
        return (
          <>
            <span>ROE 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "roa":
        return (
          <>
            <span>ROA 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "grossProfitMargin":
        return (
          <>
            <span>매출총이익률 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "operatingProfitMargin":
        return (
          <>
            <span>영업이익률 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "netProfitMargin":
        return (
          <>
            <span>순이익률 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "debtRatio":
        return (
          <div>
            <span>부채비율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </div>
        );
      case "currentRatio":
        return (
          <>
            <span>유동비율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      case "currentDebtRatio":
        return (
          <>
            <span>유동부채비율 범위</span>
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="최소값 입력"
                onChange={(event) => handleInputChange(key, "minValue", event)}
              />
              <input
                type="text"
                placeholder="최대값 입력"
                onChange={(event) => handleInputChange(key, "maxValue", event)}
              />
            </div>
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div id="filterContainer">
      <div className="buttonContainer">
        <Button variant="outline-light" onClick={openModal}>
          필터생성
        </Button>{" "}
        <Button variant="outline-light" onClick={removefilter}>
          필터제거
        </Button>{" "}
        <Button
          variant="outline-light"
          onClick={handleFetchData}
          style={{ marginTop: "3%", marginBottom: "3%" }}
        >
          결과보기
        </Button>{" "}
        {/* 결과 모달 */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>결과 모달 제목</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showModal &&
            response &&
            response.data &&
            response.data.length > 0 ? (
              <div>
                <h1>전체 데이터 출력</h1>
                <table>
                  <thead>
                    <tr>
                      <th>순번</th>
                      <th>종목명</th>
                      {filterValues.marketCap.minValue && <th>시가총액</th>}
                      {filterValues.tradingVolume.minValue && <th>거래량</th>}
                      {filterValues.bps.minValue && <th>BPS</th>}
                      {filterValues.per.minValue && <th>PER</th>}
                      {filterValues.pbr.minValue && <th>PBR</th>}
                      {filterValues.eps.minValue && <th>EPS</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {response.data.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.종목명}</td>
                        <td>
                          {filterValues.marketCap.minValue && item.시가총액}
                        </td>
                        <td>
                          {filterValues.tradingVolume.minValue && item.거래량}
                        </td>
                        <td>{filterValues.bps.minValue && item.BPS}</td>
                        <td>{filterValues.per.minValue && item.PER}</td>
                        <td>{filterValues.pbr.minValue && item.PBR}</td>
                        <td>{filterValues.eps.minValue && item.EPS}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>해당하는 주식이 없습니다</div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              닫기
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div className="filtergroup_container">
        <ListGroup>
          {selectedItems.map((item, index) => (
            <ListGroup.Item key={index}>{item}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
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
            <div className="Align-right">
              <p style={{ display: isVisible.marketCap ? "block" : "none" }}>
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

              <p style={{ display: isVisible.stockPrice ? "block" : "none" }}>
                <h6>주가(Stock Price)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    주식 거래 장 중에는 전일 종가, 장 마감 이후에는 해당 일의
                    종가가 주가를 의미한다.
                  </li>
                  <li>
                    주가가 비슷하더라도 발행주식 수가 많으면 시가 총액이 더
                    크다.
                  </li>
                  <li>
                    근본적으로 주식은 회사의 주주가 가지는 권리이므로 이 권리의
                    가치에 따라 값도 변화한다.
                  </li>
                </ul>
              </p>

              <p
                style={{ display: isVisible.tradingVolume ? "block" : "none" }}
              >
                <h6>거래량(Volume)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    주식시장에서 일정 기간동안 주식의 매수/매도 거래가 성립되어
                    이뤄진 주식이 거래된 양을 의미한다.
                  </li>
                  <li>
                    주가지수와 함께 시장의 장세를 판단하는 중요한 가격 지표이다.
                  </li>
                  <li>
                    주가가 낮을수록 거래량은 높게 나타나는 단점이 있어
                    거래대금과 함께 분석해보는 것이 좋다.
                  </li>
                </ul>
              </p>

              <p
                style={{
                  display: isVisible.transactionVolume ? "block" : "none",
                }}
              >
                <h6>거래대금(Trading Value)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    주식거래 장 중 체결 거래량과 종목의 체결 가격을 곱한 값으로
                    해당 종목이 일정시간동안 거래된 총 거래금액을 의미한다.
                  </li>
                  <li>
                    주가가 낮을수록 높게 나타나는 거래량의 단점을 보완하여
                    시장에서 거래된 절대적인 금액을 나타내는 지표이다.
                  </li>
                  <li>
                    거래대금의 증가와 감소는 투자시장 전반적인 흐름과 상태 혹은
                    상황을 추정하고 분석하는데 활용될 수 있다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>거래대금 = 거래량 X 체결가격</span>
              </p>

              <p
                style={{
                  display: isVisible.ForeignerShareRatio ? "block" : "none",
                }}
              >
                <h6>외국인지분(Foreigner Share Ratio)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    해당 종목의 전체 유통주식 중 외국인들이 실제 보유하고 있는
                    주식 비중을 나타낸다.
                  </li>
                  <li>
                    외국인 지분 보유율이 높을수록 외국인이 많은 관심을 가지고
                    투자를 하고 있다는 의미이다.
                  </li>
                  <li>
                    통계적으로 외국인보유비율이 높은 기업은 전체 매출액에서
                    수출이 차지하는 비중이 높은 경향이 있다.
                  </li>
                </ul>
              </p>

              <p
                style={{
                  display: isVisible.PER_vi ? "block" : "none",
                }}
              >
                <h6>PER(Price to Earning Ratio, 주가수익비율)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    기업이 1주당 벌어들이는 이익에 비해 주가가 몇배인지
                    나타낸다.
                  </li>
                  <li>
                    현재 주가가 비싼지, 저렴한지 상대적 가치를 평가하는 기준이
                    되기도 한다.
                  </li>
                  <li>
                    가치주의 경우 PER이 높으면 고평가, 낮으면 저평가 되었다고
                    해석한다.
                  </li>
                  <li>
                    현재보다는 미래 가치가 크다고 생각되는 성장주는 PER이
                    일반적으로 높게 나타난다.
                  </li>
                  <li>
                    동일 업계 혹은 비슷한 산업군끼리 비교하는 거나 단일 종목에
                    대해서 일정기간 동안의 방향성 분석을 하는 것이 좋다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>PBR = 주가 / 주당순이익(EPS)</span>
              </p>

              <p
                style={{
                  display: isVisible.PBR_vi ? "block" : "none",
                }}
              >
                <h6>PBR(Price to Book Ratio, 주가순자산비율)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>기업의 장부가치 대비 시장가를 측정한다.</li>
                  <li>
                    일반적으로 1을 기준으로 작으면 저평가, 높으면 고평가
                    되었다고 본다.
                  </li>
                  <li>동종 업계 혹은 비슷한 산업별로 비교하는 것이 좋다.</li>

                  <li>
                    과대평가 된 성장주는 낮은 ROE와 높은 PBR을 보이므로 ROE와
                    PBR의 불일치를 보이는 기업은 주의 할 필요가 있다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>PBR = 주가 / 주당순자산(BPS)</span>
              </p>

              <p
                style={{
                  display: isVisible.PSR_vi ? "block" : "none",
                }}
              >
                <h6>PSR(Price Selling Ratio, 주가매출액비율)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    기업의 성장성에 초점을 두고 상대적으로 저평가된 주식을
                    발굴하기 위한 지표이다.
                  </li>
                  <li>
                    주로 신생기업과 같이 순이익 평가가 힘든 기업의 가치분석을
                    위해 사용된다.
                  </li>
                  <li>
                    낮을수록 매출액 대비 주가가 낮다는 의미로 성장 잠재력에 비해
                    저평가 되었다고 해석할 수 있다.
                  </li>
                  <li>
                    절대적인 수치보다는 동일 산업군 평균과 비교하는 것이 좋다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>PSR = 시가총액 / 매출액</span>
                <div class="custom-hr"></div>
                <span>PSR = 주가 / 주당매출액(PSR)</span>
              </p>

              <p
                style={{
                  display: isVisible.PCR_vi ? "block" : "none",
                }}
              >
                <h6>PCR(Price Cash Flow Ratio, 주가현금흐름비율)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    자금조달능력이나 순수영업성과 대비 주가를 평가하는 지표이다.
                  </li>
                  <li>
                    낮을수록 현금흐름에 비해 주가가 저평가 되었다고 볼 수 있다.
                  </li>
                  <li>동일업종이나 비슷한 산업군 간 비교하는 것이 좋다.</li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>PSR = 시가총액 / 영업현금흐름</span>
                <div class="custom-hr"></div>
                <span>PCR = 주가 / 주당현금흐름(CPS)</span>
              </p>

              <p
                style={{
                  display: isVisible.EPS_vi ? "block" : "none",
                }}
              >
                <h6>EPS(Earnings Per Share, 주당순이익)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    1주당 얼마의 이익을 창출했는지에 대한 지표이다. 자본규모와
                    상관 없이 기업의 실질적인 수익성을 판단할 수 있다.
                  </li>
                  <li>
                    절대적인 수치보다는 꾸준히 상승하는지 파악하는 것이 좋다.
                    워렌버핏은 10년간 EPS가 성장하는 기업을 좋은 기업이라고
                    봤다.
                  </li>
                  <li>
                    EPS는 주가와의 괴리를 비교하지 않기 때문에 주가와 비교해서
                    보거나 PER의 보조 수단으로 보는 것이 좋다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>EPS = 당기순이익 / 총주식수</span>
              </p>

              <p
                style={{
                  display: isVisible.BPS_vi ? "block" : "none",
                }}
              >
                <h6>BPS(Book Value Per Share, 주당순자산가치)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    현재 시점에서 회사를 청산했을 때 주주들에게 한 주당 얼마씩
                    돌아가는지를 측정한 지표로 청산가치라고도 한다.
                  </li>
                  <li>
                    높을수록 기업 청산 후 주주에게 돌아가는 몫이 많다는 것을
                    의미한다.
                  </li>
                  <li>단독으로 보기 보다는 PBR과 함께 분석하는 것이 좋다.</li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>BPS = 순자산 / 발생주식수</span>
              </p>

              <p
                style={{
                  display: isVisible.SPS_vi ? "block" : "none",
                }}
              >
                <h6>SPS(Sales Per Share, 주당매출액)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    한 주당 얼마의 매출액을 벌어들이는가를 나타내는 주당
                    가치지표이다.
                  </li>
                  <li>
                    일반적으로 SPS가 높고 꾸준하게 증가할수록 투자 매력도가
                    올라간다.
                  </li>
                  <li>
                    기업의 수익성을 평가하기 위해 EPS와 함께 보는 것이 좋다.
                  </li>
                  <li>동종 업계 혹은 비슷한 산업군끼리 비교하는 것이 좋다.</li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>SPS = 매출액 / 발생주식수</span>
              </p>

              <p
                style={{
                  display: isVisible.CPS_vi ? "block" : "none",
                }}
              >
                <h6>CPS(Cash Flow Per Share, 주당현금흐름)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    주식 한 주당 기업이 영업활동을 통해 창출한 수익의 가치를
                    나타낸다.
                  </li>
                  <li>CPS가 높을수록 투자가치가 높다고 볼 수 있다.</li>
                  <li>
                    기업의 이익 창출 능력을 평가하기 위해 EPS와 함께 보는 것이
                    좋다.
                  </li>
                  <li>동종 업계 혹은 비슷한 산업군끼리 비교하는 것이 좋다.</li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>CPS = 영업활동 현금흐름 / 발생주식수</span>
              </p>

              <p
                style={{
                  display: isVisible.revenueGrowth_vi ? "block" : "none",
                }}
              >
                <h6>매출액증가율(Net Sales Growth Rate)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    전기 대비 매출액이 얼마나 증가했는지를 보여주는 지표이다.
                  </li>
                  <li>매출액증가율이 높을수록 성장성이 좋다고 볼 수 있다.</li>
                  <li>
                    바이오 등과 같은 성장산업에서는 당장에 가시화되는 이익규모가
                    미미하지만, 시장 성장과 함께 매출규모가 늘어나는 흐름 때문에
                    매출액증가율을 분석자료로 이용하기 용이하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>
                  매출액증가율 = 당기매출액-전기매출액 / 전기매출액 X 100%
                </span>
              </p>

              <p
                style={{
                  display: isVisible.operatingIncomeGrowth_vi
                    ? "block"
                    : "none",
                }}
              >
                <h6>영업이익증가율(Operating Profit Growth Rate)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    전기 대비 영업이익이 얼마나 증가했는지를 보여주는 지표이다.
                  </li>
                  <li>영업이익증가율이 높을수록 성장성이 좋다고 볼 수 있다.</li>
                  <li>
                    중장기적으로 매출액증가율보다 영업이익증가율이 높은 형태가
                    이상적이다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>
                  영업이익 증가율 = 당기 영업이익 - 전기영업이익 / 전기
                  전기영업이익 X 100%
                </span>
              </p>

              <p
                style={{
                  display: isVisible.netIncomeGrowth_vi ? "block" : "none",
                }}
              >
                <h6>순이익증가율(Net Profit Growth Rate)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    일정 기간 동안 순이익이 얼마나 증가했는지의 비율을 나타내는
                    성장성 지표이다.
                  </li>
                  <li>
                    순이익은 영업이익에서 영업외손익을 가감하고 법인세를 차감한
                    이익으로 주주에게 돌아오는 순이익을 말한다.
                  </li>
                  <li>
                    순이익 증가율이 높을수록 기업의 수익 성장성도 높다고 볼 수
                    있다.
                  </li>
                  <li>
                    전분기대비/전년도대비 순이익 증가율로 활용할 수 있으며,
                    장기흐름을 파악하는 것이 좋다.
                  </li>
                  <li>
                    순이익증가율은 매출액증가율, 영업이익증가율과 함께
                    비교해보는 것이 좋다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>
                  순이익증가율 = (당기순이익 - 전기순이익) / 전기순이익 X 100%
                </span>
              </p>

              <p
                style={{
                  display: isVisible.totalAssetsGrowth_vi ? "block" : "none",
                }}
              >
                <h6>총자산증가율(Total Asset Growth Rate)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    전년 대비 총 자산이 얼마나 증가했는지를 보여주는 성장성
                    지표이다.
                  </li>
                  <li>
                    동종 산업 내 또는 비슷한 규모의 기업을 비교하는 것이
                    바람직하다.
                  </li>
                  <li>
                    총자산은 부채와 자본의 합이기 때문에 외형 확장을 위해 부채나
                    무수익자산을 증가시켜 발생한 총자산 증가는 좋은 의미의
                    성장으로 볼 수 없다.
                  </li>
                  <li>
                    따라서, 유형자산증가율이나 자기자본 증가율 등을 함께
                    비교하는 것이 바람직하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>
                  총자산증가율 = 기말자산총계 - 기초자산총계 / 기초자산총계 X
                  100%
                </span>
              </p>

              <p
                style={{
                  display: isVisible.ROE_vi ? "block" : "none",
                }}
              >
                <h6>ROE(Return on Equity, 자기자본수익률)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    기업의 이익창출능력 및 주주자본에 대한 운영의 효율성을
                    측정하는 수익성 지표이다.
                  </li>
                  <li>
                    높을수록 자기자본에 비해 이익을 많이 낸다고 할 수 있다.
                  </li>
                  <li>
                    부채가 많을수록 ROE가 높게 나타나기 때문에 ROE만 분석하기
                    보다는 듀퐁분석이나 부채가 고려된 ROA와 함께 보면 좋다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>ROE = 당기순이익 / 자본총계 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.ROA_vi ? "block" : "none",
                }}
              >
                <h6>ROA(Return On Assets, 총자산이익률)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    기업이 보유중인 자산으로 이익을 얼마나 창출하는지 측정하는
                    수익성 지표이다.
                  </li>
                  <li>동종 업계 혹은 비슷한 산업군끼리 비교하는 것이 좋다.</li>
                  <li>
                    부채가 고려되지 않은 ROE를 보완하는 지표로 활용할 수 있다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>ROA = 순이익 / 자산총액 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.grossProfitMargin_vi ? "block" : "none",
                }}
              >
                <h6>매출총이익률(Gross Profit Margin, GPM)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    매출총이익률은 매출로부터 얼마만큼의 이익을 얻느냐를 알 수
                    있는 수익성 지표이다.
                  </li>
                  <li>매출총이익률이 높을수록 수익성이 좋다고 볼 수 있다.</li>
                  <li>
                    산업에 따라 매출원가의 차이가 있어 동종 산업 또는 비슷한
                    산업군 내에서 비교하는 것이 바람직하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>매출총이익률 = 매출총이익 / 매출액 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.operatingProfitMargin_vi
                    ? "block"
                    : "none",
                }}
              >
                <h6>영업이익률(Operating Profits Margin, OPM)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    매출액 대비 영업이익을 얼마나 남겼는가에 대한 수익성을
                    나타내는 지표이다.
                  </li>
                  <li>영업이익률이 높을수록 수익성이 좋다고 할 수 있다.</li>
                  <li>
                    동종 산업 또는 비슷한 산업군과 비교하는 것이 바람직하다.
                  </li>
                  <li>
                    매출액 증가율과 비용 증가 원인을 함께 고려하는 것이
                    바람직하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>영업이익률 = 영업이익 / 매출액 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.netProfitMargin_vi ? "block" : "none",
                }}
              >
                <h6>순이익률(Net Profit Margin, NPM)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    수익에서 모든 비용을 제외하고 남은 이익이 매출액 대비 어느
                    정도인지를 나타내는 수익성지표이다.
                  </li>
                  <li>기업의 전체 수익성을 측정하는 중요한 지표이다.</li>
                  <li>
                    결과적으로 기업의 매출 중 투자자에게 귀속되는 수익의
                    비율이며 높을수록 수익성이 좋다.
                  </li>
                  <li>
                    동종 산업 또는 자본구조가 비슷한 산업 내에서 비교하는 것이
                    바람직하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>순이익률 = 순이익 / 매출액 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.debtRatio_vi ? "block" : "none",
                }}
              >
                <h6>부채비율(Debt Ratio)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>장기지급능력을 파악하기 위한 안정성 지표이다.</li>
                  <li>
                    낮을수록 재무구조가 건전하고 안정성이 높은 기업이라고 본다.
                  </li>
                  <li>일반적으로 100~200%정도면 양호한 수준으로 본다.</li>
                  <li>동종 업종, 비슷한 산업군끼리 비교하는 것이 좋다.</li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>부채비율 = 부채총계 / 자본총계 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.currentRatio_vi ? "block" : "none",
                }}
              >
                <h6>유동비율(Current Ratio)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    기업의 단기 채무 지급능력을 알아볼 수 있는 안정성 지표이다.
                  </li>
                  <li>
                    일반적으로 유동비율 200% 내외, 혹은 산업 평균이면
                    안정적이라고 할 수 있다.
                  </li>
                  <li>높을수록 기업의 파산확률이 낮아지는 경향이 있다.</li>
                  <li>
                    유동성에 대해 좀 더 엄격한 지표인 당좌비율과 함께 보면 더
                    좋다.
                  </li>
                  <li>
                    동종업계 혹은 비슷한 산업군끼리 비교하는 것이 적절하다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>유동비율 = 유동자산 / 유동부채 X 100(%)</span>
              </p>

              <p
                style={{
                  display: isVisible.currentDebtRatio_vi ? "block" : "none",
                }}
              >
                <h6>유동부채비율(Current Liabilities Ratio)</h6>
                <div class="custom-hr"></div>
                <h5>Key point</h5>
                <ul>
                  <li>
                    자기자본에 대한 유동부채의 비율로 자본구성의 안정성을
                    측정하는 지표이다.
                  </li>
                  <li>
                    일반적으로 100%이하면 재무 안정성이 있다고 보며, 낮을수록
                    좋다.
                  </li>
                  <li>
                    단기자금을 빌려주는 종합금융회사에서 중요시 하는 비율이다.
                  </li>
                </ul>
                <div class="custom-hr"></div>
                <h6>계산식</h6>
                <span>유동부채비율 = 유동부채 / 자기자본 X 100(%)</span>
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
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "marketCap")}
                  >
                    시가총액
                  </button>
                </div>
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="stockPrice"
                    name="stockPrice"
                    checked={checkboxValues.stockPrice}
                    onChange={handleCheckboxChange}
                  />
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "stockPrice")}
                  >
                    주가
                  </button>
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
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "tradingVolume")
                    }
                  >
                    거래량
                  </button>
                </div>
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="transactionVolume"
                    name="transactionVolume"
                    checked={checkboxValues.transactionVolume}
                    onChange={handleCheckboxChange}
                  />
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "transactionVolume")
                    }
                  >
                    거래대금
                  </button>
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
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "ForeignerShareRatio")
                    }
                  >
                    외국인지분
                  </button>
                </div>
              </div>

              <div></div>
              <hr />
              <div className="checkbox-row"> 가치 </div>
              <div className="checkbox-row">
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="per"
                    name="per"
                    checked={checkboxValues.per}
                    onChange={handleCheckboxChange}
                  />
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "PER_vi")}
                  >
                    PER(최근4분기)
                  </button>
                </div>

                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="pbr"
                    name="pbr"
                    checked={checkboxValues.pbr}
                    onChange={handleCheckboxChange}
                  />
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "PBR_vi")}
                  >
                    PBR
                  </button>
                </div>

                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="psr"
                    name="psr"
                    checked={checkboxValues.psr}
                    onChange={handleCheckboxChange}
                  />

                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "PSR_vi")}
                  >
                    PSR (최근 4분기)
                  </button>
                </div>
              </div>

              <div className="checkbox-row">
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="pcr"
                    name="pcr"
                    checked={checkboxValues.pcr}
                    onChange={handleCheckboxChange}
                  />

                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "PCR_vi")}
                  >
                    PCR (최근 4분기)
                  </button>
                </div>

                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="eps"
                    name="eps"
                    checked={checkboxValues.eps}
                    onChange={handleCheckboxChange}
                  />
                  <div>
                    <button
                      className="buttonmargin"
                      onClick={(event) => toggleVisibility(event, "EPS_vi")}
                    >
                      EPS (최근 연도)
                    </button>
                  </div>
                </div>
              </div>

              <div className="checkbox-row">
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="bps"
                    name="bps"
                    checked={checkboxValues.bps}
                    onChange={handleCheckboxChange}
                  />
                  <div>
                    <button
                      className="buttonmargin"
                      onClick={(event) => toggleVisibility(event, "BPS_vi")}
                    >
                      BPS (최근 연도)
                    </button>
                  </div>
                </div>

                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="sps"
                    name="sps"
                    checked={checkboxValues.sps}
                    onChange={handleCheckboxChange}
                  />
                  <div>
                    <button
                      className="buttonmargin"
                      onClick={(event) => toggleVisibility(event, "SPS_vi")}
                    >
                      SPS (최근 연도)
                    </button>
                  </div>
                </div>
              </div>

              <div className="checkbox-row">
                <div className="formContainer">
                  <Form.Check
                    type="checkbox"
                    id="cps"
                    name="cps"
                    checked={checkboxValues.cps}
                    onChange={handleCheckboxChange}
                  />

                  <div>
                    <button
                      className="buttonmargin"
                      onClick={(event) => toggleVisibility(event, "CPS_vi")}
                    >
                      CPS (최근 연도)
                    </button>
                  </div>
                </div>
              </div>
            </Form>

            <hr />
            <div className="checkbox-row">
              {" "}
              성장성
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="revenueGrowth"
                  name="revenueGrowth"
                  checked={checkboxValues.revenueGrowth}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "revenueGrowth_vi")
                    }
                  >
                    매출액 증가율
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="operatingIncomeGrowth"
                  name="operatingIncomeGrowth"
                  checked={checkboxValues.operatingIncomeGrowth}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "operatingIncomeGrowth_vi")
                    }
                  >
                    영업이익 증가율
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="netIncomeGrowth"
                  name="netIncomeGrowth"
                  checked={checkboxValues.netIncomeGrowth}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "netIncomeGrowth_vi")
                    }
                  >
                    순이익 증가율
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="totalAssetsGrowth"
                  name="totalAssetsGrowth"
                  checked={checkboxValues.totalAssetsGrowth}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "totalAssetsGrowth_vi")
                    }
                  >
                    총자산 증가율
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="checkbox-row">
              수익성
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="roe"
                  name="roe"
                  checked={checkboxValues.roe}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "ROE_vi")}
                  >
                    ROE (최근 4분기)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="roa"
                  name="roa"
                  checked={checkboxValues.roa}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "ROA_vi")}
                  >
                    ROA (최근 4분기)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="grossProfitMargin"
                  name="grossProfitMargin"
                  checked={checkboxValues.grossProfitMargin}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "grossProfitMargin_vi")
                    }
                  >
                    매출총이익률 (최근 연도)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="operatingProfitMargin"
                  name="operatingProfitMargin"
                  checked={checkboxValues.operatingProfitMargin}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "operatingProfitMargin_vi")
                    }
                  >
                    영업이익률 (최근 연도)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="netProfitMargin"
                  name="netProfitMargin"
                  checked={checkboxValues.netProfitMargin}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "netProfitMargin_vi")
                    }
                  >
                    순이익률 (최근 연도)
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="checkbox-row">
              안정성
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="debtRatio"
                  name="debtRatio"
                  checked={checkboxValues.debtRatio}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) => toggleVisibility(event, "debtRatio_vi")}
                  >
                    부채비율 (최근 연도)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="currentRatio"
                  name="currentRatio"
                  checked={checkboxValues.currentRatio}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "currentRatio_vi")
                    }
                  >
                    유동비율 (최근 연도)
                  </button>
                </div>
              </div>
              <div className="formContainer">
                <Form.Check
                  type="checkbox"
                  id="currentDebtRatio"
                  name="currentDebtRatio"
                  checked={checkboxValues.currentDebtRatio}
                  onChange={handleCheckboxChange}
                />
                <div>
                  <button
                    className="buttonmargin"
                    onClick={(event) =>
                      toggleVisibility(event, "currentDebtRatio_vi")
                    }
                  >
                    유동부채비율 (최근 연도)
                  </button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </div>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            닫기
          </Button>
          <Button variant="dark" onClick={handleConfirm}>
            확인
          </Button>{" "}
          {/* 추가: 확인 버튼 */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryFilter;
