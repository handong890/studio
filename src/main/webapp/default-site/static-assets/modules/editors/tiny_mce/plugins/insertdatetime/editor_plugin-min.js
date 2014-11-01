(function(){tinymce.create("tinymce.plugins.InsertDateTime",{init:function(e,d){var f=this;
f.editor=e;
e.addCommand("mceInsertDate",function(){var a=f._getDateTime(new Date(),e.getParam("plugin_insertdate_dateFormat",e.getLang("insertdatetime.date_fmt")));
e.execCommand("mceInsertContent",false,a)
});
e.addCommand("mceInsertTime",function(){var a=f._getDateTime(new Date(),e.getParam("plugin_insertdate_timeFormat",e.getLang("insertdatetime.time_fmt")));
e.execCommand("mceInsertContent",false,a)
});
e.addButton("insertdate",{title:"insertdatetime.insertdate_desc",cmd:"mceInsertDate"});
e.addButton("inserttime",{title:"insertdatetime.inserttime_desc",cmd:"mceInsertTime"})
},getInfo:function(){return{longname:"Insert date/time",author:"Moxiecode Systems AB",authorurl:"http://tinymce.moxiecode.com",infourl:"http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/insertdatetime",version:tinymce.majorVersion+"."+tinymce.minorVersion}
},_getDateTime:function(g,f){var h=this.editor;
function d(a,c){a=""+a;
if(a.length<c){for(var b=0;
b<(c-a.length);
b++){a="0"+a
}}return a
}f=f.replace("%D","%m/%d/%y");
f=f.replace("%r","%I:%M:%S %p");
f=f.replace("%Y",""+g.getFullYear());
f=f.replace("%y",""+g.getYear());
f=f.replace("%m",d(g.getMonth()+1,2));
f=f.replace("%d",d(g.getDate(),2));
f=f.replace("%H",""+d(g.getHours(),2));
f=f.replace("%M",""+d(g.getMinutes(),2));
f=f.replace("%S",""+d(g.getSeconds(),2));
f=f.replace("%I",""+((g.getHours()+11)%12+1));
f=f.replace("%p",""+(g.getHours()<12?"AM":"PM"));
f=f.replace("%B",""+h.getLang("insertdatetime.months_long").split(",")[g.getMonth()]);
f=f.replace("%b",""+h.getLang("insertdatetime.months_short").split(",")[g.getMonth()]);
f=f.replace("%A",""+h.getLang("insertdatetime.day_long").split(",")[g.getDay()]);
f=f.replace("%a",""+h.getLang("insertdatetime.day_short").split(",")[g.getDay()]);
f=f.replace("%%","%");
return f
}});
tinymce.PluginManager.add("insertdatetime",tinymce.plugins.InsertDateTime)
})();