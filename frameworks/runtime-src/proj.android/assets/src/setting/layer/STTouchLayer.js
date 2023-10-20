/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-10-20 19:53:31
 * @FilePath: \MoonWarriors\src\setting\layer\STTouchLayer.js
 * @Email: 763103245@qq.com
 */
/**读取设置 */
var LoadSetting = function () {
    var data = {
        "sound": [
            function (key) {
                let value = cc.sys.localStorage.getItem(key);
                if (value == "true") {
                    value = true;
                } else if (value == "false") {
                    value = false;
                } else {
                    value = GC.SOUND_ON;
                };
                return value;
            },
            function (value) {
                GC.SOUND_ON = value;
            },
        ],
        "level": [
            function (key) {
                let value = cc.sys.localStorage.getItem(key);
                value = value ? Number(value) : GC.GAMESETTINGS.CURRENTLEVEL;
                return value;
            },
            function (value) {
                GC.GAMESETTINGS.CURRENTLEVEL = value;
            },
        ],
    };
    for (var key in data) {
        let _data = data[key];
        let _value = _data[0](key);
        _data[1](_value);
    };
}
/**设置界面触摸层 */
var STTouchLayer = cc.Layer.extend({
    /**设置相关参数 */
    _data: {},
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
        title.y = GC.h - ((120 / 480) * GC.h);
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
        item1.setCallback(this.onSoundControl.bind(this));
        item1.setSelectedIndex(GC.SOUND_ON ? 0 : 1);
        //难度
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(18);
        var title2 = new cc.MenuItemFont(Language.GameMode);
        title2.setEnabled(false);
        cc.MenuItemFont.setFontName("Arial");
        cc.MenuItemFont.setFontSize(26);
        //难度菜单按钮
        var item2 = new cc.MenuItemToggle(
            new cc.MenuItemFont(Language.Easy),
            new cc.MenuItemFont(Language.Normal),
            new cc.MenuItemFont(Language.Hard)
        );
        //初始化时，获取当前游戏难度
        item2.setSelectedIndex(GC.GAMESETTINGS.CURRENTLEVEL);
        //设置菜单按钮回调
        item2.setCallback(this.onModeControl.bind(this), item2);
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
    /**音效开关菜单按钮回调 */
    onSoundControl: function () {
        GC.SOUND_ON = !GC.SOUND_ON;
        var audioEngine = cc.audioEngine;
        if (GC.SOUND_ON) {
            !cc.audioEngine.isMusicPlaying() && cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        } else {
            audioEngine.stopMusic();
            audioEngine.stopAllEffects();
        };
        //保存设置
        this.saveSetting();
    },
    /**难度菜单按钮回调
     * @param {*} sender 难度设置按钮
     */
    onModeControl: function (sender) {
        /**@type {Number} 获取当前选中的选项的索引 */
        var selectedIndex = sender.getSelectedIndex();
        // var selectedItem = sender.getSelectedItem(); // 获取当前选中的选项  
        /**@type {Number} 游戏难度变更 */
        GC.GAMESETTINGS.CURRENTLEVEL = selectedIndex;

        //保存到本地
        this.saveSetting();
    },
    /**读取设置 */
    loadSetting: function () {
        //读取设置参数
        LoadSetting();
    },
    /**保存设置 */
    saveSetting: function () {
        var data = {
            "sound": function (key) {
                cc.sys.localStorage.setItem(key, GC.SOUND_ON ? "true" : "false");
            },
            "level": function (key) {
                cc.sys.localStorage.setItem(key, GC.GAMESETTINGS.CURRENTLEVEL.toString());
            },
        };
        for (var key in data) {
            data[key](key);
        };
    },
    /**返回菜单按钮回调 */
    onBackCallback: function () {
        cc.director.runScene(new cc.TransitionFade(1.2, new MainMenuScene()));
    },
});