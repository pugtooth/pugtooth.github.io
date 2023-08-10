// Please note that a lot of this will be rewritten.

function init() {
    //Creates Pixi.JS Instance
    let app = new PIXI.Application({ backgroundColor: 0x5555ff, width: 1000, height: 720 });
    document.body.appendChild(app.view);

    //Draws the grid
    let grid = new board();
    grid.init();
    grid.inittarget();
    app.stage.addChild(grid.grid)
    app.stage.addChild(grid.target);

    //Creates the pawn
    let pwn = new pawn();
    pwn.init();
    app.stage.addChild(pwn.pawn)

    //Sets up input
    let inp = new input();
    inp.init(app, grid, pwn);


    //Game loop - ish
    let elapsed = 0.0;

    app.ticker.add((delta) => {

      elapsed += delta;

      pwn.update(grid.gofx, grid.gofy);
    });
}
