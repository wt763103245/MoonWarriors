/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 17:00:11
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
        if ((x < 0 || x > 320) && (y < 0 || y > 480)) {
            this.active = false;
        }

        if (this.HP <= 0) {
            this.active = false;
            this.destroy();
        }
    },
    destroy: function () {
        GC.SCORE += this.scoreValue;
        var a = ExplosionSprite.getOrCreateExplosion();
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
    shoot: function () {
        var x = this.x, y = this.y;
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
