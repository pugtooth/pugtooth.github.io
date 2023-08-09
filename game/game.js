function init() {
    //Creates Pixi.JS Instance
    let app = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(app.view);

    //Draws the grid
    let grid = drawgr();
    app.stage.addChild(grid)

    //Draws the player
    let p1pawn = PIXI.Sprite.from('./resources/pawn.png');
    let p1cos = PIXI.Sprite.from('./resources/clothes/default.png');
    let p1face = PIXI.Sprite.from('./resources/face/default.png');
    let p1 = new PIXI.Container();
    p1.scale.set(0.5, 0.5)
    p1.addChild(p1pawn)
    p1.addChild(p1cos);
    p1.addChild(p1face);
    app.stage.addChild(p1);


    //Test code
    let p1x=0;
    let p1y=0;

    let gx=4;
    let gy=3;

    let elapsed = 0.0;

    app.ticker.add((delta) => {

      elapsed += delta;
      
      p1x = 45 * gx
      p1y = 45 * gy - 10;

      p1.x = p1x;
      p1.y = p1y;
    });
}

function drawgr() {
    //Draws a 8x12 grid.
    //c1 is the first color,
    //c2 is the second.
    //cs is the size of the cell.
    let c1 = 0x164c0f;
    let c2 = 0x2e9020;
    let grid = new PIXI.Container();
    let gridgfx = new PIXI.Graphics();
    let cs = 45;
    
    for(let i = 0; i < 12; i++)
    {
        //Alternates row colors for checkered effect
        altrow()
        //Draws 8 columns
        gridgfx.beginFill(c1);
        gridgfx.drawRect(0, i*cs, cs, cs);

        gridgfx.beginFill(c2);
        gridgfx.drawRect(cs, i*cs, cs, cs);

        gridgfx.beginFill(c1);
        gridgfx.drawRect(cs*2, i*cs, cs, cs);

        gridgfx.beginFill(c2);
        gridgfx.drawRect(cs*3, i*cs, cs, cs);

        gridgfx.beginFill(c1);
        gridgfx.drawRect(cs*4, i*cs, cs, cs);

        gridgfx.beginFill(c2);
        gridgfx.drawRect(cs*5, i*cs, cs, cs);

        gridgfx.beginFill(c1);
        gridgfx.drawRect(cs*6, i*cs, cs, cs);

        gridgfx.beginFill(c2);
        gridgfx.drawRect(cs*7, i*cs, cs, cs);
    }

    function altrow() {
        ca1 = c1;
        ca2 = c2;
        c1 = ca2;
        c2 = ca1;
    }

    //Creates grid object and returns it.
    grid.addChild(gridgfx);
    return grid;
}