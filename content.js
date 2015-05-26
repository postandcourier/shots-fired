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
	
	Template.theImage.helpers({
    video: function() {
      var graph = 'paragraphs.' + this.index + '.image';
      var matches = graph.match(/^.*(player.vimeo.com).*$/);
      var hasVideo;
      if (matches) {
        hasVideo = true;
      } else {
        hasVideo = false;
      };
      return hasVideo;
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
    },
    video: function() {
      var graph = this.image + "";
      console.log(graph);
      var matches = graph.match(/^.*(player.vimeo.com).*$/);
      var video;
      if (matches) {
        video = graph;
      } else {
        video = false;
      };
      return video;
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