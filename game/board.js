class grid {

    //The grid
    grid = null;
    gofx = 220;
    gofy = 30;

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
    
        //Creates grid object
        this.grid.addChild(gridgfx);
        this.grid.x = gofx;
        this.grid.y = gofy
    }
    
    checkgrid = function(mx, my) {
        //This checks where the user is clicking on the grid
        //by checking at predefined coordinates
        mx = mx-this.gofx;
        my = my-this.gofy;
    
        let indx = 0;
    
        let gridc = Array(96).fill(false)
        for(let i=0; i<12; i++) {
            gridc[indx] = inbox(mx,my,0,45*i,45, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,45,45*i,90, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,90,45*i,135, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,135,45*i,180, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,180,45*i,225, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,225,45*i,270, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,270,45*i,315, 45*i+45)
            indx++;
    
            gridc[indx] = inbox(mx,my,315,45*i,360, 45*i+45)
            indx++;
    
        }
    
        return grid;
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