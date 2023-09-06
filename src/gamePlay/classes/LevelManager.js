/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-06 20:09:06
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\classes\LevelManager.js
 * @Email: 763103245@qq.com
 */
/**等级控制器 */
var LevelManager = cc.Class.extend({
    _currentLevel: null,
    _gamePlayLayer: null,
    /**创建游戏等级控制器类
     * @param {Number} gamePlayLayer 游戏等级\难度
     */
    ctor: function (gamePlayLayer) {
        //难度不能为0
        if (!gamePlayLayer) throw Language.LevelManagerLevelError;
        //-！难度需要可以调整   @wt763103245
        this._currentLevel = Level1;
        this._gamePlayLayer = gamePlayLayer;
        this.setLevel(this._currentLevel);
    },
    //这两个函数的作用是更具当前Level的配置，获取敌机出现的时间，分钟统一转为秒数来表示
    setLevel: function (level) {
        var locCurrentLevelEnemies = this._currentLevel.enemies;
        for (var i = 0; i < level.enemies.length; i++) {
            locCurrentLevelEnemies[i].ShowTime = this._minuteToSecond(locCurrentLevelEnemies[i].ShowTime);
        }
    },
    _minuteToSecond: function (minuteStr) {
        if (!minuteStr)
            return 0;
        if (typeof (minuteStr) != "number") {
            var mins = minuteStr.split(':');
            if (mins.length == 1) {
                return parseInt(mins[0], 10);
            } else {
                return parseInt(mins[0], 10) * 60 + parseInt(mins[1], 10);
            }
        }
        return minuteStr;
    },
    loadLevelResource: function (deltaTime) {
        //如果当前场景存在的敌人数量超过限制，那就不继续生成
        if (GC.ACTIVE_ENEMIES >= this._currentLevel.enemyMax) {
            return;
        }
        var locCurrentLevel = this._currentLevel;
        for (var i = 0; i < locCurrentLevel.enemies.length; i++) {
            var selEnemy = locCurrentLevel.enemies[i];
            if (selEnemy) {
                if (selEnemy.ShowType === "Once") {
                    if (selEnemy.ShowTime == deltaTime) {
                        for (var tIndex = 0; tIndex < selEnemy.Types.length; tIndex++) {
                            this.addEnemyToGameLayer(selEnemy.Types[tIndex]);
                        }
                    }
                } else if (selEnemy.ShowType === "Repeate") {
                    if (deltaTime % selEnemy.ShowTime === 0) {
                        for (var rIndex = 0; rIndex < selEnemy.Types.length; rIndex++) {
                            this.addEnemyToGameLayer(selEnemy.Types[rIndex]);
                        }
                    }
                }
            }
        }
    },
    addEnemyToGameLayer: function (enemyType) {
        var addEnemy = EnemySprite.getOrCreateEnemy(EnemyType[enemyType]);
        addEnemy.x = 80 + (GC.w - 160) * Math.random();
        addEnemy.y = GC.h;

        var offset, tmpAction;
        var a0 = 0;
        var a1 = 0;
        switch (addEnemy.moveType) {
            case GC.ENEMY_MOVE_TYPE.ATTACK:
                offset = cc.p(this._gamePlayLayer._ship.x, this._gamePlayLayer._ship.y);
                tmpAction = cc.moveTo(1, offset);
                break;
            case GC.ENEMY_MOVE_TYPE.VERTICAL:
                offset = cc.p(0, -GC.h - addEnemy.height);
                tmpAction = cc.moveBy(4, offset);
                break;
            case GC.ENEMY_MOVE_TYPE.HORIZONTAL:
                offset = cc.p(0, -100 - 200 * Math.random());
                a0 = cc.moveBy(0.5, offset);
                a1 = cc.moveBy(1, cc.p(-50 - 100 * Math.random(), 0));
                var onComplete = cc.callFunc(function (pSender) {
                    var a2 = cc.delayTime(1);
                    var a3 = cc.moveBy(1, cc.p(100 + 100 * Math.random(), 0));
                    pSender.runAction(cc.sequence(a2, a3, a2.clone(), a3.reverse()).repeatForever());
                }.bind(addEnemy));
                tmpAction = cc.sequence(a0, a1, onComplete);
                break;
            case GC.ENEMY_MOVE_TYPE.OVERLAP:
                var newX = (addEnemy.x <= GC.w / 2) ? 320 : -320;
                a0 = cc.moveBy(4, cc.p(newX, -240));
                a1 = cc.moveBy(4, cc.p(-newX, -320));
                tmpAction = cc.sequence(a0, a1);
                break;
        }
        addEnemy.runAction(tmpAction);
    }
});