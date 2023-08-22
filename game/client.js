let ws;
let connected = false

function clientinit() {
    function init() {
        if(ws) {
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }

        ws = new WebSocket('ws://localhost:6969');
        ws.onopen = () => {
            connected = true;
            console.log('Connection Opened')
        }
        ws.onmessage = function ( data ) { if(data.data=="disconnect") { connected = false; } console.log(data.data) }
        ws.onclose = function() {
            ws = null;
        }
    }
    init();
}

function senddata(data) {
    if(!ws) {
        console.log("No WebSocket Connection")
        return;
    }
    ws.send(data);
}

function awaitconnect() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("timeout"), 60000)

        const loop = async function () {
            if(connected) {
                resolve("connected")
            } else {
                Promise.resolve(new Promise(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                    }))
                    .then(loop)
                    .catch(reject);
            }
        }
        loop();
    })
}

function awaitconfirm() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("timeout"), 60000)
        const loop = async function () {
            let t = ""
            t = await awaitdata()
            if(t == "confirm") {
                resolve("confirm")
            } else {
                Promise.resolve(new Promise(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                    }))
                    .then(loop)
                    .catch(reject);
            }
        }
        loop();
    })
}

function awaitdata() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("timeout"), 60000)
        let d = ""
        ws.onmessage = ({ data }) => d = data;
        //console.log(ws)

        const loop = function () {
            if (d != "" && !d.includes("client")) {
                ws.onmessage = function ( data ) { if(data.data=="disconnect") { connected = false; } console.log(data.data) }
                resolve(d);
            } else {
                Promise.resolve(new Promise(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                    }))
                    .then(loop)
                    .catch(reject);
            }
        }
        loop();
    })
}