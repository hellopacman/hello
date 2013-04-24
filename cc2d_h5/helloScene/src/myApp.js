/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.Layer.extend({
    menuItem1: null,
    menuItem2: null,
    menu: null,

    init:function () {
        this._super();
        this.setTouchEnabled(true);
        //背景
        var bg = cc.LayerColor.create(cc.c4b(0, 128, 0, 255));
        this.addChild(bg);

        //选项1
        var menuLabel1 = cc.LabelTTF.create("菜单项1", "Arial", 20);
        this.menuItem1 = cc.MenuItemLabel.create(menuLabel1, this.onMenuSelected, this);
        this.setAnchorPoint(cc.p(0.5, 0.5));
        this.menuItem1.setPosition(cc.p(0, 0));
        
        // //选项2
        // var menuLabel2 = cc.LabelTTF.create("菜单项2", "Arial", 20);
        // this.menuItem2 = cc.MenuItemLabel.create(menuLabel2);
        // this.menuItem2.setColor(cc.c3(0, 0, 0));
        // this.menuItem2.setPosition(cc.p(0, -20));

        //菜单
        this.menu = cc.Menu.create(this.menuItem1);
        // this.menu.addChild(this.menuItem2);
        this.addChild(this.menu);
        return true;
    },

    // onTouchesEnded: function(touches, event)
    // {
    //     alert(this.menu.getPositionY());
    // },

    onMenuSelected: function(target)
    {
        var scene2 = new MyScene2();
        var tranScene = cc.TransitionMoveInL.create(0.5, scene2);
        cc.Director.getInstance().replaceScene(tranScene);
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

var MyScene2 = cc.Scene.extend({
    onEnter: function(){
        this._super();
        this.addChild(cc.LayerColor.create(cc.c4b(0, 128, 177, 255)));
        var label = cc.LabelTTF.create("场景2");
        label.setPosition(cc.p(500, 250));
        this.addChild(label);
    }
});
