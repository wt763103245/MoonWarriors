/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 17:24:04
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\about\scene\About.js
 * @Email: 763103245@qq.com
 */
/**关于界面层 */
var AboutLayer = cc.Layer.extend({
    _backgroundLayer: null,
    _touchLayer: null,
    ctor: function () {
        this._super()
        this.addBackgroundLayer();
        this.addTouchLayer();
    },
    addBackgroundLayer: function () {
        this._backgroundLayer = new ABBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    addTouchLayer: function () {
        this._touchLayer = new ABTouchLayer();
        this.addChild(this._touchLayer);
    }
});
var AboutScene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new AboutLayer();
        this.addChild(layer);
    }
});