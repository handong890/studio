tinyMCEPopup.requireLangPack();
var MergeCellsDialog={init:function(){var a=document.forms[0];
a.numcols.value=tinyMCEPopup.getWindowArg("cols",1);
a.numrows.value=tinyMCEPopup.getWindowArg("rows",1)
},merge:function(){var a,b=document.forms[0];
tinyMCEPopup.restoreSelection();
a=tinyMCEPopup.getWindowArg("onaction");
a({cols:b.numcols.value,rows:b.numrows.value});
tinyMCEPopup.close()
}};
tinyMCEPopup.onInit.add(MergeCellsDialog.init,MergeCellsDialog);