/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 19:35:09
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\scene\GamePlay.js
 * @Email: 763103245@qq.com
 */
/**游戏层 */
var GamePlayLayer = cc.Layer.extend({
    /**游戏背景层 */
    _backgroundLayer: null,
    /**游戏触摸层 */
    _touchLayer: null,
    ctor: function () {
        this._super();
        //添加游戏相关缓存
        this.addCache();
        //添加游戏背景层
        this.addBackgroundLayer();
        //添加触摸层
        this.addTouchLayer();
    },
    /**添加缓存资源 */
    addCache: function () {
        cc.spriteFrameCache.addSpriteFrames(res.gp_TextureOpaquePack_plist);
        cc.spriteFrameCache.addSpriteFrames(res.gp_b01_plist);
        cc.spriteFrameCache.addSpriteFrames(res.gp_Explosion_plist);
    },
    /**添加背景 */
    addBackgroundLayer: function () {
        this._backgroundLayer = new GPBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    /**业务逻辑层 */
    addTouchLayer: function () {
        this._touchLayer = new GPTouchLayer();
        this.addChild(this._touchLayer);
    }
});
/**添加游戏场景 */
var GamePlayScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GamePlayLayer();
        this.addChild(layer);
        /*var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);*/
    }
});