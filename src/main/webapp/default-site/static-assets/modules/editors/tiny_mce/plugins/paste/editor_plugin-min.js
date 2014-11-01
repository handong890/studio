(function(){var f=tinymce.each,e={paste_auto_cleanup_on_paste:true,paste_enable_default_filters:true,paste_block_drop:false,paste_retain_style_properties:"none",paste_strip_class_attributes:"mso",paste_remove_spans:false,paste_remove_styles:false,paste_remove_styles_if_webkit:true,paste_convert_middot_lists:true,paste_convert_headers_to_strong:false,paste_dialog_width:"450",paste_dialog_height:"400",paste_max_consecutive_linebreaks:2,paste_text_use_dialog:false,paste_text_sticky:false,paste_text_sticky_default:false,paste_text_notifyalways:false,paste_text_linebreaktype:"combined",paste_text_replacements:[[/\u2026/g,"..."],[/[\x93\x94\u201c\u201d]/g,'"'],[/[\x60\x91\x92\u2018\u2019]/g,"'"]]};
function d(b,a){return b.getParam(a,e[a])
}tinymce.create("tinymce.plugins.PastePlugin",{init:function(j,i){var c=this;
c.editor=j;
c.url=i;
c.onPreProcess=new tinymce.util.Dispatcher(c);
c.onPostProcess=new tinymce.util.Dispatcher(c);
c.onPreProcess.add(c._preProcess);
c.onPostProcess.add(c._postProcess);
c.onPreProcess.add(function(h,g){j.execCallback("paste_preprocess",h,g)
});
c.onPostProcess.add(function(h,g){j.execCallback("paste_postprocess",h,g)
});
j.onKeyDown.addToTop(function(h,g){if(((tinymce.isMac?g.metaKey:g.ctrlKey)&&g.keyCode==86)||(g.shiftKey&&g.keyCode==45)){return false
}});
j.pasteAsPlainText=d(j,"paste_text_sticky_default");
function a(g,m){var h=j.dom,n;
c.onPreProcess.dispatch(c,g);
g.node=h.create("div",0,g.content);
if(tinymce.isGecko){n=j.selection.getRng(true);
if(n.startContainer==n.endContainer&&n.startContainer.nodeType==3){if(g.node.childNodes.length===1&&/^(p|h[1-6]|pre)$/i.test(g.node.firstChild.nodeName)&&g.content.indexOf("__MCE_ITEM__")===-1){h.remove(g.node.firstChild,true)
}}}c.onPostProcess.dispatch(c,g);
g.content=j.serializer.serialize(g.node,{getInner:1,forced_root_block:""});
if((!m)&&(j.pasteAsPlainText)){c._insertPlainText(g.content);
if(!d(j,"paste_text_sticky")){j.pasteAsPlainText=false;
j.controlManager.setActive("pastetext",false)
}}else{c._insert(g.content)
}}j.addCommand("mceInsertClipboardContent",function(h,g){a(g,true)
});
if(!d(j,"paste_text_use_dialog")){j.addCommand("mcePasteText",function(h,l){var g=tinymce.util.Cookie;
j.pasteAsPlainText=!j.pasteAsPlainText;
j.controlManager.setActive("pastetext",j.pasteAsPlainText);
if((j.pasteAsPlainText)&&(!g.get("tinymcePasteText"))){if(d(j,"paste_text_sticky")){j.windowManager.alert(j.translate("paste.plaintext_mode_sticky"))
}else{j.windowManager.alert(j.translate("paste.plaintext_mode"))
}if(!d(j,"paste_text_notifyalways")){g.set("tinymcePasteText","1",new Date(new Date().getFullYear()+1,12,31))
}}})
}j.addButton("pastetext",{title:"paste.paste_text_desc",cmd:"mcePasteText"});
j.addButton("selectall",{title:"paste.selectall_desc",cmd:"selectall"});
function b(B){var w,n,y,A,x=j.selection,u=j.dom,h=j.getBody(),z,g;
if(B.clipboardData||u.doc.dataTransfer){g=(B.clipboardData||u.doc.dataTransfer).getData("Text");
if(j.pasteAsPlainText){B.preventDefault();
a({content:u.encode(g).replace(/\r?\n/g,"<br />")});
return
}}if(u.get("_mcePaste")){return
}w=u.add(h,"div",{id:"_mcePaste","class":"mcePaste","data-mce-bogus":"1"},"\uFEFF\uFEFF");
if(h!=j.getDoc().body){z=u.getPos(j.selection.getStart(),h).y
}else{z=h.scrollTop+u.getViewPort(j.getWin()).y
}u.setStyles(w,{position:"absolute",left:tinymce.isGecko?-40:0,top:z-25,width:1,height:1,overflow:"hidden"});
if(tinymce.isIE){A=x.getRng();
y=u.doc.body.createTextRange();
y.moveToElementText(w);
y.execCommand("Paste");
u.remove(w);
if(w.innerHTML==="\uFEFF\uFEFF"){j.execCommand("mcePasteWord");
B.preventDefault();
return
}x.setRng(A);
x.setContent("");
setTimeout(function(){a({content:w.innerHTML})
},0);
return tinymce.dom.Event.cancel(B)
}else{function v(k){k.preventDefault()
}u.bind(j.getDoc(),"mousedown",v);
u.bind(j.getDoc(),"keydown",v);
n=j.selection.getRng();
w=w.firstChild;
y=j.getDoc().createRange();
y.setStart(w,0);
y.setEnd(w,2);
x.setRng(y);
window.setTimeout(function(){var k="",l;
if(!u.select("div.mcePaste > div.mcePaste").length){l=u.select("div.mcePaste");
f(l,function(m){var o=m.firstChild;
if(o&&o.nodeName=="DIV"&&o.style.marginTop&&o.style.backgroundColor){u.remove(o,1)
}f(u.select("span.Apple-style-span",m),function(p){u.remove(p,1)
});
f(u.select("br[data-mce-bogus]",m),function(p){u.remove(p)
});
if(m.parentNode.className!="mcePaste"){k+=m.innerHTML
}})
}else{k="<p>"+u.encode(g).replace(/\r?\n\r?\n/g,"</p><p>").replace(/\r?\n/g,"<br />")+"</p>"
}f(u.select("div.mcePaste"),function(m){u.remove(m)
});
if(n){x.setRng(n)
}a({content:k});
u.unbind(j.getDoc(),"mousedown",v);
u.unbind(j.getDoc(),"keydown",v)
},0)
}}if(d(j,"paste_auto_cleanup_on_paste")){if(tinymce.isOpera||/Firefox\/2/.test(navigator.userAgent)){j.onKeyDown.addToTop(function(h,g){if(((tinymce.isMac?g.metaKey:g.ctrlKey)&&g.keyCode==86)||(g.shiftKey&&g.keyCode==45)){b(g)
}})
}else{j.onPaste.addToTop(function(h,g){return b(g)
})
}}j.onInit.add(function(){j.controlManager.setActive("pastetext",j.pasteAsPlainText);
if(d(j,"paste_block_drop")){j.dom.bind(j.getBody(),["dragend","dragover","draggesture","dragdrop","drop","drag"],function(g){g.preventDefault();
g.stopPropagation();
return false
})
}});
c._legacySupport()
},getInfo:function(){return{longname:"Paste text/word",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste",version:tinymce.majorVersion+"."+tinymce.minorVersion}
},_preProcess:function(s,u){var o=this.editor,q=u.content,a=tinymce.grep,b=tinymce.explode,t=tinymce.trim,h,r;
function v(g){f(g,function(i){if(i.constructor==RegExp){q=q.replace(i,"")
}else{q=q.replace(i[0],i[1])
}})
}if(o.settings.paste_enable_default_filters==false){return
}if(tinymce.isIE&&document.documentMode>=9&&/<(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)/.test(u.content)){v([[/(?:<br>&nbsp;[\s\r\n]+|<br>)*(<\/?(h[1-6r]|p|div|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|caption|blockquote|center|dl|dt|dd|dir|fieldset)[^>]*>)(?:<br>&nbsp;[\s\r\n]+|<br>)*/g,"$1"]]);
v([[/<br><br>/g,"<BR><BR>"],[/<br>/g," "],[/<BR><BR>/g,"<br>"]])
}if(/class="?Mso|style="[^"]*\bmso-|w:WordDocument/i.test(q)||u.wordContent){u.wordContent=true;
v([/^\s*(&nbsp;)+/gi,/(&nbsp;|<br[^>]*>)+\s*$/gi]);
if(d(o,"paste_convert_headers_to_strong")){q=q.replace(/<p [^>]*class="?MsoHeading"?[^>]*>(.*?)<\/p>/gi,"<p><strong>$1</strong></p>")
}if(d(o,"paste_convert_middot_lists")){v([[/<!--\[if !supportLists\]-->/gi,"$&__MCE_ITEM__"],[/(<span[^>]+(?:mso-list:|:\s*symbol)[^>]+>)/gi,"$1__MCE_ITEM__"],[/(<p[^>]+(?:MsoListParagraph)[^>]+>)/gi,"$1__MCE_ITEM__"]])
}v([/<!--[\s\S]+?-->/gi,/<(!|script[^>]*>.*?<\/script(?=[>\s])|\/?(\?xml(:\w+)?|img|meta|link|style|\w:\w+)(?=[\s\/>]))[^>]*>/gi,[/<(\/?)s>/gi,"<$1strike>"],[/&nbsp;/gi,"\u00a0"]]);
do{h=q.length;
q=q.replace(/(<?!(ol|ul)[^>]*\s)(?:id|name|language|type|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1");
q=q.replace(/(<(ol|ul)[^>]*\s)(?:id|name|language|on\w+|\w+:\w+)=(?:"[^"]*"|\w+)\s?/gi,"$1")
}while(h!=q.length);
if(d(o,"paste_retain_style_properties").replace(/^none$/i,"").length==0){q=q.replace(/<\/?span[^>]*>/gi,"")
}else{v([[/<span\s+style\s*=\s*"\s*mso-spacerun\s*:\s*yes\s*;?\s*"\s*>([\s\u00a0]*)<\/span>/gi,function(i,g){return(g.length>0)?g.replace(/./," ").slice(Math.floor(g.length/2)).split("").join("\u00a0"):""
}],[/(<[a-z][^>]*)\sstyle="([^"]*)"/gi,function(i,j,k){var g=[],m=0,l=b(t(k).replace(/&quot;/gi,"'"),";");
f(l,function(A){var p,C,B=b(A,":");
function n(w){return w+((w!=="0")&&(/\d$/.test(w)))?"px":""
}if(B.length==2){p=B[0].toLowerCase();
C=B[1].toLowerCase();
switch(p){case"mso-padding-alt":case"mso-padding-top-alt":case"mso-padding-right-alt":case"mso-padding-bottom-alt":case"mso-padding-left-alt":case"mso-margin-alt":case"mso-margin-top-alt":case"mso-margin-right-alt":case"mso-margin-bottom-alt":case"mso-margin-left-alt":case"mso-table-layout-alt":case"mso-height":case"mso-width":case"mso-vertical-align-alt":g[m++]=p.replace(/^mso-|-alt$/g,"")+":"+n(C);
return;
case"horiz-align":g[m++]="text-align:"+C;
return;
case"vert-align":g[m++]="vertical-align:"+C;
return;
case"font-color":case"mso-foreground":g[m++]="color:"+C;
return;
case"mso-background":case"mso-highlight":g[m++]="background:"+C;
return;
case"mso-default-height":g[m++]="min-height:"+n(C);
return;
case"mso-default-width":g[m++]="min-width:"+n(C);
return;
case"mso-padding-between-alt":g[m++]="border-collapse:separate;border-spacing:"+n(C);
return;
case"text-line-through":if((C=="single")||(C=="double")){g[m++]="text-decoration:line-through"
}return;
case"mso-zero-height":if(C=="yes"){g[m++]="display:none"
}return
}if(/^(mso|column|font-emph|lang|layout|line-break|list-image|nav|panose|punct|row|ruby|sep|size|src|tab-|table-border|text-(?!align|decor|indent|trans)|top-bar|version|vnd|word-break)/.test(p)){return
}g[m++]=p+":"+B[1]
}});
if(m>0){return j+' style="'+g.join(";")+'"'
}else{return j
}}]])
}}if(d(o,"paste_convert_headers_to_strong")){v([[/<h[1-6][^>]*>/gi,"<p><strong>"],[/<\/h[1-6][^>]*>/gi,"</strong></p>"]])
}v([[/Version:[\d.]+\nStartHTML:\d+\nEndHTML:\d+\nStartFragment:\d+\nEndFragment:\d+/gi,""]]);
r=d(o,"paste_strip_class_attributes");
if(r!=="none"){function c(i,j){if(r==="all"){return""
}var g=a(b(j.replace(/^(["'])(.*)\1$/,"$2")," "),function(k){return(/^(?!mso)/i.test(k))
});
return g.length?' class="'+g.join(" ")+'"':""
}q=q.replace(/ class="([^"]+)"/gi,c);
q=q.replace(/ class=([\-\w]+)/gi,c)
}if(d(o,"paste_remove_spans")){q=q.replace(/<\/?span[^>]*>/gi,"")
}u.content=q
},_postProcess:function(c,a){var j=this,k=j.editor,b=k.dom,l;
if(k.settings.paste_enable_default_filters==false){return
}if(a.wordContent){f(b.select("a",a.node),function(g){if(!g.href||g.href.indexOf("#_Toc")!=-1){b.remove(g,1)
}});
if(d(k,"paste_convert_middot_lists")){j._convertLists(c,a)
}l=d(k,"paste_retain_style_properties");
if((tinymce.is(l,"string"))&&(l!=="all")&&(l!=="*")){l=tinymce.explode(l.replace(/^none$/i,""));
f(b.select("*",a.node),function(g){var r={},i=0,h,q,p;
if(l){for(h=0;
h<l.length;
h++){q=l[h];
p=b.getStyle(g,q);
if(p){r[q]=p;
i++
}}}b.setAttrib(g,"style","");
if(l&&i>0){b.setStyles(g,r)
}else{if(g.nodeName=="SPAN"&&!g.className){b.remove(g,true)
}}})
}}if(d(k,"paste_remove_styles")||(d(k,"paste_remove_styles_if_webkit")&&tinymce.isWebKit)){f(b.select("*[style]",a.node),function(g){g.removeAttribute("style");
g.removeAttribute("data-mce-style")
})
}else{if(tinymce.isWebKit){f(b.select("*",a.node),function(g){g.removeAttribute("data-mce-style")
})
}}},_convertLists:function(q,s){var o=q.editor.dom,p,b,t=-1,r,a=[],c,n;
f(o.select("p",s.node),function(h){var k,g="",i,j,m,l;
for(k=h.firstChild;
k&&k.nodeType==3;
k=k.nextSibling){g+=k.nodeValue
}g=h.innerHTML.replace(/<\/?\w+[^>]*>/gi,"").replace(/&nbsp;/g,"\u00a0");
if(/^(__MCE_ITEM__)+[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*\u00a0*/.test(g)){i="ul"
}if(/^__MCE_ITEM__\s*\w+\.\s*\u00a0+/.test(g)){i="ol"
}if(i){r=parseFloat(h.style.marginLeft||0);
if(r>t){a.push(r)
}if(!p||i!=c){p=o.create(i);
o.insertAfter(p,h)
}else{if(r>t){p=b.appendChild(o.create(i))
}else{if(r<t){m=tinymce.inArray(a,r);
l=o.getParents(p.parentNode,i);
p=l[l.length-1-m]||p
}}}f(o.select("span",h),function(u){var w=u.innerHTML.replace(/<\/?\w+[^>]*>/gi,"");
if(i=="ul"&&/^__MCE_ITEM__[\u2022\u00b7\u00a7\u00d8o\u25CF]/.test(w)){o.remove(u)
}else{if(/^__MCE_ITEM__[\s\S]*\w+\.(&nbsp;|\u00a0)*\s*/.test(w)){o.remove(u)
}}});
j=h.innerHTML;
if(i=="ul"){j=h.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^[\u2022\u00b7\u00a7\u00d8o\u25CF]\s*(&nbsp;|\u00a0)+\s*/,"")
}else{j=h.innerHTML.replace(/__MCE_ITEM__/g,"").replace(/^\s*\w+\.(&nbsp;|\u00a0)+\s*/,"")
}b=p.appendChild(o.create("li",0,j));
o.remove(h);
t=r;
c=i
}else{p=t=0
}});
n=s.node.innerHTML;
if(n.indexOf("__MCE_ITEM__")!=-1){s.node.innerHTML=n.replace(/__MCE_ITEM__/g,"")
}},_insert:function(b,h){var c=this.editor,a=c.selection.getRng();
if(!c.selection.isCollapsed()&&a.startContainer!=a.endContainer){c.getDoc().execCommand("Delete",false,null)
}c.execCommand("mceInsertContent",false,b,{skip_undo:h})
},_insertPlainText:function(c){var n=this.editor,p=d(n,"paste_text_linebreaktype"),b=d(n,"paste_text_replacements"),o=tinymce.is;
function q(g){f(g,function(h){if(h.constructor==RegExp){c=c.replace(h,"")
}else{c=c.replace(h[0],h[1])
}})
}if((typeof(c)==="string")&&(c.length>0)){if(/<(?:p|br|h[1-6]|ul|ol|dl|table|t[rdh]|div|blockquote|fieldset|pre|address|center)[^>]*>/i.test(c)){q([/[\n\r]+/g])
}else{q([/\r+/g])
}q([[/<\/(?:p|h[1-6]|ul|ol|dl|table|div|blockquote|fieldset|pre|address|center)>/gi,"\n\n"],[/<br[^>]*>|<\/tr>/gi,"\n"],[/<\/t[dh]>\s*<t[dh][^>]*>/gi,"\t"],/<[a-z!\/?][^>]*>/gi,[/&nbsp;/gi," "],[/(?:(?!\n)\s)*(\n+)(?:(?!\n)\s)*/gi,"$1"]]);
var r=Number(d(n,"paste_max_consecutive_linebreaks"));
if(r>-1){var a=new RegExp("\n{"+(r+1)+",}","g");
var m="";
while(m.length<r){m+="\n"
}q([[a,m]])
}c=n.dom.decode(tinymce.html.Entities.encodeRaw(c));
if(o(b,"array")){q(b)
}else{if(o(b,"string")){q(new RegExp(b,"gi"))
}}if(p=="none"){q([[/\n+/g," "]])
}else{if(p=="br"){q([[/\n/g,"<br />"]])
}else{if(p=="p"){q([[/\n+/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"]])
}else{q([[/\n\n/g,"</p><p>"],[/^(.*<\/p>)(<p>)$/,"<p>$1"],[/\n/g,"<br />"]])
}}}n.execCommand("mceInsertContent",false,c)
}},_legacySupport:function(){var a=this,b=a.editor;
b.addCommand("mcePasteWord",function(){b.windowManager.open({file:a.url+"/pasteword.htm",width:parseInt(d(b,"paste_dialog_width")),height:parseInt(d(b,"paste_dialog_height")),inline:1})
});
if(d(b,"paste_text_use_dialog")){b.addCommand("mcePasteText",function(){b.windowManager.open({file:a.url+"/pastetext.htm",width:parseInt(d(b,"paste_dialog_width")),height:parseInt(d(b,"paste_dialog_height")),inline:1})
})
}b.addButton("pasteword",{title:"paste.paste_word_desc",cmd:"mcePasteWord"})
}});
tinymce.PluginManager.add("paste",tinymce.plugins.PastePlugin)
})();