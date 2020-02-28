//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
//    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
//    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
//    <script type="text/javascript">
	
	
var CITY_FIELD_NAME = 'City';
var COUNTRY_FIELD_NAME = 'Country';
var POPULATION_FIELD_NAME = 'Population';
var DIMENSIONS_FIELD_NAME = 'Dimensions';
var RENT_PRICE_FIELD_NAME = 'RentPrice';

var CITIES_LIST_TITLE = 'Cities';
var COUNTRIES_LIST_TITLE = 'Countries';

ExecuteOrDelayUntilScriptLoaded(function () {
    var oldGanttControl = SP.GanttControl;
	SP.GanttControl = function () {
        oldGanttControl.call(this);
        var oldInit = this.Init;
        this.Init = function (jsGrid, data, props) {
            preInit(data);
            oldInit.apply(this, arguments);
            postInit(jsGrid);
        };
        for (prop in oldGanttControl) {
            if (oldGanttControl.hasOwnProperty(prop)) {
                SP.GanttControl[prop] = oldGanttControl[prop];
            }
        }
    };
	
	
	
	
}, 'SPGantt.js');

function preInit(data) { }
function postInit(grid) { 

attachEvent(grid, SP.JsGrid.EventType.OnPropertyChanged, function (e) {
    onPropertyChanged(grid, mappings, e);
});

attachEvent(grid, SP.JsGrid.EventType.OnEntryRecordPropertyChanged, function (e) {
    onPropertyChanged(grid, mappings, e);
});

}

	
function attachEvent(grid, event, callback) {
    var lock = 0;
    grid.AttachEvent(event, function (e) {
        if (lock === 0) {
            lock = 1;
            callback(e);
            lock = 0;
        }
    });
}

function onPropertyChanged(grid, mappings, e) {
    var recordKey = e.recordKey;
    var countryFieldValue = grid.GetRecord(recordKey).properties[COUNTRY_FIELD_NAME].dataValue;
    var cityFieldValue = grid.GetRecord(recordKey).properties[CITY_FIELD_NAME].dataValue;
    alert('here');
    switch(e.fieldKey) {
        case COUNTRY_FIELD_NAME: {
            var correlate = mappings[countryFieldValue]
                .map(function(i) {return i.id;} ).indexOf(cityFieldValue) >= 0;

            if (!correlate) {
                setCellValue(grid, recordKey, CITY_FIELD_NAME, null);
                setCellValue(grid, recordKey, POPULATION_FIELD_NAME, '');
            }
        } 
        break;
        case CITY_FIELD_NAME: {
            var childValues = childValues = Object.keys(mappings)
                .reduce(function(acc, k) {
                    return acc.concat(mappings[k]);
                }, [])
                .filter(function(i) { 
                    return i.id === cityFieldValue;
                });

            if(childValues.length) {
                var population = childValues[0].population;
                var populationStr = population ? population.toString() : '';
                setCellValue(grid, recordKey, POPULATION_FIELD_NAME, populationStr);
            } else {
                setCellValue(grid, recordKey, POPULATION_FIELD_NAME, '');
            }
        }
    }
}
	
	
	