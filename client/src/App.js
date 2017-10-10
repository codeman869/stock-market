import React, { Component } from 'react'
import MediaQuery from 'react-responsive'

import '../node_modules/skeleton-css/css/skeleton.css'

import Header from './components/Header'
import Chart from './components/Chart'
import Controls from './components/Controls'
import StockList from './components/StockList'

import theStore from './StockStore'

class App extends Component {
  render() {
    return (
      <div className="container" store={theStore}>
        <div className="row">
          <Header />
        </div>
        <div className="row">
          <MediaQuery maxDeviceWidth={600}>
            <Chart store={theStore} width="400" height="200" />
          </MediaQuery>
          <MediaQuery minDeviceWidth={600} maxDeviceWidth={900}>
            <Chart store={theStore} width={600} height={250} />
          </MediaQuery>
          <MediaQuery minDeviceWidth={900}>
            <Chart store={theStore} />
          </MediaQuery>
        </div>
        <div className="row">
          <StockList store={theStore} />
        </div>
        <div className="row">
          <Controls store={theStore} />
        </div>
      </div>
    )
  }
}

export default App
