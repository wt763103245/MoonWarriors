/**
 * Created by lingjianfeng on 14-8-31.
 */



var GC = GC || {};

GC.winSize = cc.size(320, 480);

GC.h = GC.winSize.height;

GC.w = GC.winSize.width;

GC.w_2 = GC.winSize.width / 2 ;

GC.h_2 = GC.winSize.height / 2;

GC.SOUND_ON = true;

GC.GAME_STATE_ENUM = {
    HOME : 0,
    PLAY : 1,
    OVER : 2
}

GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;

//生命值
GC.LIFE = 1;

//当前场景存在敌人数量
GC.ACTIVE_ENEMIES=0;

//容器，保存场景信息
GC.CONTAINER = {
    ENEMIES : [],//敌人
    ENEMY_BULLETS : [],//敌人子弹
    PLAYER_BULLETS : [],//自身子弹
    SPARKS : [],//光效
    EXPLOSIONS : []//爆炸

};

//子弹速度
GC.BULLET_SPEED = {
    ENEMY : -200,
    SHIP : 900
};

//敌人攻击的模式
GC.ENEMY_ATTACK_MODE = {
    NORMAL : 1,
    TSUIHIKIDAN : 2
};

//标签
GC.UNIT_TAG = {
    ENMEY_BULLET : 900,
    PLAYER_BULLET : 901,
    ENEMY : 1000,
    PLAYER : 1001
};

//标签
GC.ENEMY_MOVE_TYPE = {
    ATTACK:0,
    VERTICAL:1,
    HORIZONTAL:2,
    OVERLAP:3
};
