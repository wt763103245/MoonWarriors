/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 17:00:59
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gameOver\layer\GOBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**游戏结束界面 */
var GOBackgroundLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //初始化背景
        this.initBackground();
        //初始化logo
        this.initLogo();
        //初始化分数相关
        this.initScore();
    },
    /**初始化背景 */
    initBackground: function () {
        /**@type {cc.Sprite} 新建一个背景图片的精灵 */
        this._sptBg = new cc.Sprite(res.mm_bg_png);
        //居中
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    },
    /**初始化logo */
    initLogo: function () {
        //屏幕高宽
        var maxX = GC.w;
        var maxY = GC.h;
        /**@type {cc.Sprite} 以游戏结束图片新建一个精灵 */
        var logo = new cc.Sprite(res.go_gameOver_png);
        //设置位置，锚点为0,0，位置为(0,300)如果屏幕是320的话在左上
        logo.attr({
            anchorX: 0,
            anchorY: 0,
            x: 0,
            y: (300 / 320) * maxY
        });
        this.addChild(logo);
        /**@type {cc.Sprite} 以cocos2d_html5 logo创建一个精灵 */
        var cocos2dhtml5 = new cc.Sprite(res.go_cocos2d_html5_png);
        //设定位置在(160,150)大概在中间的位置
        cocos2dhtml5.x = (160 / 320) * maxX;
        cocos2dhtml5.y = (150 / 320) * maxY;
        this.addChild(cocos2dhtml5);
    },
    /**初始化分数相关 */
    initScore: function () {
        //屏幕高宽
        var maxX = GC.w;
        var maxY = GC.h;
        /**@type {cc.LabelTTF} 创建一个文本控件，显示玩家的分数，字体为"Arial Bold"，字号为16 */
        var lbScore = new cc.LabelTTF(Language.YourScore + ":" + GC.SCORE, "Arial Bold", 16);
        //设置分数显示位置
        lbScore.x = (160 / 320) * maxX;
        lbScore.y = (280 / 320) * maxY;
        /**@type {cc.Color} 设置文本字体颜色 */
        lbScore.color = cc.color(250, 179, 0);
        this.addChild(lbScore);
    }
});
