/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 16:14:07
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\sprite\ShipSprite.js
 * @Email: 763103245@qq.com
 */
/**飞机精灵 */
var ShipSprite = cc.Sprite.extend({
    /**@type {cc.Rect} 碰撞区域 */
    _rect: null,
    _canBeAttack: true,
    /**@type {Number} */
    _hurtColorLife: 0,
    /**@type {Number} */
    HP: 5,
    /**@type {Boolean} */
    active: true,
    ctor: function (aTexture) {
        this._super(aTexture);
        /**@type {cc.Size} 飞机精灵宽高 */
        let size = this.getContentSize()
        /**@type {cc.Rect} 触摸范围 */
        this._rect = cc.rect(0, 0, size.width, size.height);
        //事件穿透
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//这个模式会在整个层上相应事件，但我们只想要点击到飞船时才有事件
            swallowTouches: true,//是否吞噬事件，如果不吞噬，那点击事件会继续向下面的层传递，这里是true，即不向下传递
            onTouchBegan: this.onTouchBegan,//三个方法，必须第一个方法为true才会执行下面两个
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded,
            onTouchCancelled: this.onTouchCancelled
        }, this);
        
        //玩家飞船动画
        //两个帧动画
        var frame0 = cc.spriteFrameCache.getSpriteFrame("ship01.png");
        var frame1 = cc.spriteFrameCache.getSpriteFrame("ship02.png");
        //放到一个统一的数组里
        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        /**@type {cc.Animation} 玩家飞机帧动画 */
        var animation = new cc.Animation(animFrames, 0.1);//0.1应该是采样速度，1秒10次
        var animate = cc.animate(animation);
        /**永远执行animate.repeatForever */
        var action = animate.repeatForever();
        this.runAction(action);

        //开火，每秒6次
        this.schedule(this.shoot, 1 / 6);
        this.initBornSprite();
        this.born();
    },
    /**是否是触摸范围内
     * @param {*} touch 
     * @returns {Boolean}
     */
    isTouchInRect: function (touch) {
        //this.pos是图片中心点的坐标，-this._rect.width/2则是图片矩形左上角的x，y的处理也同理
        /**@type {cc.Point|{x: Number, y: Number}} 触摸位置 */
        var getPoint = touch.getLocation();
        /**@type {cc.Rect} 飞船矩形碰撞盒(0,0) */
        var myRect = this.getRect();
        //设定当前飞船位置的矩形碰撞盒
        myRect.x += this.x;
        myRect.y += this.y;
        //判断做个坐标是否在这个矩形里面
        return cc.rectContainsPoint(myRect, getPoint);
    },
    /**得到飞船的矩形碰撞盒
     * @returns {cc.Rect} 飞船矩形碰撞盒，未设定位置，以0,0为坐标
     */
    getRect: function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
    },
    //当发生点击事件的时候，判断点击位置是否在飞船区域内
    onTouchBegan: function (touch, event) {
        //event.getCurrentTarget()指向当前类，可以理解成this
        return event.getCurrentTarget().isTouchInRect(touch)
    },
    //按住鼠标并移动时
    onTouchMoved: function (touch, event) {
        //获取点击的目标，也就是飞机。设置飞船坐标为鼠标坐标
        //event.getCurrentTarget()指向当前类，可以理解成this
        event.getCurrentTarget().setPosition(touch.getLocation())
    },
    onTouchEnded: function (touch, event) {
        // var target = event.getCurrentTarget();
    },
    onTouchCancelled: function (touch, event) {
        // var target = event.getCurrentTarget();
    },
    update: function (dt) {
        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },
    /**玩家受到伤害 */
    destroy: function () {
        //生命值-1
        GC.LIFE--;
        /**@type {cc.ParticleSystem}  */
        var explosion = ExplosionSprite.getOrCreateExplosion();
        explosion.x = this.x;
        explosion.y = this.y;
        //是否开启音效，播放摧毁音效
        GC.SOUND_ON && cc.audioEngine.playEffect(res.gp_shipDestroyEffect_mp3);
    },
    /**玩家飞机自动开火
     * @param {Number} dt ？与上一帧的间隔时间，单位秒
     */
    shoot: function (dt) {
        //在机身前方一小段距离生成一左一右2颗子弹
        //左边的子弹
        var leftBullet = BulletSprite.getOrCreateBullet(GC.BULLET_SPEED.SHIP, "W1.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.PLAYER_BULLET);
        leftBullet.x = this.x - 13;
        leftBullet.y = this.y + 3 + this.height * 0.3;
        //右边的子弹
        var rightBullet = BulletSprite.getOrCreateBullet(GC.BULLET_SPEED.SHIP, "W1.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.PLAYER_BULLET);
        rightBullet.x = this.x + 13;
        rightBullet.y = this.y + 3 + this.height * 0.3;
    },
    hurt: function () {
        if (this._canBeAttack) {
            this._hurtColorLife = 2;
            this.HP--;
        }
    },
    collideRect: function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    },
    initBornSprite: function () {
        this._bornSprite = new cc.Sprite("#ship03.png");
        this._bornSprite.setBlendFunc(cc.SRC_ALPHA, cc.ONE);

        this._bornSprite.x = this.width / 2;
        this._bornSprite.y = this.height / 2;
        this._bornSprite.visible = false;
        this.addChild(this._bornSprite, 3000, 99999);
    },
    born: function () {
        //revive effect
        this._canBeAttack = false;
        this._bornSprite.scale = 8;
        this._bornSprite.runAction(cc.scaleTo(0.5, 1, 1));
        this._bornSprite.visible = true;
        var blinks = cc.blink(3, 9);
        var makeBeAttack = cc.callFunc(function (t) {
            t._canBeAttack = true;
            t.visible = true;
            t._bornSprite.visible = false;
        }.bind(this));
        this.runAction(cc.sequence(cc.delayTime(0.5), blinks, makeBeAttack));

        this.HP = 5;
        this._hurtColorLife = 0;
        this.active = true;
    }
});