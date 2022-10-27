// RaiseNow Tamaro Widget for GPCH - Sponsorship Agriculture

window.rnw.tamaro.runWidget('.rnw-widget-container', {
	debug: false,
	testMode: true,
	language: 'de',
	showStoredCustomerEmailPermission: true,
	showStoredCustomerDonationReceipt: false,
	paymentFormPrefill: {
		stored_customer_email_permission: true,
		stored_customer_donation_receipt: true,
		stored_sf_Contact_Source__c: 'Internet',
		gpch_product: 'Sponsorship Agriculture',
		stored_sf_Opportunity_Product__c: '',
		stored_sf_npe03__Recurring_Donation__c_Product__c: ''
	},
	purposes: ['p1'],
	purposeDetails: {
		p1: {
			stored_campaign_id: '7013O000000hqhwQAA'
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
		}
	},
	amounts: [
		{
			"if": "paymentType() == onetime",
			"then": [39,84,150,250]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == monthly",
			"then": [7,10,20,50]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == quarterly",
			"then": [21,30,60,150]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == semestral",
			"then": [42,60,120,300]
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == yearly",
			"then": [84,120,240,600]
		}
	],
	minimumCustomAmount: [
		{
			"if": "paymentType() == recurring && recurringInterval() == monthly",
			"then": 2
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == quarterly",
			"then": 6
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == semestral",
			"then": 12
		},
		{
			"if": "paymentType() == recurring && recurringInterval() == yearly",
			"then": 24
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
