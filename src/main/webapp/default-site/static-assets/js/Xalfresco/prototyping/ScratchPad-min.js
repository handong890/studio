define(["dojo/_base/declare","dijit/_WidgetBase","dijit/_TemplatedMixin","alfresco/services/_PageServiceTopicMixin","dojo/text!./templates/ScratchPad.html","alfresco/core/Core","alfresco/core/CoreXhr","dijit/form/Textarea","alfresco/forms/controls/DojoValidationTextBox","alfresco/buttons/AlfButton","dojo/json","dojo/dom-construct","dojo/request/xhr","dojo/_base/lang","dojo/query","dojo/NodeList-manipulate"],function(r,l,k,p,s,m,h,o,j,n,c,g,i,t,f){return r([l,k,m,h,p],{cssRequirements:[{cssFile:"./css/ScratchPad.css"},{cssFile:"/js/lib/jsoneditorlib/jsoneditor-min.css"}],i18nRequirements:[{i18nFile:"./i18n/ScratchPad.properties"}],templateString:s,editor:null,generateButton:null,postCreate:function e(){var w=this;var u=this.editorNode;var v=require;require(["jsoneditorlib/jsoneditor","jsoneditorlib/lib/ace/ace","jsoneditorlib/lib/jsonlint/jsonlint"],function(x){w.editor=new x.JSONEditor(u,{mode:"code"});require=v});var w=this;this.generateButton=new n({label:"Preview",onClick:function(){w.generatePreview()}});this.generateButton.placeAt(this.generateButtonNode);this.nameField=new j({label:"Page Name",value:"",description:"Enter a name for the page"});this.nameField.placeAt(this.buttonsNode);this.saveButton=new n({label:"Save",onClick:function(){w.save()}});this.saveButton.placeAt(this.buttonsNode)},save:function d(){var u={pageName:this.nameField.getValue(),pageDefinition:this.editor.get()};this.alfPublish(this.createPageTopic,u)},generatePreview:function a(){g.empty(this.previewNode);try{var v={widgets:this.editor.getText()};var u={jsonContent:this.editor.get()};this.serviceXhr({url:Alfresco.constants.URL_SERVICECONTEXT+"surf/dojo/xhr/dependencies",query:v,data:u,method:"GET",successCallback:this.updatePage,failureCallback:this.onDependencyFailure,callbackScope:this})}catch(w){this.alfLog("log","An error occurred parsing the JSON",w)}},updatePage:function b(v,u){for(var y in v.cssMap){f("head").append('<link rel="stylesheet" type="text/css" href="'+appContext+v.cssMap[y]+'" media="'+y+'">')}for(var x in v.i18nMap){if(typeof window[v.i18nGlobalObject].messages.scope[x]=="undefined"){window[v.i18nGlobalObject].messages.scope[x]=v.i18nMap[x]}else{t.mixin(window[v.i18nGlobalObject].messages.scope[x],v.i18nMap[x])}}var w=[Alfresco.constants.URL_RESCONTEXT+v.javaScript];require(w,t.hitch(this,"processWidgets",u.data.jsonContent.widgets,this.previewNode))},onDependencyFailure:function q(v,u){this.alfLog("error","An error occurred requesting the XHR dependencies",v,u)}})});