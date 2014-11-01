(function(){var i=tinymce.DOM,f=tinymce.dom.Element,g=tinymce.dom.Event,h=tinymce.each,j=tinymce.is;
tinymce.create("tinymce.plugins.InlinePopups",{init:function(b,a){b.onBeforeRenderUI.add(function(){b.windowManager=new tinymce.InlineWindowManager(b);
i.loadCSS(a+"/skins/"+(b.settings.inlinepopups_skin||"clearlooks2")+"/window.css")
})
},getInfo:function(){return{longname:"InlinePopups",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/inlinepopups",version:tinymce.majorVersion+"."+tinymce.minorVersion}
}});
tinymce.create("tinymce.InlineWindowManager:tinymce.WindowManager",{InlineWindowManager:function(b){var a=this;
a.parent(b);
a.zIndex=300000;
a.count=0;
a.windows={}
},open:function(G,u){var C=this,w,t="",a=C.editor,B=0,F=0,A,e,c,b,p,E,D,d;
G=G||{};
u=u||{};
if(!G.inline){return C.parent(G,u)
}d=C._frontWindow();
if(d&&i.get(d.id+"_ifr")){d.focussedElement=i.get(d.id+"_ifr").contentWindow.document.activeElement
}if(!G.type){C.bookmark=a.selection.getBookmark(1)
}w=i.uniqueId("mce_inlinepopups_");
A=i.getViewPort();
G.width=parseInt(G.width||320);
G.height=parseInt(G.height||240)+(tinymce.isIE?8:0);
G.min_width=parseInt(G.min_width||150);
G.min_height=parseInt(G.min_height||100);
G.max_width=parseInt(G.max_width||2000);
G.max_height=parseInt(G.max_height||2000);
G.left=G.left||Math.round(Math.max(A.x,A.x+(A.w/2)-(G.width/2)));
G.top=G.top||Math.round(Math.max(A.y,A.y+(A.h/2)-(G.height/2)));
G.movable=G.resizable=true;
u.mce_width=G.width;
u.mce_height=G.height;
u.mce_inline=true;
u.mce_window_id=w;
u.mce_auto_focus=G.auto_focus;
C.features=G;
C.params=u;
C.onOpen.dispatch(C,G,u);
if(G.type){t+=" mceModal";
if(G.type){t+=" mce"+G.type.substring(0,1).toUpperCase()+G.type.substring(1)
}G.resizable=false
}if(G.statusbar){t+=" mceStatusbar"
}if(G.resizable){t+=" mceResizable"
}if(G.minimizable){t+=" mceMinimizable"
}if(G.maximizable){t+=" mceMaximizable"
}if(G.movable){t+=" mceMovable"
}C._addAll(i.doc.body,["div",{id:w,role:"dialog","aria-labelledby":G.type?w+"_content":w+"_title","class":(a.settings.inlinepopups_skin||"clearlooks2")+(tinymce.isIE&&window.getSelection?" ie9":""),style:"width:100px;height:100px"},["div",{id:w+"_wrapper","class":"mceWrapper"+t},["div",{id:w+"_top","class":"mceTop"},["div",{"class":"mceLeft"}],["div",{"class":"mceCenter"}],["div",{"class":"mceRight"}],["span",{id:w+"_title"},G.title||""]],["div",{id:w+"_middle","class":"mceMiddle"},["div",{id:w+"_left","class":"mceLeft",tabindex:"0"}],["span",{id:w+"_content"}],["div",{id:w+"_right","class":"mceRight",tabindex:"0"}]],["div",{id:w+"_bottom","class":"mceBottom"},["div",{"class":"mceLeft"}],["div",{"class":"mceCenter"}],["div",{"class":"mceRight"}],["span",{id:w+"_status"},"Content"]],["a",{"class":"mceMove",tabindex:"-1",href:"javascript:;"}],["a",{"class":"mceMin",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceMax",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceMed",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{"class":"mceClose",tabindex:"-1",href:"javascript:;",onmousedown:"return false;"}],["a",{id:w+"_resize_n","class":"mceResize mceResizeN",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_s","class":"mceResize mceResizeS",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_w","class":"mceResize mceResizeW",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_e","class":"mceResize mceResizeE",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_nw","class":"mceResize mceResizeNW",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_ne","class":"mceResize mceResizeNE",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_sw","class":"mceResize mceResizeSW",tabindex:"-1",href:"javascript:;"}],["a",{id:w+"_resize_se","class":"mceResize mceResizeSE",tabindex:"-1",href:"javascript:;"}]]]);
i.setStyles(w,{top:-10000,left:-10000});
if(tinymce.isGecko){i.setStyle(w,"overflow","auto")
}if(!G.type){B+=i.get(w+"_left").clientWidth;
B+=i.get(w+"_right").clientWidth;
F+=i.get(w+"_top").clientHeight;
F+=i.get(w+"_bottom").clientHeight
}i.setStyles(w,{top:G.top,left:G.left,width:G.width+B,height:G.height+F});
D=G.url||G.file;
if(D){if(tinymce.relaxedDomain){D+=(D.indexOf("?")==-1?"?":"&")+"mce_rdomain="+tinymce.relaxedDomain
}D=tinymce._addVer(D)
}if(!G.type){i.add(w+"_content","iframe",{id:w+"_ifr",src:'javascript:""',frameBorder:0,style:"border:0;width:10px;height:10px"});
i.setStyles(w+"_ifr",{width:G.width,height:G.height});
i.setAttrib(w+"_ifr","src",D)
}else{i.add(w+"_wrapper","a",{id:w+"_ok","class":"mceButton mceOk",href:"javascript:;",onmousedown:"return false;"},"Ok");
if(G.type=="confirm"){i.add(w+"_wrapper","a",{"class":"mceButton mceCancel",href:"javascript:;",onmousedown:"return false;"},"Cancel")
}i.add(w+"_middle","div",{"class":"mceIcon"});
i.setHTML(w+"_content",G.content.replace("\n","<br />"));
g.add(w,"keyup",function(k){var l=27;
if(k.keyCode===l){G.button_func(false);
return g.cancel(k)
}});
g.add(w,"keydown",function(l){var k,m=9;
if(l.keyCode===m){k=i.select("a.mceCancel",w+"_wrapper")[0];
if(k&&k!==l.target){k.focus()
}else{i.get(w+"_ok").focus()
}return g.cancel(l)
}})
}c=g.add(w,"mousedown",function(l){var k=l.target,m,n;
m=C.windows[w];
C.focus(w);
if(k.nodeName=="A"||k.nodeName=="a"){if(k.className=="mceClose"){C.close(null,w);
return g.cancel(l)
}else{if(k.className=="mceMax"){m.oldPos=m.element.getXY();
m.oldSize=m.element.getSize();
n=i.getViewPort();
n.w-=2;
n.h-=2;
m.element.moveTo(n.x,n.y);
m.element.resizeTo(n.w,n.h);
i.setStyles(w+"_ifr",{width:n.w-m.deltaWidth,height:n.h-m.deltaHeight});
i.addClass(w+"_wrapper","mceMaximized")
}else{if(k.className=="mceMed"){m.element.moveTo(m.oldPos.x,m.oldPos.y);
m.element.resizeTo(m.oldSize.w,m.oldSize.h);
m.iframeElement.resizeTo(m.oldSize.w-m.deltaWidth,m.oldSize.h-m.deltaHeight);
i.removeClass(w+"_wrapper","mceMaximized")
}else{if(k.className=="mceMove"){return C._startDrag(w,l,k.className)
}else{if(i.hasClass(k,"mceResize")){return C._startDrag(w,l,k.className.substring(13))
}}}}}}});
b=g.add(w,"click",function(k){var l=k.target;
C.focus(w);
if(l.nodeName=="A"||l.nodeName=="a"){switch(l.className){case"mceClose":C.close(null,w);
return g.cancel(k);
case"mceButton mceOk":case"mceButton mceCancel":G.button_func(l.className=="mceButton mceOk");
return g.cancel(k)
}}});
g.add([w+"_left",w+"_right"],"focus",function(n){var l=i.get(w+"_ifr");
if(l){var m=l.contentWindow.document.body;
var k=i.select(":input:enabled,*[tabindex=0]",m);
if(n.target.id===(w+"_left")){k[k.length-1].focus()
}else{k[0].focus()
}}else{i.get(w+"_ok").focus()
}});
E=C.windows[w]={id:w,mousedown_func:c,click_func:b,element:new f(w,{blocker:1,container:a.getContainer()}),iframeElement:new f(w+"_ifr"),features:G,deltaWidth:B,deltaHeight:F};
E.iframeElement.on("focus",function(){C.focus(w)
});
if(C.count==0&&C.editor.getParam("dialog_type","modal")=="modal"){i.add(i.doc.body,"div",{id:"mceModalBlocker","class":(C.editor.settings.inlinepopups_skin||"clearlooks2")+"_modalBlocker",style:{zIndex:C.zIndex-1}});
i.show("mceModalBlocker");
i.setAttrib(i.doc.body,"aria-hidden","true")
}else{i.setStyle("mceModalBlocker","z-index",C.zIndex-1)
}if(tinymce.isIE6||/Firefox\/2\./.test(navigator.userAgent)||(tinymce.isIE&&!i.boxModel)){i.setStyles("mceModalBlocker",{position:"absolute",left:A.x,top:A.y,width:A.w-2,height:A.h-2})
}i.setAttrib(w,"aria-hidden","false");
C.focus(w);
C._fixIELayout(w,1);
if(i.get(w+"_ok")){i.get(w+"_ok").focus()
}C.count++;
return E
},focus:function(a){var b=this,c;
if(c=b.windows[a]){c.zIndex=this.zIndex++;
c.element.setStyle("zIndex",c.zIndex);
c.element.update();
a=a+"_wrapper";
i.removeClass(b.lastId,"mceFocus");
i.addClass(a,"mceFocus");
b.lastId=a;
if(c.focussedElement){c.focussedElement.focus()
}else{if(i.get(a+"_ok")){i.get(c.id+"_ok").focus()
}else{if(i.get(c.id+"_ifr")){i.get(c.id+"_ifr").focus()
}}}}},_addAll:function(b,d){var e,a,m=this,c=tinymce.DOM;
if(j(d,"string")){b.appendChild(c.doc.createTextNode(d))
}else{if(d.length){b=b.appendChild(c.create(d[0],d[1]));
for(e=2;
e<d.length;
e++){m._addAll(b,d[e])
}}}},_startDrag:function(e,d,w){var O=this,t,a,K=i.doc,X,R=O.windows[e],V=R.element,b=V.getXY(),c,M,p,W,N,I,J,T,U,Q,S,P,L;
W={x:0,y:0};
N=i.getViewPort();
N.w-=2;
N.h-=2;
T=d.screenX;
U=d.screenY;
Q=S=P=L=0;
t=g.add(K,"mouseup",function(k){g.remove(K,"mouseup",t);
g.remove(K,"mousemove",a);
if(X){X.remove()
}V.moveBy(Q,S);
V.resizeBy(P,L);
M=V.getSize();
i.setStyles(e+"_ifr",{width:M.w-R.deltaWidth,height:M.h-R.deltaHeight});
O._fixIELayout(e,1);
return g.cancel(k)
});
if(w!="Move"){H()
}function H(){if(X){return
}O._fixIELayout(e,0);
i.add(K.body,"div",{id:"mceEventBlocker","class":"mceEventBlocker "+(O.editor.settings.inlinepopups_skin||"clearlooks2"),style:{zIndex:O.zIndex+1}});
if(tinymce.isIE6||(tinymce.isIE&&!i.boxModel)){i.setStyles("mceEventBlocker",{position:"absolute",left:N.x,top:N.y,width:N.w-2,height:N.h-2})
}X=new f("mceEventBlocker");
X.update();
c=V.getXY();
M=V.getSize();
I=W.x+c.x-N.x;
J=W.y+c.y-N.y;
i.add(X.get(),"div",{id:"mcePlaceHolder","class":"mcePlaceHolder",style:{left:I,top:J,width:M.w,height:M.h}});
p=new f("mcePlaceHolder")
}a=g.add(K,"mousemove",function(k){var n,m,l;
H();
n=k.screenX-T;
m=k.screenY-U;
switch(w){case"ResizeW":Q=n;
P=0-n;
break;
case"ResizeE":P=n;
break;
case"ResizeN":case"ResizeNW":case"ResizeNE":if(w=="ResizeNW"){Q=n;
P=0-n
}else{if(w=="ResizeNE"){P=n
}}S=m;
L=0-m;
break;
case"ResizeS":case"ResizeSW":case"ResizeSE":if(w=="ResizeSW"){Q=n;
P=0-n
}else{if(w=="ResizeSE"){P=n
}}L=m;
break;
case"mceMove":Q=n;
S=m;
break
}if(P<(l=R.features.min_width-M.w)){if(Q!==0){Q+=P-l
}P=l
}if(L<(l=R.features.min_height-M.h)){if(S!==0){S+=L-l
}L=l
}P=Math.min(P,R.features.max_width-M.w);
L=Math.min(L,R.features.max_height-M.h);
Q=Math.max(Q,N.x-(I+N.x));
S=Math.max(S,N.y-(J+N.y));
Q=Math.min(Q,(N.w+N.x)-(I+M.w+N.x));
S=Math.min(S,(N.h+N.y)-(J+M.h+N.y));
if(Q+S!==0){if(I+Q<0){Q=0
}if(J+S<0){S=0
}p.moveTo(I+Q,J+S)
}if(P+L!==0){p.resizeTo(M.w+P,M.h+L)
}return g.cancel(k)
});
return g.cancel(d)
},resizeBy:function(c,b,a){var d=this.windows[a];
if(d){d.element.resizeBy(c,b);
d.iframeElement.resizeBy(c,b)
}},close:function(c,a){var e=this,l,b=i.doc,d,a;
a=e._findId(a||c);
if(!e.windows[a]){e.parent(c);
return
}e.count--;
if(e.count==0){i.remove("mceModalBlocker");
i.setAttrib(i.doc.body,"aria-hidden","false");
e.editor.focus()
}if(l=e.windows[a]){e.onClose.dispatch(e);
g.remove(b,"mousedown",l.mousedownFunc);
g.remove(b,"click",l.clickFunc);
g.clear(a);
g.clear(a+"_ifr");
i.setAttrib(a+"_ifr","src",'javascript:""');
l.element.remove();
delete e.windows[a];
d=e._frontWindow();
if(d){e.focus(d.id)
}}},_frontWindow:function(){var a,b=0;
h(this.windows,function(c){if(c.zIndex>b){a=c;
b=c.zIndex
}});
return a
},setTitle:function(c,b){var a;
c=this._findId(c);
if(a=i.get(c+"_title")){a.innerHTML=i.encode(b)
}},alert:function(d,e,a){var b=this,c;
c=b.open({title:b,type:"alert",button_func:function(l){if(e){e.call(l||b,l)
}b.close(null,c.id)
},content:i.encode(b.editor.getLang(d,d)),inline:1,width:400,height:130})
},confirm:function(d,e,a){var b=this,c;
c=b.open({title:b,type:"confirm",button_func:function(l){if(e){e.call(l||b,l)
}b.close(null,c.id)
},content:i.encode(b.editor.getLang(d,d)),inline:1,width:400,height:130})
},_findId:function(b){var a=this;
if(typeof(b)=="string"){return b
}h(a.windows,function(d){var c=i.get(d.id+"_ifr");
if(c&&b==c.contentWindow){b=d.id;
return false
}});
return b
},_fixIELayout:function(a,b){var d,c;
if(!tinymce.isIE6){return
}h(["n","s","w","e","nw","ne","sw","se"],function(l){var e=i.get(a+"_resize_"+l);
i.setStyles(e,{width:b?e.clientWidth:"",height:b?e.clientHeight:"",cursor:i.getStyle(e,"cursor",1)});
i.setStyle(a+"_bottom","bottom","-1px");
e=0
});
if(d=this.windows[a]){d.element.hide();
d.element.show();
h(i.select("div,a",a),function(e,l){if(e.currentStyle.backgroundImage!="none"){c=new Image();
c.src=e.currentStyle.backgroundImage.replace(/url\(\"(.+)\"\)/,"$1")
}});
i.get(a).style.filter=""
}}});
tinymce.PluginManager.add("inlinepopups",tinymce.plugins.InlinePopups)
})();