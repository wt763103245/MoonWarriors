/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-13 16:24:12
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\setting\layer\STTouchLayer.js
 * @Email: 763103245@qq.com
 */
/**设置界面触摸层 */
var STTouchLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        //初始化触摸层ui相关
        this.initTouchAbout();
    },
    /**初始化触摸层 */
    initTouchAbout: function () {
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.st_menuTitle_png);
        /**@type {cc.Sprite} option图片 */
        var title = new cc.Sprite(cacheImage, cc.rect(0, 0, 134, 34));
        title.x = GC.w_2;
        title.y = GC.h - 120;
        this.addChild(title);
        //设置MenuItemFont字体以及大小
        //Sound
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title1 = new cc.MenuItemFont(Language.Sound);
        title1.setEnabled(false);
        //ON OFF
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item1 = new cc.MenuItemToggle(
            new cc.MenuItemFont(Language.On),
            new cc.MenuItemFont(Language.Off)
        );
        //设置函数回调，开启/关闭音乐
        item1.setCallback(this.onSoundControl);
        item1.setSelectedIndex(GC.SOUND_ON ? 0 : 1);
        //难度
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title2 = new cc.MenuItemFont(Language.GameMode);
        title2.setEnabled(false);
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var item2 = new cc.MenuItemToggle(
            new cc.MenuItemFont(Language.Easy),
            new cc.MenuItemFont(Language.Normal),
            new cc.MenuItemFont(Language.Hard)
        );
        item2.setCallback(this.onModeControl);
        //返回
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        var label = new cc.LabelTTF(Language.Back, "Arial", 20);
        var back = new cc.MenuItemLabel(label, this.onBackCallback);
        back.scale = 0.8;
        //设置总的菜单，相当于把上面的元素都放到一个集合里
        var menu = new cc.Menu(title1, title2, item1, item2, back);
        //  类似网格布局，三行，第一行为2列，第二行为2列，第三行为1列
        menu.alignItemsInColumns(2, 2, 1);
        back.y -= 50;//必须在menu之后设置位置
        this.addChild(menu);
    },
    onSoundControl: function () {
        GC.SOUND_ON = !GC.SOUND_ON;
        var audioEngine = cc.audioEngine;
        if (GC.SOUND_ON) {
            !cc.audioEngine.isMusicPlaying() && cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        } else {
            audioEngine.stopMusic();
            audioEngine.stopAllEffects();
        }
    },
    //难度设置按钮
    onModeControl: function () {
        //难度功能没有实现
    },
    onBackCallback: function () {
        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
    }
});