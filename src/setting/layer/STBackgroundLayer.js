/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 17:32:26
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
        this._sptBg = cc.Sprite.create(res.mm_bg_png);
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    }
});

