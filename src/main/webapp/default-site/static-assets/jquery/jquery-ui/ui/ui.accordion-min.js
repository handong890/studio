(function(a){a.widget("ui.accordion",{_init:function(){var d=this.options,b=this;
this.running=0;
if(d.collapsible==a.ui.accordion.defaults.collapsible&&d.alwaysOpen!=a.ui.accordion.defaults.alwaysOpen){d.collapsible=!d.alwaysOpen
}if(d.navigation){var c=this.element.find("a").filter(d.navigationFilter);
if(c.length){if(c.filter(d.header).length){this.active=c
}else{this.active=c.parent().parent().prev();
c.addClass("ui-accordion-content-active")
}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");
if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")
}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){a(this).addClass("ui-state-hover")
}).bind("mouseleave.accordion",function(){a(this).removeClass("ui-state-hover")
}).bind("focus.accordion",function(){a(this).addClass("ui-state-focus")
}).bind("blur.accordion",function(){a(this).removeClass("ui-state-focus")
});
this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");
this.active.next().addClass("ui-accordion-content-active");
a("<span/>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);
this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);
if(a.browser.msie){this.element.find("a").css("zoom","1")
}this.resize();
this.element.attr("role","tablist");
this.headers.attr("role","tab").bind("keydown",function(e){return b._keydown(e)
}).next().attr("role","tabpanel");
this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();
if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")
}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")
}if(!a.browser.safari){this.headers.find("a").attr("tabIndex","-1")
}if(d.event){this.headers.bind((d.event)+".accordion",function(e){return b._clickHandler.call(b,e,this)
})
}},destroy:function(){var c=this.options;
this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");
this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");
this.headers.find("a").removeAttr("tabindex");
this.headers.children(".ui-icon").remove();
var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");
if(c.autoHeight||c.fillHeight){b.css("height","")
}},_setData:function(b,c){if(b=="alwaysOpen"){b="collapsible";
c=!c
}a.widget.prototype._setData.apply(this,arguments)
},_keydown:function(e){var g=this.options,f=a.ui.keyCode;
if(g.disabled||e.altKey||e.ctrlKey){return
}var d=this.headers.length;
var b=this.headers.index(e.target);
var c=false;
switch(e.keyCode){case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];
break;
case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];
break;
case f.SPACE:case f.ENTER:return this._clickHandler({target:e.target},e.target)
}if(c){a(e.target).attr("tabIndex","-1");
a(c).attr("tabIndex","0");
c.focus();
return false
}return true
},resize:function(){var e=this.options,d;
if(e.fillSpace){if(a.browser.msie){var b=this.element.parent().css("overflow");
this.element.parent().css("overflow","hidden")
}d=this.element.parent().height();
if(a.browser.msie){this.element.parent().css("overflow",b)
}this.headers.each(function(){d-=a(this).outerHeight()
});
var c=0;
this.headers.next().each(function(){c=Math.max(c,a(this).innerHeight()-a(this).height())
}).height(Math.max(0,d-c)).css("overflow","auto")
}else{if(e.autoHeight){d=0;
this.headers.next().each(function(){d=Math.max(d,a(this).outerHeight())
}).height(d)
}}},activate:function(b){var c=this._findActive(b)[0];
this._clickHandler({target:c},c)
},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")
},_clickHandler:function(b,f){var d=this.options;
if(d.disabled){return false
}if(!b.target&&d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
this.active.next().addClass("ui-accordion-content-active");
var h=this.active.next(),e={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c=(this.active=a([]));
this._toggle(c,h,e);
return false
}var g=a(b.currentTarget||f);
var i=g[0]==this.active[0];
if(this.running||(!d.collapsible&&i)){return false
}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);
this.active.next().addClass("ui-accordion-content-active");
if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);
g.next().addClass("ui-accordion-content-active")
}var c=g.next(),h=this.active.next(),e={options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c.find("> *"),oldContent:h.find("> *")},j=this.headers.index(this.active[0])>this.headers.index(g[0]);
this.active=i?a([]):g;
this._toggle(c,h,e,i,j);
return false
},_toggle:function(b,i,g,j,k){var d=this.options,m=this;
this.toShow=b;
this.toHide=i;
this.data=g;
var c=function(){if(!m){return
}return m._completed.apply(m,arguments)
};
this._trigger("changestart",null,this.data);
this.running=i.size()===0?b.size():i.size();
if(d.animated){var f={};
if(d.collapsible&&j){f={toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}
}else{f={toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}
}if(!d.proxied){d.proxied=d.animated
}if(!d.proxiedDuration){d.proxiedDuration=d.duration
}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;
d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;
var l=a.ui.accordion.animations,e=d.duration,h=d.animated;
if(!l[h]){l[h]=function(n){this.slide(n,{easing:h,duration:e||700})
}
}l[h](f)
}else{if(d.collapsible&&j){b.toggle()
}else{i.hide();
b.show()
}c(true)
}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();
b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()
},_completed:function(b){var c=this.options;
this.running=b?0:--this.running;
if(this.running){return
}if(c.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})
}this._trigger("change",null,this.data)
}});
a.extend(a.ui.accordion,{version:"1.7.2",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()
}},animations:{slide:function(j,h){j=a.extend({easing:"swing",duration:300},j,h);
if(!j.toHide.size()){j.toShow.animate({height:"show"},j);
return
}if(!j.toShow.size()){j.toHide.animate({height:"hide"},j);
return
}var c=j.toShow.css("overflow"),g,d={},f={},e=["height","paddingTop","paddingBottom"],b;
var i=j.toShow;
b=i[0].style.width;
i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));
a.each(e,function(k,m){f[m]="hide";
var l=(""+a.css(j.toShow[0],m)).match(/^([\d+-.]+)(.*)$/);
d[m]={value:l[1],unit:l[2]||"px"}
});
j.toShow.css({height:0,overflow:"hidden"}).show();
j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,{step:function(k,l){if(l.prop=="height"){g=(l.now-l.start)/(l.end-l.start)
}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit
},duration:j.duration,easing:j.easing,complete:function(){if(!j.autoHeight){j.toShow.css("height","")
}j.toShow.css("width",b);
j.toShow.css({overflow:c});
j.complete()
}})
},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})
},easeslide:function(b){this.slide(b,{easing:"easeinout",duration:700})
}}})
})(jQuery);