(function () {
    alert('starting')
    var fieldCtx = {};
 
    fieldCtx.Templates = {};
    fieldCtx.Templates.Fields = {
        "ApprovalColumn": //This is field name, make sure to enter the internal column name
        {
            "View": UpdateApprovalTempalte //Enter the function name
        }
    };
 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(fieldCtx);
})();
var imgCompleted = "<img src='/siteassets/checked.png' width='16px'/>"
var imgIncompleted = "<img src='/siteassets/uncheck.png' width='16px'/>"
 
 
 
function UpdateApprovalTempalte(ctx) {
    var columnValue = ctx.CurrentItem.ApprovalColumn;  // get the value of the ApprovalColumn field of the current item
    var returnValue = "";
    if (columnValue == 'Complete')
        returnValue = imgCompleted;
    else if (columnValue == 'Not Started')
        returnValue = imgIncompleted;
    else if (columnValue == '')
        returnValue = imgIncompleted;
    else
        returnValue = columnValue;
 
    return returnValue;
}