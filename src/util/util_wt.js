/*
 * @Author: 萌新王
 * @Date: 2023-07-19 12:23:07
 * @LastEditors: 萌新王
 * @LastEditTime: 2023-09-08 16:17:23
 * @FilePath: \OneDrive\program\js\MoonWarriors\src\util\util_wt.js
 * @Email: 763103245@qq.com
 * @Qq: 763103245
 */
//Ctrl+Win+i    添加页眉注释
// import { notDeepEqual } from "assert";
// import { cocos2dJs } from "./cocos2d-js/class.js"
/**工具类
 * @param {object} UtilWt
 */
var UtilWt = UtilWt || {};
/**类型 */
UtilWt.Class = {
    /**判断是否是同类型数据
     * @param {*} obj 当前数据
     * @param {String|*} type 判断类型
     * @param {Boolean} typeIsClass 传入类型是否是某个类 
     * @returns {Boolean} 是否是同类型
     */
    isType: function (obj, type, typeIsClass = false) {
        //传入
        if (typeIsClass) {
            //传入类型为类
            return obj instanceof type;
        }
        /**传入数据类型 */
        let typeDateType = typeof type;
        //判断传入的判断类型参数是否是字符串类型
        if (typeDateType == 'string') {
            //判断传入的判断类型参数是否是
            if (typeDateType.indexOf('[object ') != 0) {
                let objDataType = typeof obj;
                if (objDataType != 'object' && typeDateType != 'object') return objDataType == typeDateType.toLowerCase();
                typeDateType = "[object " + UtilWt.String.firstLetterCapitalized(type) + "]";
            }
        };
        //判断数据类型是否相同（字符串）
        return Object.prototype.toString.call(obj) == typeDateType;
    },
    Type: {
        /**字符串 */
        String: "String",
        /**js Date类 时间 */
        Date: "Date",
        /**数字。整数和小数 */
        Number: "Number",
        /**布尔 */
        Boolean: "Boolean",
        /**数组。列表 */
        Array: "Array",
        /**包。相当于py的字典 */
        Object: "Object",
        /**方法 */
        Function: "Function",
        /**未设定值 */
        undefine: "undefine",
    }
}
/**时间 */
UtilWt.Time = {
    /**js Date类操作 */
    Date: {
        /**Date时间增加方法
         * @param {Date|String|null} oldDate 当前时间
         * @param {Number|Date|String} addDays 增加的时间
         * @returns {Date} 变化后的时间
         */
        addDate: function (oldDate = null, addDays = 1) {
            /**获得精确数据类型的方法 */
            let toString = Object.prototype.toString;
            if (!oldDate) {
                oldDate = new Date();
                UtilWt.Log.cocos2dJs("传入的时间数据不存在，\n默认使用当前时间 oldDate = new Date()")
            } else {
                /**@type {String} 旧时间的数据类型 */
                let oldDateType = toString.call(oldDate);
                if (oldDateType != '[object Date]') {
                    if (oldDateType == '[object String]' && UtilWt.Time.Date.isDateStr(oldDate)) {
                        oldDate = new Date(oldDate);
                    } else {
                        oldDate = new Date();
                        UtilWt.Log.cocos2dJs("传入的事件数据有误，\n默认使用当前时间 oldDate = new Date()");
                    }
                }
            }
            if (addDays) {
                /**@type {String} 添加时间的数据类型 */
                let addDaysType = toString.call(addDays);
                if (addDaysType == '[object Number]') {
                    oldDate.setDate(oldDate.getDate() + addDays);
                } else if (addDaysType == '[object Date]') {
                    oldDate.setDate(oldDate.getDate() + addDays.getDate());
                }
            }
            return oldDate;
        },
        /**判断是否是时间类型字符串
         * @param {String} dateStr 时间字符串
         * @returns {Boolean} 是否是时间类型数据
         */
        isDateStr: function (dateStr) {
            //判断这个字符创是否是日期格式
            return !!dateStr && isNaN(dateStr) && !isNaN(Date.parse(dateStr));
        },
    },
    /**设置一次性定时器
     * @param {Function} func 重复方法
     * @param {Number} time 延迟时间
     * @returns {Number} 定时器唯一标识id
     */
    setTimeout: (func, time) => {
        if (typeof func == 'function') {
            if (typeof time != 'number') {
                time = Number(time);
                UtilWt.Log.cocos2dJs("设置一次性定时器失败。传入的重复时间不存在或不是数字类型，\n尝试强制转化成数字类型使用，如果还是不合理则将使用默认时间，当前为 " + time + "毫秒");
            };
            return setTimeout(func, time > 0 ? time : 1000);
        };
        UtilWt.Log.cocos2dJs("设置一次性定时器失败。传入方法：" + func + "不存在或者不是方法类型数据");
    },
    /**设定重复定时器
     * @param {Function} func 重复方法
     * @param {Number} time 重复时间，毫秒
     * @param {Number} endTime 结束时间，自动停止这个定时器
     * @returns {Number} 用来停止这个定时器的唯一标识
     */
    setInterval: (func, time = 1000, endTime = undefined) => {
        if (typeof func == 'function') {
            if (typeof time != 'number') {
                time = Number(time);
                UtilWt.Log.cocos2dJs("传入的重复时间不存在或不是数字类型，\n尝试强制转化成数字类型使用，如果还是不合理则将使用默认时间，当前为 " + time + "毫秒");
            }
            /**@type {Number} 定时器唯一标识id */
            let id = setInterval(func, time > 0 ? time : 1000);
            if (endTime) {
                if (typeof endTime != "number") {
                    endTime = Number(endTime);
                    UtilWt.Log.cocos2dJs("传入的结束时间不存在或不是数字类型，\n尝试强制转化成数字类型使用，如果还是不合理则将使用默认时间，当前为 " + endTime + "毫秒");
                };
                if (endTime > 0) {
                    setTimeout(() => { clearInterval(id) }, endTime);
                };
            }
            return id;
        };
        UtilWt.Log.cocos2dJs("设置重复定时器失败。方法：" + func + "不存在")
    },
    /**停止定时器
     * @param {Number} id 定时器唯一标识
     */
    clearInterval: (id) => {
        clearInterval(id);
    },
}
/**数据 */
UtilWt.Data = {
    /**判断object里面是否存在某个值
     * @param {Object} obj 需要判断的object包
     * @param {*|String} key 需要判断是否存在的数据
     * @param {Boolean} isKey 是否是判断的是object包的key
     * @returns {Boolean} 这个object包中是否存在该数据
     */
    inObject: function (obj, key, isKey = true) {
        if (obj && typeof obj === 'object') {
            if (isKey) {
                for (var i in obj) {
                    if (i == key) {
                        return true
                    }
                }
            } else {
                for (var i in obj) {
                    if (obj[i] == key) {
                        return true
                    }
                }
            }
        }
        return false;
    }
}
/**log日志打印 */
UtilWt.Log = {
    /**cocos2d-js打印日志的方法
     * @param {String} logStr 
     */
    cocos2dJs: (logStr) => {
        var cc = cc;
        //判断当前是否在cocos环境中
        if (cc && cc.log) {
            cc.log(logStr);
        } else {
            console.log(logStr);
        };
    },
}
/**cocos2d-js */
UtilWt.cocos2d = {
    /**创建一个ui
     * @param {*} args 参数
     * @returns {cc.Layer} 创建好的层
     */
    LayerNew: (args) => {
        return cc.Layer.extend({
            ctor: function (args) {
                this._super();
                this._ctor();
            },
            _ctor: function () { },
        })
    },
    /**事件管理类
     * @returns js\frameworks\cocos2d-html5\cocos2d\core\event-manager\CCEventManager.js
     */
    eventManager: () => {
        return cc.EventManager;
    },
    /**给控件添加自定义监听事件，参数可能可以放在控件自身上
     * @param {cc.Node} node 节点，控件
     * @param {String} customEventName 自定义事件名称
     * @param {Function} callbackFunc 触发后调用方法
     * @param {Boolean} runAtStart 监听时先运行一次回调方法
     */
    addListener: (node, customEventName, callbackFunc, runAtStart = false) => {
        //未指定事件添加侦听器，这里是为node添加自定义事件
        UtilWt.cocos2d.eventManager.addListener(cc.EventListener.create({
            /**添加的事件类型 */
            event: cc.EventListener.CUSTOM,
            /**事件名 */
            eventName: customEventName,
            /**事件触发时回调 */
            callback: function (et) {
                callbackFunc.call(node, et.getUserData(), customEventName);
            }
        }), node);
        //开始监听时先运行一次
        if (runAtStart) callbackFunc.call(node);
    },
    /**根据路径找到一个控件下的对应控件
     * @param {cc.Node} node 查找的节点
     * @param {String} name 查找的节点路径，以当前查找节点（node）为相对路径
     * @param {String} separator 路径分割符号。默认为'.'
     * @returns {cc.Node} 查找到的节点
     */
    getChildByPath: (node, name, separator = '.') => {
        let nameList = name.split(separator);
        let child = node.getChildByName(nameList[0]);
        for (let i = 1; i < nameList.length; ++i) {
            child = child.getChildByName(nameList[i])
        }
        return child;
    },
    /**判断某个坐标是否在某个矩形区域中
     * @param {cc.Rect|{x: Number, y:Number, width: Number, height: Number}} rect 矩形区域，xy为坐标，锚点为width/2,height/2
     * @param {cc.Point|{x: Number, y: Number}} point 判断坐标
     * @returns {Boolean} 是否在这个矩形区域中
     */
    rectContainsPoint: (rect, point) => {
        return cc.rectContainsPoint(rect, point)
    },
    /**调用当前作用域中的update方法 */
    _scheduleUpdate: () => {
        this.update();
    },
    /**取消调度更新当前作用域中的update方法 */
    _unscheduleUpdate: () => {
        this.unscheduleUpdate();
    },
}
/**cocos2d-js cc */
UtilWt.cc = {
    /**节点 */
    Node: {
        /**使用子节点的名称获取它
         * @param {cc.Node} Node 父节点
         * @param {String} childName 子节点名称
         * @returns {cc.Node|ccui.Widget} 子节点
         */
        getChildByName: (Node, childName) => {
            if (Node) {
                if (UtilWt.Class.isType(childName, UtilWt.Class.Type.String)) {
                    return Node.getChildByName(childName);
                }
                UtilWt.Log.cocos2dJs("获取节点： " + Node + " 下的名称为： '" + childName + "' 的控件失败。\n获取的节点名称有误，不存在或者不为字符串");
                return;
            }
            UtilWt.Log.cocos2dJs("获取节点： " + Node + " 下的名称为： '" + childName + "' 的控件失败。\n没有获得到父节点");
        },
        /**清除当前ui。清除当前节点的父节点
         * @param {cc.Node} Node 当前节点
         * @param {Boolean} cleanup true清理当前节点，删除这个节点上的所有操作和回调
         */
        removeFromParent: (Node, cleanup = true) => {
            if (Node) {
                if (!UtilWt.Class.isType(cleanup, UtilWt.Class.Type.Boolean)) {
                    UtilWt.Log.cocos2dJs("节点： " + Node + " 清理cleanup参数有误。将被强制转化成bool型数据");
                    cleanup = !!cleanup;
                };
                Node.removeFromParent(cleanup);
                return;
            }
            UtilWt.Log.cocos2dJs("节点： " + Node + " 清除失败。节点不存在");
        },
        /**添加一个子节点到Node中
         * @param {cc.Node} Node 父节点
         * @param {cc.Node} childNode 将要添加到父节点中的子节点
         */
        addChild: (Node, childNode, zIndex) => {
            if (Node) {
                if (childNode) {
                    Node.addChild(childNode, zIndex);
                    return;
                };
                UtilWt.Log.cocos2dJs("节点： " + Node + " 添加子节点： " + childNode + " 失败。子节点childNode不存在");
                return;
            }
            UtilWt.Log.cocos2dJs("节点： " + Node + " 添加子节点： " + childNode + " 失败。父节点Node不存在");
        },
        /**执行操作。节点ui动作 
         * @param {cc.Node} Node 操作节点
         * @param {cc.Action} action 执行动作
         * @return {cc.Action}
        */
        runAction: (Node, action) => {
            if (Node) {
                let func = Node.runAction;
                if (func) {
                    return func(action);
                };
            };
            UtilWt.Log.cocos2dJs("节点： " + Node + " 执行动作： " + action + " 失败。节点Node不存在，或者Node不是节点");
        },
        //D:\client\yn\yueyang\main.js中修改了原版的点击、触摸回调，
        //需要注意用法是一样的，只是加了一个参数，用来判断是否需要播放设定的默认的ui点击音效
        //也许可以将第二个参数设定为true来播放对应ui的音效
        //这里猜测设定这个默认方法的人和写后面大厅界面按钮点击的人不是同一个人
        /**默认的点击事件回调
         * @param {cc.Node} Node 
         * @param {Function} callBackFunction 
         * @example but.addClickEventListener(()=>{})
         */
        addClickEventListener: (Node, callBackFunction) => {
            //判空
            if (Node) {
                //判断回调方法是否是方法类型
                if (callBackFunction && UtilWt.Class.isType(callBackFunction, UtilWt.Class.Type.Function)) {
                    //设定按钮的点击回调
                    Node.addClickEventListener(callBackFunction);
                    return;
                };
                UtilWt.Log.cocos2dJs("对节点： " + Node + " 设定点击回调失败。\n设定的回调方法不存在，或者不为方法类型");
                return;
            }
            UtilWt.Log.cocos2dJs("对节点： " + Node + " 设定点击回调失败。\n传入节点不存在");
        },
        /**修改控件大小
         * @param {cc.Node} Node 
         * @param {cc.Size|Number} size 
         * @param {Numberd|undefine} height 
         */
        setContentSize: (Node, size, height = undefined) => {
            if (Node) {
                Node.setContentSize(size, height);
                return;
            };
            UtilWt.Log.cocos2dJs("对节点： " + Node + " 设定内容大小失败。\n传入节点不存在");
        },
        /**获得当前节点的父节点
         * @param {cc.Node} Node 当前节点
         * @returns {cc.Node} 父节点
         */
        parent: (Node) => {
            if (Node) {
                return Node.parent;
            };
            UtilWt.Log.cocos2dJs("获取节点： " + Node + " 的父节点失败。\n传入节点不存在");
        },
        /**获取节点可见性
         * @param {cc.Node} Node 节点
         * @returns {Boolean} 是否可见
         */
        isVisible: (Node) => {
            if (Node) {
                return Node.isVisible();
            };
            UtilWt.Log.cocos2dJs("获取节点： " + Node + " 的可见性失败。\n传入节点不存在");
        },
        /**设置当前节点的可见性
         * @param {cc.Node} Node 节点
         * @param {Boolean} visible 是否可见
         */
        setVisible: (Node, visible = true) => {
            if (Node) {
                if (UtilWt.cc.Node.isVisible(Node) != visible) {
                    Node.setVisible(visible);
                }
                return;
            };
            UtilWt.Log.cocos2dJs("修改节点： " + Node + " 的可见性失败。\n传入节点不存在");
        },
        /**从容器中删除所有子项，并根据清理参数清理所有正在运行的操作。
         * @param {cc.Node} Node 节点
         * @param {Boolean} cleanup 是否清理，默认为清理true
         */
        removeAllChildren: (Node, cleanup = true) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("清除节点： " + Node + " 的所有子项失败。\n传入节点不存在");
                return;
            };
            if (typeof cleanup != "boolean") {
                cleanup = !!cleanup;
                UtilWt.Log.cocos2dJs("清除节点： " + Node + " 的所有子项传入的清理参数数据类型有误。将被强制转化成bool型数据：" + cleanup);
            };
            Node.removeAllChildren(cleanup);
        },
        /**以百分比设置锚点。
         * @param {cc.Node} Node 节点
         * @param {cc.Point|Number} point 节点锚点位置 或者 节点锚点x位置
         * @param {undefined|Number} y 节点锚点y位置，传入x锚点为cc.Point类型时可以不传入y位置？传入可能无效
         */
        setAnchorPoint: (Node, point = cc.Point(0.0, 0.0), y = undefined) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("设置节点： " + Node + " 的锚点失败。\n传入节点不存在");
                return;
            };
            if (point && (UtilWt.Class.isType(point, cc.Point, true) || (typeof point == typeof y == "number"))) {
                Node.setAnchorPoint(point, y);
                return;
            };
            UtilWt.Log.cocos2dJs("设置节点： " + Node + " 的锚点失败。\n传入位置参数有误：（" + point + ", " + y + "）");
        },
        /**设置节点的位置
         * @param {cc.Node} Node 节点
         * @param {cc.Point|Number} newPosOrxValue cc.Point坐标 或者 x坐标
         * @param {undefined|Number} yValue y坐标,如果point为cc.Point可以不传入？传入可能无效
         */
        setPosition: (Node, newPosOrxValue, yValue) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("设置节点： " + Node + " 的位置失败。\n传入节点不存在");
                return;
            };
            if (newPosOrxValue && (UtilWt.Class.isType(newPosOrxValue, cc.Point, true) || (typeof newPosOrxValue.x == typeof newPosOrxValue.y && typeof newPosOrxValue.y == "number") || (typeof newPosOrxValue == typeof yValue == "number"))) {
                Node.setPosition(newPosOrxValue, yValue);
                return;
            };
            UtilWt.Log.cocos2dJs("设置节点： " + Node + " 的位置失败。\n传入位置参数有误：（" + newPosOrxValue + ", " + yValue + "）");
        },
        /**获得节点的大小
         * @param {cc.Node} Node 节点
         * @returns {cc.Size|{height: Number, width: Number}} 节点大小
         * @param {Number} height 高度
         * @param {Number} width 宽度
         */
        getContentSize: (Node) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("获取节点：" + Node + "的大小失败。当前节点可能不存在");
                return;
            };
            return Node.getContentSize();
        },
        /**居中，节点根据其父节点的大小居中 
         * @param {cc.Node} Node 需要被居中的节点
         * @param {undefined|cc.Node} parentNode 父节点，如果传入则将按照这个节点为父节点
         */
        centeredRelativeToParentNode: (Node, parentNode = undefined) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("给节点：" + Node + "居中失败。当前节点可能不存在");
                return;
            };
            if (!parentNode) {
                parentNode = UtilWt.cc.Node.parent(Node);
                if (!parentNode) {
                    UtilWt.Log.cocos2dJs("找不到当前节点：" + Node + "的父节点");
                    return;
                };
            };
            //父节点的宽高
            let parentSize = UtilWt.cc.Node.getContentSize(parentNode);
            if (!UtilWt.Class.isType(parentSize, cc.Size, true)) {
                UtilWt.Log.cocos2dJs("给节点：" + Node + "居中失败。父节点：" + parentNode + "可能不存在，因为获取不到其大小");
                return;
            };
            //以父节点宽高居中
            UtilWt.cc.Node.setPosition(parentSize.width / 2, parentSize.width / 2);
        },
        /**得到节点的位置（在父节点的位置）
         * @param {cc.Node} Node 当前节点
         * @returns {cc.Point|undefined} 位置信息
         */
        getPosition: (Node) => {
            if (!Node) {
                UtilWt.Log.cocos2dJs("得到节点：" + Node + "位置失败。当前节点可能不存在");
                return;
            };
            return Node.getPosition();
        },
        // /**获得以这个节点的坐标系的某个世界坐标。
        //  * 
        //  */
        // convertToWorldSpaceAR: (nodePoint)=>{

        // },
    },
    /**动作。ui变化、移动 */
    Action: {
        FiniteTimeAction: {
            ActionInstant: {
                /**按顺序执行动作
                 * @param {Array|cc.FiniteTimeAction} tempArray ？执行动作，或者执行动作列表
                 * @returns {cc.Sequence} 
                 */
                sequence: (tempArray) => {
                    return cc.sequence(tempArray);
                },
                /**移动节点动作
                 * @param {Number} duration 动作时间s
                 * @param {cc.Point|Number} deltaPos 移动到的x坐标，或者移动到的坐标cc.Point
                 * @param {Number} deltaY 移动到的y坐标
                 * @returns {cc.MoveBy}
                 */
                moveBy: (duration, deltaPos, deltaY) => {
                    return cc.MoveBy(duration, deltaPos, deltaY);
                },
                /**延迟动作
                 * @param {Number} time 延迟时间
                 * @returns {cc.DelayTime}
                 */
                delayTime: (time = 1.0) => {
                    return cc.delayTime(time);
                },
                /**淡出，透明度从255变成0
                 * @param {Number} time 淡出时间
                 * @returns {cc.DelayTime}
                 */
                fadeOut: (time = 1.0) => {
                    return cc.fadeOut(time);
                },
                /**动作执行一个方法
                 * @param {Function} 执行的方法 
                 * @param {object|null} selectorTarget ？选择器目标
                 * @param {*} 方法的参数 
                 * @returns {cc.CallFunc}
                 */
                callFunc: (selector, selectorTarget, data) => {
                    return cc.callFunc(selector, selectorTarget, data);
                },
                /**在下一帧删除这个动作。相当于动作结束
                 * @param {boolean} isNeedCleanUp 
                 */
                RemoveSelf: (isNeedCleanUp = true) => {
                    return cc.RemoveSelf(isNeedCleanUp);
                }
            }
        }
    },
    /**系统 */
    sys: {
        /**检查对象是否有效。 在 Web 引擎中，如果对象存在，它将返回 true 在本机引擎中，如果 JS 对象和对应的本机对象都有效，它将返回 true
         * @param {Object} obj 对象
         * @returns {Boolean} 是否有效
         */
        isObjectValid: (obj) => {
            return cc.sys.isObjectValid(obj);
        },
    },
    /**声音 */
    audioEngine: {
        /**？播放效果音效，可能无法使用
         * @param {String} url 音效路径
         * @param {String} loop 是否重复
         * @param {Number} vol 音量
         * @returns {Number|null} 音效id
         */
        _playEffect: (url, loop = false, vol = 1.0) => {
            return cc.audioEngine.playEffect(url, loop, 1, 0, vol + 0.0001);//ios系统不识别0的音效设置
        },
        /**播放效果音效
         * @param {String} url 音效路径
         * @param {String} loop 是否重复
         * @returns {Number|null} 音效id
         */
        playEffect: (url, loop = false) => {
            return cc.audioEngine.playEffect(url, loop);
        },
    },
    /**克隆，拷贝
     * @param {cc.Node} Node 拷贝节点
     * @param {Object} obj 拷贝对象，如果没有传入节点
     * @returns {cc.Node|Object} 根据传入拷贝一个新的同类型对象
     */
    clone: (Node = undefined, obj = undefined) => {
        if (Node) {
            return Node.clone();
        } else {
            if (obj) {
                return cc.clone(obj);
            };
            UtilWt.Log.cocos2dJs("拷贝对象： " + obj + " 失败。对象不存在");
        };
    },
}
/**cocos2d-js ccs */
UtilWt.ccs = {
    /**载入uiJson文件，用来创建对应ui界面
     * @param {String} uiJsonPath 
     * @param {String|undefined} [path=] Resource path
     * @returns {{node: cc.Node, action: cc.Action}}
     */
    load: (uiJsonPath, path = undefined) => {
        if (uiJsonPath && UtilWt.Class.isType(uiJsonPath, UtilWt.Class.Type.String)) {
            return ccs.load(uiJsonPath, path);
        }
        UtilWt.Log.cocos2dJs("载入uiJson文件： " + uiJsonPath + " 失败。传入路径字符串有误");
    }
}
/**cocos2d-js ccui，基本上ccui类的对象都算是cc.Node对象 */
UtilWt.ccui = {
    Node: {
        ProtectedNode: {
            /**小部件。ui控件 */
            Widget: {
                /**文本 */
                Text: {
                    /**创建一个文本控件
                     * @param {String|undefined} textContent 文本内容
                     * @param {String|undefined} fontName 字体名称，字体路径
                     * @param {Number|undefined} fontSize 字体大小
                     * @returns {ccui.Text} 文本控件
                     */
                    create: (textContent = undefined, fontName = undefined, fontSize = undefined) => {
                        return ccui.Text(textContent, fontName, fontSize);
                    },
                    /**设置文本控件的内容
                     * @param {ccui.Text} Node 将要操作的文本控件Node
                     * @param {String} text 设置的文本字符串
                     */
                    setString: (Node, text) => {
                        if (Node) {
                            if (!UtilWt.Class.isType(text, UtilWt.Class.Type.String)) {
                                UtilWt.Log.cocos2dJs("设置文本控件：" + Node + " 的文本数据类型有误，已转化成字符串类型");
                                try {
                                    text = String(text);
                                } catch (e) {
                                    UtilWt.Log.cocos2dJs("设置文本控件：" + Node + " 的文本数据类型有误，无法转化成字符串类型");
                                    return;
                                }
                            };
                            Node.setString(text);
                            return;
                        };
                        UtilWt.Log.cocos2dJs("设置文本控件：" + Node + " 的文本数据类型失败。找不到这个文本控件");
                    }
                },
                /**图片 */
                ImageView: {
                    /**设置图片
                     * @param {ccui.ImageView} Node 图片控件
                     * @param {str} fileName 图片路径
                     * @param {ccui.Widget.LOCAL_TEXTURE|CCUI.Widget.PLIST_TEXTURE} texType 纹理类型
                     */
                    loadTexture: (Node, fileName, texType = undefined) => {
                        Node.loadTexture(fileName, texType);
                    },
                },
                /**是否忽略size使用texture size 默认true
                 * @param {cc.Widget} Node 
                 * @param {Boolean} ignore 
                 */
                ignoreContentAdaptWithSize: (Node, ignore = true) => {
                    if (Node) {
                        Node.ignoreContentAdaptWithSize(UtilWt.Class.isType(ignore) == UtilWt.Class.Type.Boolean ? ignore : !!ignore);
                        return;
                    };
                    UtilWt.Log.cocos2dJs("对ui控件： " + Node + "\n 进行 ignoreContentAdaptWithSize\n传入节点不存在 ")
                },
                /**获取小组件的内容大小。内容大小是小部件的纹理大小。
                 * @param {cc.Widget} Node 准备获取大小的控件
                 * @returns {cc.Size|{width: Number, height:Number}} 当前控件的大小
                 */
                getVirtualRendererSize: (Node) => {
                    return Node.getVirtualRendererSize();
                },
                /**图层 */
                Layout: {
                    /**滚动容器 */
                    ScrollView: {
                        /**列表容器 */
                        ListView: {
                            /**将item节点放入列表容器中
                             * @param {ccui.ListView} listViewNode 列表容器节点
                             * @param {cc.Node} item 放入节点控件
                             */
                            pushBackCustomItem: (listViewNode, item) => {
                                if (!listViewNode) {
                                    UtilWt.Log.cocos2dJs("将item节点放入列表容器： " + listViewNode + " 中失败。列表容器不存在");
                                    return
                                }
                                if (!item) {
                                    UtilWt.Log.cocos2dJs("将item节点：" + item + "放入列表容器： " + listViewNode + " 中失败。放入节点不存在");
                                    return
                                }
                                listViewNode.pushBackCustomItem(item);
                            },
                        },
                    },
                },
                /**添加触摸回调
                 * @param {ccui.Widget} Node 添加的控件
                 * @param {Function} selector 触摸回调
                 * @param {ccui.Widget} target 添加的控件。可以不传入，传入按这个优先
                 */
                addTouchEventListener: (Node, selector, target = undefined) => {
                    Node.addTouchEventListener(selector, target);
                },
            }
        }
    }
}
/**MjClient专用 */
UtilWt.MjClient = {
    /**显示提示文本
     * @param {String} showStr 
     */
    showToast: (showStr) => {
        if (MjClient) {
            let func = MjClient.showToast;
            if (func) {
                func(showStr);
                return;
            };
        };
        UtilWt.Log.cocos2dJs("显示提示消息的功能可能不存在。" + func);
    },
    /**调整节点位置，进行自适应屏幕
     * @param {cc.Node} wgt   节点
     * @param {[Number, Number]} pct   节点缩放大小
     * @param {[Number, Number]} pos    节点的位置
     * @param {[Number, Number]} off   节点的偏移
     * @param {Boolean} isMax  缩放是取最大值还是最小值(取)
     * @param {Boolean} isPar  节点相对于屏幕还是相对父节点，false相对于屏幕, true相对于父节点与舞台取最小值
     */
    setWgtLayout: (wgt, pct, pos, off, isMax, isPar) => {
        if (setWgtLayout) {
            setWgtLayout(wgt, pct, pos, off, isMax, isPar);
            return;
        };
        UtilWt.Log.cocos2dJs("设置ui的自适应大小失败。方法： " + setWgtLayout + " 可能不存在");
    },
    /**绑定ui的自定义事件
     * @param {*} pjs 没有使用
     * @param {cc.Node} node 控件
     * @param {String} evt 事件名
     * @param {Function} func 回调方法
     */
    UIEventBind: (pjs, node, evt, func) => {
        if (UIEventBind) {
            UIEventBind(pjs, node, evt, func);
            return;
        };
        UtilWt.Log.cocos2dJs("绑定ui的自定义事件失败。绑定事件： " + UIEventBind + " 可能不存在");
    },
    /**得到app类型
     * @returns {Number|MjClient.APP_TYPE} app类型
     */
    getAppType: () => {
        if (MjClient) {
            if (MjClient.getAppType) {
                return MjClient.getAppType();
            }
        }
        UtilWt.Log.cocos2dJs("获取app类型失败。客户端可能不存在或者未加载完毕\nMjClient.getAppType() 不存在");
    },
}
/**数组操作，列表 */
UtilWt.Array = {
    /**列表操作，会改变原字符串
     * @param {Array} list 操作数组
     * @param {Number} index 位置
     * @param {Number} delSum 删除数量
     * @param {*|Array} addItem 从开始位置（index）添加的数据
     * @returns {Array} 被删除的数据Array
     */
    splice: (list = [], index = 0, delSum = 1, addItem) => {
        return list.splice(index, delSum, addItem);
    },
    /**往列表中添加数据
     * @param {Array} list 准备添加数据的Array
     * @param {*} addItem 准备添加的数据
     */
    push: (list = [], addItem) => {
        list.push(addItem);
    },
}
/**方法 */
UtilWt.Function = {
    /**方法重用
     * @param {Function} func 方法
     * @param {Object} argsObject 参数包，参数字典
     * @returns {*} 方法返回参数
     * @example 
    var person = {
        firstName:"Bill",
        lastName: "Gates",
        fullName: function () {
            return this.firstName + " " + this.lastName;
        }
    }
    person.fullName();		// 将返回 "Bill Gates"
     */
    call: (func, argsObject = {}) => {
        return func.call(argsObject);
    },
}
/**字符串 */
UtilWt.String = {
    /**截取字符串
     * @param {String} str 操作字符串
     * @param {Number} from 开始下标
     * @param {Number|undefined} to 结束下标
     * @returns {String} 从开始位置到结束位置（不包含）的字符串
     */
    substring: (str, from, to = undefined) => {
        return str.substring(from, to);
    },
    /**把一个字符串分割成字符串数组
     * @param {String} str 操作的字符串
     * @param {String} separator 分割的字符串
     * @param {Number} limit 返回数组的最大长度
     * @returns {Array} 按照规则分割好的数组
     */
    split: (str, separator = undefined, limit = undefined) => {
        return str.split(separator, limit);
    },
    /**往一个字符串中间插入特殊字符
     * @param {String} text 操作字符串
     * @param {String} add 添加的字符串
     * @returns {String} 添加完毕的字符串
     */
    textAddDivide: (text, add = " ") => {
        /**@type {String} 添加第一位数据 */
        let ret = text.charAt(0)
        //循环字符串长度，往里面添加空格
        for (let i = 1; i < text.length; i++) {
            ret += add + text.charAt(i);
        };
        return ret;
    },
    /**截取字符串的某位置字符
     * @param {String} str 操作字符串
     * @param {Number} pos 位置下标
     * @returns {String} 截取的字符
     */
    charAt: (str, pos = 0) => {
        if (typeof str == 'string') {
            if (typeof pos == 'number') {
                return str.charAt(pos);
            };
            UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：" + pos + " 数据类型有误");
            return;
        };
        UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。当前字符串不是字符串数据类型");
    },
    /**字符串截取，重视前后位置
     * @param {String} str 操作字符串
     * @param {Number} start 起始位置
     * @param {Number} end 结束位置。为负数时则是以字符串结尾处为结束位置
     * @returns {String} 截取的字符串
     */
    slice: (str, start = 0, end = undefined) => {
        if (typeof str == 'string') {
            if (typeof start == 'number') {
                if (end == undefined || typeof end == 'number') {
                    /**与substring的区别
                     * @example
                    if (end < 0) {
                        end = str.length + end;
                    };
                     */
                    return str.slice(start, end);
                };
                UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：（" + start + "," + end + "） 参数异常，结束位置的数据类型有误");
                return;
            };
            UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：（" + start + "," + end + "） 参数异常，起始位置的数据类型有误");
            return;
        };
        UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。当前字符串不是字符串数据类型");
    },
    /**字符串截取，重视从左至右
     * @param {String} str 操作字符串
     * @param {Number} start 起始位置
     * @param {Number} end 结束位置。为负数时，逻辑上为0
     * @returns {String} 截取的字符串
     */
    substring: (str, start = 0, end = undefined) => {
        if (typeof str == 'string') {
            if (typeof start == 'number') {
                if (end == undefined || typeof end == 'number') {
                    /**与slice的区别
                     * @example
                    if (end < 0) {
                        end = 0;
                    };
                     */
                    return str.substring(start, end);
                };
                UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：（" + start + "," + end + "） 参数异常，结束位置的数据类型有误");
                return;
            };
            UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：（" + start + "," + end + "） 参数异常，起始位置的数据类型有误");
            return;
        };
        UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。当前字符串不是字符串数据类型");
    },
    /**字符串截取，长度截取
     * @param {String} str 操作字符串
     * @param {Number} start 起始位置
     * @param {Number} length 截取长度
     * @returns {String} 截取的字符串
     */
    substr: (str, from = 0, length = undefined) => {
        if (typeof str == 'string') {
            if (typeof from == 'number') {
                if (length == undefined || typeof length == 'number') {
                    return str.substr(from, length);
                };
                UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的长度：" + length + " 参数异常，长度的数据类型有误");
                return;
            };
            UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。截取的位置：" + from + " 参数异常，起始位置的数据类型有误");
            return;
        };
        UtilWt.Log.cocos2dJs("字符串：" + str + " 截取失败。当前字符串不是字符串数据类型");
    },
    /**字符串转小写
     * @param {String} str 需要操作的字符串
     * @returns {String} 规则化后的字符串
     */
    toLowerCase: (str) => {
        if (typeof str == 'string') {
            return str.toLowerCase();
        };
        UtilWt.Log.cocos2dJs("字符串转小写失败。当前字符串: " + str + " 不是字符串数据类型");
    },
    /**字符串转大写
     * @param {String} str 需要操作的字符串
     * @returns {String} 规则化后的字符串
     */
    toUpperCase: (str) => {
        if (typeof str == 'string') {
            return str.toUpperCase();
        };
        UtilWt.Log.cocos2dJs("字符串转大写失败。当前字符串: " + str + " 不是字符串数据类型");
    },
    /**字符串首字母大写
     * @param {String} str 需要操作的字符串
     * @returns {String} 规则化后的字符串
     */
    firstLetterCapitalized: (str) => {
        if (typeof str == 'string') {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };
        UtilWt.Log.cocos2dJs("字符串首字母大写规则化失败。当前字符串: " + str + " 不是字符串数据类型");
    },
    /**根据路径获得文件名
     * @param {String} path 文件路径
     * @param {Boolean} extension 是否排除扩展名
     * @returns {String} 文件名
     */
    GetFileName: (path, extension=false) => {
        let fileParts = path.split("/"); // 使用斜杠进行分割  
        let fileName = fileParts.pop(); // 获取最后一个元素，即文件名  
        if (extension){
            let dotIndex = fileName.lastIndexOf("."); // 找到扩展名的位置 
            // 如果扩展名存在并且不是文件名的第一个字符 
            if (dotIndex > 0) {   
                fileName = fileName.slice(0, dotIndex); // 使用slice()方法截取文件名  
            }
        }
        // console.log(fileName); // 输出
        return fileName;
    },
}
/**对象 */
UtilWt.Object = {
    /**像对象obj中添加属性keyStr，并设置数据描述运行符
     * @param {Object} obj 对象
     * @param {String} keyStr 属性名
     * @param {{value: *, writable: Boolean, enumerable: Boolean, configurable: Boolean}} dataDict 添加的数据
     * @param {*} dataDict.value 默认值
     * @param {Boolean} dataDict.writable 可写
     * @param {Boolean} dataDict.enumerable 可枚举
     * @param {Boolean} dataDict.configurable 可以再次修改属性描述符
     */
    defineProperty: (obj, keyStr, dataDict) => {
        Object.defineProperty(obj, keyStr, dataDict);
    },
}
/**功能 */
UtilWt.Func = {
    /**鼠标按下拖动功能，控件中心点跟随鼠标移动
     * @param {cc.Widget} Node 节点
     */
    mouseDrag_Center: (Node) => {
        Node.addTouchEventListener(
            /**
             * @param {ccui.Widget} sender 节点自身
             * @param {Number|TOUCH_BEGAN: Number|ccui.Widget.TOUCH_MOVED|ccui.Widget.TOUCH_ENDED|ccui.Widget.TOUCH_CANCELED} type 触摸类型
             */
            (sender, type) => {
                /**@type {{TOUCH_BEGAN: Number, TOUCH_MOVED: Number, TOUCH_ENDED: Number, TOUCH_CANCELED: Number}} ccui.Widget类，控件类 */
                let touchType = ccui.Widget;
                //判断触摸类型
                switch (type) {
                    //触摸开始
                    // case touchType.TOUCH_BEGAN:
                    //     return;
                    //触摸移动
                    case touchType.TOUCH_MOVED:
                        //第一次进来拿不到getTouchMovePosition
                        if (!sender.isStartMove) {
                            /**@type {Boolean} 开始移动 */
                            sender.isStartMove = true;
                            return;
                        }
                        /**@type {cc.Point} 获取触摸移动事件的位置 */
                        var pos = sender.getTouchMovePosition();
                        /**@type {cc.Point} 当前触摸位置 相对于 当前节点 的 父节点 的 相对位置 */
                        pos = sender.parent.convertToNodeSpace(pos);
                        /**@type {cc.Size} 控件大小 */
                        var size = sender.getContentSize();
                        /**@type {cc.Point} 空间锚点 */
                        var anchor = sender.getAnchorPoint();
                        /**@type {Number} 获得x轴缩放 */
                        var scaleX = sender.getScaleX();
                        /**@type {Number} 获得y轴缩放 */
                        var scaleY = sender.getScaleY();
                        /**设置当前节点的拖动中心，当前触摸位置的相对于这个节点的父节点的相对位置+（（节点的锚点）-0.5居中）*节点的大小*节点的轴缩放） */
                        pos = {
                            x: pos.x + ((anchor.x - 0.5) * size.width * scaleX),
                            y: pos.y + ((anchor.y - 0.5) * size.height * scaleY),
                        }
                        //设置这个节点的新位置，相当于 当前触摸点 对于 这个节点 的 父节点 的 相对位置
                        sender.setPosition(pos);
                        return;
                    //触摸结束
                    case touchType.TOUCH_ENDED:
                        //重置触摸
                        sender.isStartMove = false;
                        return;
                    //触摸取消
                    case touchType.TOUCH_CANCELED:
                        //重置触摸
                        sender.isStartMove = false;
                        return;
                    //其他情况
                    default:
                        return;
                }
            }
        );
    },
    /**鼠标按下拖动功能，控件点击位置跟随鼠标移动
     * @param {cc.Widget} Node 节点
     */
    mouseDrag_Pos: (Node) => {
        Node.addTouchEventListener(
            /**
             * @param {ccui.Widget} sender 节点自身
             * @param {Number|TOUCH_BEGAN: Number|ccui.Widget.TOUCH_MOVED|ccui.Widget.TOUCH_ENDED|ccui.Widget.TOUCH_CANCELED} type 触摸类型
             */
            (sender, type) => {
                /**@type {{TOUCH_BEGAN: Number, TOUCH_MOVED: Number, TOUCH_ENDED: Number, TOUCH_CANCELED: Number}} ccui.Widget类，控件类 */
                let touchType = ccui.Widget;
                //判断触摸类型
                switch (type) {
                    //触摸开始
                    // case touchType.TOUCH_BEGAN:
                    //     return;
                    //触摸移动
                    case touchType.TOUCH_MOVED:
                        //第一次进来拿不到getTouchMovePosition
                        if (!sender.isStartMove) {
                            /**@type {Boolean} 开始移动 */
                            sender.isStartMove = true;
                            /**@type {cc.Point} 开始移动的位置 */
                            var beganPos = sender.getTouchBeganPosition();
                            /**@type {cc.Point} ui控件当前的位置，开始移动的位置 */
                            var nodePos = sender.getWorldPosition();
                            /**@type {cc.Point} 获得触摸开始位置和ui控件位置的偏移量 */
                            sender.offset = { x: nodePos.x - beganPos.x, y: nodePos.y - beganPos.y };
                            return;
                        }
                        /**@type {cc.Point} 获取触摸移动事件的位置 */
                        var pos = sender.getTouchMovePosition();
                        /**设置当前节点的拖动中心，当前触摸位置的相对于这个节点的父节点的相对位置+偏移量 */
                        var offset = sender.offset;
                        pos = {
                            x: pos.x + offset.x,
                            y: pos.y + offset.y,
                        }
                        /**@type {cc.Point} 当前触摸位置 相对于 当前节点 的 父节点 的 相对位置 */
                        pos = sender.parent.convertToNodeSpace(pos);
                        //设置这个节点的新位置，相当于 当前触摸点 对于 这个节点 的 父节点 的 相对位置
                        sender.setPosition(pos);
                        return;
                    //触摸结束
                    case touchType.TOUCH_ENDED:
                        //重置触摸
                        sender.isStartMove = false;
                        return;
                    //触摸取消
                    case touchType.TOUCH_CANCELED:
                        //重置触摸
                        sender.isStartMove = false;
                        return;
                    //其他情况
                    default:
                        return;
                }
            }
        );
    },
}
