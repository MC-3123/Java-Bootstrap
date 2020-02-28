// List Forms – User CSRListForm Server Tempalte
// Muawiyah Shannak , @MuShannak 
 
(function () { 
    // Create object that have the context information about the field that we want to change it's output render  
	var formTemplate = {};
    formTemplate.Templates = {};
    formTemplate.Templates.View = viewTemplate;
 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(formTemplate);
	  //ExecuteOrDelayUntilScriptLoaded(GetListItem, "sp.js"); 
  })(); 


// This function provides the rendering logic for the Custom Form
function viewTemplate(ctx) {
    var formTable = "".concat("<table width='100%' cellpadding='5' bgColor='blue' > ",
                                    "<tr>",
                                        "<td><div>Domain</div></td>",
                                        "<td><div>{{DomainCtrl}}</div></td>",
                                    "</tr>",
                                    
									"<tr>",
                                       "<td><div>Description</div></td>",
                                       "<td><div>{{DiscriptionCtrl}}</div></td>",
                                    "</tr>",
                                    "</table>",

									"<table width='100%' cellpadding='5' bgColor='blue'  >",
									"<tr>",
                                        "<td><div></div></td>",
                                       "<td><div>Confidentiality</div></td>",
                                       "<td><div>Availability</div></td>",
                                       "<td><div>Integrity</div></td>",
                                    "</tr>",
									"<tr>",
                                        "<td><div>Investments</div></td>",
                                       "<td><div>{{I:CCtrl}}</div></td>",
                                       "<td><div>{{I:ACtrl}}</div></td>",
                                       "<td><div>{{I:ICtrl}}</div></td>",
                                    "</tr>",
                                   "<tr>",
                                        "<td><div>Operations</div></td>",
                                       "<td><div>{{O:CCtrl}}</div></td>",
                                       "<td><div>{{O:ACtrl}}</div></td>",
                                       "<td><div>{{O:ICtrl}}</div></td>",
                                    "</tr>",
                                   "<tr>",
                                        "<td><div>Compliance</div></td>",
                                       "<td><div>{{C:CCtrl}}</div></td>",
                                       "<td><div>{{C:ACtrl}}</div></td>",
                                       "<td><div>{{C:ICtrl}}</div></td>",
                                    "</tr>",
                                   "<tr>",
                                        "<td><div>Financial</div></td>",
                                       "<td><div>{{F:CCtrl}}</div></td>",
                                       "<td><div>{{F:ACtrl}}</div></td>",
                                       "<td><div>{{F:ICtrl}}</div></td>",
                                    "</tr>",
                                   "<tr>",
                                        "<td><div>People</div></td>",
                                       "<td><div>{{P:CCtrl}}</div></td>",
                                       "<td><div>{{P:ACtrl}}</div></td>",
                                       "<td><div>{{P:ICtrl}}</div></td>",
                                    "</tr>",
                                   "<tr>",
                                       "<td><div>Reputation</div></td>",
                                       "<td><div>{{R:CCtrl}}</div></td>",
                                       "<td><div>{{R:ACtrl}}</div></td>",
                                       "<td><div>{{R:ICtrl}}</div></td>",
                                    "</tr>",
                                    "</table>",

									"<table width='100%' cellpadding='5' bgColor='blue' >",
                                    "<tr>",
                                       "<td><div> </div></td>",
                                       "<td><div>{{zontor}}</div></td>",                                     
                                    "</tr>",
                                   	"</table>",

									
									"<table width='100%' cellpadding='5' bgColor='blue' >",
     							"<tr>",
                                        "<td><input type='button' value='Cancel' onclick=\"SPClientForms.ClientFormManager.Cancel('{{FormId}}')\" style='margin-left:0' ></td>",
                                        "<td></td>",
                                        "<td><input type='button' value='Save' onclick=\"SPClientForms.ClientFormManager.SubmitClientForm('{{FormId}}')\" style='margin-left:0' ></td>",
                                    "</tr>",
                              "</table>");

    
    //Replace the tokens with the default sharepoint controls
    formTable = formTable.replace("{{DomainCtrl}}", getSPFieldRender(ctx, "Title"));
    formTable = formTable.replace("{{DiscriptionCtrl}}", getSPFieldRender(ctx, "Description"));

 	//formTable = formTable.replace("{{zontor}}", getConsequenceItem());
	
    formTable = formTable.replace("{{I:CCtrl}}", getSPFieldRender(ctx, "I_x003a_C"));
	
    formTable = formTable.replace("{{O:CCtrl}}", getSPFieldRender(ctx, "O_x003a_C"));
    formTable = formTable.replace("{{C:CCtrl}}", getSPFieldRender(ctx, "C_x003a_C"));
    formTable = formTable.replace("{{F:CCtrl}}", getSPFieldRender(ctx, "F_x003a_C"));
    formTable = formTable.replace("{{P:CCtrl}}", getSPFieldRender(ctx, "P_x003a_C"));
    formTable = formTable.replace("{{R:CCtrl}}", getSPFieldRender(ctx, "R_x003a_C"));
    formTable = formTable.replace("{{I:ACtrl}}", getSPFieldRender(ctx, "I_x003a_A"));
    formTable = formTable.replace("{{O:ACtrl}}", getSPFieldRender(ctx, "O_x003a_A"));
    formTable = formTable.replace("{{C:ACtrl}}", getSPFieldRender(ctx, "C_x003a_A"));
    formTable = formTable.replace("{{F:ACtrl}}", getSPFieldRender(ctx, "F_x003a_A"));
    formTable = formTable.replace("{{P:ACtrl}}", getSPFieldRender(ctx, "P_x003a_A"));
    formTable = formTable.replace("{{R:ACtrl}}", getSPFieldRender(ctx, "R_x003a_A"));
    formTable = formTable.replace("{{I:ICtrl}}", getSPFieldRender(ctx, "I_x003a_I"));
    formTable = formTable.replace("{{O:ICtrl}}", getSPFieldRender(ctx, "O_x003a_I"));
    formTable = formTable.replace("{{C:ICtrl}}", getSPFieldRender(ctx, "C_x003a_I"));
    formTable = formTable.replace("{{F:ICtrl}}", getSPFieldRender(ctx, "F_x003a_I"));
    formTable = formTable.replace("{{P:ICtrl}}", getSPFieldRender(ctx, "P_x003a_I"));
    formTable = formTable.replace("{{R:ICtrl}}", getSPFieldRender(ctx, "R_x003a_I"));
	
	console.log("ctx.FormUniqueId", ctx.FormUniqueId);
	
    formTable = formTable.replace(/{{FormId}}/g, ctx.FormUniqueId);		

    return formTable;
}

