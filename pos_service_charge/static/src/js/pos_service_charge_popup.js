/** @odoo-module **/
import AbstractAwaitablePopup from 'point_of_sale.AbstractAwaitablePopup';
import Registries from 'point_of_sale.Registries';
const { useState } = owl.hooks;


class ServiceChargePopup extends AbstractAwaitablePopup {
	constructor() {
		super(...arguments);
		this.state = useState({ serviceData: { is_service_percentage: true, service_amount: 0 } });
	}

	get currentOrder() {
		return this.env.pos.get_order();
	}

	captureVat(event) {
		if (event.target.value == 'service_percentage') {
			this.state.serviceData['is_service_percentage'] = true;
			$(".percentage_symbol").show();
		} else {
			this.state.serviceData['is_service_percentage'] = false;
			$(".percentage_symbol").hide();
		} 
	}

	async applyConfirm() {

		// Service charge product
		var product = this.env.pos.db.get_product_by_id(this.env.pos.config.service_charge_product_id[0]);

		// All products
		var lines = this.env.pos.get_order().get_orderlines();

		// Check if service product is true
		if (product) {

			// Get all service charge products if exists
			var lines = lines.filter(e => e.get_product() == product);

			// Remove all service charge products
            for (var i = 0; i < lines.length; i++) {
                    lines[i].order.remove_orderline(lines[i]);
                }
            
            var service_charge = 0
            var total_amount = (this.env.pos.get_order().get_total_with_tax() + this.env.pos.get_order().get_rounding_applied())
            
			// Compute the service charge by percentage or amount
			if (this.state.serviceData['is_service_percentage'] && this.state.serviceData['service_amount']) {
            	// By percentage
				service_charge = (this.state.serviceData['service_amount'] / 100.0) * total_amount
            } else {
				// Amount
            	service_charge = this.state.serviceData['service_amount']
            }

			// Add the service charge in the order line
            this.env.pos.get_order().add_product(product, {
              quantity: 1,
              price: service_charge,
              lst_price: service_charge,
              extras: {price_manually_set: true},
            });
            
            var lines = this.env.pos.get_order().get_orderlines(); // Get all orders
            var line = lines.filter(e => e.get_product() == product); // Get service charge order
			
			if (line) {
				if (this.state.serviceData['is_service_percentage'] && this.state.serviceData['service_amount']) {
						// Check if service percentage
	            		line[0].is_service_percentage = this.state.serviceData['is_service_percentage']
	            		line[0].service_percentage = this.state.serviceData['service_amount']
	            	} else {
						// Else service amount
            			line[0].is_service_percentage = this.state.serviceData['is_service_percentage']
	            		line[0].service_amount = this.state.serviceData['service_amount']
            		}
            	}
        //    console.log(line[0]);
            
            return this.trigger('close-popup');
        }
		return this.trigger('close-popup');
	}

	captureChange(event) {
		this.state.serviceData['service_amount'] = event.target.value;
	}
}

//Create products popup
ServiceChargePopup.template = 'ServiceChargePopup';

ServiceChargePopup.defaultProps = {
	confirmText: 'Ok',
	cancelText: 'Cancel',
	title: 'Discount',
	body: '',
};

Registries.Component.add(ServiceChargePopup);

//   return ServiceChargePopup;
export default ServiceChargePopup;
