
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/firstPage.css';
//import Header from './Header'
//import Main from './Main'

const firstPage = () => {
  return (
    <div className="firstPage">
      <Header/ >
      <Main />
    </div> 
  )
}

export default firstPage