//This function code set the required properties and call the OOTB (default) function that use to render Sharepoint Fields 
function getSPFieldRender(ctx, fieldName)
{
    var fieldContext = ctx;

    //Get the filed Schema
    var result = ctx.ListSchema.Field.filter(function( obj ) {
        return obj.Name == fieldName;
    });

    //Set the field Schema  & default value
    fieldContext.CurrentFieldSchema = result[0];
    fieldContext.CurrentFieldValue = ctx.ListData.Items[0][fieldName];

    //Call  OOTB field render function 
    return ctx.Templates.Fields[fieldName](fieldContext);
}


/*
function getConsequenceItem()
{
   var targetListItem;
   var listName="Consequence Matrix";
   var itemId=2;
   //ExecuteOrDelayUntilScriptLoaded(GetListItem, "sp.Consequence Matrix",itemId);
   //GetListItem("sp.Consequence Matrix",itemId);
   return "";
}
   
function GetListItem(listName,itemId) {
	listName = "Consequence Matrix";
	itemID=1;
	alert("1");
	//ctx.get_web().get_lists().getByTitle(listName);
	var clientContext = new SP.ClientContext(); 
	alert("2");
	 alert(listName);
	var targetList = clientContext.get_web().get_lists().getByTitle(listName);
	alert(targetList.name)
	 targetListItem = targetList.getItemById(itemId);

	 clientContext.load(targetListItem, 'Investment');
	 clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
	 
	}

function onQuerySucceeded() {
       var mytitle = targetListItem.get_item('Investment');
	   alert(mytitle);
       return("<div class='nb_news_wrap' style='display: none;'><header>"+mytitle+"</header>'class='lcnb_inline_link'>Read More</a></article></div>");
   }

function onQueryFailed(sender, args) {
     alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
   }

	
*/


//function getConsequenceItem()
//{
/*
   var targetListItem;
   var listName="Consequence Matrix";
   var itemId=1;
   //ExecuteOrDelayUntilScriptLoaded(GetListItem, "sp.Consequence Matrix");

   function GetListItem(listName,itemId) {
     var clientContext = new SP.ClientContext(); 
     var targetList = clientContext.get_web().get_lists().getByTitle(listName);
     targetListItem = targetList.getItemById(itemId);
     clientContext.load(targetListItem, 'Title');
     clientContext.executeQueryAsync(Function.createDelegate(this, this.onQuerySucceeded), Function.createDelegate(this, this.onQueryFailed));
   }

   function onQuerySucceeded() {

       var mytitle = targetListItem.get_item('Title');

       return("<div class='nb_news_wrap' style='display: none;'><header>"+mytitle+"</header>'class='lcnb_inline_link'>Read More</a></article></div>");

   }

   function onQueryFailed(sender, args) {
     alert('Request failed. \nError: ' + args.get_message() + '\nStackTrace: ' + args.get_stackTrace());
   }
*/
//   return "";
//)



