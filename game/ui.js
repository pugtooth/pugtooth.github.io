class gui {
    //Card atlas and path.
    //Screw spritesheets, pixijs spritesheets are too hard.
    cardsspr = [];
    cardsp = [
        "./resources/weapons/0.png",
        "./resources/weapons/1.png",
        "./resources/weapons/2.png",
        "./resources/weapons/3.png",
        "./resources/weapons/4.png",
    ]

    loadout = [0, 1, 2, 3, 4]

    cards = null;

    init = function() {
        this.cards = new PIXI.Container();
        //import sprite from cards path
        this.cardsspr = [];
        
        for(let i=0; i<this.cardsp.length; i++) {
            this.cardsspr[i] = PIXI.Sprite.from(this.cardsp[i])
        }

        for(let i=0; i<5; i++) {
            let card = this.cardsspr[this.loadout[i]]
            card.scale.set(0.4, 0.4)
            card.y=140*i;
            this.cards.addChild(card)
        }
    }
}