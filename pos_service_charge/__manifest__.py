{
    "name": "POS Service Charge",
    'version': '15.0.1',
    'category': 'Point of Sale',
    'summary': 'POS Service Charge',
    'description': """POS Service Charge""",
    'author': 'Cris-aian Vergara',
    'website': 'www.crisaianvergara.com',
    "depends": ["point_of_sale",],
    "data" : [
        'views/pos_config_views.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_service_charge/static/src/js/pos_service_charge_button.js',
            'pos_service_charge/static/src/js/pos_service_charge_popup.js',
            'pos_service_charge/static/src/js/pos_product_screen.js',
        ],
        'web.assets_qweb': [
            'pos_service_charge/static/src/xml/pos_service_charge_button.xml',
            'pos_service_charge/static/src/xml/pos_service_charge_popup.xml',
        ],
    },
    'application': True,
    'license': 'LGPL-3'
}