import React, { useState } from 'react';
import Header from "../pages/Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(true);

  const getLocalIPAddress = () => {
    const currentURL = window.location.href;
    const domain = new URL(currentURL).hostname;
    return domain || "localhost";
  };

  const handleSignUp = async () => {
    if (isDuplicate) {
      // 중복 확인 결과가 있는 경우 회원가입을 진행하지 않음
      alert("아이디 중복 확인을 해주세요.");
      return;
    }

    if (!id || !password) {
      // 아이디 또는 비밀번호가 입력되지 않은 경우 회원가입을 진행하지 않음
      alert("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    const ipAddress = getLocalIPAddress();
    const url = `http://${ipAddress}:3001/signup`;

    try {
      await axios.post(url, { id, password });
      alert("회원가입이 완료되었습니다.");
      navigate("/Login");
    } catch (error) {
      console.error('회원가입 중 오류 발생:', error);
    }
  };


  const duplicate = async () => {
    const ipAddress = getLocalIPAddress();
    const duplicateCheckUrl = `http://${ipAddress}:3001/checkDuplicate`;
    try {
      const response = await axios.post(duplicateCheckUrl, { id });
  
      if (response.data.isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
        setIsDuplicate(true);
      } else {
        alert("사용 가능한 아이디입니다.");
        setIsDuplicate(false);
      }
    } catch (error) {
      console.error('중복 확인 중 오류 발생:', error);
    }
  };
  

  return (
    <div>
      <Header link="/Main" />
      <h2>회원가입</h2>
      <form>
        <label>아이디:
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </label>
        <button type="button" onClick={duplicate}>중복확인</button>
        <br />
        <label>비밀번호:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUp;