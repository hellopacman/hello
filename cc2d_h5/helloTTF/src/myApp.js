
var MyLayer = cc.Layer.extend({
    menuItem1: null,
    menuItem2: null,
    menu: null,

    init:function () {
        this._super();
        this.setTouchEnabled(true);

        var winSize = cc.Director.getInstance().getWinSize();
        // var center = cc.LabelTTF.create("word wrap \"testing\" (bla0) bla1 'bla2' [bla3] (bla4) {bla5} {bla6} [bla7] (bla8) [bla9] 'bla0' \"bla1\"",
        //     "Arial", 32, cc.size(200, 400), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        // var center = cc.LabelTTF.create("123", "Arial", 32, cc.size(400, 400), cc.TEXT_ALIGNMENT_CENTER, cc.VERTICAL_TEXT_ALIGNMENT_TOP);
        var center = cc.LabelTTF.create("测 试 测 试 测 试 测 试 测 试 测 试 测 试 测 试", "Arial", 32, cc.size(400, 400), cc.TEXT_ALIGNMENT_LEFT);


        center.setPosition(cc.p(winSize.width / 2, 150));

        this.addChild(center);


        return true;
    },

    // onTouchesEnded: function(touches, event)
    // {
    //     alert(this.menu.getPositionY());
    // },

    onMenuSelected: function(target)
    {
        alert(target.getLabel().getString());
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



