/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 16:04:05
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\setting\scene\Setting.js
 * @Email: 763103245@qq.com
 */
/**设置界面 */
var SettingLayer = cc.Layer.extend({
    /**设置界面背景层 */
    _backgroundLayer: null,
    /**触摸层 */
    _touchLayer: null,
    ctor: function () {
        this._super()
        //添加设置界面的背景
        this.addBackgroundLayer();
        //添加触摸层
        this.addTouchLayer();
    },
    /**添加背景层 */
    addBackgroundLayer: function () {
        console.log("----test添加背景层");
        this._backgroundLayer = new STBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    /**添加触摸层 */
    addTouchLayer: function () {
        console.log("----test添加触摸层");
        this._touchLayer = new STTouchLayer();
        this.addChild(this._touchLayer);
    }
});
var SettingScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        /**@type {cc.Layer} 设置界面层 */
        var layer = new SettingLayer();
        this.addChild(layer);
        /**@type {cc.Layer} 设置界面菜单层 */
        var menu = new MMMainMenuLayer();
        //添加到当前设置成中，优先度为1
        this.addChild(menu, 1);
    }
});