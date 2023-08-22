
clients = [];
aid = 0;

function addClient(ws, wss, WebSocket, gamesv, thi) {
    ws.userid = aid;
    ws.mc = false;
    aid+=1;
    clients.push(ws)

    console.log("Client Connect: " + ws.userid + ". " + clients.length + " Online")

    ws.on('message', function incoming(data, isBinary) {
        const msg = isBinary ? data : data.toString();
        if(data == "client:matchrequest") { ws.mc = true; }

        if(ws == clients[0])
        {
            wss.clients.forEach(function each(client) {
                if(client != ws && client.readyState == WebSocket.OPEN) {        
                    client.send(msg);
                }
            })
        }

        clients[0].send(msg)
    })

    ws.onclose = function() {
        gamesv.updateMatch(thi);
        removeClient(ws);
    }

    gamesv.updateMatch(thi);
}

function removeClient(ws) {
    clients = clients.filter((check) => {
        return check.userid != ws.userid
    })
    console.log("Client Disconnect: " + ws.userid + ". " + clients.length + " Online")
}

function clientByID(id) {
    let cli = "NOCLIENT";
    for(let i=0; i<clients.length; i++) {
        if(clients[i].userid == id) {
            cli = clients[i];
            return cli;
        }
    }
    return cli;
}

function onmessage(ws, data, binary) {

}

function onconnect(ws) {
    
}

function onclose(ws) {

}

module.exports = {
    clients, addClient, removeClient, clientByID, onmessage, onconnect, onclose
}
