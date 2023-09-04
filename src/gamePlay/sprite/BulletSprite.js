var BulletSprite = cc.Sprite.extend({
    active : true,
    yVelocity : 200,
    HP : 1,
    ctor : function(bulletSpeed, weaponType, attackMode){
        this._super("#"+weaponType);
        this.yVelocity = -bulletSpeed;
        this.attackMode = attackMode;
        this.setBlendFunc(cc.SRC_ALPHA, cc.ONE);
    },
    //当子弹飞出屏幕，或者触发碰撞时，可以销毁
    update:function (dt) {
        var y = this.y;
        this.y = y - this.yVelocity * dt;
        if (y < 0 || y > GC.h + 10 || this.HP <= 0) {
            this.destroy();
        }
    },
    //销毁并不是删除子弹对象，只是把部分属性设置为false，循环利用
    destroy : function(){
        this.active = false;
        this.visible = false;
    },
    //撞击时HP-1
    hurt:function () {
        this.HP--;
    },
    //判断是否碰撞
    collideRect:function (x, y) {
        return cc.rect(x - 3, y - 3, 6, 6);
    }
});
//类外定义的方法相当于static方法，可以直接使用
BulletSprite.getOrCreateBullet = function (bulletSpeed, weaponType, attackMode, zOrder, mode) {
    var selChild = null;
    //如果想要创建的是玩家子弹
    if (mode == GC.UNIT_TAG.PLAYER_BULLET) {
        //所有创建的子弹都会放到一个大的数组中循环利用，而不是每一次发射我们都创建一个新的子弹
        for (var j = 0; j < GC.CONTAINER.PLAYER_BULLETS.length; j++) {
            selChild = GC.CONTAINER.PLAYER_BULLETS[j];
            //只有当某一颗子弹不在使用，我们才可以把它作为这次创建的子弹
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.active = true;
                selChild.HP = 1;
                return selChild;
            }
        }
    }
    //或者是敌人的子弹
    else {
        for (var j = 0; j < GC.CONTAINER.ENEMY_BULLETS.length; j++) {
            selChild = GC.CONTAINER.ENEMY_BULLETS[j];
            if (selChild.active == false) {
                selChild.visible = true;
                selChild.HP = 1;
                selChild.active = true;
                return selChild;
            }
        }
    }
    //如果数组中所有的子弹都在使用中（还在屏幕中 && 没有撞到敌人），那我们只能再创建一颗新的子弹
    selChild = BulletSprite.create(bulletSpeed, weaponType, attackMode, zOrder, mode);
    return selChild;
};

BulletSprite.create = function (bulletSpeed, weaponType, attackMode, zOrder, mode) {
    //创建子弹对象并放到批处理层
    var bullet = new BulletSprite(bulletSpeed, weaponType, attackMode);
    g_GPTouchLayer.addBullet(bullet, zOrder, mode);
    if (mode == GC.UNIT_TAG.PLAYER_BULLET) {
        GC.CONTAINER.PLAYER_BULLETS.push(bullet);
    }
    else {
        GC.CONTAINER.ENEMY_BULLETS.push(bullet);
    }
    return bullet;
};

BulletSprite.preSet = function () {
    var bullet = null;
    for (var i = 0; i < 10; i++) {
        var bullet = BulletSprite.create(GC.BULLET_SPEED.SHIP, "W1.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.PLAYER_BULLET);
        bullet.visible = false;
        bullet.active = false;
    }
    for (var i = 0; i < 10; i++) {
        bullet = BulletSprite.create(GC.BULLET_SPEED.ENEMY, "W2.png", GC.ENEMY_ATTACK_MODE.NORMAL, 3000, GC.UNIT_TAG.ENMEY_BULLET);
        bullet.visible = false;
        bullet.active = false;
    }
};