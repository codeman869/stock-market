import React, { Component } from 'react';
import axios from 'axios'
import io from 'socket.io-client'
import logo from './logo.svg';
import './App.css';
import '../node_modules/skeleton-css/css/skeleton.css'

class App extends Component {
  constructor(props) {
    super(props)
   if(process.env.NODE_ENV !== 'production') {
    axios.get('/api').then((res) => {
      console.log(res)
    })
  
   } 
   if(process.env.NODE_ENV !== 'production') {
      
   this.socket = io({
     path: '/api'
   })
   } else {
     this.socket = io()
   }
   console.log(this.socket)
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To change, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
