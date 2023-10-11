import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../pages/css/firstPage.css";
//{ onDataUpdate }
function SearchWindow({ list }) {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const getLocalIPAddress = () => {
        const currentURL = window.location.href;
        const domain = new URL(currentURL).hostname;
        return domain || 'localhost';
    };
    const handleSearch = async () => {
        const ipAddress = getLocalIPAddress();
        const url = `http://${ipAddress}:3001/search`;

        try {
            const response = await axios.post(url, { name: inputValue });
            const data = response?.data;
            console.log(data)
            if (data.message) {
                alert(data.message); // 서버에서 전달한 메시지를 알림창으로 표시
            } else {
                navigate('/main', {state:{results: data.results, finance: data.finance, recommend: data.recommend, rim: data.rim}})
                //onDataUpdate(data.results, data.finance, data.recommend, data.rim); // 부모 컴포넌트에 전달하는 코드
            }
        } catch (error) {
            console.error('Error:', error);
            alert('해당 정보가 없습니다.');
        }
    };
    const handleOnKeyPress = e => {
        if (e.key === 'Enter') {
            handleSearch(e);
            //handleClose();
        }
    };

    const handleSubmit = (event) => {
        handleSearch(event); // Call handleSearch function
        //handleClose(); // Call handleClose function
    };

    return (
        <div className=''>
            <input
                type="search"
                className="searchSpace"
                placeholder="여섯자리 숫자코드 혹은 이름으로 입력하세요"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleOnKeyPress}
            />
            <button className="searchButton" onKeyDown={handleOnKeyPress} onClick={handleSearch}>
                찾기
            </button>
            <div>
                {/* 검색 결과를 여기에 나열하는 코드를 작성합니다. */}
                {/* {searchResults.map((result, index) => (
                    <div key={index}>{result}</div>
                ))} */}
            </div>
        </div>
    );
}

export default SearchWindow;
