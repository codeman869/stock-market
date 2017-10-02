'use strict'
const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io')


const port = process.env.NODE_ENV != 'production' ? 3000 : process.env.PORT || 8080


let io 

app.use(express.static(path.resolve(__dirname, 'client/build')))

app.get('/api', (req, res) => {
    console.log('API Request')
    res.set('Content-Type', 'application/json');
    res.json({message: 'Successful'})
})

app.get('*', (req,res) => {
   res.sendFile(path.resolve(__dirname, 'client/build/', 'index.html')); 
})

let server = app.listen(port, () => { console.log(`Application running on port: ${port}`);});

if(process.env.NODE_ENV !== 'production') {
    io = socketIO(server, {
        path: '/api'
    })
} else {
    io = socketIO(server)
}

const socketActions = require('./app/socketActions')(io).socketActions

io.on('connection', socketActions)

module.exports = app;