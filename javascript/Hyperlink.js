(function () {  
    // Create an object that have the context information about the fields that we want to change the rendering of.   
	//alert("Start")
    var nameFiledContext = {};  
    nameFiledContext.Templates = {};  
    nameFiledContext.Templates.Fields = {  
        // Apply the new hyperlink HTML Rendering to the field in your view.  Swap out "<Your Field Name>" for your field name 
        "Link": { "View": nameFiledTemplate }  , "Review": { "View": nameFiledTemplate2 } 
    };  
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(nameFiledContext);  
})();  
  
// This function applies the rendering logic 
function nameFiledTemplate(ctx) {  
    var name = ctx.CurrentItem.ID;  //Swap out name variable for whatever field contains your hyperlink name
            
    return "<a href=javascript:openDialog('https://teamsites/IM/Pages/Assessment-Items.aspx?ProcessID="+name+"',"+name+")> Open </a>";      //Put the url for your hyperlink in the href above

}

function nameFiledTemplate2(ctx) {  
    var name = ctx.CurrentItem.ID;  //Swap out name variable for whatever field contains your hyperlink name
            
    return "<a href=javascript:openDialog2('https://teamsites/IM/Pages/Test.aspx?ProcessID="+name+"',"+name+")> Open </a>";      //Put the url for your hyperlink in the href above

	//return "<a href='https://teamsites/IM/Lists/Business%20Process%20Assessment/Add.aspx#InplviewHasha5762527-44bd-43c4-886e-7fbb88744405=FilterField1%3DProcess%255Fx003a%255FID-FilterValue1%3D"+name+"'>"+ name + "</a>";      
//Put the url for your hyperlink in the href above
}	
		


function openDialog( pageUrl,ID ) {  
   // alert(pageUrl)
   SP.UI.ModalDialog.showModalDialog(   
     {  
       url: 'https://teamsites/IM/Pages/Assessment-Items.aspx?ProcessID='+ID,
       width: 1000,  
       height: 500,  
       title: "Information Asset Classification"  
     }  
   );  
 } 
 
 function openDialog2( pageUrl,ID ) {  
   // alert(pageUrl)
   SP.UI.ModalDialog.showModalDialog(   
     {  
       url: 'https://teamsites/IM/Pages/test.aspx?ProcessID='+ID,
       width: 800,  
       height: 1600,  
       title: "Information Asset Classification"  
     }  
   );  
 } 