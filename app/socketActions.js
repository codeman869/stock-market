'use strict'
const API = require('./services/alphaVantageAPI')

let stockdata = []

function checkContainsStock(stock) {
  let containsStock = false
  for (let i = 0; i < stockdata.length; i++) {
    if (stockdata[i]['Meta Data']['2. Symbol'] === stock) {
      containsStock = true
      break
    }
  }
  return containsStock
}

/**
 * Expose
 */

module.exports = function(io) {
  return {
    socketActions: function(client) {
      /*
      if (stockdata.length === 0) {
        API.getStockInfo('MSFT', (err, data) => {
          if (err) return console.warn(err)

          
          stockdata.push(data)
          client.emit('new stock', stockdata)
        })
      }
    */
      client.on('get stocks', () => {
        client.emit('new stock', stockdata)
      })

      client.on('new stock', stock => {
        //Check to see if the array already contains the new stock
        if (checkContainsStock(stock)) return

        API.getStockInfo(stock, (err, data) => {
          if (err) {
            return client.emit('invalid stock', stock)
          }

          stockdata.push(data)
          io.emit('new stock', stockdata)
        })
      })

      client.on('remove stock', stock => {
        if (!checkContainsStock(stock)) return

        let newstocks = stockdata.filter(item => {
          return item['Meta Data']['2. Symbol'] !== stock
        })
        stockdata = newstocks
        io.emit('new stock', stockdata)
      })

      client.on('disconnect', () => console.log('A client disconnected'))
    }
  }
}
