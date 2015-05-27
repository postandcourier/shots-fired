if (Meteor.isClient) {

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
  
  Router.route('/shots-fired', function () {
    this.render('landingPage');
  }); 
  
  Router.route('/shots-fired/login', function () {
    this.render('login');
  });    

  Router.route('/shots-fired/page/:_id', function () {

    //subscribe to the raw data
    this.subscribe("pages", Number(this.params._id) ).wait();
      
    if ( this.ready() ) {
      var page = Pages.findOne({'pageNumber': Number(this.params._id)});
      this.render('pageView', {data: page});
    } else {
      this.render('loader');
    }
    
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  
  Meteor.publish('shootings', function() {
    return Shootings.find();
  });
  
  Meteor.publish('pages', function(pageID) {
    return Pages.find({'pageNumber': pageID});
  });
  
  Router.route('/shots-fired/admin', function() {
    
  });
}
