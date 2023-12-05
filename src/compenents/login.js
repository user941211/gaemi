import React, { useState } from 'react';
import axios from 'axios';
import Header from "../pages/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setuserId]=useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const getLocalIPAddress = () => {
        const currentURL = window.location.href;
        const domain = new URL(currentURL).hostname;
        return domain || "localhost";
    };

    const handleLogin = async () => {
        const ipAddress = getLocalIPAddress();
        const url = `http://${ipAddress}:3001/Login`;
        try {
            const response = await axios.post(url, { id, password });

            if (response.data.success) {
                setIsLoggedIn(true);
                setuserId(response.data.userId);
                alert(`로그인을 환영합니다`);
                navigate('/');
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('서버와의 통신에 문제가 발생했습니다.');
        }
    };

    return (
        <div>
          <Header link="/Main" />
            {isLoggedIn ? (
                <p>welcome, {userId}!</p>
            ) : (
                <div>
                    <h2>Login</h2>
                    <div>
                        <label htmlFor='input_id'>ID : </label>
                        <input type='text' name='input_id' value={id} onChange={(e) => setId(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='input_pw'>PW : </label>
                        <input type='password' name='input_pw' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <button type='button' onClick={handleLogin}>Login</button>
                    </div>
                    <Link to="/signup">
                     <p>회원가입</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Login;
