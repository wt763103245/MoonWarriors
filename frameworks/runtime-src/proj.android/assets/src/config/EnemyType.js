/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 17:07:13
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\config\EnemyType.js
 * @Email: 763103245@qq.com
 */
/**敌人类型 */
var EnemyType = [
    {
        type: 0,
        /**贴图路径 */
        textureName: "E0.png",
        /**子弹贴图路径 */
        bulletType: "W2.png",
        /**生命值 */
        HP: 1,
        /**移动类型 */
        moveType: GC.ENEMY_MOVE_TYPE.ATTACK,
        /**攻击类型 */
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        /**分数 */
        scoreValue: 15
    },
    {
        type: 1,
        textureName: "E1.png",
        bulletType: "W2.png",
        HP: 2,
        moveType: GC.ENEMY_MOVE_TYPE.ATTACK,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 40
    },
    {
        type: 2,
        textureName: "E2.png",
        bulletType: "W2.png",
        HP: 4,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_ATTACK_MODE.TSUIHIKIDAN,
        scoreValue: 60
    },
    {
        type: 3,
        textureName: "E3.png",
        bulletType: "W2.png",
        HP: 6,
        moveType: GC.ENEMY_MOVE_TYPE.OVERLAP,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 80
    },
    {
        type: 4,
        textureName: "E4.png",
        bulletType: "W2.png",
        HP: 10,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_ATTACK_MODE.TSUIHIKIDAN,
        scoreValue: 150
    },
    {
        type: 5,
        textureName: "E5.png",
        bulletType: "W2.png",
        HP: 15,
        moveType: GC.ENEMY_MOVE_TYPE.HORIZONTAL,
        attackMode: GC.ENEMY_MOVE_TYPE.NORMAL,
        scoreValue: 200
    }
];
