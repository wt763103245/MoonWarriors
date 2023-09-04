var GOTouchLayer = cc.Layer.extend({

    ctor : function(){

        this._super();

        this.playMusic();

        this.initTouchAbout();

    },
    playMusic : function(){
        if (GC.SOUND_ON){
            if (cc.audioEngine.isMusicPlaying()){
                return;
            }
            cc.audioEngine.playMusic(res.mm_bgMusic_mp3, true);
        }
    },
    initTouchAbout : function(){

        var playAgainNormal = new cc.Sprite(res.mm_mune_png, cc.rect(378, 0, 126, 33));
        var playAgainSelected = new cc.Sprite(res.mm_mune_png, cc.rect(378, 33, 126, 33));
        var playAgainDisabled = new cc.Sprite(res.mm_mune_png, cc.rect(378, 33 * 2, 126, 33));

        var playAgain = new cc.MenuItemSprite(
            playAgainNormal,
            playAgainSelected,
            playAgainDisabled,
            this.onPlayAgain,
            this
        );

        var menu = new cc.Menu(playAgain);
        menu.x = GC.w_2;
        menu.y = 220;
        this.addChild(menu);

        /*var labCocos = new cc.LabelTTF("Download Cocos2d-html5","Arial",14);
        var labSample = new cc.LabelTTF("Download This Sample","Arial",14);
        var menu1 = new cc.MenuItemLabel(labCocos, function(){
            window.location.href = "http://www.cocos2d-x.org/projects/cocos2d-x/wiki/Cocos2d-html5";
        });
        var menu2 = new cc.MenuItemLabel(labSample, function(){
            window.location.href = "https://github.com/ShengxiangChen/MoonWarriors";
        });
        var cocos2dMenu = new cc.Menu(menu1,menu2);
        cocos2dMenu.x = 160;
        cocos2dMenu.y = 80;
        cocos2dMenu.alignItemsVerticallyWithPadding(10);
        this.addChild(cocos2dMenu);*/
    },
    onPlayAgain : function(){
        cc.audioEngine.stopMusic();
        cc.audioEngine.stopAllEffects();
        cc.director.runScene(new cc.TransitionFade(1.2, new GamePlayScene()));
    }

});