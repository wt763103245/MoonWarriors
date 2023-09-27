/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 16:47:38
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\sprite\ExplosionSprite.js
 * @Email: 763103245@qq.com
 */
/**@type {cc.Sprite} 爆炸动画精灵 */
var ExplosionSprite = cc.Sprite.extend({
    /**@type {Boolean} 是否已经启用 */
    active: true,
    /**@type {cc.Animation} 爆炸序列帧，每隔0.04 */
    animation: null,
    ctor: function () {
        /**@type {cc.SpriteFrame} 得到精灵帧 */
        var pFrame = cc.spriteFrameCache.getSpriteFrame("explosion_01.png");
        this._super(pFrame);
        //设置渲染对象的混合函数，使用对方透明度与自身颜色混合
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);

        //爆炸序列帧相关
        /**@type {String[]} 爆炸效果序列帧图片 */
        var animFrames = [];
        //循环34次，从1到34
        for (var i = 1; i < 35; i++) {
            /**@type {String} 爆炸序列帧图片 */
            var str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
            /**@type {cc.cc.SpriteFrame} 获得序列帧缓存 */
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            //添加到爆炸序列帧列表中
            animFrames.push(frame);
        }
        /**@type {cc.Animation} 爆炸序列帧，每隔0.04 */
        this.animation = new cc.Animation(animFrames, 0.04);
    },
    /**播放爆炸动画 */
    play: function () {
        //播放动画，按循序执行，播放爆炸序列帧，然后执行销毁方法
        this.runAction(cc.sequence(
            //爆炸序列帧
            cc.animate(this.animation),
            //回调销毁方法
            cc.callFunc(this.destroy, this)
        ));
    },
    /**销毁爆炸效果，只是隐藏，方便在缓存中调用 */
    destroy: function () {
        /**@type {Boolean} 隐藏这个爆炸效果 */
        this.visible = false;
        /**@type {Boolean} 取消启用这个爆炸 */
        this.active = false;
    }
});
/**得到没有启用的爆炸效果精灵，用来获得缓存中已经保存的爆炸动画
 * @returns {cc.Sprite|ExplosionSprite}
 */
ExplosionSprite.getOrCreateExplosion = function () {
    /**@type {cc.Sprite|ExplosionSprite} 获得到的没有使用的爆炸效果精灵 */
    var selChild = null;
    //循环当前已有的所有爆炸效果
    for (var j = 0; j < GC.CONTAINER.EXPLOSIONS.length; j++) {
        /**@type {cc.Sprite|ExplosionSprite} 当前爆炸效果精灵 */
        var selChild = GC.CONTAINER.EXPLOSIONS[j];
        //判断是否已经启用
        if (selChild.active == false) {
            /**@type {Boolean} 显示这个爆炸效果 */
            selChild.visible = true;
            /**@type {Boolean} 启用这个爆炸效果 */
            selChild.active = true;
            //播放这个爆炸动画
            selChild.play();
            //获得这个爆炸动画
            return selChild;
        }
    }
    /**@type {cc.Sprite|ExplosionSprite} 没有获得到缓存中的爆炸缓存，重新创建一个 */
    selChild = ExplosionSprite.create();
    //播放这个动画
    selChild.play();
    return selChild;
};
/**创建一个新的爆炸效果精灵，然后加到缓存中
 * @returns {cc.Sprite|ExplosionSprite} 爆炸效果精灵
 */
ExplosionSprite.create = function () {
    /**@type {cc.Sprite|ExplosionSprite} 新的爆炸效果精灵 */
    var explosion = new ExplosionSprite();
    //往游戏界面中添加这个爆炸效果
    g_GPTouchLayer.addExplosions(explosion);
    //添加到缓存中
    GC.CONTAINER.EXPLOSIONS.push(explosion);
    return explosion;
};
/**预设置6个爆炸效果精灵对象，初始化时加载6个到缓存中 */
ExplosionSprite.preSet = function () {
    for (var i = 0; i < 6; i++) {
        /**@type {cc.Sprite|ExplosionSprite} 爆炸效果精灵创建 */
        var explosion = ExplosionSprite.create();
        /**@type {Boolean} 隐藏 */
        explosion.visible = false;
        /**@type {Boolean} 禁用 */
        explosion.active = false;
    }
};
