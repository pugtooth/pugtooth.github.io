// Please note that a lot of this will be rewritten.

function init() {
    //Creates Pixi.JS Instance
    let app = new PIXI.Application({ width: 800, height: 600 });
    document.body.appendChild(app.view);

    //mousevariables
    let mx = 0;
    let my = 0;
    let tind = 0;

    //Draws the grid
    let grid = drawgr();
    let gofx = 220;
    let gofy = 30;
    grid.x = gofx;
    grid.y = gofy
    app.stage.addChild(grid)

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

    //GX and GY are the players coordinates on the grid

    let gx=4;
    let gy=3;

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

    let elapsed = 0.0;

    app.ticker.add((delta) => {

      elapsed += delta;

      target.x = tgx;
      target.y = tgy;

      p1x = 45 * gx + gofx
      p1y = 45 * gy - 10 + gofy;

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

    //Switches row colors.
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

function checkgrid(mx, my, gofx, gofy) {
    //This checks where the user is clicking on the grid
    //by checking at predefined coordinates
    mx = mx-gofx;
    my = my-gofy;

    let indx = 0;

    let grid = Array(96).fill(false)
    for(let i=0; i<12; i++) {
        grid[indx] = inbox(mx,my,0,45*i,45, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,45,45*i,90, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,90,45*i,135, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,135,45*i,180, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,180,45*i,225, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,225,45*i,270, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,270,45*i,315, 45*i+45)
        indx++;

        grid[indx] = inbox(mx,my,315,45*i,360, 45*i+45)
        indx++;

    }

    return grid;
}

function inbox(mx, my, ax, ay, bx, by) {
    //A simple thing to check if the mouse is within the
    //box defined with points A and B,
    if(mx > ax && mx < bx && my > ay && my < by)
    {
        return true;
    }
    else
        return false;
}