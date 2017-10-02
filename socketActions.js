'use strict'

module.exports  = function(io) {
    return { 
        socketActions: function(client) {
    
            this.companies = this.companies || ["MSFT"]    
    
            client.on('new stock', (stock) => {
                this.companies.push(stock)
                io.emit('new stock', this.companies)    
            })
    
            client.on('disconnect', ()=>console.log('A client disconnected'))
        }
    }
}