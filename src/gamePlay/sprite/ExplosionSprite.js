/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-07 17:19:16
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\sprite\ExplosionSprite.js
 * @Email: 763103245@qq.com
 */
/**@type {cc.Sprite} 爆炸动画精灵 */
var ExplosionSprite = cc.Sprite.extend({
    active: true,
    animation: null,
    ctor: function () {
        /**@type {cc.SpriteFrame} 得到精灵帧 */
        var pFrame = cc.spriteFrameCache.getSpriteFrame("explosion_01.png");
        this._super(pFrame);
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    /**爆炸动画 */
    play: function () {
        var animFrames = [];
        var str = "";
        for (var i = 1; i < 35; i++) {
            str = "explosion_" + (i < 10 ? ("0" + i) : i) + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var animation = new cc.Animation(animFrames, 0.04);

        this.runAction(cc.sequence(
            cc.animate(animation),
            cc.callFunc(this.destroy, this)
        ));
    },
    destroy: function () {
        this.visible = false;
        this.active = false;
    }
});

ExplosionSprite.getOrCreateExplosion = function () {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.EXPLOSIONS.length; j++) {
        var selChild = GC.CONTAINER.EXPLOSIONS[j];
        if (selChild.active == false) {
            selChild.visible = true;
            selChild.active = true;
            selChild.play();
            return selChild;
        }
    }
    selChild = ExplosionSprite.create();
    selChild.play();
    return selChild;
};
ExplosionSprite.create = function () {
    var explosion = new ExplosionSprite();
    g_GPTouchLayer.addExplosions(explosion);
    GC.CONTAINER.EXPLOSIONS.push(explosion);
    return explosion;
};

ExplosionSprite.preSet = function () {
    var explosion = null;
    for (var i = 0; i < 6; i++) {
        explosion = ExplosionSprite.create();
        explosion.visible = false;
        explosion.active = false;
    }
};
