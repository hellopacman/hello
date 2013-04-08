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
