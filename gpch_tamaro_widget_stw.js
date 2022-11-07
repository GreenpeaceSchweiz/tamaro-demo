window.rnw.tamaro.runWidget('.rnw-widget-container', {
	testMode: false,
	debug: false,
	language: 'de',
	// paymentMethods: ['cc', 'pfc', 'pp'],
	paymentMethods: ['eca', 'vis', 'pfc', 'pp'],
	paymentTypes: ['recurring'],
	recurringIntervals: ['monthly'],
	amounts: [10, 15, 25],
	minimumCustomAmount: 10,
	showStoredCustomerDonationReceipt: false,
	translations: {
		de: {
			purposes: {
				p1: "Gemeinsam schützen wir den Planeten"
			},
			blocks: {
				payment_amounts_and_intervals: {
					title: "Betrag der Spende wählen"
				},
				payment_profile: {
					email_permission_info_html: "<p>Ich möchte, dass Greenpeace Schweiz mich per E-Mail über laufende Projekte informiert.</p>\n"
				}
			}
		},
		fr: {
			purposes: {
				p1: "Ensemble protégeons la planète"
			},
			blocks: {
				payment_amounts_and_intervals: {
					title: "Veuillez choisir le montant de votre don"
				},
				payment_profile: {
					email_permission_info_html: "<p>Je veux que Greenpeace Suisse m'informe par e-mail des projets en cours.</p>\n"
				}
			}
		},
		it: {
			purposes: {
				p1: "Insieme proteggiamo il pianeta"
			},
			blocks: {
				payment_amounts_and_intervals: {
					title: "Scegli l’importo della donazione"
				},
				payment_profile: {
					email_permission_info_html: "<p>Desidero che Greenpeace Svizzera mi informi via e-mail sui progetti in corso.</p>\n"
				}
			}
		}
	},
	paymentFormPrefill: {
		stored_piece_id: 180,
		// stored_sxt_product_id: 1037,
		stored_sf_Contact_Source__c: 'Internet',
		gpch_product: 'Standard Donation',
		stored_sf_Opportunity_Product__c: '',
		stored_sf_npe03__Recurring_Donation__c_Product__c: '',
		stored_customer_email_permission: true,
		stored_customer_donation_receipt: true,
	},
	purposeDetails: {
		p1: {
			stored_campaign_id: 'RaiseNow',
			// stored_campaign_id: 85074981,
			// stored_campaign_subid: 29744
		}
	}
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

window.rnw.tamaro.events.beforePaymentValidateAndSend.subscribe(bePaVaAnSeHandler);

// on finish
window['rnw']['tamaro'].events['paymentComplete'].subscribe(function(event) {
	var widget = window['widget'] = event.data.api;

	if (widget.transactionInfo.epayment_status === 'success') {
		window.top.dataLayer.push({
			'event': 'donationSuccess',
			'donation_amount': widget.transactionInfo.amount,
			'donation_payment_method': widget.transactionInfo.payment_method,
		});
	}
});
