odoo.define('custom_pos.pos', function (require) {
		"use strict";

		const models = require('point_of_sale.models');

		models.load_fields("product.product", ['qty_available']);

	});