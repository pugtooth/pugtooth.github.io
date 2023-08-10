class input {

    mx = 0;
    my = 0;
    tind = 0;

    ltind = 0;

    init = function(app, grid, pawn) {
        //Sets the app to interactive
        app.stage.interactive = true;
        grid.interactive = true;
        //Tracks mouse position
        app.stage.on('mousemove', function (e) {
          this.mx = e.data.global.x;
          this.my = e.data.global.y;
        });

        //Mousedown event
        grid.on('mousedown', function (e) {
            //Mouse input for checking grid and moving player
            //Finds the id of the grid cell that the user clicked
            this.tind=grid.checkgrid(this.mx, this.my).indexOf(true);

            //if it was actually a grid cell, update the target position to the
            //grid cell
            if(this.tind >= 0)
            {
                grid.updatetarget(grid.tx[this.tind], grid.ty[this.tind])
            }
            //If what you clicked was the same as last, set pawn to that location.
            if(this.tind == this.ltind)
            {
                pawn.gx = grid.tx[this.tind];
                pawn.gy = grid.ty[this.tind];
            }
            else
                this.ltind = this.tind;
        })
    }
}