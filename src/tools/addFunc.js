if (typeof Object.assign !== 'function') {
    Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
                continue;
            }
            nextSource = Object(nextSource);

            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) {
                    to[nextKey] = nextSource[nextKey];
                }
            }
        }
        return to;
    };
}

//添加cc.log
if (cc) {
    if (cc.Sprite) {
        if (cc.Sprite.create) {
            /**
             * Create a sprite with image path or frame name or texture or spriteFrame.
             * @deprecated since v3.0, please use new construction instead
             * @see cc.Sprite
             * @param {String|cc.SpriteFrame|HTMLImageElement|cc.Texture2D} fileName  The string which indicates a path to image file, e.g., "scene1/monster.png".
             * @param {cc.Rect} rect  Only the contents inside rect of pszFileName's texture will be applied for this sprite.
             * @param {Boolean} [rotated] Whether or not the texture rectangle is rotated.
             * @return {cc.Sprite} A valid sprite object
             */
            cc.Sprite.create = function (fileName, rect, rotated) {
                return new cc.Sprite(fileName, rect, rotated);
            };
        };
    };
};

test = {
    log: function (...str) {
        if (str.length) {
            for (let i = 0; i < str.length; i++) {
                var str = str[i];
                if (typeof str != 'object') {
                    console.log(str);
                } else {
                    console.log("{");
                    for (let key in str) {
                        console.log("    " + key + ": " + str[key]);
                    };
                    console.log("}");
                };
            };
        };
    },
}
