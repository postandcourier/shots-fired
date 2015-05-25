if (Meteor.isClient) {

  Router.route('/raw', function () {
    this.render('rawDataView');
  });
  
  Router.route('/shots-fired/data', function () {
    
    //subscribe to the raw data
    this.wait(Meteor.subscribe("shootings"));
    this.wait(Mapbox.load('minimap', 'markercluster', 'heat'));
      
    if ( this.ready() ) {
      this.render('dataView');
    } else {
      this.render('loader');
    }
    
  });
  
  Router.route('/shots-fired/admin', function () {
    
    //subscribe to the raw data
    this.wait(Meteor.subscribe("shootings"));
    
    if ( this.ready() ) {
      this.render('adminView');
    }
  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Router.route('/shots-fired/admin', function() {
    
  });
}
