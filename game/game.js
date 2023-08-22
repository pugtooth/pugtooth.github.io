// Please note that a lot of this will be rewritten.

let app;
//let aid = "";

async function init() {
    //connect to server
    clientinit();

    //Creates Pixi.JS Instance
    app = new PIXI.Application({ backgroundColor: 0x5555ff, width: 1000, height: 720 });
    document.body.appendChild(app.view);

    console.log("Attempting Connection..")
    let awc = "";
    awc = await awaitconnect();
    if(awc == "timeout")
      return

    /*senddata("client:ready");
    aid = await awaitdata();
    if(aid == "timeout")
      return*/

    //console.log("ID: " + aid)

    findmatch();
}

async function findmatch() {
  senddata("client:matchrequest");
  let t = "";
  t = await awaitconfirm();
  if(t != "confirm")
    return
  console.log(t);
  game();
}

const sleep = time => new Promise(res => setTimeout(res, time, "done sleeping"));


let game = async function() {  
    //Sets up ui before everything
    let ui = new gui();
    ui.init();

    //Draws the grid
    let grid = new board();
    grid.init();
    grid.inittarget();
    app.stage.addChild(grid.grid)

    //Creates the pawn
    let pwn = new pawn();
    pwn.init();
    app.stage.addChild(pwn.pawn)

    //Sets up input
    let inp = new input();
    inp.init(app, grid, pwn);


    //draws up UI
    app.stage.addChild(ui.cards);

    //Game loop - ish

    let running = true;

    //Waits for something from the server.
    const waitforserver = async function() {
      console.log("waiting...")

      //Waits for data
      let t = "";
      t = await awaitdata();

      //If timeout or disconnect
      if(t == "timeout" || t == "disconnect" || !connected) {
        
        //Clear pixi stage and find new match.
        console.log("Disconnect Recieved.")
        app.stage.children = [];
        running = false;
        findmatch();
      }
      else {
        //Blah blah blah
      }
    }
    
    const update = async function() {

      pwn.update(grid.gofx, grid.gofy);

      await waitforserver();

      if(running) {
        update();
      }
    };
    update();
}
