/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 18:43:46
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\setting\layer\STBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**设置界面背景层 */
var STBackgroundLayer = cc.Layer.extend({
    ctor : function(){
        this._super()

        this.initBackground();
    },

    initBackground : function(){
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

