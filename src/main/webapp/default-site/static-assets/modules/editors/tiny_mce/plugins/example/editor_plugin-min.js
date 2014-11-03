(function(){tinymce.PluginManager.requireLangPack("example");
tinymce.create("tinymce.plugins.ExamplePlugin",{init:function(d,c){d.addCommand("mceExample",function(){d.windowManager.open({file:c+"/dialog.htm",width:320+parseInt(d.getLang("example.delta_width",0)),height:120+parseInt(d.getLang("example.delta_height",0)),inline:1},{plugin_url:c,some_custom_arg:"custom arg"})
});
d.addButton("example",{title:"example.desc",cmd:"mceExample",image:c+"/img/example.gif"});
d.onNodeChange.add(function(b,f,a){f.setActive("example",a.nodeName=="IMG")
})
},createControl:function(c,d){return null
},getInfo:function(){return{longname:"Example plugin",author:"Some author",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/example",version:"1.0"}
}});
tinymce.PluginManager.add("example",tinymce.plugins.ExamplePlugin)
})();