let clientscode = require('./clients.js')
let gamesv = require('./server.js')
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express)
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws) {
    clientscode.addClient(ws, wss, WebSocket, gamesv, clientscode);
})

server.listen(port, function() {
    console.log('Server is listening on ' + port);
})