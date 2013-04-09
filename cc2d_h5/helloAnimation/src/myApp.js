var MyLayer = cc.Layer.extend({
    isMouseDown:false,
    helloImg:null,
    helloLabel:null,
    circle:null,
    sprite:null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. ask director the window size
        var winSize = cc.Director.getInstance().getWinSize();

        /////////////////////////////
        // 3. add your codes below...
        //创建texture
        var texture = cc.TextureCache.getInstance().addImage(s_dragon_animation);
        // manually add frames to the frame cache
        var dragonFrameWidth = 132;
        var dragonFrameHeight = 132;
        var frame0 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 0, dragonFrameHeight * 0, dragonFrameWidth, dragonFrameHeight));
        var frame1 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 1, dragonFrameHeight * 0, dragonFrameWidth, dragonFrameHeight));
        var frame2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 2, dragonFrameHeight * 0, dragonFrameWidth, dragonFrameHeight));
        var frame3 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 3, dragonFrameHeight * 0, dragonFrameWidth, dragonFrameHeight));
        var frame4 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 0, dragonFrameHeight * 1, dragonFrameWidth, dragonFrameHeight));
        var frame5 = cc.SpriteFrame.createWithTexture(texture, cc.rect(dragonFrameWidth * 1, dragonFrameHeight * 1, dragonFrameWidth, dragonFrameHeight));

        var sprite = cc.Sprite.createWithSpriteFrame(frame0);
        sprite.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
        this.addChild(sprite);

        var animFrames = [];
        animFrames.push(frame0);
        animFrames.push(frame1);
        animFrames.push(frame2);
        animFrames.push(frame3);
        animFrames.push(frame4);
        animFrames.push(frame5);

        var animation = cc.Animation.create(animFrames, 0.5);
        var animate = cc.Animate.create(animation);
        sprite.runAction(cc.RepeatForever.create(animate));

        // little hero 
        var littleHeroTexture = cc.TextureCache.getInstance().addImage(s_littleHero_animation);
        var littleHeroFrameWidth = 48;
        var littleHeroFrameHeight = 48;

        var littleHeroFrames = [];
        var frame;
        for (var j = 0; j < 8; j ++)
        {        
            for (var i = 0; i < 3; i ++)
            {

                frame = cc.SpriteFrame.createWithTexture(littleHeroTexture, cc.rect(littleHeroFrameWidth * i, littleHeroFrameHeight * j, littleHeroFrameWidth, littleHeroFrameHeight));
                littleHeroFrames.push(frame);
            }
        }

        var littleHeroSp = cc.Sprite.createWithSpriteFrame(littleHeroFrames[0]);
        littleHeroSp.setPosition(cc.p(winSize.width / 2 - 100, winSize.height / 2));
        this.addChild(littleHeroSp);

        var littleHeroAnimation = cc.Animation.create(littleHeroFrames, 0.15);
        var littleHeroAnimate = cc.Animate.create(littleHeroAnimation);
        littleHeroSp.runAction(cc.RepeatForever.create(littleHeroAnimate));


        return true;
    }

});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
