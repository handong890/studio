(function(){tinyMCEPopup.requireLangPack();
var b='XHTML 1.0 Transitional=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">,XHTML 1.0 Frameset=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">,XHTML 1.0 Strict=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">,XHTML 1.1=<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">,HTML 4.01 Transitional=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">,HTML 4.01 Strict=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">,HTML 4.01 Frameset=<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">';
var a="Western european (iso-8859-1)=iso-8859-1,Central European (iso-8859-2)=iso-8859-2,Unicode (UTF-8)=utf-8,Chinese traditional (Big5)=big5,Cyrillic (iso-8859-5)=iso-8859-5,Japanese (iso-2022-jp)=iso-2022-jp,Greek (iso-8859-7)=iso-8859-7,Korean (iso-2022-kr)=iso-2022-kr,ASCII (us-ascii)=us-ascii";
var f="Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;Georgia=georgia,times new roman,times,serif;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times,serif;Verdana=verdana,arial,helvetica,sans-serif;Impact=impact;WingDings=wingdings";
var c="10px,11px,12px,13px,14px,15px,16px";
function d(j,h){var i=document.getElementById(j);
if(i){h=h||"";
if(i.nodeName=="SELECT"){selectByValue(document.forms[0],j,h)
}else{if(i.type=="checkbox"){i.checked=!!h
}else{i.value=h
}}}}function e(i){var h=document.getElementById(i);
if(h.nodeName=="SELECT"){return h.options[h.selectedIndex].value
}if(h.type=="checkbox"){return h.checked
}return h.value
}window.FullPageDialog={changedStyle:function(){var i,h=tinyMCEPopup.editor.dom.parseStyle(e("style"));
d("fontface",h["font-face"]);
d("fontsize",h["font-size"]);
d("textcolor",h.color);
if(i=h["background-image"]){d("bgimage",i.replace(new RegExp("url\\('?([^']*)'?\\)","gi"),"$1"))
}else{d("bgimage","")
}d("bgcolor",h["background-color"]);
d("topmargin","");
d("rightmargin","");
d("bottommargin","");
d("leftmargin","");
if(i=h.margin){i=i.split(" ");
h["margin-top"]=i[0]||"";
h["margin-right"]=i[1]||i[0]||"";
h["margin-bottom"]=i[2]||i[0]||"";
h["margin-left"]=i[3]||i[0]||""
}if(i=h["margin-top"]){d("topmargin",i.replace(/px/,""))
}if(i=h["margin-right"]){d("rightmargin",i.replace(/px/,""))
}if(i=h["margin-bottom"]){d("bottommargin",i.replace(/px/,""))
}if(i=h["margin-left"]){d("leftmargin",i.replace(/px/,""))
}updateColor("bgcolor_pick","bgcolor");
updateColor("textcolor_pick","textcolor")
},changedStyleProp:function(){var j,i=tinyMCEPopup.editor.dom,h=i.parseStyle(e("style"));
h["font-face"]=e("fontface");
h["font-size"]=e("fontsize");
h.color=e("textcolor");
h["background-color"]=e("bgcolor");
if(j=e("bgimage")){h["background-image"]="url('"+j+"')"
}else{h["background-image"]=""
}delete h.margin;
if(j=e("topmargin")){h["margin-top"]=j+"px"
}else{h["margin-top"]=""
}if(j=e("rightmargin")){h["margin-right"]=j+"px"
}else{h["margin-right"]=""
}if(j=e("bottommargin")){h["margin-bottom"]=j+"px"
}else{h["margin-bottom"]=""
}if(j=e("leftmargin")){h["margin-left"]=j+"px"
}else{h["margin-left"]=""
}d("style",i.serializeStyle(i.parseStyle(i.serializeStyle(h))));
this.changedStyle()
},update:function(){var h={};
tinymce.each(tinyMCEPopup.dom.select("select,input,textarea"),function(i){h[i.id]=e(i.id)
});
tinyMCEPopup.editor.plugins.fullpage._dataToHtml(h);
tinyMCEPopup.close()
}};
function g(){var l=document.forms[0],h,k,m,j=tinyMCEPopup.editor;
m=j.getParam("fullpage_doctypes",b).split(",");
for(h=0;
h<m.length;
h++){k=m[h].split("=");
if(k.length>1){addSelectValue(l,"doctype",k[0],k[1])
}}m=j.getParam("fullpage_fonts",f).split(";");
for(h=0;
h<m.length;
h++){k=m[h].split("=");
if(k.length>1){addSelectValue(l,"fontface",k[0],k[1])
}}m=j.getParam("fullpage_fontsizes",c).split(",");
for(h=0;
h<m.length;
h++){addSelectValue(l,"fontsize",m[h],m[h])
}m=j.getParam("fullpage_encodings",a).split(",");
for(h=0;
h<m.length;
h++){k=m[h].split("=");
if(k.length>1){addSelectValue(l,"docencoding",k[0],k[1])
}}document.getElementById("bgcolor_pickcontainer").innerHTML=getColorPickerHTML("bgcolor_pick","bgcolor");
document.getElementById("link_color_pickcontainer").innerHTML=getColorPickerHTML("link_color_pick","link_color");
document.getElementById("visited_color_pickcontainer").innerHTML=getColorPickerHTML("visited_color_pick","visited_color");
document.getElementById("active_color_pickcontainer").innerHTML=getColorPickerHTML("active_color_pick","active_color");
document.getElementById("textcolor_pickcontainer").innerHTML=getColorPickerHTML("textcolor_pick","textcolor");
document.getElementById("stylesheet_browsercontainer").innerHTML=getBrowserHTML("stylesheetbrowser","stylesheet","file","fullpage");
document.getElementById("bgimage_pickcontainer").innerHTML=getBrowserHTML("bgimage_browser","bgimage","image","fullpage");
if(isVisible("stylesheetbrowser")){document.getElementById("stylesheet").style.width="220px"
}if(isVisible("link_href_browser")){document.getElementById("element_link_href").style.width="230px"
}if(isVisible("bgimage_browser")){document.getElementById("bgimage").style.width="210px"
}tinymce.each(tinyMCEPopup.getWindowArg("data"),function(n,i){d(i,n)
});
FullPageDialog.changedStyle();
updateColor("textcolor_pick","textcolor");
updateColor("bgcolor_pick","bgcolor");
updateColor("visited_color_pick","visited_color");
updateColor("active_color_pick","active_color");
updateColor("link_color_pick","link_color")
}tinyMCEPopup.onInit.add(g)
})();