if (Meteor.isClient) {
  
  Template.editParagraph.helpers({
    graph: function() {
      var graph = 'paragraphs.' + this.index + '.text';
      return graph;
    }
	});
	
	Template.paragraph.helpers({
    graph: function() {
      var graph = 'paragraphs.' + this.index + '.text';
      return graph;
    }
	});
	
	Template.addImage.helpers({
  	graphImg: function() {
      var graphImg = 'paragraphs.' + this.index + '.image';
      return graphImg;
    },
    graphCaption: function() {
      var idnum = 'paragraphs.' + this.index + '.imageCaption';
      return idnum;
    }
	});
	
	Template.addImage.helpers({
  	graphImg: function() {
      var graphImg = 'paragraphs.' + this.index + '.image';
      return graphImg;
    },
    graphCaption: function() {
      var idnum = 'paragraphs.' + this.index + '.imageCaption';
      return idnum;
    }
	});

}