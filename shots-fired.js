Shootings = new Mongo.Collection("sled-shootings-clean");
Pages = new Mongo.Collection("pages");


if (Meteor.isClient) {
  
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
  });
  
  Meteor.subscribe("shootings", function() {
  });

    	
	Template.rawDataView.helpers({
  	shootings: function() {
    	return Shootings.find({});
  	}
	});
	
	Template.dataView.helpers({
  	shootings: function() {
    	return Shootings.find({});
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
  
  Template.chart.destroyed = function () {
    if (Observe) {
      Observe.stop();
    };
  };
  
  
  Template.map.rendered = function () {
    var fetchedResults = Shootings.find( {}, {"suspectWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
    
    fetchedResults = _.filter(fetchedResults, function(d) { return d.latitude > 0 });
    
    var geoData = _.map(fetchedResults, function(d) {
      return {
          "type": "Feature",
          "geometry": {
            "type": "Point",
            "coordinates": [d.longitude, d.latitude]
          },
          "properties": {
            "title": d.suspectName,
            "marker-size": "small"
          }
        }
    });
    
    var heatData = _.map(fetchedResults, function(d) {
      return [d.latitude, d.longitude];
    })
        
    this.autorun(function () {
      if (Mapbox.loaded()) {
        L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGFuZGNvdXJpZXIiLCJhIjoiLTJtdV9XQSJ9.jbQWsbAO9LktxtEBDHcl3Q';
        var map = L.mapbox.map('map', 'postandcourier.dea04587').featureLayer.setGeoJSON(geoData);
        var heat = L.heatLayer(heatData, { maxZoom: 12 }).addTo(map);
        heat.on('ready', function() {
          map.fitBounds(heat.getBounds());
        });
      }
    });
  };
	
	
	Template.chart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}, {"suspectWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
      
    var suspectWeapons = _.countBy(fetchedResults, "suspectWeapon");
    suspectWeapons = _.map(suspectWeapons, function(num, key) { return {name: key, value: Number(num)} });
            
    d3plus.viz()
    .container("#svgdiv")
    .data(suspectWeapons)
    .type("pie")
    .id("name")
    .size("value")
    .draw()
    
	};
	
	
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  VolcanoTable(Shootings, 'adminTable', {});
  
}