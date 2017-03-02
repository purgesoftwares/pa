
if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

	$(document).ready(function(){
		
		 paypal.Button.render({
    
			env: 'production', // Specify 'sandbox' for the test environment

			payment: function() {
				// Set up the payment here, when the buyer clicks on the button
			},

			onAuthorize: function(data, actions) {
				// Execute the payment here, when the buyer approves the transaction
		   }
				
		}, '#paypal-button');
	});
}(jQuery);
