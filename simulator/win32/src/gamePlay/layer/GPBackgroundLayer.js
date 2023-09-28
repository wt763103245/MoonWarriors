/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 19:41:01
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\layer\GPBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**游戏背景层 */
var GPBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //初始化背景
        this.initBackground();
    },
    /**初始化背景 */
    initBackground: function () {
        /**@type {cc.Sprite} 游戏界面背景图片精灵 */
        this._sptBg = new cc.Sprite("#bg01.png");
        //居中
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});
