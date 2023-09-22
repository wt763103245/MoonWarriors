/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-22 16:32:20
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
        /**@type {Level1} 游戏难度相关参数 */
        this._currentLevel = GameLevel[GC.GAMESETTINGS.CURRENTLEVEL];
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
        };
        this._currentLevel.enemies = locCurrentLevelEnemies.slice();
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
        for (var i = enemies.length - 1; i >= 0; i--) {
            /**随机生成的敌机数据 */
            var selEnemy = enemies[i];
            if (selEnemy) {
                //显示类型为Once，指只显示一次
                if (selEnemy.ShowType === "Once") {
                    //判断当前时间是否可以显示
                    //显示类型为Once，指只显示一次
                    if (selEnemy.ShowTime == deltaTime) {
                        //循环所有添加的类型
                        for (var tIndex = 0; tIndex < selEnemy.Types.length; tIndex++) {
                            //添加对应的敌机
                            this.addEnemyToGameLayer(selEnemy.Types[tIndex]);
                        };
                        //删除这个数据，因为只显示一次
                        enemies.splice(i);
                    };
                    //重复显示
                } else if (selEnemy.ShowType === "Repeate") {
                    //判断当前时间是否可以显示
                    if (deltaTime % selEnemy.ShowTime === 0) {
                        for (var rIndex = 0; rIndex < selEnemy.Types.length; rIndex++) {
                            this.addEnemyToGameLayer(selEnemy.Types[rIndex]);
                        };
                    };
                };
            }
        }
    },
    /**添加敌机，和对应的移动方式
     * @param {GC.ENEMY_MOVE_TYPE[0]|Nunber} enemyType 敌机移动方式类型
     */
    addEnemyToGameLayer: function (enemyType) {
        /**@type {EnemySprite} 添加的敌机 */
        var addEnemy = EnemySprite.getOrCreateEnemy(EnemyType[enemyType]);
        //设定位置
        addEnemy.x = 80 + (GC.w - 160) * Math.random();
        addEnemy.y = GC.h;
        //偏移变量，移动动作
        var offset, tmpAction;
        var a0 = 0;
        var a1 = 0;
        switch (addEnemy.moveType) {
            //尝试撞击玩家
            case GC.ENEMY_MOVE_TYPE.ATTACK:
                /**@type {cc.Point} 玩家飞船当前位置 */
                offset = cc.p(this._gamePlayLayer._ship.x, this._gamePlayLayer._ship.y);
                /**@type {cc.Action} 1秒后，移动到玩家当前位置 */
                tmpAction = cc.moveTo(1, offset);
                break;
            //向下直冲，冲出屏幕
            case GC.ENEMY_MOVE_TYPE.VERTICAL:
                /**@type {cc.Action} 花费4秒 */
                tmpAction = cc.moveBy(4, cc.p(0, -GC.h - addEnemy.height));
                break;
            //重复左右移动，左右横跳
            case GC.ENEMY_MOVE_TYPE.HORIZONTAL:
                /**@type {cc.Action} 花费0.5秒，往下移动一段距离(-300~-100)，还在屏幕内 */
                a0 = cc.moveBy(0.5, cc.p(0, -100 - 200 * Math.random()));
                /**@type {cc.Action} 花费1秒，向左或者向右移动一段距离(-50~50) */
                a1 = cc.moveBy(1, cc.p(-50 - 100 * Math.random(), 0));
                /**返回事件，将这个事件绑定到这个敌机对象上 */
                var onComplete = cc.callFunc(function (pSender) {
                    /**延迟1秒 */
                    var a2 = cc.delayTime(1);
                    /**@type {cc.Action} 花费1秒，往右移动一段距离(100~200) */
                    var a3 = cc.moveBy(1, cc.p(100 + 100 * Math.random(), 0));
                    //执行一个动作，按顺序执行，延迟，往右移动，延迟，反转执行往右移动操作（相当于向左移动），无限重复这个动作
                    pSender.runAction(cc.sequence(a2, a3, a2.clone(), a3.reverse()).repeatForever());
                }.bind(addEnemy));
                //按顺序执行，向下移动，随机左右移动，执行一个回调事件
                tmpAction = cc.sequence(a0, a1, onComplete);
                break;
            //向下蛇形移动
            case GC.ENEMY_MOVE_TYPE.OVERLAP:
                //移动需要的参数，游戏屏幕宽高
                var moveX = GC.w_2;
                var moveY = GC.h;
                //addEnemy.x <= GC.w / 2指在屏幕的左边
                /**x坐标，左边为屏幕的一半，右边为-屏幕的一半 */
                var newX = (addEnemy.x <= moveX) ? moveX : -moveX;
                /**@type {cc.Action} 向左或右移动，到以屏幕上边到下边的60%的位置 */
                a0 = cc.moveBy(4, cc.p(newX, -moveY * 0.6));
                /**@type {cc.Action} 向上面移动左右方向相反的方向，移动到上边40%+敌机高度的位置 */
                a1 = cc.moveBy(4, cc.p(-newX, -moveY * 0.4 - addEnemy.height));
                //按顺序执行，先向移动左或右移动同时下移动到60%的高度，然后向相反的左右方向同时再向下移动出屏幕
                tmpAction = cc.sequence(a0, a1);
                break;
        };
        //执行设定好的移动方式
        addEnemy.runAction(tmpAction);
    }
});