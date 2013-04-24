var MyLayer = cc.Layer.extend({
    sprite: null,

    init:function () {
        this._super();
        this.sprite = cc.Sprite.create(s_Tanchukuang);


        var rndAction;
        var random = Math.random();
        alert(random);
        if (random < 0.2)
        {
            rndAction = cc.ScaleBy.create(3, 2);
        }
        else if (random < 0.4)
        {
            rndAction = cc.RotateBy.create(3, 360);
        }
        else if (random < 0.6)
        {
            rndAction = cc.Blink.create(1, 3);
        }
        else if (random < 0.8)
        {
            rndAction = cc.TintBy.create(2, 0, -255, -255);
        }
        else
        {
            rndAction = cc.FadeOut.create(2);   
        }

        this.sprite.runAction(cc.RepeatForever.create(rndAction));
        this.sprite.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));
        this.addChild(this.sprite);

        this.setTouchEnabled(true);

        return true;
    }

});

var ActLayer = cc.Layer.extend({
    actionArray: [],
    sq: null,
    sprite: null,

    init: function(){
        this._super();
        var green = cc.LayerColor.create(cc.c4b(0, 128, 0, 255));
        this.sprite = cc.Sprite.create(s_Tanchukuang);
        this.sprite.setPosition(cc.p(this.getContentSize().width / 2, this.getContentSize().height / 2));

        var actRotateBy = cc.RotateBy.create(2.5, 360);
        this.sprite.runAction(cc.RepeatForever.create(actRotateBy));

        this.addChild(green);
        this.addChild(this.sprite);

        this.setTouchEnabled(true);

        return true;
    },

    onTouchesEnded: function(touches, event)
    {
        var pos = touches[0].getLocation();
        var moveToTouchPoint = cc.MoveTo.create(1, pos);
        this.actionArray.push(moveToTouchPoint);
        // var actCallBack = cc.CallFunc.create();

    }

});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ActLayer();
        this.addChild(layer);
        layer.init();
    }
});
