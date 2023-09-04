/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-04 18:37:17
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\mainMenu\scene\MainMenu.js
 * @Email: 763103245@qq.com
 */
// 定义一个层，继承自cc.Layer
//相当于游戏进入时的主界面
var MainMenuLayer = cc.Layer.extend({
    //属性声明
    /**@type {cc.Layer} 背景层 */
    _backgroundLayer: null,
    /**@type {cc.Layer} 触摸层 */
    _touchLayer: null,
    ctor: function () {
        //调用父类ctor方法。结合下面MainMenuScene中的onEnter 可以得出：this._super() 调用父类当前方法。
        this._super();
        //添加背景层
        this.addBackgroundLayer();
        //添加触摸层
        this.addTouchLayer();
    },
    /**添加背景层 */
    addBackgroundLayer: function () {
        //创建一个背景层，并且添加到当前层中
        this._backgroundLayer = new MMBackgroundLayer();
        this.addChild(this._backgroundLayer);
    },
    /**添加触摸层 */
    addTouchLayer: function () {
        this._touchLayer = new MMTouchLayer();
        this.addChild(this._touchLayer);
    }
});

// 定义一个场景，继承自cc.Scene
var MainMenuScene = cc.Scene.extend({
    onEnter: function () {
        //调用父类的onEnter()方法。
        this._super();
        /**@type {cc.Layer} 主界面 */
        var layer = new MainMenuLayer();
        //var layer = new GameOverLayer();
        this.addChild(layer);
    }
});