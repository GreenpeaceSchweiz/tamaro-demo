// RaiseNow Tamaro Widget for GPCH - Standard Donations

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
		gpch_product: 'Standard Donation',
		stored_sf_Opportunity_Product__c: '',
		stored_sf_npe03__Recurring_Donation__c_Product__c: ''
	},
	paymentWidgetBlocks: [
		// 'payment_purposes',
		'payment_amounts_and_intervals',
		'payment_payment_methods',
		'payment_profile',
		'payment_address',
		'payment_cover_fee'
	],
	purposes: ['p1'],
	purposeDetails: {
		p1: {
			stored_campaign_id: '7013O000000hqhwQAA'
		}
	},
	/* slots: {
		purposes_start: [{
			component: "field",
			type: "select",
			name: "gpch_product",
			label: "payment_form.gpch_product",
			options: [
				{value: 'Standard Donation', label: 'payment_form.gpch_products.standard_donation'},
				{value: 'Sponsorship Agriculture', label: 'payment_form.gpch_products.sponsorship_agriculture'},
				{value: 'Sponsorship Climate', label: 'payment_form.gpch_products.sponsorship_climate'},
				{value: 'Sponsorship Fleet', label: 'payment_form.gpch_products.sponsorship_fleet'},
				{value: 'Sponsorship Forest', label: 'payment_form.gpch_products.sponsorship_forest'},
				{value: 'Sponsorship Ocean', label: 'payment_form.gpch_products.sponsorship_ocean'}
			],
		}
		]}, */
	translations: {
		en: {
			purposes: {
				p1: 'Greenpeace Switzerland'
			},
			/* payment_form: {
				gpch_product: 'Salesforce Product',
				gpch_products: {
					standard_donation: 'Standard Donation',
					sponsorship_agriculture: 'Sponsorship Agriculture',
					sponsorship_climate: 'Sponsorship Climate',
					sponsorship_fleet: 'Sponsorship Fleet',
					sponsorship_forest: 'Sponsorship Forest',
					sponsorship_ocean: 'Sponsorship Ocean'
				}
			}, */
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
			/* payment_form: {
				gpch_product: 'Salesforce Produkt',
				gpch_products: {
					standard_donation: 'Standard Spende',
					sponsorship_agriculture: 'Patenschaft Landwirtschaft',
					sponsorship_climate: 'Patenschaft Klima',
					sponsorship_fleet: 'Patenschaft Flotte',
					sponsorship_forest: 'Patenschaft Urwälder',
					sponsorship_ocean: 'Patenschaft Meer'
				}
			}, */
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