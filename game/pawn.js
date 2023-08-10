class pawn {
    //Load images and container
    base = PIXI.Sprite.from('./resources/pawn.png');
    costume = PIXI.Sprite.from('./resources/clothes/default.png');
    face = PIXI.Sprite.from('./resources/face/default.png');
    pawn = new PIXI.Container();

    //Grid coordinates
    gx=0;
    gy=0;

    init = function() {
        //Set scale and add all of the images to the container
        this.pawn.scale.set(0.5, 0.5)
        this.pawn.addChild(this.base)
        this.pawn.addChild(this.costume);
        this.pawn.addChild(this.face);
    }

    update = function(gofx, gofy) {
        //p1x and p1y are actual screen coordinates
        let p1x=0;
        let p1y=0;

        //Calculate screen position.
        //45 is how big the grid cells are, gx and gy are grid coordinates
        //gofx and gofy are grid offsets
        p1x = 45 * this.gx + gofx
        p1y = 45 * this.gy - 10 + gofy;
  
        //apply position
        this.pawn.x = p1x;
        this.pawn.y = p1y;
    }
}