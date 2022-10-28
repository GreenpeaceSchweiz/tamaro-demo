// RaiseNow Tamaro Widget for GPCH - Standard Donations

window.rnw.tamaro.runWidget('.rnw-widget-container', {
	debug: false,
	testMode: false,
	language: 'de',
	showStoredCustomerEmailPermission: true,
	showStoredCustomerDonationReceipt: false,
	paymentFormPrefill: {
		stored_customer_email_permission: true,
		stored_customer_donation_receipt: true,
		stored_sf_Contact_Source__c: 'Internet',
		gpch_product: 'Sponsorship Fleet',
		stored_sf_Opportunity_Product__c: '',
		stored_sf_npe03__Recurring_Donation__c_Product__c: ''
	},
	purposes: ['p1'],
	purposeDetails: {
		p1: {
			stored_campaign_id: 'RaiseNow'
		}
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
			}
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
				p1: 'Greenpeace Schweiz'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>Ich möchte, dass Greenpeace Schweiz mich per E-Mail über laufende Projekte informiert.</p>\n"
				}
			}
		},
		it: {
			purposes: {
				p1: 'Greenpeace Schweiz'
			},
			blocks: {
				payment_profile: {
					email_permission_info_html: "<p>Ich möchte, dass Greenpeace Schweiz mich per E-Mail über laufende Projekte informiert.</p>\n"
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

function bePaVaAnSeHandler(event) {

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

// beforePaymentValidateAndSend = bePaVaAnSe
window.rnw.tamaro.events.beforePaymentValidateAndSend.subscribe(bePaVaAnSeHandler);
