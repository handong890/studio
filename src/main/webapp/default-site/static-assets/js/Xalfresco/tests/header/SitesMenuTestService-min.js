define(["dojo/_base/declare","alfresco/tests/CommonTestService","doh/runner","dojo/robot","dojo/keys","dijit/registry","dojo/query","dojo/dom-attr","dojo/dom-style","dojo/_base/array","dojo/date/stamp","alfresco/menus/AlfMenuGroup","dojo/domReady!"],function(d,c,h,k,l,b,j,i,e,g,a,f){return d(c,{constructor:function(){var m=this;this.favouritesAdded=[];this.alfSubscribe("ALF_ADD_FAVOURITE_SITE",function(n){m.favouritesAdded.push(n)});this.favouritesRemoved=[];this.alfSubscribe("ALF_REMOVE_FAVOURITE_SITE",function(n){m.favouritesRemoved.push(n)});h.register("Site Menu tests",[{name:"Test setup",timeout:2000,runTest:this.testSetup,scope:this},{name:"Test Rendering (part 1)",timeout:20000,runTest:this.testRenderingPart1,scope:this},{name:"Test Rendering (part 2)",timeout:20000,runTest:this.testRenderingPart2,scope:this},{name:"Test favourite updates",timeout:20000,runTest:this.testUpdateFavourites,scope:this},{name:"Test favourite notification processing",timeout:2000,runTest:this.testProcessFavourites,scope:this}]);h.run()},testSetup:function(m){this.scope.findTestObjects(["HEADER","SITES_MENU_1","SITES_MENU_2","SITES_MENU_3"])},testRenderingPart1:function(m){var n=new m.Deferred();k.mouseMoveAt(this.scope.testObjects.SITES_MENU_1.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SITES_MENU_2.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SITES_MENU_3.domNode,500);k.mouseClick({left:true},500);var o=this;k.sequence(n.getTestCallback(function(){var t=o.scope.testObjects.SITES_MENU_1.popup.getChildren();m.assertEqual(1,t.length,"There was not the expected number of children of the first sites menu popup");o.scope.testObjects.POPUP1=o.scope.testObjects.SITES_MENU_1.popup;m.assertNotEqual(null,o.scope.testObjects.POPUP1,"No popup for Sites Menu 1");o.scope.testObjects.POPUP2=o.scope.testObjects.SITES_MENU_2.popup;m.assertNotEqual(null,o.scope.testObjects.POPUP2,"No popup for Sites Menu 2");o.scope.testObjects.POPUP3=o.scope.testObjects.SITES_MENU_3.popup;m.assertNotEqual(null,o.scope.testObjects.POPUP2,"No popup for Sites Menu 3");var r=o.scope.testObjects.POPUP1.getChildren();m.assertEqual(1,r.length,"Expecting an automatically added group as the only child");var w=r[0].getChildren();m.assertEqual(1,w.length,"Expecting the single 'fail' menu item");var q=o.scope.testObjects.POPUP2.getChildren();m.assertEqual(1,r.length,"Expecting the 'Useful' group as the only child");var v=q[0].getChildren();m.assertEqual(4,v.length,"Expecting 4 children (site finder, create site, favourites and add)");o.scope.testObjects.FAV2=v[2];o.scope.testObjects.ADD2=v[3];var p=o.scope.testObjects.POPUP3.getChildren();m.assertEqual(2,p.length,"Expecting 'Recent' and 'Useful' groups as the children");var s=p[0].getChildren();m.assertEqual(3,s.length,"Expecting 3 recent items");var u=p[1].getChildren();m.assertEqual(4,u.length,"Expecting 4 children (site finder, create site, favourites and remove");o.scope.testObjects.REC3=s;o.scope.testObjects.FAV3=u[2];o.scope.testObjects.REM3=u[3];m.assertEqual("ALF_ADD_FAVOURITE_SITE",v[3].publishTopic,"Menu 2 should offer add favourite");m.assertEqual("ALF_REMOVE_FAVOURITE_SITE",u[3].publishTopic,"Menu 3 should offer remove favourite")}),900);return n},testRenderingPart2:function(m){var n=new m.Deferred();k.mouseMoveAt(this.scope.testObjects.SITES_MENU_2.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.FAV2.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SITES_MENU_3.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.FAV3.domNode,500);k.mouseClick({left:true},500);var o=this;k.sequence(n.getTestCallback(function(){var r=o.scope.testObjects.FAV2.popup.getChildren();m.assertEqual(1,r.length,"Expecting an automatically added group as the only child");var p=r[0].getChildren();m.assertEqual(1,p.length,"Expecting the single 'fail' menu item");var s=o.scope.testObjects.FAV3.popup.getChildren();m.assertEqual(1,s.length,"Expecting one group containing 3 favourites");var q=s[0].getChildren();m.assertEqual(3,q.length,"Expecting 3 favourites");o.scope.testObjects.FAV3_LIST=s[0];o.scope.testObjects.FAV3_ITEM1=q[0];o.scope.testObjects.FAV3_ITEM2=q[1];o.scope.testObjects.FAV3_ITEM3=q[2]}),900);return n},testUpdateFavourites:function(m){var n=new m.Deferred();this.scope.favouritesAdded=[];this.scope.favouritesRemoved=[];k.mouseMoveAt(this.scope.testObjects.SITES_MENU_2.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.ADD2.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.SITES_MENU_3.domNode,500);k.mouseClick({left:true},500);k.mouseMoveAt(this.scope.testObjects.REM3.domNode,500);k.mouseClick({left:true},500);var o=this;k.sequence(n.getTestCallback(function(){var p=["testsite1"];m.assertEqual(p.length,o.scope.favouritesAdded.length,"Expecting just 1 site to be added");g.forEach(p,function(r,q){m.assertEqual(r,o.scope.favouritesAdded[q].site,"Unexpected favourite added")});p=["testsite3"];m.assertEqual(p.length,o.scope.favouritesRemoved.length,"Expecting just 1 site to be removed");g.forEach(p,function(r,q){m.assertEqual(r,o.scope.favouritesRemoved[q].site,"Unexpected favourite removed")})}),900);return n},testProcessFavourites:function(m){this.scope.alfPublish("ALF_FAVOURITE_SITE_REMOVED",{site:"testsite2"});this.scope.alfPublish("ALF_FAVOURITE_SITE_ADDED",{site:"testsite2a",title:"Test Site 2a"});var o=this;var n=new m.Deferred();setTimeout(n.getTestCallback(function(){m.assertEqual(3,o.scope.testObjects.FAV3_LIST.getChildren().length,"There should still be 3 children");m.assertEqual("testsite2a",o.scope.testObjects.FAV3_LIST.getChildren()[1].siteShortName,"Favourite not added as expected");m.assertEqual("testsite3",o.scope.testObjects.FAV3_LIST.getChildren()[2].siteShortName,"Favourite not removed as expected")}),500);return n}})});