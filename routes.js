if (Meteor.isClient) {

  Router.route('/raw', function () {
    this.render('rawDataView');
  });
  
  Router.route('/data', function () {
    this.render('dataView');
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
