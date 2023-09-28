/*
 * @Author: 萌新王
 * @Date: 2023-09-04 17:18:03
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-28 16:36:48
 * @FilePath: \MoonWarriors\src\config\Level.js
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
        }, {
            /**显示类型，Once指只显示一次 */
            ShowType: "Once",
            /**当只显示1次时，则为当前时间显示一次；重复显示时，则为每次经过这个多时间显示一次 */
            ShowTime: "00:6",
            /**添加敌机类型 */
            Types: [0, 2, 4, 3]
        },
    ],
};
console.log("--------------")
console.log(Array.prototype.flat ? 'ES2019 (or later)' : 'ES2019 not supported');
console.log(String(Object))
console.log(String(Object.assign))
// /**难度2 */
// var Level2 = Object.assign({}, Level1);
// var _addList = [
//     {
//         ShowType: "Repeate",
//         ShowTime: "00:05",
//         Types: [3, 4, 5]
//     }, {
//         ShowType: "Once",
//         ShowTime: "00:16",
//         Types: [0, 2, 5, 4, 3]
//     },
// ];
// _addList.push(...Level2.enemies)
// Level2.enemies = _addList
// Level2.enemyMax += 4;
// /**难度3 */
// var Level3 = Object.assign({}, Level2);
// var _addList = [
//     {
//         ShowType: "Repeate",
//         ShowTime: "00:08",
//         Types: [0, 4, 3, 5]
//     }, {
//         ShowType: "Once",
//         ShowTime: "00:25",
//         Types: [0, 3, 5, 4, 3]
//     }, {
//         ShowType: "Once",
//         ShowTime: "00:35",
//         Types: [4, 5, 3, 1, 3]
//     }, {
//         ShowType: "Once",
//         ShowTime: "00:50",
//         Types: [0, 3, 2, 1, 0, 3]
//     }, {
//         ShowType: "Once",
//         ShowTime: "01:15",
//         Types: [4, 5, 2, 1, 0]
//     },
// ];
// _addList.push(...Level3.enemies)
// Level3.enemies = _addList
// // Array.prototype.push.apply(Level3.enemies, _addList)
// Level3.enemyMax *= 2;
// /**@type {Array} 难度选项，长度为3 */
// var GameLevel = [Level1, Level2, Level3];
