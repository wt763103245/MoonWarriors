/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-13 17:34:03
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\sprite\ShipSprite.js
 * @Email: 763103245@qq.com
 */
/**飞机精灵 */
var ShipSprite = cc.Sprite.extend({
    /**@type {cc.Rect|{x: Number, y: Number, width: Number, height: Number}} 碰撞区域(长方形区域) */
    _rect: null,
    /**@type {Boolean} 玩家是否可被攻击 */
    _canBeAttack: true,
    /**@type {Number} ？玩家被攻击是生命颜色 */
    _hurtColorLife: 0,
    /**@type {Number} 玩家生命值 */
    HP: GC.HP,
    /**@type {Boolean} 玩家是否启用 */
    active: true,
    /**初始化
     * @param {String} aTexture 默认图片路径
     */
    ctor: function (aTexture) {
        this._super(aTexture);
        /**@type {cc.Size} 飞机精灵宽高 */
        let size = this.getContentSize()
        /**@type {cc.Rect} 触摸范围 */
        this._rect = cc.rect(0, 0, size.width, size.height);
        //事件穿透
        //监听玩家触摸屏幕事件
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,//这个模式会在整个层上相应事件，但我们只想要点击到飞船时才有事件
            //是否吞噬事件，如果不吞噬，那点击事件会继续向下面的层传递，这里是true，即不向下传递
            swallowTouches: true,
            //三个方法，必须第一个方法为true才会执行下面两个
            //触摸接触
            onTouchBegan: this.onTouchBegan,
            //触摸拖动
            onTouchMoved: this.onTouchMoved,
            //触摸结束
            onTouchEnded: this.onTouchEnded,
            //触摸取消，指移出可触摸位置
            onTouchCancelled: this.onTouchCancelled
        }, this);

        //玩家飞船动画
        //两个帧动画
        let _getFrame = cc.spriteFrameCache.getSpriteFrame
        //放到一个统一的数组里
        var animFrames = [];
        //飞机序列帧添加到列表中
        for (var i = 0; i < animFrames.length; i++) {
            animFrames.push(_getFrame("ship" + (i < 10 ? ("0" + i) : i) + ".png"))
        }
        /**@type {cc.Animation} 玩家飞机帧动画，间隔时间0.1 */
        var animation = new cc.Animation(animFrames, 0.1);//0.1应该是采样速度，1秒10次
        /**@type {cc.Animate} 玩家飞机序列帧动画 */
        var animate = cc.animate(animation);
        //永远执行玩家飞机动画
        animate.repeatForever()
        //播放动画
        this.runAction(animate);

        //开火，每秒6次
        this.schedule(this.shoot, 1 / 6);
        //初始化重生特效
        this.initBornSprite();
        //开始重生
        this.born();
    },
    /**是否是触摸范围内
     * @param {cc.Sprite|cc.Node} touch 触摸对象
     * @returns {Boolean} 是否在玩玩家碰撞盒中
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
     * @returns {cc.Rect|{x: Number, y: Number, width: Number, height: Number}} 飞船矩形碰撞盒，未设定位置，以0,0为坐标
     */
    getRect: function () {
        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
    },
    /**当发生点击事件的时候，判断点击位置是否在飞船区域内
     * @param {*} touch 触摸对象相关信息
     * @param {*} event 事件返回相关参数
     * @returns {Boolean} 是否成功触摸
     */
    onTouchBegan: function (touch, event) {
        //event.getCurrentTarget()指向当前类，可以理解成this
        return event.getCurrentTarget().isTouchInRect(touch)
    },
    /**按住鼠标并移动时 */
    onTouchMoved: function (touch, event) {
        //获取点击的目标，也就是飞机。设置飞船坐标为鼠标坐标
        //event.getCurrentTarget()指向当前类，可以理解成this
        event.getCurrentTarget().setPosition(touch.getLocation())
    },
    /**触摸结束 */
    onTouchEnded: function (touch, event) {
        // var target = event.getCurrentTarget();
    },
    /**触摸取消 */
    onTouchCancelled: function (touch, event) {
        // var target = event.getCurrentTarget();
    },
    /**玩家每帧更新方法
     * @param {Number} dt 与上一帧间隔的时间 
     */
    update: function (dt) {
        //玩家生命值低于0
        if (this.HP <= 0) {
            /**@type {Boolean} 禁用 */
            this.active = false;
            //销毁玩家方法
            this.destroy();
        }
    },
    /**玩家销毁事件 */
    destroy: function () {
        //玩家生命-1
        GC.LIFE--;
        /**@type {cc.ParticleSystem} 通过缓存获得一个爆炸效果精灵 */
        var explosion = ExplosionSprite.getOrCreateExplosion();
        //设置爆炸效果的位置
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
    /**玩家受到伤害事件 */
    hurt: function () {
        //玩家是否可被攻击
        if (this._canBeAttack) {
            
            this._hurtColorLife = 2;
            //生命值下降
            this.HP--;
        }
    },
    collideRect: function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 2, w, h / 2);
    },
    /**初始化爆炸效果精灵 */
    initBornSprite: function () {
        /**@type {cc.Sprite} 爆炸效果精灵 */
        this._bornSprite = new cc.Sprite("#ship03.png");
        //设置混合函数，让精灵随透明度变化
        this._bornSprite.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        //设置爆炸特效位置
        this._bornSprite.x = this.width / 2;
        this._bornSprite.y = this.height / 2;
        /**@type {Boolean} 隐藏这个爆炸效果精灵 */
        this._bornSprite.visible = false;
        //将爆炸效果精灵添加到飞机精灵中，优先级为3000，标签为99999
        this.addChild(this._bornSprite, 3000, 99999);
    },
    /**重生效果，玩家会突然变大，然后慢慢变小，期间无法被攻击 */
    born: function () {
        //revive effect
        /**@type {Boolean} 玩家是否可以被攻击 */
        this._canBeAttack = false;
        /**@type {Number} 缩放大小 */
        this._bornSprite.scale = 8;
        //玩家缩放大小变化到正常，0.5秒，缩放到1
        this._bornSprite.runAction(cc.scaleTo(0.5, 1, 1));
        /**@type {Boolean} 重生效果精灵显示 */
        this._bornSprite.visible = true;
        /**@type {cc.Action} 闪烁效果，3秒闪9次 */
        var blinks = cc.blink(3, 9);
        /**闪烁结束后执行的回调 */
        var makeBeAttack = cc.callFunc(function (t) {
            /**@type {Boolean} 玩家可以被攻击 */
            t._canBeAttack = true;
            /**@type {Boolean} 玩家玩家显示 */
            t.visible = true;
            /**@type {Boolean} 隐藏重生特效 */
            t._bornSprite.visible = false;
        }.bind(this));
        //执行动画，按顺序执行，先延迟0.5秒，在闪烁3秒9次，最后执行回调
        this.runAction(cc.sequence(cc.delayTime(0.5), blinks, makeBeAttack));
        /**@type {Number} 恢复玩家生命为5 */
        this.HP = GC.HP;

        this._hurtColorLife = 0;
        /**@type {Boolean} 玩家启用 */
        this.active = true;
    }
});