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
        var info = document.getElementById('info');
        var heat = L.heatLayer(heatData, { maxZoom: 12 }).addTo(map);
        heat.on('ready', function() {
          map.fitBounds(heat.getBounds());
        });
        
        myLayer.setGeoJSON(geoData);

        // Listen for individual marker clicks.
        myLayer.on('click',function(e) {
            // Force the popup closed.
            e.layer.closePopup();
        
            var feature = e.layer.feature;
            var content = '<div><strong>' + feature.properties.title + '</strong>' +
                          '<p>' + feature.properties.description + '</p></div>';
        
            info.innerHTML = content;
        });
        
        // Clear the tooltip when map is clicked.
        map.on('move', empty);
        
        // Trigger empty contents when the script
        // has loaded on the page.
        empty();
        
        function empty() {
          info.innerHTML = '<div><strong>Click a marker</strong></div>';
          }
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
	
	Template.dvChart.rendered = function () {
  	  	
    var fetchedResults = Shootings.find( {}, {"suspectWeapon": 1, "opened": 1, "latitude":1, "longitude":1} ).fetch();
      
    var suspectWeapons = _.countBy(fetchedResults, "cdvFlag");
    suspectWeapons = _.map(suspectWeapons, function(num, key) { return {name: key, value: Number(num)} });
            
    d3plus.viz()
    .container("#dvChart")
    .data(suspectWeapons)
    .type("pie")
    .id("name")
    .size("value")
    .draw()
    
	};
	
}