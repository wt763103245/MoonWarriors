
var GOBackgroundLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.initBackground();

        this.initLogo();

        this.initScore();

    },

    initBackground : function(){

        this._sptBg = new cc.Sprite(res.mm_bg_png);
        this._sptBg.attr({
            x: GC.w_2,
            y: GC.h_2
        });
        this.addChild(this._sptBg);
    },
    initLogo : function(){
        var logo = new cc.Sprite(res.go_gameOver_png);
        logo.attr({
            anchorX : 0,
            anchorY : 0,
            x : 0,
            y : 300
        });
        this.addChild(logo);

        var cocos2dhtml5 = new cc.Sprite(res.go_cocos2d_html5_png);
        cocos2dhtml5.x = 160;
        cocos2dhtml5.y = 150;
        this.addChild(cocos2dhtml5);
    },
    initScore : function(){
        var lbScore = new cc.LabelTTF("Your Score:" + GC.SCORE, "Arial Bold", 16);
        lbScore.x = 160;
        lbScore.y = 280;
        lbScore.color = cc.color(250, 179, 0);
        this.addChild(lbScore);
    }
});
