import React, { Component } from 'react'
import { observer } from 'mobx-react'

const Controls = observer(
  class Controls extends Component {
    constructor(props) {
      super(props)

      this.state = {
        inputValue: ''
      }
    }

    handleChange(e) {
      this.setState({
        inputValue: e.target.value
      })
    }

    addStock(e) {
      e.preventDefault()
      const { inputValue } = this.state
      this.props.store.createNew(inputValue)
      this.setState({
        inputValue: ''
      })
    }

    componentWillMount() {
      this.props.store.getStocks()
    }

    removeStock() {
      this.socket.emit('remove stock', 'MSFT')
    }

    render() {
      return (
        <form>
          <div className="row">
            <div className="eight columns">
              <input
                className="u-full-width"
                value={this.state.inputValue}
                onChange={this.handleChange.bind(this)}
                ref="stockName"
                type="text"
                placeholder="MSFT"
                id="stockName"
              />
            </div>
            <div className="four columns">
              <button
                className="button-primary u-full-width"
                onClick={this.addStock.bind(this)}
              >
                Add Stock
              </button>
            </div>
          </div>
        </form>
      )
    }
  }
)

export default Controls
