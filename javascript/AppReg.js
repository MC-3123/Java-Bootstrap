(function () {  
    // Create an object that have the context information about the fields that we want to change the rendering of.   
	//alert("Start")
    var nameFiledContext = {};  
    nameFiledContext.Templates = {};  
    nameFiledContext.Templates.Fields = {  
        // Apply the new hyperlink HTML Rendering to the field in your view.  Swap out "<Your Field Name>" for your field name 
        "AppRegID": { "View": nameFiledTemplate }  
    };  
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nameFiledContext);  
})();  
  
// This function applies the rendering logic 
function nameFiledTemplate(ctx) {  
    var ID = ctx.CurrentItem.AppRegID;  //Swap out name variable for whatever field contains your hyperlink name
	
    //alert(name)        
    return "<a href=javascript:openDialog('https://teamsites/technology/Lists/AppReg/DispForm.aspx?ID="+ID+"',"+ID+")> Open </a>";      //Put the url for your hyperlink in the href above

}	
		


function openDialog( pageUrl,ID ) {  
    //alert(pageUrl)
   SP.UI.ModalDialog.showModalDialog(   
     {  
       url: 'https://teamsites/technology/Lists/AppReg/DispForm.aspx?ID='+ID,
	   width: 1000,  
       height: 500,  
       title: "System Classification"  
     }  
   );  
 } 