var GameOverLayer = cc.Layer.extend({

    _backgroundLayer : null,
    _touchLayer : null,
    ctor : function(){

        this._super();

        this.addBackgroundLayer();
        this.addTouchLayer();

    },

    addBackgroundLayer : function(){
        this._backgroundLayer = new GOBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new GOTouchLayer();
        this.addChild(this._touchLayer,1);
    }
});

var GameOverScene  = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new GameOverLayer();
        this.addChild(layer);

        var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);
    }
});