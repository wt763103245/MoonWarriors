/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 15:52:40
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\config\GameConfig.js
 * @Email: 763103245@qq.com
 */
/**视窗相关参数，如果在网页就是网页宽高，如果在pc就是窗口大小，如果在手机就是手机分辨率大小 */
var GC = GC || {};
/**@type {cc.Size|{{width: : Number, height: Number}} 游戏窗口大小 */
GC.winSize = cc.size(320, 480);
/**@type {Number} 游戏高度 */
GC.h = GC.winSize.height;
/**@type {Number} 游戏宽度 */
GC.w = GC.winSize.width;
/**@type {Number} 游戏高度/2 */
GC.w_2 = GC.winSize.width / 2;
/**@type {Number} 游戏宽度/2 */
GC.h_2 = GC.winSize.height / 2;

//根据某些浏览器（例如 Chrome）的政策，AudioContext 对象不能在页面加载时自动启动，而必须在用户与页面进行交互后才能启动。
/**@type {Boolean} 背景音乐开关，默认关闭 */
GC.SOUND_ON = false;

/**@type {{Any: Number}} 游戏状态 */
GC.GAME_STATE_ENUM = {
    /**在主菜单中 */
    HOME: 0,
    /**游戏中 */
    PLAY: 1,
    /**游戏结束 */
    OVER: 2
}
/**@type {GC.GAME_STATE_ENUM|Number} 当前游戏状态 */
GC.GAME_STATE = GC.GAME_STATE_ENUM.HOME;

/**默认生命值 */
GC._LIFE = 3;
/**生命值 */
GC.LIFE = GC._LIFE;
/**默认血量 */
GC.HP = 5
/**@type {Number} 玩家射速 */
GC.PlayerShootingSpeed = 1 / 60;
/**当前场景存在敌人数量 */
GC.ACTIVE_ENEMIES = 0;

/**容器，保存场景信息。相当于游戏缓存 */
GC.CONTAINER = {
    /**敌人 */
    ENEMIES: [],
    /**敌人子弹 */
    ENEMY_BULLETS: [],
    /**自身子弹 */
    PLAYER_BULLETS: [],
    /**光效 */
    SPARKS: [],
    /**爆炸 */
    EXPLOSIONS: []
};

/**子弹速度 */
GC.BULLET_SPEED = {
    /**敌方子弹速度 */
    ENEMY: -200,
    /**我方子弹速度 */
    SHIP: 900
};

/**敌人攻击的模式 */
GC.ENEMY_ATTACK_MODE = {
    NORMAL: 1,
    TSUIHIKIDAN: 2
};

/**标签 */
GC.UNIT_TAG = {
    ENMEY_BULLET: 900,
    PLAYER_BULLET: 901,
    ENEMY: 1000,
    PLAYER: 1001
};

/**敌机移动类型 */
GC.ENEMY_MOVE_TYPE = {
    /**冲向当前玩家位置 */
    ATTACK: 0,
    /**向下直冲 */
    VERTICAL: 1,
    /**反复左右移动 */
    HORIZONTAL: 2,
    /**向下蛇形移动 */
    OVERLAP: 3
};

/**游戏设置相关 */
GC.GAMESETTINGS = {
    /**游戏难度 */
    CURRENTLEVEL: 0,
};

_saveStr = "MoonWarriors_wt_";
/**游戏保存相关 */
GC.FILENAME = {
    /**@type {String} 设置界面 */
    SETTING: _saveStr + "SETTING",
}