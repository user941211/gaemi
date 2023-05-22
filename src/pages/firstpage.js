
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Switch, Link } from 'react-router-dom';
import './css/firstPage.css';
import Header from './Header';
import logo from './img/YUlogo.png';
import App from './App';
import Main from './Main';

//import Header from './Header'
//import Main from './Main'

const Firstpage = () => {

  return (
    <div id="wrap" class="">
	    <article>
		    <p><strong>Omega</strong> Route</p>
		    <em>Whatever you imagine, you will see more</em>
	  </article>
	
    <figure>		
		  <p>
			  <span></span>		
		  </p>		
	  </figure>
  </div>
  )
}

export default Firstpage