define(["dojo/_base/declare","alfresco/layout/LeftAndRight","alfresco/core/DynamicWidgetProcessing","dojo/dom-class","dojo/dom-construct"],function(c,b,d,e,a){return c([b,d],{cssRequirements:[{cssFile:"./css/AlfToolbar.css"}],postCreate:function f(){this.inherited(arguments);e.add(this.domNode,"alf-documentlist-toolbar")},addChild:function(i,g){var h=a.create("div",{className:"horizontal-widget"},this.rightWidgets,g);a.place(i.domNode,h,g)}})});