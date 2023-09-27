/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 17:35:51
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\mainMenu\layer\MMBackgroundLayer.js
 * @Email: 763103245@qq.com
 */
/**添加不可交互的背景层相关 */
var MMBackgroundLayer = cc.Layer.extend({
    /**@type {cc.Sprite} 主界面背景精灵 */
    _sptBg: null,
    /**@type {cc.Sprite} 主界面logo精灵 */
    _sptLogo: null,
    /**@type {cc.Sprite} 主界面飞船精灵 */
    _ship: null,
    ctor: function () {
        this._super()
        //将plist资源加载到内存中
        //添加飞船精灵图到缓存中
        cc.spriteFrameCache.addSpriteFrames(res.TextureTransparentPack_plist);
        //初始化背景
        this.initBackground();
        //初始化飞船
        this.initShip();
        //初始化logo
        this.initLogo();
    },
    /**初始化背景 */
    initBackground: function () {
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.mm_bg_png);
        //创建一个精灵作为背景，并且设置它的锚点为cc.p(0.5, 0.5)[锚点默认为0.5], 以及坐标定位在屏幕中间
        /**@type {cc.Sprite} */
        this._sptBg = new cc.Sprite(cacheImage);
        //修改精灵属性
        this._sptBg.attr({
            //修改锚点位置
            anchorX: 0.5,
            anchorY: 0.5,
            //修改位置
            x: GC.w_2,
            y: GC.h_2
        });
        //添加背景到当前界面
        this.addChild(this._sptBg);
    },
    /**初始化logo */
    initLogo: function () {
        var maxY = GC.h;
        /**@type {String} 添加图片缓存 */
        var cacheImage = cc.textureCache.addImage(res.mm_logo_png);
        /**@type {cc.Sprite} 主界面logo精灵 */
        this._sptLogo = new cc.Sprite(cacheImage);
        //设置精灵属性
        this._sptLogo.attr({
            //修改位置
            x: GC.w_2,
            y: maxY - ((160 / 480) * maxY)
        });
        //添加到当前界面，优先级为1
        this.addChild(this._sptLogo, 1);
    },
    /**添加飞船到背景上 */
    initShip: function () {
        //(#)号代表从内存中去获取一张纹理(图片)，因为我们前面有把那个plist加载到内存中
        this._ship = new cc.Sprite("#ship01.png");
        //添加一个飞船精灵到主界面上
        this.addChild(this._ship);
        /**@type {Number} 随机这个飞船的x坐标 */
        this._ship.x = Math.random() * GC.w;
        this._ship.y = 0;
        //运行一个moveBy类型的动作
        //定义一个动作，让飞船从当前位置，花2秒时间，移动到(Math.random() * GC.w, this._ship.y + GC.h + 100)位置
        this._ship.runAction(cc.moveBy(2, cc.p(Math.random() * GC.w, this._ship.y + GC.h + 100)));
        //定时器，每隔0.1秒去执行this.update()方法
        //用定时器实现一个update方法，间隔为0.1秒
        this.schedule(this.update, 0.1);
    },
    /**更新方法 */
    update: function () {
        //如果飞船移动到最上的时候（y超过480）
        if (this._ship.y > 480) {
            /**@type {Number} 随机x位置 */
            this._ship.x = Math.random() * GC.w;
            /**@type {Number} 将飞船移动到屏幕下面y10 */
            this._ship.y = (10/480) * GC.h;
            //让飞船执行一个动作，花费一定时间，移动到对应位置
            this._ship.runAction(cc.moveBy(
                //花费1-5秒
                parseInt(5 * Math.random(), 10),
                //移动到x（0-GC.w），y（490）的位置
                cc.p(Math.random() * GC.w, this._ship.y + GC.h)
                //-！这里可能会有bug，因为有可能还没有到490的位置就触发了这个，也有可能新的动作会把旧的动作顶掉 @wt
            ));
        }
    }
});