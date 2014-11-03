var Validator={isEmail:function(a){return this.test(a,"^[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+@[-!#$%&'*+\\/0-9=?A-Z^_`a-z{|}~]+.[-!#$%&'*+\\./0-9=?A-Z^_`a-z{|}~]+$")
},isAbsUrl:function(a){return this.test(a,"^(news|telnet|nttp|file|http|ftp|https)://[-A-Za-z0-9\\.]+\\/?.*$")
},isSize:function(a){return this.test(a,"^[0-9.]+(%|in|cm|mm|em|ex|pt|pc|px)?$")
},isId:function(a){return this.test(a,"^[A-Za-z_]([A-Za-z0-9_])*$")
},isEmpty:function(c){var a,b;
if(c.nodeName=="SELECT"&&c.selectedIndex<1){return true
}if(c.type=="checkbox"&&!c.checked){return true
}if(c.type=="radio"){for(b=0,a=c.form.elements;
b<a.length;
b++){if(a[b].type=="radio"&&a[b].name==c.name&&a[b].checked){return false
}}return true
}return new RegExp("^\\s*$").test(c.nodeType==1?c.value:c)
},isNumber:function(a,b){return !isNaN(a.nodeType==1?a.value:a)&&(!b||!this.test(a,"^-?[0-9]*\\.[0-9]*$"))
},test:function(a,b){a=a.nodeType==1?a.value:a;
return a==""||new RegExp(b).test(a)
}};
var AutoValidator={settings:{id_cls:"id",int_cls:"int",url_cls:"url",number_cls:"number",email_cls:"email",size_cls:"size",required_cls:"required",invalid_cls:"invalid",min_cls:"min",max_cls:"max"},init:function(a){var b;
for(b in a){this.settings[b]=a[b]
}},validate:function(e){var b,a,d=this.settings,g=0;
a=this.tags(e,"label");
for(b=0;
b<a.length;
b++){this.removeClass(a[b],d.invalid_cls);
a[b].setAttribute("aria-invalid",false)
}g+=this.validateElms(e,"input");
g+=this.validateElms(e,"select");
g+=this.validateElms(e,"textarea");
return g==3
},invalidate:function(a){this.mark(a.form,a)
},getErrorMessages:function(g){var a,d,k=this.settings,h,b,j,c=[],e=tinyMCEPopup.editor;
a=this.tags(g,"label");
for(d=0;
d<a.length;
d++){if(this.hasClass(a[d],k.invalid_cls)){h=document.getElementById(a[d].getAttribute("for"));
j={field:a[d].textContent};
if(this.hasClass(h,k.min_cls,true)){message=e.getLang("invalid_data_min");
j.min=this.getNum(h,k.min_cls)
}else{if(this.hasClass(h,k.number_cls)){message=e.getLang("invalid_data_number")
}else{if(this.hasClass(h,k.size_cls)){message=e.getLang("invalid_data_size")
}else{message=e.getLang("invalid_data")
}}}message=message.replace(/{\#([^}]+)\}/g,function(i,f){return j[f]||"{#"+f+"}"
});
c.push(message)
}}return c
},reset:function(g){var d=["label","input","select","textarea"];
var c,b,a,f=this.settings;
if(g==null){return
}for(c=0;
c<d.length;
c++){a=this.tags(g.form?g.form:g,d[c]);
for(b=0;
b<a.length;
b++){this.removeClass(a[b],f.invalid_cls);
a[b].setAttribute("aria-invalid",false)
}}},validateElms:function(d,g){var a,c,b,l=this.settings,k=true,h=Validator,j;
a=this.tags(d,g);
for(c=0;
c<a.length;
c++){b=a[c];
this.removeClass(b,l.invalid_cls);
if(this.hasClass(b,l.required_cls)&&h.isEmpty(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.number_cls)&&!h.isNumber(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.int_cls)&&!h.isNumber(b,true)){k=this.mark(d,b)
}if(this.hasClass(b,l.url_cls)&&!h.isAbsUrl(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.email_cls)&&!h.isEmail(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.size_cls)&&!h.isSize(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.id_cls)&&!h.isId(b)){k=this.mark(d,b)
}if(this.hasClass(b,l.min_cls,true)){j=this.getNum(b,l.min_cls);
if(isNaN(j)||parseInt(b.value)<parseInt(j)){k=this.mark(d,b)
}}if(this.hasClass(b,l.max_cls,true)){j=this.getNum(b,l.max_cls);
if(isNaN(j)||parseInt(b.value)>parseInt(j)){k=this.mark(d,b)
}}}return k
},hasClass:function(e,b,a){return new RegExp("\\b"+b+(a?"[0-9]+":"")+"\\b","g").test(e.className)
},getNum:function(b,a){a=b.className.match(new RegExp("\\b"+a+"([0-9]+)\\b","g"))[0];
a=a.replace(/[^0-9]/g,"");
return a
},addClass:function(f,e,a){var d=this.removeClass(f,e);
f.className=a?e+(d!=""?(" "+d):""):(d!=""?(d+" "):"")+e
},removeClass:function(b,a){a=b.className.replace(new RegExp("(^|\\s+)"+a+"(\\s+|$)")," ");
return b.className=a!=" "?a:""
},tags:function(b,a){return b.getElementsByTagName(a)
},mark:function(b,c){var a=this.settings;
this.addClass(c,a.invalid_cls);
c.setAttribute("aria-invalid","true");
this.markLabels(b,c,a.invalid_cls);
return false
},markLabels:function(d,e,a){var b,c;
b=this.tags(d,"label");
for(c=0;
c<b.length;
c++){if(b[c].getAttribute("for")==e.id||b[c].htmlFor==e.id){this.addClass(b[c],a)
}}return null
}};