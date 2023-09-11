/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 17:18:27
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gameOver\scene\GameOver.js
 * @Email: 763103245@qq.com
 */
/**游戏结束层 */
var GameOverLayer = cc.Layer.extend({
    /**@type {cc.Layer} 游戏结束界面背景层 */
    _backgroundLayer: null,
    /**@type {cc.Layer} 游戏结束界面触摸层 */
    _touchLayer: null,
    ctor: function () {
        this._super();
        //添加背景
        this.addBackgroundLayer();
        //添加触摸
        this.addTouchLayer();
    },
    /**添加背景 */
    addBackgroundLayer: function () {
        this._backgroundLayer = new GOBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    /**添加触摸 */
    addTouchLayer: function () {
        this._touchLayer = new GOTouchLayer();
        this.addChild(this._touchLayer, 1);
    }
});
/**游戏结束界面 */
var GameOverScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new GameOverLayer();
        this.addChild(layer);
        var menu = new MMMainMenuLayer();
        this.addChild(menu, 1);
    }
});