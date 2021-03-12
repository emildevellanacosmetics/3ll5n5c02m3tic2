jQuery(document).ready(function() {
    jQuery('.tabs-account .tab-account-links a').on('click', function(e) {
		var currentAttrValue = jQuery(this).attr('data-href');

		// Show/Hide Tabs
		jQuery('.tabs-account ' + currentAttrValue).fadeIn(400).siblings().hide();

		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');

		e.preventDefault();
	});

	jQuery('#tab-mobile').change(function(){
		jQuery('#'+ jQuery(this).val()).fadeIn(400).siblings().hide();
	});
});