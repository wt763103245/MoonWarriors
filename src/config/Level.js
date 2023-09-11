/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 18:35:09
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\config\Level.js
 * @Email: 763103245@qq.com
 */
/**游戏等级1，游戏难度 */
var Level1 = {
    /**@type {Number} 敌机最大数量 */
    enemyMax: 6,
    /**敌机类型list */
    enemies: [
        {
            /**@type {"Repeate"|"Once"} 显示类型，Repeate表示重复显示，这是每隔2秒出一次这个飞机 */
            ShowType: "Repeate",
            /**@type {String} 显示时间 */
            ShowTime: "00:02",
            /**@type {[Number]} 行为模式类型 */
            Types: [0, 1, 2]
        },
        {
            ShowType: "Repeate",
            ShowTime: "00:05",
            Types: [3, 4, 5]
        },
        {
            ShowType: "Repeate",
            ShowTime: "00:08",
            Types: [0, 4, 3, 5]
        },
        {
            ShowType: "Once",
            ShowTime: "00:6",
            Types: [0, 2, 4, 3]
        },
        {
            ShowType: "Once",
            ShowTime: "00:16",
            Types: [0, 2, 5, 4, 3]
        },
        {
            ShowType: "Once",
            ShowTime: "00:25",
            Types: [0, 3, 5, 4, 3]
        },
        {
            ShowType: "Once",
            ShowTime: "00:35",
            Types: [4, 5, 3, 1, 3]
        },
        {
            ShowType: "Once",
            ShowTime: "00:50",
            Types: [0, 3, 2, 1, 0, 3]
        },
        {
            ShowType: "Once",
            ShowTime: "01:15",
            Types: [4, 5, 2, 1, 0]
        },
    ]
};
