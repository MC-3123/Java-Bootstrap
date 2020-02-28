// List Forms – User CSRListForm Server Tempalte
// Muawiyah Shannak , @MuShannak 
 
(function () { 
    // Create object that have the context information about the field that we want to change it's output render  
	
	var formTemplate = {};
    formTemplate.Templates = {};
    formTemplate.Templates.View = viewTemplate;
 
    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(formTemplate);	  	
	setTimeout(function(){ ratingChange(); }, 1000);	
	
  })();  
  
  function viewTemplate(ctx) {
	  
	// TODO dynamically lookup values from https://teamsites/IM/Lists/Consequence%20Matrix/AllItems.aspx	
	var detailMatrix = {
		"investment" : [
			"Single year underperformance of up to 1% relative to benchmarks",
			"Single year underperformance of 1-2% relative to benchmarks",
			"Single year underperformance of 2-5% relative to benchmarks or negative returns for two consecutive years",
			"Single year underperformance of 5-15% relative to benchmarks or negative returns for three consecutive years",
			"Single year underperformance of over 15% relative to benchmarks or negative returns for more than three consecutive years"
		],		
		"operations" : [
			"Disruption to services that can be recovered without failing SLAs; or <1% of members financially impacted",
			"Disruption to services resulting in failure to meet one SLA over a quarter; or 1-5% of members financially impacted",
			"Disruption to services resulting in failure to meet multiple SLAs over a quarter; or 5-10% of members financially impacted",
			"Substantial degradation of service from disruption. Major delays processing transactions or ability to respond to member queries; or 10-20% of members financially impacted",
			"Fund viability in doubt due to long-term inability to meet service expectations; or >20% of members financially impacted"
		],
		"compliance": [
			"Technical breach of legislative, regulatory or professional code obligation that does not warrant reporting to external body",
			"Breach of legislative, regulatory or professional code obligation reported to external body as safe measure only",
			"Significant breach of legislative, regulatory or professional code obligation reported to external body resulting in routine enquiries",
			"Breach of legislative or regulatory obligation resulting in formal investigation or enforcement action undertaken by regulator",
			"Loss of authorisation to provide product or service from systemic compliance failure"
		],
		"financial": [	
			"Total cost or loss to Fund below  $250,000",
			"Total cost or loss to Fund between $250,000 and $1m",
			"Total cost or loss to Fund between $1m and $20m",
			"Total cost or loss to Fund between $20m and $200m",
			"Total cost or loss to Fund in excess of $200m"
		],
		"people": [	
			"Minor injuries/mental health & wellbeing issues that do not result in time off work",
			"Isolated minor injuries/ mental health and wellbeing issues that result in time off work. Short-term spike in Employee turnover or degradation of engagement",
			"Increasing trend of injuries/mental health and wellbeing issues resulting in significant time off work/ claims Employee turnover in excess of industry norms, Employee engagement below industry benchmark;",
			"Major or systemic injuries/mental health and wellbeing issues indicating unsafe practices. Reduced efficiency in operating fund due to employee turnover or other environmental factors well in excess of industry norms and/or general low employee engagement;",
			"Death or disablement of employees. Unable to operate fund due to excessive employees turnover or other environmental factors and/or disengaged workforce."
		],
		"reputation": [	
			"Isolated member complaint or adverse comment on social media",
			"Limited member complaints, media or social media interest",
			"Sustained adverse media or social media commentary, sustained complaints, single employer removes fund default status",
			"Intense media attention, parliamentary/ criminal/ regulator investigation, regulator action, multiple participating employers withdraw fund from default status",
			"Extreme media scrutiny, criminal conviction, run on the fund"
		]
	};
  
	var template = getBaseTemplate(ctx);		
	template = template.replace("{{PANEL-CONFIDENTIALITY}}", getConfidentialityPanel(ctx, detailMatrix));		
	template = template.replace("{{PANEL-AVAILABILITY}}", getAvailabilityPanel(ctx, detailMatrix));	
	template = template.replace("{{PANEL-INTEGRITY}}", getIntegrityPanel(ctx, detailMatrix));			
	template = template.replace("{{ROW-OWNER}}", getReviewRow(ctx));
	template = template.replace("{{ROW-BUTTONS}}", getButtonRow(ctx));		

	// determine view  mode
	// BaseViewID: "EditForm"	
	
	console.log(ctx.BaseViewID);
	
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
		
		function getRadioButtonGroupRow(ctx, fldName, label, detail)
		{	
			getSPField(ctx, fldName);							
			
			var field = getSPFieldContext(ctx, fldName);
			var val = ctx.ListData.Items[0][fldName];			
			
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
							"<div class=\"detail\">",			 					
							"			<small>", detail[i], "</small>",
							"		</div>",
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
						
			console.log("b", fieldContext.CurrentFieldValue);
			fieldContext.CurrentFieldValue = ctx.ListData.Items[0][fieldName];
			console.log("a", fieldContext.CurrentFieldValue);
			 
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
				console.log("highestRatingValue", highestRatingValue);		
			});
			
		}