'use strict'
const API = require('./services/alphaVantageAPI')

module.exports  = function(io) {
    return { 
        socketActions: function(client) {
    
            this.companies = this.companies || ["MSFT"]    
    
            client.on('new stock', (stock) => {
                this.companies.push(stock)
                io.emit('new stock', this.companies)    
                API.getStockInfo('MSFT')
            })
    
            client.on('disconnect', ()=>console.log('A client disconnected'))
        }
    }
}