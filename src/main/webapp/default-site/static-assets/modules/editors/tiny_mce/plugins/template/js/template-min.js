tinyMCEPopup.requireLangPack();
var TemplateDialog={preInit:function(){var a=tinyMCEPopup.getParam("template_external_list_url");
if(a!=null){document.write('<script language="javascript" type="text/javascript" src="'+tinyMCEPopup.editor.documentBaseURI.toAbsolute(a)+'"><\/script>')
}},init:function(){var c=tinyMCEPopup.editor,b,e,a,d;
b=c.getParam("template_templates",false);
e=document.getElementById("tpath");
if(!b&&typeof(tinyMCETemplateList)!="undefined"){for(a=0,b=[];
a<tinyMCETemplateList.length;
a++){b.push({title:tinyMCETemplateList[a][0],src:tinyMCETemplateList[a][1],description:tinyMCETemplateList[a][2]})
}}for(a=0;
a<b.length;
a++){e.options[e.options.length]=new Option(b[a].title,tinyMCEPopup.editor.documentBaseURI.toAbsolute(b[a].src))
}this.resize();
this.tsrc=b
},resize:function(){var a,b,c;
if(!self.innerWidth){a=document.body.clientWidth-50;
b=document.body.clientHeight-160
}else{a=self.innerWidth-50;
b=self.innerHeight-170
}c=document.getElementById("templatesrc");
if(c){c.style.height=Math.abs(b)+"px";
c.style.width=Math.abs(a-5)+"px"
}},loadCSSFiles:function(b){var a=tinyMCEPopup.editor;
tinymce.each(a.getParam("content_css","").split(","),function(c){b.write('<link href="'+a.documentBaseURI.toAbsolute(c)+'" rel="stylesheet" type="text/css" />')
})
},selectTemplate:function(c,e){var f=window.frames.templatesrc.document,a,b=this.tsrc;
if(!c){return
}f.body.innerHTML=this.templateHTML=this.getFileContents(c);
for(a=0;
a<b.length;
a++){if(b[a].title==e){document.getElementById("tmpldesc").innerHTML=b[a].description||""
}}},insert:function(){tinyMCEPopup.execCommand("mceInsertTemplate",false,{content:this.templateHTML,selection:tinyMCEPopup.editor.selection.getContent()});
tinyMCEPopup.close()
},getFileContents:function(b){var a,f,c="text/plain";
function e(d){a=0;
try{a=new ActiveXObject(d)
}catch(d){}return a
}a=window.ActiveXObject?e("Msxml2.XMLHTTP")||e("Microsoft.XMLHTTP"):new XMLHttpRequest();
a.overrideMimeType&&a.overrideMimeType(c);
a.open("GET",b,false);
a.send(null);
return a.responseText
}};
TemplateDialog.preInit();
tinyMCEPopup.onInit.add(TemplateDialog.init,TemplateDialog);