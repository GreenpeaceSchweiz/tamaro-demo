// RaiseNow Tamaro Widget for GPCH - Sponsorship Fleet

window.rnw.tamaro.runWidget('.rnw-widget-container', {
	debug: false,
	testMode: false,
	language: 'de',
	defaultPaymentType: 'recurring',
	defaultRecurringInterval: 'yearly',
	showStoredCustomerEmailPermission: true,
	showStoredCustomerDonationReceipt: false,
	show_submit_button: false,
	show_footer: false,
	paymentFormPrefill: {
		stored_customer_email_permission: true,
		stored_customer_donation_receipt: true,
		stored_sf_Contact_Source__c: 'Internet',
		gpch_product: 'Sponsorship Fleet',
		stored_sf_Opportunity_Product__c: '',
		stored_sf_npe03__Recurring_Donation__c_Product__c: ''
	},
	paymentWidgetBlocks: [
		'payment_amounts_and_intervals',
		'slot_gpch_next_step_button'
	],
	purposes: ['p1'],
	purposeDetails: {
		p1: {
			stored_campaign_id: '701090000005aTcAAI'
		}
	},
	slots: {
		slot_gpch_next_step_button: [{
			component: "block",
			children: [{
				component: "block_content",
				children: [{
					component: "content",
					text_html: "gpch_next_step_button"
				}]
			}]
		}]
	},
	translations: {
		en: {
			purposes: {
				p1: 'Greenpeace Switzerland'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>I would like Greenpeace Switzerland to inform me by e-mail about ongoing projects.</p>\n"
				}
			},
			gpch_next_step_button: '<button type="button" class="btn btn-block btn-primary" onClick="gpchTamaro.nextStep()"><span class="btn-text">Next Step</span></button>'
		},
		de: {
			purposes: {
				p1: 'Greenpeace Schweiz'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>Ich möchte, dass Greenpeace Schweiz mich per E-Mail über laufende Projekte informiert.</p>\n"
				}
			}
		},
		fr: {
			purposes: {
				p1: 'Greenpeace Suisse'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>Je veux que Greenpeace Suisse m'informe par e-mail des projets en cours.</p>\n"
				}
			}
		},
		it: {
			purposes: {
				p1: 'Greenpeace Svizzera'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>Desidero che Greenpeace Svizzera mi informi via e-mail sui progetti in corso.</p>\n"
				}
			}
		}
	},
	amounts: [
		{
			"if": "paymentType() == onetime",
			"then": [360,450,600]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == monthly",
			"then": [30,50,70]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == quarterly",
			"then": [90,150,210]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == semestral",
			"then": [180,300,420]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == yearly",
			"then": [360,600,840]
		}
	],
	minimumCustomAmount: [
		{
			"if": "paymentType() == onetime",
			"then": 360
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == monthly",
			"then": 30
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == quarterly",
			"then": 90
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == semestral",
			"then": 180
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == yearly",
			"then": 360
		}
	]
});

var gpchTamaro = gpchTamaro || {};

gpchTamaro.callbackBeforePaymentValidateAndSend = function (event) {

	var payment_type = window.rnw.tamaro.instance.paymentForm.data.payment_type;

	if (payment_type === 'onetime') {
		window.rnw.tamaro.instance.paymentForm.data.stored_sf_Opportunity_Product__c = window.rnw.tamaro.instance.paymentForm.data.gpch_product;
		window.rnw.tamaro.instance.paymentForm.data.stored_sf_npe03__Recurring_Donation__c_Product__c = '';
	}

	if (payment_type === 'recurring') {
		window.rnw.tamaro.instance.paymentForm.data.stored_sf_npe03__Recurring_Donation__c_Product__c = window.rnw.tamaro.instance.paymentForm.data.gpch_product;
		window.rnw.tamaro.instance.paymentForm.data.stored_sf_Opportunity_Product__c = '';
	}
}

window.rnw.tamaro.events.beforePaymentValidateAndSend.subscribe(gpchTamaro.callbackBeforePaymentValidateAndSend);

gpchTamaro.nextStep = function() {

	rnw.tamaro.instance.config.paymentWidgetBlocks = [
		'payment_amounts_and_intervals',
		'payment_payment_methods',
		'payment_profile',
		'payment_address',
		'payment_cover_fee'
	];

	rnw.tamaro.instance.config.showSubmitButton = true;
	rnw.tamaro.instance.config.showFooter = true;
}
