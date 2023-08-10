// Please note that a lot of this will be rewritten.

function init() {
    //Creates Pixi.JS Instance
    let app = new PIXI.Application({ backgroundColor: 0x5555ff, width: 800, height: 600 });
    document.body.appendChild(app.view);

    //mousevariables
    let mx = 0;
    let my = 0;
    let tind = 0;

    //Draws the grid
    let grid = new grid();
    grid.init();
    app.stage.addChild(grid.grid)

    //Arrays allowing grid coordinates from a single number

    let tx = [0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,
              0, 1, 2, 3, 4, 5, 6, 7,]
            
    let ty = [0, 0, 0, 0, 0, 0, 0, 0,
              1, 1, 1, 1, 1, 1, 1, 1,
              2, 2, 2, 2, 2, 2, 2, 2, 
              3, 3, 3, 3, 3, 3, 3, 3, 
              4, 4, 4, 4, 4, 4, 4, 4, 
              5, 5, 5, 5, 5, 5, 5, 5, 
              6, 6, 6, 6, 6, 6, 6, 6, 
              7, 7, 7, 7, 7, 7, 7, 7, 
              8, 8, 8, 8, 8, 8, 8, 8, 
              9, 9, 9, 9, 9, 9, 9, 9, 
              10, 10, 10, 10, 10, 10, 10, 10, 
              11, 11, 11, 11, 11, 11, 11, 11, ]

    //This is basic mouse input
    app.stage.interactive = true;
    app.stage.on('mousemove', function (e) {
      //console.log('Mouse moved');
      //console.log('X', e.data.global.x, 'Y', e.data.global.y);
      mx = e.data.global.x;
      my = e.data.global.y;
    });

    //tgx is the coordinates for the target
    //ltind is the last target index. So if you double click, it moves you.
    let tgx=2+gofx;
    let tgy=2+gofy;
    let ltind = 0;

    app.stage.on('mousedown', function (e) {
        //Mouse input for checking grid and moving player
        tind=checkgrid(mx, my, gofx, gofy).indexOf(true);
        if(tind >= 0)
        {
            tgx=45 * tx[tind] + gofx + 2;
            tgy=45 * ty[tind] + gofy + 2;
        }
        if(tind == ltind)
        {
            gx = tx[tind];
            gy = ty[tind];
        }
        else
            ltind = tind;
    })

    //Drawing stuff
    let target = PIXI.Sprite.from('./resources/target.png');
    app.stage.addChild(target);

    //Draws the player

    pawn = new pawn();
    pawn.init();
    app.stage.addChild(pawn.pawn)

    //Test code
    let p1x=0;
    let p1y=0;

    let elapsed = 0.0;

    app.ticker.add((delta) => {

      elapsed += delta;

      target.x = tgx;
      target.y = tgy;

      pawn.update();
    });
}
