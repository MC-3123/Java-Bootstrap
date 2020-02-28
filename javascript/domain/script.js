// List Forms – User CSRListForm Server Tempalte
// Muawiyah Shannak , @MuShannak 

	var detailMatrix = {
		"Investments" : {},
		"Operations" : {},
		"Compliance" : {},
		"Financial" : {},
		"People" : {},
		"Reputation" : {}
	}; 
 
(function () { 

	function OnPreRenderDocItemTemplate(renderCtx) {
		SP.SOD.executeOrDelayUntilScriptLoaded(loadContext, 'sp.js');
		function loadContext() {
			var context = SP.ClientContext.get_current();
			var web = context.get_web();						
			
			var ribbonButtonsToHide = [
										'Ribbon.ListForm.Edit.Commit',
										'Ribbon.ListForm.Edit.Actions'
									   ];
			
			ribbonButtonsToHide.forEach(function(item) {
				var button = document.getElementById(item);
				if(button) {
					document.getElementById(item).style.display = "none";
				}
			});
		   
			context.executeQueryAsync(Function.createDelegate(this, function () {        
				var list = web.get_lists().getByTitle("Consequence Matrix");						
				context.executeQueryAsync(
				Function.createDelegate(this, function () {                
					var items = list.getItems(SP.CamlQuery.createAllItemsQuery());
					context.load(items, 'Include(Title,Investment,Operations,Compliance,Financial,People,Reputation)');
					context.executeQueryAsync(Function.createDelegate(this, function () { onQuerySuccess(items); }),
						Function.createDelegate(this, onQueryFailed));
					}) 
					) 
				})
			);
	
			function onQuerySuccess(items) {        
				items.get_data().forEach(function(item, index) {					
					Object.keys(detailMatrix).forEach(function(measure) {						
						if(measure == "Investments") { // unfortunately Investments fields naming is not consistent across the Consequence Matrix and Domain list
							detailMatrix[measure][item.get_item('Title')] = item.get_item("Investment");
						}
						else{
							detailMatrix[measure][item.get_item('Title')] = item.get_item(measure);	
						}											
					});											
				});		
			} 

			function onQueryFailed(sender, args) {
				console.log('Error: ' + args.get_message() + '\n' + args.get_stackTrace());
			}   
			   		   
		}
	}
	
		function RegisterDocViewTemplate() {
			var formTemplate = {};
			
			formTemplate.Templates = {};
			formTemplate.Templates.OnPreRender = OnPreRenderDocItemTemplate; 
			
			// console.log("detailMatrix", detailMatrix);
			
			formTemplate.Templates.View = viewTemplate;				
			SPClientTemplates.TemplateManager.RegisterTemplateOverrides(formTemplate);	  	
			setTimeout(function(){ 			
				ratingChange(); 								
				applyMatrixDetails();									
			}, 1000);
		}
		ExecuteOrDelayUntilScriptLoaded(RegisterDocViewTemplate, 'clienttemplates.js'); 	    
	
  })();  

  
  function viewTemplate(ctx) {  
  
	var template = getBaseTemplate(ctx);		

	template = template.replace("{{PANEL-CONFIDENTIALITY}}", getConfidentialityPanel(ctx, detailMatrix));		
	template = template.replace("{{PANEL-AVAILABILITY}}", getAvailabilityPanel(ctx, detailMatrix));	
	template = template.replace("{{PANEL-INTEGRITY}}", getIntegrityPanel(ctx, detailMatrix));			
	template = template.replace("{{ROW-OWNER}}", getReviewRow(ctx));
	template = template.replace("{{ROW-BUTTONS}}", getButtonRow(ctx));					
				
	// determine view  mode 	
	// console.log(ctx.BaseViewID) // => e.g. BaseViewID: "EditForm"	
	
	return template;  
  }
  
  function getBaseTemplate(ctx)
		{
			return "".concat("<div class='container'>",
					"	<div class='row'>" ,
					"		<div class='col-sm-6'>", 
					"			<div class='form-group'>", 
					"				<label for='exampleInputEmail1'>Domain</label>", 
					getSPFieldRender(ctx, "Title"),
					"			</div>", 
					"		</div>", 
					"		<div class='col-sm-6'>", 
					"			<div class='form-group'>", 
				    "				<label for='exampleInputEmail1'>Data Domain Owner</label>", 
					getSPFieldRender(ctx, "Domain_x0020_Owner"),
					"			</div>", 
					"		</div>", 
					"	</div>", 			
					"	<div class='row'>", 
					"		<div class='col-sm-6'>", 
					"			<div class='form-group'>", 
					"				<label for='exampleInputEmail1'>Description</label>", 
					getSPFieldRender(ctx, "Description"),
					"			</div>", 
					"		</div>", 
					"		<div class='col-sm-6'>", 
					"			<div class='form-group'>", 
					"				<label for='exampleInputEmail1'>Data Stewards</label>", 
					getSPFieldRender(ctx, "DataStewards"),
					"			</div>", 
					"		</div>", 
					"	</div>", 				
					"	<hr/>", 
					"	<div class='row'>" ,
					"		<div class='col-sm-12'>", 
					"			<div class='panel-group' id='accordion' role='tablist' aria-multiselectable='true'>", 					
					"				{{PANEL-CONFIDENTIALITY}}", 
					"				{{PANEL-AVAILABILITY}}", 
					"				{{PANEL-INTEGRITY}}", 
					"			</div>", 
					"		</div>", 
					"	</div>", 
					"	<hr/>", 
					"	{{ROW-OWNER}}", 	
					"	{{ROW-BUTTONS}}", 	
					"</div>");
		}		
		
		function getFormattedField(fieldName)
		{		
			return "".concat("<div class='form-group'>",
					"	<label for='exampleInputEmail1'>Domain</label>",
					"	<input type='email' class='form-control' id='exampleInputEmail1' placeholder='Email' />",
					"</div>");		
		}
		
		function getConfidentialityPanel(ctx, matrix)
		{		
			
			var template = "".concat("<div class='panel panel-default'>", 	
					"	<div class='panel-heading' role='tab' id='headingOne'>", 	
					"		<h4 class='panel-title'>", 	
					"			<a role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseOne' aria-expanded='true' aria-controls='collapseOne'>", 	
					"		  Confidentiality", 	
					"		</a>", 	
					"		<strong class='pull-right rating'></strong>", 	
					"	  </h4>", 		  
					"	</div>", 	
					"	<div id='collapseOne' class='panel-collapse collapse in' role='tabpanel' aria-labelledby='headingOne'>", 	
					"	  <div class='panel-body'>", 		
					
					getRadioButtonGroupRow(ctx, "I_x003a_C", "Investments", matrix['investment']),
					getRadioButtonGroupRow(ctx, "O_x003a_C", "Operations", matrix['operations']),					
					getRadioButtonGroupRow(ctx, "C_x003a_C", "Compliance", matrix['compliance']),					
					getRadioButtonGroupRow(ctx, "F_x003a_C", "Financial", matrix['financial']),					
					getRadioButtonGroupRow(ctx, "P_x003a_C", "People", matrix['people']),					
					getRadioButtonGroupRow(ctx, "R_x003a_C", "Reputation", matrix['reputation']),					
						        
					// close panel body
					"		</div>",	  
					// close panel collapse
					"	</div>",
					// close panel
					"  </div> "); 
	
					
			return template;
		}
		
		function getAvailabilityPanel(ctx, matrix)
		{
			return "".concat("<div class='panel panel-default'>",
					"	<div class='panel-heading' role='tab' id='headingTwo'>",
					"		<h4 class='panel-title'>",
					"			<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseTwo' aria-expanded='false' aria-controls='collapseTwo'>",          	
					"				Availability",
					"			</a>",
					"		<strong class='pull-right rating'></strong>", 	
					"		</h4>",
					"	</div>",
					"	<div id='collapseTwo' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingTwo'>",
					"		<div class='panel-body'>",
					
					getRadioButtonGroupRow(ctx, "I_x003a_A", "Investments", matrix['investment']),
					getRadioButtonGroupRow(ctx, "O_x003a_A", "Operations", matrix['operations']),					
					getRadioButtonGroupRow(ctx, "C_x003a_A", "Compliance", matrix['compliance']),					
					getRadioButtonGroupRow(ctx, "F_x003a_A", "Financial", matrix['financial']),					
					getRadioButtonGroupRow(ctx, "P_x003a_A", "People", matrix['people']),					
					getRadioButtonGroupRow(ctx, "R_x003a_A", "Reputation", matrix['reputation']),			
					
					"		</div>",
					"	</div>",
					"</div>");
		}
		
		function getIntegrityPanel(ctx, matrix)
		{
			return "".concat("<div class='panel panel-default'>",
					"	<div class='panel-heading' role='tab' id='headingThree'>",
					"	  <h4 class='panel-title'>",
					"		<a class='collapsed' role='button' data-toggle='collapse' data-parent='#accordion' href='#collapseThree' aria-expanded='false' aria-controls='collapseThree'>",          	
					"			Integrity",
					"		</a>",
					"		<strong class='pull-right rating'></strong>", 	
					"  	</h4>",
					"	</div>",
					"		<div id='collapseThree' class='panel-collapse collapse' role='tabpanel' aria-labelledby='headingThree'>",
					"  			<div class='panel-body'>",
					
					getRadioButtonGroupRow(ctx, "I_x003a_I", "Investments", matrix['investment']),
					getRadioButtonGroupRow(ctx, "O_x003a_I", "Operations", matrix['operations']),					
					getRadioButtonGroupRow(ctx, "C_x003a_I", "Compliance", matrix['compliance']),					
					getRadioButtonGroupRow(ctx, "F_x003a_I", "Financial", matrix['financial']),					
					getRadioButtonGroupRow(ctx, "P_x003a_I", "People", matrix['people']),					
					getRadioButtonGroupRow(ctx, "R_x003a_I", "Reputation", matrix['reputation']),		
					
					"  			</div>",
					"		</div>",
					"</div>");
		}
		
		function getReviewRow(ctx)
		{
			return "".concat("<div class='row'>",		
					"	<div class='col-sm-3 col-sm-offset-6'>",
					"		<div class='form-group'>",
					"			<label for='exampleInputEmail1'>Review Date</label>",
					getSPFieldRender(ctx, "Reviewed_x0020_Date"),
					"		</div>",
					"	</div>",
					"	<div class='col-sm-3'>",
					"		<div class='form-group'>",
					"			<label for='exampleInputEmail1'>Status</label>",
					getSPFieldRender(ctx, "Review_x0020_Status"),
					"		</div>",
					"	</div>",
					"</div>");
		}
		
		
		function getButtonRow(ctx)
		{			
		
			if(ctx.BaseViewID == "DisplayForm") 
			{
				return "".concat("<div class='button-container'>",
					"	<div class='row'>",
					"		<div class='col-sm-2'>",
					"			<button class='btn btn-primary btn-block' onclick=\"STSNavigate('./'); return false\">Close</button>",
					"		</div>",					
					"	</div>",
					"</div>");						
			}
		
			return "".concat("<div class='button-container'>",
					"	<div class='row'>",
					"		<div class='col-sm-2'>",
					"			<button class='btn btn-primary btn-block' onclick=\"STSNavigate('./'); return false\">Cancel</button>",
					"		</div>",
					"		<div class='col-sm-2'>",
					"			<button class='btn btn-primary btn-block' onclick=\"SPClientForms.ClientFormManager.SubmitClientForm('", ctx.FormUniqueId, "')\">Save</button>",
					"		</div>",					
					"	</div>",
					"</div>");			
		} 
		
		function getRadioButtonGroupRow(ctx, fldName, label)
		{				
			getSPField(ctx, fldName);							
			
			var field = getSPFieldContext(ctx, fldName);
			var val = ctx.ListData.Items[0][fldName];			
			
			//field.Title is something like Investments: Confidentiality
			// we can split this to extract the rating detail from the matrix 			
			var panel = field.Title.split(": ")[1];
			var measure = field.Title.split(": ")[0];			
			
			var template = "".concat("<div class='radio-container'>",
							"	<div class='row'>",
							"		<div class='col-sm-2'>", label,	"</div>");
				 						
			for (i = 0; i < field.Choices.length; i++) {
				
				var name = field.Name + "_" + field.Id + "_$RadioButtonChoiceField"; 				
				var id = name + i;								
				
				template = template.concat("<div class='col-sm-2'>",
							"<div class='radio-wrapper", val == field.Choices[i] ? " active" : "", "'>",
							"	<label class='radio-inline'>",
							"		<input type='radio' id='", id, "'",
							" name='", name, "'",
							ctx.BaseViewID == "DisplayForm" ? "disabled='disabled'" : "", 
							" value=\"", field.Choices[i], "\" ", 
							val == field.Choices[i] ? "checked='checked'" : "",
							" onclick=\"ratingChange()\"",
							">",
							field.Choices[i],
							"<div class=\"detail\" data-detail=\"", measure, "-", field.Choices[i], "\"></div>",
							"	</label>",
							"	</div>",
							"</div>");
			}
			
			// close row
			template = template.concat("</div>");			
			// close container
			template = template.concat("</div>");										
							
			return template;			
		}		

		function getSPFieldContext(ctx, fieldName)
		{
			//Get the field Schema
			var result = ctx.ListSchema.Field.filter(function( obj ) {
				return obj.Name == fieldName;
			});
						
			return result[0];
		}	

		function getSPField(ctx, fieldName)
		{
			var fieldContext = ctx;

			//Get the field Schema
			var result = ctx.ListSchema.Field.filter(function( obj ) {
				return obj.Name == fieldName;
			});

			//Set the field Schema & default value
			fieldContext.CurrentFieldSchema = result[0];			
			fieldContext.CurrentFieldValue = ctx.ListData.Items[0][fieldName];
			//Call OOTB field render function 
			ctx.Templates.Fields[fieldName](fieldContext);						
		}		
		
		function getSPFieldRender(ctx, fieldName)
		{
			var fieldContext = ctx;

			//Get the field Schema
			var result = ctx.ListSchema.Field.filter(function( obj ) {
				return obj.Name == fieldName;
			});

			//Set the field Schema & default value
			fieldContext.CurrentFieldSchema = result[0];												
			fieldContext.CurrentFieldValue = ctx.ListData.Items[0][fieldName];			
			 
			//Call OOTB field render function 
			var renderedField = ctx.Templates.Fields[fieldName](fieldContext);						
			
			// add Bootstrap form-field class to any form element
			var div = document.createElement('div');			
			div.innerHTML = renderedField;	
			
			var formcontrols = div.querySelectorAll('input,textarea,select')
			for (var i = 0; i < formcontrols.length; i++) {
				formcontrols[i].className = formcontrols[i].className + " form-control";				
			} 			
			
			return div.innerHTML;
		}
		
		function ratingChange()
		{	
			// for each panel 
			$(".panel-body").each(function( index ) {
				
				// highest rating in the panel
				var highestRatingId = 0;
				var highestRatingValue = "";				
				
				// for each rating in the current panel
				$(this).find("input[type=radio]").each(function( index ) {
					
					if($(this).is(":checked"))
					{				
						$(this).parents(".radio-wrapper").addClass("active");
						var id = $(this).attr('id');
						id = id[id.length -1];		

						// if the current checked rating is the highest so far store it 
						if(id >= highestRatingId)
						{
							highestRatingId = id;
							highestRatingValue = $( this ).val();
						}
					}
					else{ // unchecked
						$(this).parents(".radio-wrapper").removeClass("active");
					}
				});
				$(this).parents(".panel").find(".rating").text(highestRatingValue);		
				// console.log("highestRatingValue", highestRatingValue);		
			});			
		}		
		
		function applyMatrixDetails()
		{	
			var details = document.getElementsByClassName('detail');			
				
			Array.prototype.forEach.call(details, function(item) {
				var detail = item.getAttribute('data-detail').split("-");					
				item.innerHTML = "<small>" + detailMatrix[detail[0]][detail[1]] + "</small>";					
			});		
		}	
		