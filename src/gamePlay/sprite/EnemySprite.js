/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 16:43:51
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\sprite\EnemySprite.js
 * @Email: 763103245@qq.com
 */
/**敌人精灵 */
var EnemySprite = cc.Sprite.extend({
    eID: 0,
    enemyType: 1,
    active: true,
    speed: 200,
    bulletSpeed: GC.BULLET_SPEED.ENEMY,
    HP: 15,
    bulletPowerValue: 1,
    moveType: null,
    scoreValue: 200,
    zOrder: 1000,
    delayTime: 1 + 1.2 * Math.random(),
    attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
    ctor: function (arg) {
        /**敌人贴图 */
        this._super("#" + arg.textureName);
        /**@type {Number} 生命 */
        this.HP = arg.HP;
        /**移动类型 */
        this.moveType = arg.moveType;
        /**@type {Number} 分数 */
        this.scoreValue = arg.scoreValue;
        /**攻击类型 */
        this.attackMode = arg.attackMode;
        /**敌人类型 */
        this.enemyType = arg.type;
        /**自动发射子弹 */
        this.schedule(this.shoot, this.delayTime);
    },
    _timeTick: 0,
    update: function (dt) {
        var x = this.x;
        var y = this.y;
        //出屏幕
        if ((x < 0 || x > 320) && (y < 0 || y > 480)) {
            this.active = false;
        };
        //生命值低于0
        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        };
    },
    /**销毁敌机 */
    destroy: function () {
        //增加分数
        GC.SCORE += this.scoreValue;
        /**@type {ExplosionSprite} 爆炸效果精灵 */
        var a = ExplosionSprite.getOrCreateExplosion();
        //设置位置
        a.attr({
            x: this.x,
            y: this.y
        });

        SparkEffectSprite.getOrCreateSparkEffect(this.x, this.y);

        if (GC.SOUND_ON) {
            cc.audioEngine.playEffect(res.gp_explodeEffect_mp3);
        }
        this.visible = false;
        this.active = false;
        this.stopAllActions();
        this.unschedule(this.shoot);
        GC.ACTIVE_ENEMIES--;
    },
    /**发射子弹 */
    shoot: function () {
        //获得当前敌机位置
        var x = this.x, y = this.y;
        /**@type {BulletSprite} 获得子弹精灵 */
        var b = BulletSprite.getOrCreateBullet(this.bulletSpeed, "W2.png", this.attackMode, 3000, GC.UNIT_TAG.ENMEY_BULLET);
        b.x = x;
        b.y = y - this.height * 0.2;
    },
    hurt: function () {
        this._hurtColorLife = 2;
        this.HP--;
    },
    collideRect: function (x, y) {
        var w = this.width, h = this.height;
        return cc.rect(x - w / 2, y - h / 4, w, h / 2 + 20);
    }
});
/**得到一个敌机精灵，如果有了则直接用，没有空闲的则创建
 * @param {EnemyType[0]} arg 
 * @returns 
 */
EnemySprite.getOrCreateEnemy = function (arg) {
    var selChild = null;
    for (var j = 0; j < GC.CONTAINER.ENEMIES.length; j++) {
        selChild = GC.CONTAINER.ENEMIES[j];
        if (selChild.active == false && selChild.enemyType == arg.type) {
            selChild.HP = arg.HP;
            selChild.active = true;
            selChild.moveType = arg.moveType;
            selChild.scoreValue = arg.scoreValue;
            selChild.attackMode = arg.attackMode;
            selChild._hurtColorLife = 0;

            selChild.schedule(selChild.shoot, selChild.delayTime);
            selChild.visible = true;
            GC.ACTIVE_ENEMIES++;
            return selChild;
        }
    }
    selChild = EnemySprite.create(arg);
    GC.ACTIVE_ENEMIES++;
    return selChild;
};

EnemySprite.create = function (arg) {
    var enemy = new EnemySprite(arg);
    g_GPTouchLayer.addEnemy(enemy, enemy.zOrder, GC.UNIT_TAG.ENEMY);
    GC.CONTAINER.ENEMIES.push(enemy);
    return enemy;
};

EnemySprite.preSet = function () {
    var enemy = null;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < EnemyType.length; j++) {
            enemy = EnemySprite.create(EnemyType[j]);
            enemy.visible = false;
            enemy.active = false;
            enemy.stopAllActions();
            enemy.unscheduleAllCallbacks();
        }
    }
};
