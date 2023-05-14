import logo from './img/headerLogo.svg';
import './css/App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import header from header.js;
function App() {
  return (
    <div className="App">
      <div class="header">
        <div class="conatiner">
          <img src={logo} alt="logo"></img>
          <div class="wrapper">
            <a class="clickableLayer" href="https://www.alphasquare.co.kr/home" role="button">시작하기</a>
          </div>
          <Button variant="contained" href="#outlined-buttons">시작할까말까</Button>
        </div>
      </div>
      <header />
    </div>
  );
}

export default App;
