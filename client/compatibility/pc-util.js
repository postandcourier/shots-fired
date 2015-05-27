    function pullTweetGaEvent(id) {
		  ga('send', 'event', 'shots-fired', id, 'shared');
		};
		  
		//function to create popup windows
		function windowpop(url, width, height) {
		  //Open the window.
		  window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");
		  return false;
		};