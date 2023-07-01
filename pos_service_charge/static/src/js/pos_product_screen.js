/** @odoo-module **/
import Registries from 'point_of_sale.Registries';

const ProductScreen = require('point_of_sale.ProductScreen');

const clickProductScreen = (ProductScreen) =>
	class extends ProductScreen {
		constructor() {
			super(...arguments);
		}

		// async _clickProduct(event) {

		// 	const product = event.detail;

		// 	console.log(product);
		// }

	};
	
Registries.Component.extend(ProductScreen, clickProductScreen);
