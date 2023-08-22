let match1 = null;
let match2 = null;
let curmatch = false;

async function updateMatch(clients) {
    console.log("Updating Match.")
    if(curmatch) {
        console.log(clients);

        if(clients.clientByID(match1.userid).readyState == 3 && clients.clientByID(match2.userid).readyState == 3) {
            match1 = null;
            match2 = null;
            curmatch = false;
        }
        else if(clients.clientByID(match1.userid).readyState == 3) {
            setTimeout(()=>{
                match2.send("disconnect");
                match2 = null;
                curmatch = false;
            }, 5000);
        }
        else if(clients.clientByID(match2.userid).readyState == 3) {
            setTimeout(()=>{
                match1.send("disconnect");
                match1 = null;
                curmatch = false;
            }, 5000);
        }
        else {
            //turn code here
        }
    }
    if(!curmatch) {
        match1 = null;
        match2 = null;
        await findtwoclients(clients.clients);
        match1.send("confirm");
        match2.send("confirm");
    }
}

function findtwoclients(clients) {
    return new Promise((resolve, reject) => {

    
        const loop = async function () {
            let readycli = clients.filter((cli) => { return cli.mc })
            if(readycli.length > 1) {
                console.log("Match Found")
                match1 = readycli[0];
                match2 = readycli[1];
                curmatch = true;
                resolve()
            } else {
                console.log("Retry")
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

module.exports = {
    updateMatch
}