var SettingLayer = cc.Layer.extend({

    _backgroundLayer : null,
    _touchLayer : null,
    ctor : function(){

        this._super()

        this.addBackgroundLayer();

        this.addTouchLayer();

    },

    addBackgroundLayer : function(){
        this._backgroundLayer = new STBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new STTouchLayer();
        this.addChild(this._touchLayer);
    }
});


var SettingScene  = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new SettingLayer();
        this.addChild(layer);

        var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);
    }
});