/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 16:01:42
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\setting\layer\STBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**设置界面背景层 */
var STBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super()
        //初始化界面背景
        this.initBackground();
    },
    /**初始化设置界面背景 */
    initBackground: function () {
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.mm_bg_png);
        /**@type {cc.Sprite} 创建背景图片精灵 */
        this._sptBg = cc.Sprite.create(cacheImage);
        //居中，默认锚点为0.5,0.5
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        //添加到背景层
        this.addChild(this._sptBg);
    }
});

