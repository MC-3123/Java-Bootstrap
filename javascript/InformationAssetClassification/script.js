
	SP.SOD.executeOrDelayUntilScriptLoaded(loadContext, 'sp.js');
	function loadContext() {
		var context = SP.ClientContext.get_current();
		var web = context.get_web();			
		
		var app = document.getElementById("app");
	   
		context.executeQueryAsync(Function.createDelegate(this, function () {        
			// get distinct values for submitted by, data steward, business unit			
			
			app.innerHTML = getFilterTemplate();
			
			// attach eventhandler to button
			$( "#btnSearch" ).click(function(e) {				
				e.preventDefault();
				filterProcessAssessment();
			});
			
			var listBusinessProcess = web.get_lists().getByTitle("Business Process");						
			var listDataStewards = web.get_lists().getByTitle("Data Stewards");			
			var listSubmittedBys = web.get_lists().getByTitle("DemoProcessAssessment");			
			var viewSubmittedBy = listSubmittedBys.get_views().getByTitle("SubmittedBy");
			context.load(viewSubmittedBy); 			
			
			context.executeQueryAsync(
			Function.createDelegate(this, function () {                
				var itemsBusinessProcess = listBusinessProcess.getItems(SP.CamlQuery.createAllItemsQuery());
				var itemsDataSteward = listDataStewards.getItems(SP.CamlQuery.createAllItemsQuery());
				
				var query = new SP.CamlQuery();
				query.set_viewXml("<View><Query>" + viewSubmittedBy.get_viewQuery() + "</Query></View>");
				var itemsSubmittedBy = listSubmittedBys.getItems(query);				
				// var itemsSubmittedBy = listSubmittedBys.getItems(SP.CamlQuery.createAllItemsQuery());
				context.load(itemsBusinessProcess, 'Include(Title)');
				context.load(itemsDataSteward, 'Include(Title)');
				context.load(itemsSubmittedBy, 'Include(Submitted_x0020_By)');
				context.executeQueryAsync(Function.createDelegate(this, function () { onQuerySuccess(itemsBusinessProcess, itemsDataSteward, itemsSubmittedBy); }),
					Function.createDelegate(this, onQueryFailed));
				}) 
				) 
			})
		);

		function onQuerySuccess(itemsBusinessProcess, itemsDataSteward, itemsSubmittedBy) {        
		
			var process = $("#Process");
			itemsBusinessProcess.get_data().sort(itemComparer);			
			itemsBusinessProcess.get_data().forEach(function(item, index) {													
				process.append($('<option>', {
					value: item.get_item('Title'),
					text: item.get_item('Title')
				}));
			});		
			
			var dataSteward = $("#dataSteward");
			itemsDataSteward.get_data().forEach(function(item, index) {										
				dataSteward.append($('<option>', {
					value: item.get_item('Title'),
					text: item.get_item('Title')
				}));
			});					
			
			var submittedBy = $("#submittedBy");
			itemsSubmittedBy.get_data().forEach(function(item, index) {										
				var val = item.get_item('Submitted_x0020_By');				
				if($("#submittedBy option[value=\"" + val + "\"]").length == 0)
				{				
					submittedBy.append($('<option>', {
						value: item.get_item('Submitted_x0020_By'),
						text: item.get_item('Submitted_x0020_By')
					}));
				}
			});					
		} 

		function onQueryFailed(sender, args) {
			console.log('Error: ' + args.get_message() + '\n' + args.get_stackTrace());
		}   	
		
		//sort List Items By ID (DESC)
		function itemComparer(x,y) {			
		  if (x.get_item("Title") > y.get_item("Title"))
			 return 1;
		  if (x.get_item("Title") < y.get_item("Title"))
			return -1;
		  return 0;
		}	

		function filterProcessAssessment() {
						
			var filters = [];					
			
			if($("#Process").val() != "")
			{
				filters.push({"Title": "Process", "Value": $("#Process").val()});
			}
			
			if($("#dataSteward").val() != "")
			{
				// not nice field names
				filters.push({"Title": "Data%255Fx0020%255FSteward", "Value": $("#dataSteward").val()});
			}				
			
			if($("#submittedBy").val() != "")
			{			
				// not nice field names
				filters.push({"Title": "Submitted%255Fx0020%255FBy", "Value": $("#submittedBy").val()});
			}				
			
			var qs = "";
			filters.forEach(function(item, index) 
			{	
				if(index > 0)
				{
					qs = qs.concat("-");
				}
				qs = qs.concat("FilterField", (index+1), "=", item.Title);
				qs = qs.concat("-FilterValue", (index+1), "=", item.Value);
				console.log(index, item);
			});
			
			if(qs != "")
			{
				// TODO get view id from webpart on page
				qs = "#InplviewHashc06fc32c-c4fc-4e0e-b64d-1431ee1c541f=" + qs;				
			}						

			console.log("qs", qs);						
			window.location.href = window.location.pathname + qs;			
			
			
		}

		function getFilterTemplate()
		{		
			return "".concat("<div class='row'>",
					"    <div class='col-sm-4'>",
					"		<div class='form-group'>",
					"			<label for='Process'>Business Process</label>",
					"			<select class='form-control' id='Process'>",
					"				<option></option>",
					"			</select>",
					"		</div>",
					"	</div>",
					"    <div class='col-sm-4'>",
					"		<div class='form-group'>",
					"			<label for='dataSteward'>Data Steward</label>",
					"			<select class='form-control' id='dataSteward'>",
					"				<option></option>",
					"			</select>",
					"		</div>",
					"	</div>",
					"    <div class='col-sm-4'>",
					"		<div class='form-group'>",
					"			<label for='submittedBy'>Submitted By</label>",
					"			<select class='form-control' id='submittedBy'>",
					"				<option></option>",
					"			</select>",
					"		</div>",
					"	</div>",
					"</div>",
					"<div class='row'>",
					"    <div class='col-sm-1 col-sm-offset-11'>",
					"		<button class='btn btn-block btn-primary' id='btnSearch'><i class='fa fa-search' aria-hidden='true'></i></button>  ",
					"	</div>",
					"</div>",
					"<hr/>");			
			
		}
		
		
	}
	
	     
  
		
		