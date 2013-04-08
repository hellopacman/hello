
// var MyLayer = cc.Layer.extend({
//     isMouseDown:false,
//     helloImg:null,
//     helloLabel:null,
//     circle:null,
//     sprite:null,

//     init:function () {

//         //////////////////////////////
//         // 1. super init first
//         this._super();

//         /////////////////////////////
//         // 2. ask director the window size
//         var winSize = cc.Director.getInstance().getWinSize();

//         /////////////////////////////
//         // 3. add your codes below...
//         cc.SpriteFrameCache.getInstance().addSpriteFrames(s_grossiniPlist);

//         this.sprite = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
//         this.sprite.setPosition(cc.p(winSize.width / 2 + 80, winSize.height / 2));
//         this.addChild(this.sprite);

//         var animFrames = [];
//         var str = "";
//         var frame;
//         for (var i = 1; i < 15; i++) {
//             str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
//             frame = spriteFrameCache.getSpriteFrame(str);
//             animFrames.push(frame);
//         }

//         var animation = cc.Animation.create(animFrames, 0.3);
//         this.sprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));


//         return true;
//     }

// });

var MyScene = cc.Scene.extend({
    sprite: null,

    onEnter:function () {
        this._super();

        var winSize = cc.Director.getInstance().getWinSize();

        /////////////////////////////
        // 3. add your codes below...
        var spriteFrameCache = cc.SpriteFrameCache.getInstance();
        spriteFrameCache.addSpriteFrames(s_grossiniPlist);

        this.sprite = cc.Sprite.createWithSpriteFrameName("grossini_dance_01.png");
        this.sprite.setPosition(cc.p(winSize.width / 2 + 80, winSize.height / 2));
        this.addChild(this.sprite);

        var animFrames = [];
        var str = "";
        var frame;
        for (var i = 1; i < 15; i++) {
            str = "grossini_dance_" + (i < 10 ? ("0" + i) : i) + ".png";
            frame = spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        var animation = cc.Animation.create(animFrames, 2);
        this.sprite.runAction(cc.RepeatForever.create(cc.Animate.create(animation)));
    }
});
