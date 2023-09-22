/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 17:21:15
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gameOver\layer\GOTouchLayer.js
 * @Email: 763103245@qq.com
 */
var GOTouchLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //播放音乐
        this.playMusic();
        //初始化触摸层
        this.initTouchAbout();
    },
    /**播放音乐 */
    playMusic: function () {
        //是否开启背景音乐，没有播放中，播放音乐
        GC.SOUND_ON && !cc.audioEngine.isMusicPlaying() && cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
    },
    initTouchAbout: function () {
        //获得重新开始游戏按钮的贴图，三个状态
        var playAgainNormal = new cc.Sprite(res.mm_menu_png, cc.rect(378, 0, 126, 33));
        var playAgainSelected = new cc.Sprite(res.mm_menu_png, cc.rect(378, 33, 126, 33));
        var playAgainDisabled = new cc.Sprite(res.mm_menu_png, cc.rect(378, 33 * 2, 126, 33));
        //重新开始游戏按钮的设定，按钮的三个状态，按钮回调，回调传入this
        var playAgain = new cc.MenuItemSprite(
            playAgainNormal,
            playAgainSelected,
            playAgainDisabled,
            this.onPlayAgain,
            this
        );
        /**@type {cc.Menu} 创建一个重开游戏的菜单按钮 */
        var menu = new cc.Menu(playAgain);
        //设定位置，垂直居中、y220
        menu.x = GC.w_2;
        menu.y = (220 / 480) * GC.h;
        //添加到触摸层中
        this.addChild(menu);
        // -!tag 菜单按钮点击跳转到对应网址 @wt763103245
        /*var labCocos = new cc.LabelTTF("Download Cocos2d-html5","Arial",14);
        var labSample = new cc.LabelTTF("Download This Sample","Arial",14);
        var menu1 = new cc.MenuItemLabel(labCocos, function(){
            window.location.href = "http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Cocos2d-html5";
        });
        var menu2 = new cc.MenuItemLabel(labSample, function(){
            window.location.href = "https://github.com/ShengxiangChen/MoonWarriors";
        });
        var cocos2dMenu = new cc.Menu(menu1,menu2);
        cocos2dMenu.x = 160;
        cocos2dMenu.y = 80;
        cocos2dMenu.alignItemsVerticallyWithPadding(10);
        this.addChild(cocos2dMenu);*/
    },
    /**重新游戏按钮回调 */
    onPlayAgain: function () {
        //停止音乐
        cc.audioEngine.stopMusic();
        //停止所有音效
        cc.audioEngine.stopAllEffects();
        //新建游戏界面，淡入淡出
        cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
    }
});