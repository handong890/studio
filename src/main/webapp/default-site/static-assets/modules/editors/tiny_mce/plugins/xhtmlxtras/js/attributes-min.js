function init(){tinyMCEPopup.resizeToInnerSize();
var c=tinyMCEPopup.editor;
var d=c.dom;
var e=c.selection.getNode();
var b=document.forms[0];
var a=d.getAttrib(e,"onclick");
setFormValue("title",d.getAttrib(e,"title"));
setFormValue("id",d.getAttrib(e,"id"));
setFormValue("style",d.getAttrib(e,"style"));
setFormValue("dir",d.getAttrib(e,"dir"));
setFormValue("lang",d.getAttrib(e,"lang"));
setFormValue("tabindex",d.getAttrib(e,"tabindex",typeof(e.tabindex)!="undefined"?e.tabindex:""));
setFormValue("accesskey",d.getAttrib(e,"accesskey",typeof(e.accesskey)!="undefined"?e.accesskey:""));
setFormValue("onfocus",d.getAttrib(e,"onfocus"));
setFormValue("onblur",d.getAttrib(e,"onblur"));
setFormValue("onclick",a);
setFormValue("ondblclick",d.getAttrib(e,"ondblclick"));
setFormValue("onmousedown",d.getAttrib(e,"onmousedown"));
setFormValue("onmouseup",d.getAttrib(e,"onmouseup"));
setFormValue("onmouseover",d.getAttrib(e,"onmouseover"));
setFormValue("onmousemove",d.getAttrib(e,"onmousemove"));
setFormValue("onmouseout",d.getAttrib(e,"onmouseout"));
setFormValue("onkeypress",d.getAttrib(e,"onkeypress"));
setFormValue("onkeydown",d.getAttrib(e,"onkeydown"));
setFormValue("onkeyup",d.getAttrib(e,"onkeyup"));
className=d.getAttrib(e,"class");
addClassesToList("classlist","advlink_styles");
selectByValue(b,"classlist",className,true);
TinyMCE_EditableSelects.init()
}function setFormValue(a,b){if(b&&document.forms[0].elements[a]){document.forms[0].elements[a].value=b
}}function insertAction(){var a=tinyMCEPopup.editor;
var b=a.selection.getNode();
setAllAttribs(b);
tinyMCEPopup.execCommand("mceEndUndoLevel");
tinyMCEPopup.close()
}function setAttrib(g,e,d){var b=document.forms[0];
var a=b.elements[e.toLowerCase()];
var c=tinyMCEPopup.editor;
var f=c.dom;
if(typeof(d)=="undefined"||d==null){d="";
if(a){d=a.value
}}f.setAttrib(g,e.toLowerCase(),d)
}function setAllAttribs(b){var a=document.forms[0];
setAttrib(b,"title");
setAttrib(b,"id");
setAttrib(b,"style");
setAttrib(b,"class",getSelectValue(a,"classlist"));
setAttrib(b,"dir");
setAttrib(b,"lang");
setAttrib(b,"tabindex");
setAttrib(b,"accesskey");
setAttrib(b,"onfocus");
setAttrib(b,"onblur");
setAttrib(b,"onclick");
setAttrib(b,"ondblclick");
setAttrib(b,"onmousedown");
setAttrib(b,"onmouseup");
setAttrib(b,"onmouseover");
setAttrib(b,"onmousemove");
setAttrib(b,"onmouseout");
setAttrib(b,"onkeypress");
setAttrib(b,"onkeydown");
setAttrib(b,"onkeyup")
}function insertAttribute(){tinyMCEPopup.close()
}tinyMCEPopup.onInit.add(init);
tinyMCEPopup.requireLangPack();