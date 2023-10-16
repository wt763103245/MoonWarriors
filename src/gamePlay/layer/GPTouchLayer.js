/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-10-16 16:46:08
 * @FilePath: \MoonWarriors\src\gamePlay\layer\GPTouchLayer.js
 * @Email: 763103245@qq.com
 */
//游戏状态
/**@type {Number} 游戏中 */
STATE_PLAYING = 0;
/**@type {Number} 游戏结束 */
STATE_GAMEOVER = 1;

MAX_CONTAINT_WIDTH = 40;
MAX_CONTAINT_HEIGHT = 40;

//当前层对外引用，也就是说，可以在其他地方直接通过g_GPTouchLayer指向当前层，从而获取当前层里面的属性和方法等等。
/**@type {cc.Layer} 当前运行中的游戏层 */
var g_GPTouchLayer;
/**游戏触摸层 */
var GPTouchLayer = cc.Layer.extend({
    /**@type {cc.SpriteBatchNode} 游戏特效贴图相关 批量节点 */
    _texOpaqueBatch: null,
    /**@type {cc.SpriteBatchNode} 飞船贴图和游戏背景 的精灵表 生成的批量节点 */
    _texTransparentBatch: null,
    /**@type {cc.LabelBMFont|cc.SpriteBatchNode} 分数，设置分数文本控件参数 */
    _lbScore: null,
    /**@type {cc.Sprite|ShipSprite} 玩家飞船 */
    _ship: null,
    /**@type {Number} 当前游戏状态 */
    _state: STATE_PLAYING,
    /**@type {Number} 当前游戏时长s */
    _time: null,
    /**@type {Number} 临时分数 */
    _tmpScore: 0,
    /**@type {cc.LabelTTF} 生命数量文本控件，使用系统字体Arial，大小为20 */
    _lbLife: null,
    /**@type {cc.SpriteBatchNode} 爆炸特效的批量节点 */
    _explosions: null,
    ctor: function () {
        this._super();
        //播放游戏音乐
        this.playMusic();
        //重置相关信息
        /**@type {Number} 玩家分数，重置 */
        GC.SCORE = 0;
        //初始化玩家血量
        this.initPlayerHp();

        //重置游戏场景中的物体
        this.initContainers();

        //重置游戏状态，游戏状态改为游戏中
        GC.GAME_STATE = GC.GAME_STATE_ENUM.PLAY;
        //指向当前层
        g_GPTouchLayer = this;
        /**@type {Number} 设置当前游戏状态 */
        this._state = STATE_PLAYING;
        /**@type {LevelManager} 难度等级控制器类 */
        this._levelManager = new LevelManager(this);
        //初始化批量节点
        this.initBatchNode();
        //初始化游戏相关数据ui
        this.initAboutInfo();
        //初始化玩家飞船
        this.initShip();

        //每一帧都会调用update方法。
        this.scheduleUpdate();

        //定时器每1秒执行this.scoreCounter，用来创建敌人
        this.schedule(this.scoreCounter, 1);//每秒尝试添加一个敌人
        //子弹、敌人等预备
        //添加到缓存中，方便快速调用
        BulletSprite.preSet();
        EnemySprite.preSet();
        SparkEffectSprite.preSet();
        ExplosionSprite.preSet();
    },
    /**播放游戏音乐 */
    playMusic: function () {
        /**判断游戏是否启用音效 */
        GC.SOUND_ON && cc.audioEngine.playMusic(res.gp_bgMusic_mp3, true);
    },
    /**初始化玩家血量 */
    initPlayerHp: function () {
        /**玩家当前血量等于默认血量 */
        GC.LIFE = GC._LIFE;
    },
    /**初始化场景相关 */
    initContainers: function () {
        /**场景中的敌人数量归零 */
        GC.ACTIVE_ENEMIES = 0;
        /**敌人 */
        GC.CONTAINER.ENEMIES = [];
        /**敌人子弹 */
        GC.CONTAINER.ENEMY_BULLETS = [];
        /**玩家子弹 */
        GC.CONTAINER.PLAYER_BULLETS = [];
        /**光效 */
        GC.CONTAINER.SPARKS = [];
        /**爆炸效果 */
        GC.CONTAINER.EXPLOSIONS = [];
    },
    /**初始化批量处理节点，用来高效加载同纹理精灵 */
    initBatchNode: function () {
        //创建3个BatchNode，并为其中一个设置渲染方式
        //光效
        /**@type {String} 添加贴图到缓存，如果缓存中存在，则直接获取 */
        var texOpaque = cc.textureCache.addImage(res.gp_TextureOpaquePack_png);
        /**@type {cc.SpriteBatchNode} 创建批量节点 */
        this._texOpaqueBatch = new cc.SpriteBatchNode(texOpaque);
        //设置渲染模式
        this._texOpaqueBatch.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        //添加到当前层
        this.addChild(this._texOpaqueBatch);

        //飞船
        var texTransparent = cc.textureCache.addImage(res.TextureTransparentPack_png);
        /**@type {cc.SpriteBatchNode|cc.Node} 飞船贴图和游戏背景 的精灵表 生成的批量节点 */
        this._texTransparentBatch = new cc.SpriteBatchNode(texTransparent);
        this.addChild(this._texTransparentBatch);

        //爆炸
        var explosionTexture = cc.textureCache.addImage(res.gp_Explosion_png);
        this._explosions = new cc.SpriteBatchNode(explosionTexture);
        //设置混合函数，用于让爆炸效果再背景之上显示，
        this._explosions.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
        this.addChild(this._explosions);
    },
    /**添加游戏相关信息，比如玩家图标，分数等 */
    initAboutInfo: function () {
        var maxX = GC.w;
        var maxY = GC.h;
        /**@type {cc.LabelBMFont|cc.SpriteBatchNode} 分数，设置分数文本控件参数 */
        this._lbScore = new cc.LabelBMFont(LanguageEn.Score + ": 0", res.sh_arial_14_fnt);
        //设置锚点1,0，设置位置居中-5,-30
        this._lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: maxX - ((5 / 320) * maxX),
            y: maxY - ((30 / 480) * maxY),
        });
        /**@type {Number} 文本对齐模式，右对齐 */
        this._lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        //添加到当前层，优先度1000
        this.addChild(this._lbScore, 1000);

        //生命图标
        /**@type {cc.Sprite} 玩家生命值显示图标精灵 */
        var life = new cc.Sprite("#ship01.png");
        //设置生命图标ui的位置和缩放大小
        life.attr({
            scale: 0.6,
            x: (30 / 320) * maxX,
            y: (460 / 480) * maxY,
        });
        //添加到游戏贴图示例批量节点上，优先度为1，标签为5
        this._texTransparentBatch.addChild(life, 1, 5);
        //生命数量
        /**@type {cc.LabelTTF} 生命数量文本控件，使用系统字体Arial，大小为20 */
        this._lbLife = new cc.LabelTTF("0", "Arial", 20);
        //设置生命数量文本的位置60,463，颜色为255,0,0
        this._lbLife.attr({
            x: (60 / 320) * maxX,
            y: (463 / 480) * maxY,
            color: cc.color(255, 0, 0)
        });
        //添加到当前层，优先度为1000
        this.addChild(this._lbLife, 1000);
    },
    /**初始化玩家飞船 */
    initShip: function () {
        /**@type {cc.Sprite} 从序列帧缓存中加载图片生成玩家飞船序列帧 */
        this._ship = new ShipSprite("#ship01.png");
        //设置玩家初始位置160,60
        this._ship.attr({
            x: (160 / 320) * GC.w,
            y: (60 / 480) * GC.h,
        });
        //添加到游戏层，优先级为1
        this.addChild(this._ship, 1);
    },
    //每一帧都会调用update
    update: function (dt) {
        //判断是否在游戏中
        if (this._state == STATE_PLAYING) {
            //UI在这边更新
            this.updateUI();
            //界面上主要物体的位置更新，如敌机和发射子弹的位置
            this.moveActiveUnit(dt);
            //碰撞检测
            this.checkIsCollide();
            // 检测我们的飞船重生
            this.checkIsReborn();
        }
    },
    /**飞船，子弹等等BatchNode子节点的一个更新
     * @param {Number} dt 与上一帧的间隔时间
     */
    moveActiveUnit: function (dt) {
        //子弹、爆炸
        /**@type {cc.Sprite} 这个子类精灵 */
        var selChild, /**@type {cc.Sprite[]} 批量节点中的精灵列表 */children = this._texOpaqueBatch.getChildren();
        //循环所有特效
        for (var i in children) {
            selChild = children[i];
            //判断这个特效精灵是否存在，判断这个特效是否启用，更新这个特效
            selChild && selChild.active && selChild.update(dt);
        }

        //敌机
        /**@type {cc.Sprite[]} 敌机精灵列表 */
        children = this._texTransparentBatch.getChildren();
        //循环所有类型敌机
        for (i in children) {
            selChild = children[i];
            //判断这个敌机类型是否被启用，更新这个敌机的数据
            selChild && selChild.active && selChild.update(dt);
        }

        //玩家飞机
        this._ship.update(dt);
    },
    /**更新ui */
    updateUI: function () {
        //刷新玩家生命值显示
        var oldLife = this._lbLife.getString();
        var newLife = GC.LIFE + '';
        if (oldLife != newLife) this._lbLife.setString(newLife);
        //临时分数增加
        //刷新玩家当前分数
        this._lbScore.setString(LanguageEn.Score + ": " + ++this._tmpScore);
    },
    /**添加敌人 */
    scoreCounter: function () {
        //判断是否在游戏中
        if (this._state == STATE_PLAYING) {
            //游戏时间变化
            this._time++;
            //给等级控制器传入当前游戏时间，然后根据规则生成敌人
            this._levelManager.loadLevelResource(this._time);
        }
    },
    /**检测所有碰撞 */
    checkIsCollide: function () {
        var selChild, bulletChild;
        var i, /**@type {cc.Sprite} 玩家飞机*/locShip = this._ship;
        //所有敌人
        for (i = 0; i < GC.CONTAINER.ENEMIES.length; i++) {
            /**@type {cc.Sprite} 当前敌人 */
            selChild = GC.CONTAINER.ENEMIES[i];
            //没有启用
            if (!selChild.active) continue;
            //检测玩家子弹与敌机是否碰撞
            for (var j = 0; j < GC.CONTAINER.PLAYER_BULLETS.length; j++) {
                /**@type {cc.Sprite} 当前玩家子弹 */
                bulletChild = GC.CONTAINER.PLAYER_BULLETS[j];
                //判断当前玩家子弹是否启用，判断子弹和敌人的碰撞盒有没有相交
                if (bulletChild.active && this.collide(selChild, bulletChild)) {
                    //各自受到伤害时的事件
                    //子弹受到伤害
                    bulletChild.hurt();
                    //敌机受到伤害
                    selChild.hurt();
                };
            };
            //敌机与玩家是否碰撞
            if (this.collide(selChild, locShip)) {
                //玩家是否启用，没有启用的情况应该是刚复活的无敌时间
                if (locShip.active) {
                    //玩家受到伤害
                    locShip.hurt();
                };
                //敌机受到伤害
                selChild.hurt();
            };
        }
        //检测玩家与敌机的子弹是否碰撞
        //玩家是否启用
        if (locShip.active) {
            //循环所有敌人子弹
            for (i = 0; i < GC.CONTAINER.ENEMY_BULLETS.length; i++) {
                /**敌人子弹 */
                selChild = GC.CONTAINER.ENEMY_BULLETS[i];
                //敌人子弹是否启用，玩家碰撞盒是否和子弹重叠
                if (selChild.active && this.collide(selChild, locShip)) {
                    //敌人子弹受到伤害
                    selChild.hurt();
                    //玩家受到伤害
                    locShip.hurt();
                }
            }
        }
    },
    /**飞船重生 */
    checkIsReborn: function () {
        /**@type {ShipSprite|cc.Sprite} 玩家飞船 */
        var locShip = this._ship;
        //玩家是否不存在
        if (!locShip.active) {
            //判断玩家是否还有生命
            if (GC.LIFE > 0) {
                //玩家重生
                locShip.born();
            } else {
                //清除玩家
                this._ship = null;
                //游戏状态变为 游戏结束
                this._state = STATE_GAMEOVER;
                GC.GAME_STATE = GC.GAME_STATE_ENUM.OVER;
                /**@type {cc.Sequence} 游戏结束动画 */
                var action = cc.sequence(
                    //延迟0.2秒
                    cc.delayTime(0.2),
                    //回调结束方法，并传入this
                    cc.callFunc(this.onGameOver, this)
                );
                //播放动画
                this.runAction(action);
            }
        }
    },
    /**碰撞检测 
     * @param {cc.Sprite} a 精灵a
     * @param {cc.Sprite} b 精灵b
     * @returns {Boolean} 是否碰撞
     */
    collide: function (a, b) {
        var ax = a.x;
        var ay = a.y;
        var bx = b.x;
        var by = b.y;
        //如果距离大于屏幕大小，那肯定不算碰撞
        if (Math.abs(ax - bx) > MAX_CONTAINT_WIDTH || Math.abs(ay - by) > MAX_CONTAINT_HEIGHT)
            return false;
        //collideRect在需要再创建精灵时设置，否则不能使用这个方法 @wt763103245
        /**@type {cc.Rect} 获得精灵a的矩形碰撞盒 */
        var aRect = a.collideRect(ax, ay);
        var bRect = b.collideRect(bx, by);
        //判断两个矩形是否相交
        return cc.rectIntersectsRect(aRect, bRect);
    },
    /**游戏结束 */
    onGameOver: function () {
        //停止音乐
        cc.audioEngine.stopMusic();
        //停止所有效果音效
        cc.audioEngine.stopAllEffects();
        //创建游戏结束界面，淡出淡入1.2后显示游戏结束界面面
        cc.director.runScene(new cc.TransitionFade(1.2, new GameOverScene()));
    }
});
/**添加子弹精灵到游戏特效批量节点上
 * @param {BulletSprite|cc.Sprite} bullet 子弹精灵
 * @param {Number} zOrder 子节点层级
 * @param {*} mode 子节点标签
 */
GPTouchLayer.prototype.addBullet = function (bullet, zOrder, mode) {
    this._texOpaqueBatch.addChild(bullet, zOrder, mode);
};
/**添加敌机精灵到游戏内容精灵批量节点上
 * @param {EnemySprite|cc.Sprite} enemy 敌机精灵
 * @param {Number} z 子节点层级
 * @param {*} tag 子节点标签
 */
GPTouchLayer.prototype.addEnemy = function (enemy, z, tag) {
    this._texTransparentBatch.addChild(enemy, z, tag);
};
/**添加爆炸效果精灵到爆炸效果精灵批量节点上
 * @param {ExplosionSprite|cc.Sprite} explosion 爆炸效果精灵
 */
GPTouchLayer.prototype.addExplosions = function (explosion) {
    this._explosions.addChild(explosion);
};
/**添加另两种爆炸效果精灵到游戏特效精灵批量节点上
 * @param {SparkEffectSprite|cc.Sprite} spark 游戏特效精灵
 */
GPTouchLayer.prototype.addSpark = function (spark) {
    this._texOpaqueBatch.addChild(spark);
};
