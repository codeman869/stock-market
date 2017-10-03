import React, { Component } from 'react'
import '../node_modules/skeleton-css/css/skeleton.css'

import Header from './components/Header'
import Chart from './components/Chart'
import Controls from './components/Controls'

import theStore from './StockStore'

class App extends Component {
  render() {
    return (
      <div className="container" store={theStore}>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <Chart />
        </div>
        <div className="row">
          <Controls store={theStore} />
        </div>
      </div>
    )
  }
}

export default App
