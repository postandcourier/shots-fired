if (Meteor.isClient) {
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
            "title": d.civilianName,
            "description": "<strong>Age</strong>&emsp;" + d.civAge + "<br><strong>Case opened</strong>&emsp;" + d.caseOpened + "<br><strong>Case closed</strong>&emsp;" + d.closed + "<br><strong>Summary</strong>&emsp;" + d.summary,
            "marker-size": "small",
            "marker-color": "#2c3e50"
          }
        }
    });
    
    var heatData = _.map(fetchedResults, function(d) {
      return [d.latitude, d.longitude];
    })
        
    this.autorun(function () {
      if (Mapbox.loaded()) {
        L.mapbox.accessToken = 'pk.eyJ1IjoicG9zdGFuZGNvdXJpZXIiLCJhIjoiLTJtdV9XQSJ9.jbQWsbAO9LktxtEBDHcl3Q';
        var info = document.getElementById('info');
        var map = L.mapbox.map('map', 'postandcourier.dea04587').setView([33.875, -81.064], 8);
        var myLayer = L.mapbox.featureLayer();
        myLayer.addTo(map);
        
        
        myLayer.setGeoJSON(geoData);
        
        var heat = L.heatLayer(heatData, { maxZoom: 12, radius: 45, blur: 35, gradient: {0.4: '#004358', 0.55: '#1F8A70', 0.70: '#BEDB39', 0.85: '#FFE11A', 1: '#FD7400' } }).addTo(map);
        heat.on('ready', function() {
          map.fitBounds(heat.getBounds());
        });
        
        map.fitBounds(heat.getBounds());
        
      }
    });
  };
	
	
	Template.chart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}, {"civWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
      
    var suspectWeapons = _.countBy(fetchedResults, "civWeapon");
    suspectWeapons = _.map(suspectWeapons, function(num, key) { return {name: key, value: Number(num)} });
            
    d3plus.viz()
    .container("#svgdiv")
    .data(suspectWeapons)
    .type("pie")
    .id("name")
    .size("value")
    .draw()
    
	};
	
	Template.dvChart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}, {"suspectWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
      
    var data = _.where(fetchedResults, {civKilled: 1});
    //data = _.reject(data, {cdvFlag: "O"});
    data = _.countBy(data, "cdvFlag");
    console.log(data);
    newData = _.map(data, function(num, key) { if(key=="TRUE"){key="Dom. Violence Related"} return {name: key, value: Number(num)} });
    console.log(newData);
            
    d3plus.viz()
    .container("#dvChart")
    .data(newData)
    .type("pie")
    .id("name")
    .size("value")
    .labels(false)
    .draw()
    
	};
	
	Template.suChart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}, {"suspectWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
      
    var data = _.where(fetchedResults, {civKilled: 1});
    //data = _.reject(data, {cdvFlag: "O"});
    data = _.countBy(data, "suicideflag");
    data = _.map(data, function(num, key) { if(key=="TRUE"){key="Suicide Related"} return {name: key, value: Number(num)} });
            
    d3plus.viz()
    .container("#suChart")
    .data(data)
    .type("pie")
    .id("name")
    .focus({"tooltip":false, "value": "true"})
    .size("value")
    .labels(false)
    .draw()
    
	};
	
	Template.yearChart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}).fetch();
      
    var data = _.countBy(fetchedResults, "year");
    data = _.map(data, function(num, key) { return {year: key, value: Number(num), name: "Shootings" } });
            
    d3plus.viz()
    .container("#yearChart")
    .data(data)
    .type("line")
    .id("name")
    .text("name")
    .y("value")
    .x("year")
    .draw()
    
	};
	
/*
	Template.ageChart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}).fetch();
      
    var data = _.each(fetchedResults, function(n) { n.civAge = parseInt(n.civAge); } );
    data = _.countBy(data, "civAge");
    data = _.reject(data, {""})
    console.log(data);
    //data = _.countBy(data, "civAge")
    //console.log(data);
    data = _.map(data, function(num, key) { return {year: key, value: Number(num), name: "Incidents" } });
    console.log(data);
            
    d3plus.viz()
    .container("#ageChart")
    .data(data)
    .type("bar")
    .id("name")
    .y("value")
    .x("year")
    .draw()
    
	};
*/
	
}