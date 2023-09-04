var GamePlayLayer = cc.Layer.extend({
    _backgroundLayer : null,
    _touchLayer : null,
    ctor : function(){
        this._super();
        this.addCache();
        this.addBackgroundLayer();
        this.addTouchLayer();
    },
    //添加缓存资源
    addCache : function(){
        cc.spriteFrameCache.addSpriteFrames(res.gp_TextureOpaquePack_plist);
        cc.spriteFrameCache.addSpriteFrames(res.gp_b01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.gp_Explosion_plist);
    },
    //添加背景
    addBackgroundLayer : function(){
        this._backgroundLayer = new GPBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    //业务逻辑层
    addTouchLayer : function(){
        this._touchLayer = new GPTouchLayer();
        this.addChild(this._touchLayer);
    }
});

var GamePlayScene  = cc.Scene.extend({
    onEnter:function () {
        this._super();

        var layer = new GamePlayLayer();
        this.addChild(layer);

        /*var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);*/
    }
});