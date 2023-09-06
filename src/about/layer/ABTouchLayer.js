/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 19:01:52
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\about\layer\ABTouchLayer.js
 * @Email: 763103245@qq.com
 */
/**关于界面触摸层 */
var ABTouchLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.initTouchAbout();
    },
    /**初始化触摸层 */
    initTouchAbout: function () {
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.st_menuTitle_png);
        var title = new cc.Sprite(cacheImage, cc.rect(0, 36, 134, 34));
        title.attr({
            x: GC.w_2 + 20,
            y: GC.h - 60,
            anchorX: 0.5,
            anchorY: 0
        });
        this.addChild(title);
        var about = new cc.LabelTTF(
            Language.About,
            "Arial",
            14,
            cc.size(GC.w * 0.85, 320),
            cc.TEXT_ALIGNMENT_CENTER
        );
        about.attr({
            x: GC.w_2,
            y: GC.h_2 - 20,
            anchorX: 0.5,
            anchorY: 0.5
        });
        this.addChild(about);
        /**@type {cc.LabelTTF} 返回文本 */
        var label = new cc.LabelTTF(Language.Back, "Arial", 14);
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        var menu = new cc.Menu(back);
        menu.x = GC.w_2;
        menu.y = 40;
        this.addChild(menu);

    },
    onBackCallback: function () {
        // cc.log("[STTouchLayer] : onBack");
        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
    }
});