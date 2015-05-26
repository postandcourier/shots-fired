if (Meteor.isClient) {
  
  Template.pageView.helpers({
    graph: function() {
      var graph = 'paragraphs.' + this.index + '.text';
      console.log(graph); 
      return graph;
    }
	});

}