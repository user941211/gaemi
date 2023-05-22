import * as React from 'react';
import './css/App.css';
import Firstpage from './firstpage';
import Header from './Header';
import Main from './Main';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
/*import header from header.js;*/

function App() {
 return (
    <div className="App">
      {<Header/>}
      {<Main/>}
    </div>
  );
}

export default App;
