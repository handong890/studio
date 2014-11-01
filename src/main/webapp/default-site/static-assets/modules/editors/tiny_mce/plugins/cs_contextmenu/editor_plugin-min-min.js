(function(){var e=tinymce.dom.Event,f=tinymce.each,d=tinymce.DOM;
tinymce.create("tinymce.plugins.CStudioContextMenu",{init:function(k){var b=this,j,l,a;
b.editor=k;
l=k.settings.contextmenu_never_use_native;
b.onContextMenu=new tinymce.util.Dispatcher(this);
j=k.onContextMenu.add(function(h,g){if(((a!==0?a:g.ctrlKey)&&!l)||tinymce.DOM.hasClass(g.target,".context-menu-off")||tinymce.DOM.getParents(g.target,".context-menu-off").length){return
}e.cancel(g);
if(g.target.nodeName=="IMG"){h.selection.select(g.target)
}b._getMenu(h).showMenu(g.clientX||g.pageX,g.clientY||g.pageY);
e.add(h.getDoc(),"click",function(i){c(h,i)
});
h.nodeChanged()
});
k.onRemove.add(function(){if(b._menu){b._menu.removeAll()
}});
function c(h,g){a=0;
if(g&&g.button==2){a=g.ctrlKey;
return
}if(b._menu){b._menu.removeAll();
b._menu.destroy();
b._menu=null;
e.remove(h.getDoc(),"click",c)
}}k.onMouseDown.add(c);
k.onKeyDown.add(c);
k.onKeyDown.add(function(h,g){if(g.shiftKey&&!g.ctrlKey&&!g.altKey&&g.keyCode===121){e.cancel(g);
j(h,g)
}});
k.onDeactivate.add(function(g){c(g,null)
})
},getInfo:function(){return{longname:"CStudioContextmenu",author:"Crafter Software",authorurl:"http://www.craftercms.org",infourl:"http://www.craftercms.org",version:"1.0"}
},_getMenu:function(o){var m=this,p=m._menu,b=o.selection,n=b.isCollapsed(),l=b.getNode()||o.getBody(),c,a;
if(p){p.removeAll();
p.destroy()
}a=d.getPos(o.getContentAreaContainer());
p=o.controlManager.createDropMenu("contextmenu",{offset_x:a.x+o.getParam("contextmenu_offset_x",0),offset_y:a.y+o.getParam("contextmenu_offset_y",0),constrain:1,keyboard_focus:true});
m._menu=p;
p.add({title:"advanced.cut_desc",icon:"cut",cmd:"Cut"}).setDisabled(n);
p.add({title:"advanced.copy_desc",icon:"copy",cmd:"Copy"}).setDisabled(n);
p.add({title:"advanced.paste_desc",icon:"paste",cmd:"Paste"});
if((l.nodeName=="A"&&!o.dom.getAttrib(l,"name"))||!n){p.addSeparator();
p.add({title:"advanced.link_desc",icon:"link",cmd:o.plugins.advlink?"mceAdvLink":"mceLink",ui:true});
p.add({title:"advanced.unlink_desc",icon:"unlink",cmd:"UnLink"})
}p.addSeparator();
p.add({title:"advanced.image_desc",icon:"image",cmd:o.plugins.advimage?"mceAdvImage":"mceImage",ui:true});
p.addSeparator();
c=p.addMenu({title:"contextmenu.align"});
c.add({title:"contextmenu.left",icon:"justifyleft",cmd:"JustifyLeft"});
c.add({title:"contextmenu.center",icon:"justifycenter",cmd:"JustifyCenter"});
c.add({title:"contextmenu.right",icon:"justifyright",cmd:"JustifyRight"});
c.add({title:"contextmenu.full",icon:"justifyfull",cmd:"JustifyFull"});
m.onContextMenu.dispatch(m,p,l,n);
return p
}});
tinymce.PluginManager.add("cs_contextmenu",tinymce.plugins.CStudioContextMenu)
})();