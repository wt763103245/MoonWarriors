/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-13 18:18:16
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\gamePlay\classes\LevelManager.js
 * @Email: 763103245@qq.com
 */
/**等级控制器 */
var LevelManager = cc.Class.extend({
    /**@type {Level1} 游戏难度相关参数 */
    _currentLevel: null,
    /**@type {g_GPTouchLayer|GPTouchLayer|cc.Layer} 游戏层 */
    _gamePlayLayer: null,
    /**创建游戏等级控制器类
     * @param {Number} gamePlayLayer 游戏等级\难度
     */
    ctor: function (gamePlayLayer) {
        //难度不能为0
        if (!gamePlayLayer) throw Language.LevelManagerLevelError;
        //-！难度需要可以调整   @wt763103245
        /**@type {Level1} 游戏难度相关参数 */
        this._currentLevel = Level1;
        /**@type {g_GPTouchLayer} 当前游戏层 */
        this._gamePlayLayer = gamePlayLayer;
        //设置难度
        this.setLevel(this._currentLevel);
    },
    //这两个函数的作用是更具当前Level的配置，获取敌机出现的时间，分钟统一转为秒数来表示
    /**设置难度
     * @param {Level1} level 难度相关参数
     */
    setLevel: function (level) {
        /**@type {Level1.enemies} 当前难度生成的敌机相关参数 */
        var locCurrentLevelEnemies = this._currentLevel.enemies;
        //循环所有的敌机类型
        for (var i = 0; i < level.enemies.length; i++) {
            //重新设定敌机显示时间，转化成数字类型(时间)
            locCurrentLevelEnemies[i].ShowTime = this._minuteToSecond(locCurrentLevelEnemies[i].ShowTime);
        }
    },
    /**获取敌机显示时间，转化成数字（时间）
     * @param {String|Number} minuteStr 加载的显示时间数据
     * @returns {Number} 显示时间
     */
    _minuteToSecond: function (minuteStr) {
        //判空
        if (!minuteStr) return 0;
        //判断数据类型不是数字
        if (typeof (minuteStr) != "number") {
            /**以:分割字符串 */
            var mins = minuteStr.split(':');
            //如果不存在:
            if (mins.length == 1) {
                //转化为数字取整，10进制
                return parseInt(mins[0], 10);
            } else {
                //将时间字符串转化为对应数字（秒）取整，10进制
                return parseInt(mins[0], 10) * 60 + parseInt(mins[1], 10);
            }
        }
        //已经是数字了
        return minuteStr;
    },
    /**往游戏中添加敌人
     * @param {Number} deltaTime 当前游戏时间
     */
    loadLevelResource: function (deltaTime) {
        /**@type {Level1} 当前游戏规则 */
        var locCurrentLevel = this._currentLevel;
        //如果当前场景存在的敌人数量超过限制，那就不继续生成
        if (GC.ACTIVE_ENEMIES >= locCurrentLevel.enemyMax) return;
        //生成敌机
        /**敌机类型列表 */
        var enemies = locCurrentLevel.enemies;
        for (var i = 0; i < enemies.length; i++) {
            /**随机生成的敌机数据 */
            var selEnemy = enemies[i];
            if (selEnemy) {
                //显示类型为Once，指只显示一次
                if (selEnemy.ShowType === "Once") {
                    //判断当前时间是否可以显示
                    //显示类型为Once，指只显示一次
                    if (selEnemy.ShowTime == deltaTime) {
                        // -! tag @wt763103245
                        for (var tIndex = 0; tIndex < selEnemy.Types.length; tIndex++) {
                            this.addEnemyToGameLayer(selEnemy.Types[tIndex]);
                        }
                    }
                    //重复显示
                } else if (selEnemy.ShowType === "Repeate") {
                    //判断当前时间是否可以显示
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