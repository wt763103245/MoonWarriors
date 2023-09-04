/**
 * Created by lingjianfeng on 14-8-31.
 */

var GPBackgroundLayer = cc.Layer.extend({
    ctor : function(){
        this._super();
        this.initBackground();
    },
    initBackground : function(){
        this._sptBg = new cc.Sprite("#bg01.png");
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});
