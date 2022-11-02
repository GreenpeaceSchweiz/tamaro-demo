window.onload = function() {

	$('.payment-submit-block').hide();
	$('.footer-info').hide();

	const nextStepButton = $.parseHTML('<div class="widget-block next-step-block"><div class="next-step"><div class="main"><button type="button" class="btn btn-block btn-primary md-ripple" onClick="nextStep()"><span class="btn-text">Next Step</span><div class="md-ripple-cont"></div></button></div></div></div>');
	$(nextStepButton).insertAfter(".widget-block.payment-submit-block");
}

function nextStep() {

	$('.next-step-block').hide();

	rnw.tamaro.instance.config.paymentWidgetBlocks = [
		'payment_amounts_and_intervals',
		'payment_payment_methods',
		'payment_profile',
		'payment_address',
		'payment_cover_fee'
	];

	$('.payment-submit-block').show();
	$('.footer-info').show();
}
