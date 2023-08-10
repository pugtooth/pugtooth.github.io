class board {

    //The grid
    grid = null;
    //target
    target = null;
    //target grid coordinates
    tgx = 1;
    txy = 6;
    //Grid offset on screen
    gofx = 220;
    gofy = 30;

    //Tx and Ty are lookups to get grid coordinates from a index
    tx = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,]
      
    ty = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 
        3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 
        4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 
        6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 
        7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 
        9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 
        10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
        11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11,
        12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 12, 
    ]

    inittarget = function() {
        //Initiates target and sets its default values
        this.target = PIXI.Sprite.from('./resources/target.png');
        this.target.x = 47;
        this.target.y = 272;
        this.tgx = 0;
        this.txy = 0;
        this.grid.addChild(this.target)
    }

    updatetarget = function(gx, gy) {
        //Calculates target position based off of grid
        //coordinates from lookup table
        this.target.x=45 * gx + 2;
        this.target.y=45 * gy + 2;
    }

    init = function() {
        //Draws a 8x12 grid.
        //c1 is the first color,
        //c2 is the second.
        //cs is the size of the cell.
        let c1 = 0x164c0f;
        let c2 = 0x2e9020;
        this.grid = new PIXI.Container();
        let gridgfx = new PIXI.Graphics();
        let cs = 45;
        
        for(let i = 0; i < 13; i++)
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
            
            gridgfx.beginFill(c1);
            gridgfx.drawRect(cs*8, i*cs, cs, cs);
    
            gridgfx.beginFill(c2);
            gridgfx.drawRect(cs*9, i*cs, cs, cs);
    
            gridgfx.beginFill(c1);
            gridgfx.drawRect(cs*10, i*cs, cs, cs);
    
            gridgfx.beginFill(c2);
            gridgfx.drawRect(cs*11, i*cs, cs, cs);
    
            gridgfx.beginFill(c1);
            gridgfx.drawRect(cs*12, i*cs, cs, cs);
    
            gridgfx.beginFill(c2);
            gridgfx.drawRect(cs*13, i*cs, cs, cs);
    
            gridgfx.beginFill(c1);
            gridgfx.drawRect(cs*14, i*cs, cs, cs);
    
            gridgfx.beginFill(c2);
            gridgfx.drawRect(cs*15, i*cs, cs, cs);
        }
    
        //Switches row colors.
        function altrow() {
            let ca1 = c1;
            let ca2 = c2;
            c1 = ca2;
            c2 = ca1;
        }
    
        //Creates grid object
        this.grid.addChild(gridgfx);
        this.grid.x = this.gofx;
        this.grid.y = this.gofy
        console.log(this)
    }
    
    checkgrid = function(mx, my) {
        //This checks where the user is clicking on the grid
        //by checking at predefined coordinates
        mx = mx-this.gofx;
        my = my-this.gofy;
    
        let indx = 0;
    
        let gridc = Array(208).fill(false)
        for(let i=0; i<13; i++) {
            gridc[indx] = this.inbox(mx,my,0,45*i,45, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,45,45*i,90, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,90,45*i,135, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,135,45*i,180, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,180,45*i,225, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,225,45*i,270, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,270,45*i,315, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,315,45*i,360, 45*i+45)
            indx++;



            gridc[indx] = this.inbox(mx,my,360,45*i,405, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,405,45*i,450, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,450,45*i,495, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,495,45*i,535, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,535,45*i,570, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,570,45*i,615, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,615,45*i,660, 45*i+45)
            indx++;
    
            gridc[indx] = this.inbox(mx,my,660,45*i,705, 45*i+45)
            indx++;
    
        }
    
        return gridc;
    }
    
    inbox = function(mx, my, ax, ay, bx, by) {
        //A simple thing to check if the mouse is within the
        //box defined with points A and B,
        if(mx > ax && mx < bx && my > ay && my < by)
        {
            return true;
        }
        else
            return false;
    }
}