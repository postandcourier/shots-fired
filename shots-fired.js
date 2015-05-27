Shootings = new Mongo.Collection("shootingsFinal");
Pages = new Mongo.Collection("pages");

TabularTables = {};

Meteor.isClient && Template.registerHelper('TabularTables', TabularTables);

TabularTables.shootings = new Tabular.Table ({
  name: "IncidentList",
  collection: Shootings,
  columns: [
    {data:"year", title:"Year", width:"5%"},
    {data:"civilianName", title: "Name", width:"20%"},
    {data:"civRace", title: "Race", visible:false},
    {data:"primaryOfcInvolved", title: "Officer", width:"20%"},
    {data:"ofcRace", title: "Officer Race", visible:false},
    {data:"county", title: "County", width:"10%"},
    {data:"agency", title: "Department", width:"10%"},
    {data:"summary", title:"Case Summary", width:"50%", visible: false},
    {data:"reasonPoliceOpenedFire", title:"Officer's Reason for Firing", width:"30%", visible: false},
    {data:"pdfUrl", title: "Files", width:"10%", render: function(val){
      if(val) {return '<a href="'+val+'" _target="blank"><i class="fa fa-file-pdf-o"></i></a>'}
    }},
    {data:"videoUrl", title: "Video", width:"10%", render: function(val){
      if(val) {return '<a href="'+val+'" _target="blank"><i class="fa fa-film"></i></a>'}
    }}
  ],
  dom: 'C<"clear">lfrtip'
});

Accounts.config({
  forbidClientAccountCreation : true
});


if (Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  Meteor.subscribe("shootings", function() {
  });

	Template.dataView.helpers({
  	shootings: function() {
    	return Shootings.find({});
  	}
	});
	
	Template.body.events({
  	"click .toggle-menu": function() {
    	Overlay.show('mainNav');
  	}
	});
	
	Template.adminView.helpers({
  	shootings: function() {
    	return Shootings.find({});
  	},
  	
  	admin_settings: function() {
    	return {
      	collection: Shootings,
      	fields : [
        	{ key: 'hasFile', label: "Has File", input: "text"},
        	{ key: 'opened', label: 'opened', input: "text"},
        	{ key: 'completed', label: 'completed', input: 'text'},
        	{ key: 'closed', label: 'closed', input: 'text'},
        	{ key: 'caseSummary', label: 'caseSummary', input: 'textarea'},
        	{ key: 'daysOfInvestigation', label: 'daysOfInvestigation', input: 'text'},
        	{ key: 'caseAgent', label: 'caseAgent', input: 'text'},
        	{ key: 'caseNumber', label: 'caseNumber', input: 'text'},
        	{ key: 'county', label: 'county', input: 'text'},
        	{ key: 'agency', label: 'agency', input: 'text'},
        	{ key: 'status', label: 'status', input: 'text'},
        	{ key: 'officerInjured', label: 'officerInjured', input: 'text'},
        	{ key: 'officerKilled', label: 'officerKilled', input: 'text'},
        	{ key: 'latitude', label: 'latitude', input: 'text'},
        	{ key: 'longitude', label: 'longitude', input: 'text'},
        	{ key: 'suspectWeapon', label: 'suspectWeapon', input: 'text'},
        	{ key: 'suspectInjured', label: 'suspectInjured', input: 'text'},
        	{ key: 'suspectKilled', label: 'suspectKilled', input: 'text'},
        	{ key: 'suspectOffense', label: 'suspectOffense', input: 'text'},
        	{ key: 'suspectName', label: 'suspectName', input: 'text'},
        	{ key: 'officerAge', label: 'officerAge', input: 'text'},
        	{ key: 'suspectAge', label: 'suspectAge', input: 'text'},
        	{ key: 'officerRace', label: 'officerRace', input: 'text'},
        	{ key: 'suspectRace', label: 'suspectRace', input: 'text'},
        	{ key: 'wasShootingAfterFootchase', label: 'wasShootingAfterFootchase', input: 'text'},
        	{ key: 'wasShootingAfterCarChase', label: 'wasShootingAfterCarChase', input: 'text'},
        	{ key: 'video', label: 'video', input: 'text'}
      	]
    	}
  	}
	});
	
  var observe;
	
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
    
}