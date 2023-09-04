/**
 * Created by lingjianfeng on 14-8-31.
 */

var AboutLayer = cc.Layer.extend({
    _backgroundLayer : null,
    _touchLayer : null,
    ctor : function(){
        this._super()
        this.addBackgroundLayer();
        this.addTouchLayer();
    },
    addBackgroundLayer : function(){
        this._backgroundLayer = new ABBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer : function(){
        this._touchLayer = new ABTouchLayer();
        this.addChild(this._touchLayer);
    }
});

var AboutScene  = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new AboutLayer();
        this.addChild(layer);
    }
});