odoo.define('awb_pos_service_charge.ServiceChargeButton', function(require) {
    'use strict';
       const { Gui } = require('point_of_sale.Gui');
       const PosComponent = require('point_of_sale.PosComponent');
       const ProductScreen = require('point_of_sale.ProductScreen');
       const Registries = require('point_of_sale.Registries');
    
    
       class ServiceChargeButton extends PosComponent {
        
            constructor() {
                super(...arguments);
            }

            service_charge_popup() {
                var core = require('web.core');
                var _t = core._t;
        
                Gui.showPopup("ServiceChargePopup", {
                    title : _t("Service Charge"),
                    confirmText: _t("Exit")
                });
            }
        }
    
       ServiceChargeButton.template = 'ServiceChargeButton';
       
       ProductScreen.addControlButton({
            component: ServiceChargeButton,
            condition: function() {
            return this.env.pos;
            },
    
       });
    
        Registries.Component.add(ServiceChargeButton);
        return ServiceChargeButton;
        
    });