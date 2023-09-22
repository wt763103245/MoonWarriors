/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 17:07:36
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\about\layer\ABBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**关于界面背景层 */
var ABBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initBackground();
    },
    /**初始化背景 */
    initBackground: function () {
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.mm_bg_png);
        this._sptBg = cc.Sprite.create(cacheImage);
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});
