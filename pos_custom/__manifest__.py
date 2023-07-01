{
    "name": "POS Custom",
    "version": "15.0.0.1",
    "depends": ["base",],
    "author": "Cris-aian Vergara",
    "category": "Point of Sale",
    "description": """
    POS Custom
    """,
    "data": [
    ],
    "demo": [
    ],
    'assets': {
            "point_of_sale.assets": [
                "pos_custom/static/src/js/custom_pos.js",
                "pos_custom/static/src/js/pos_my_button.js",
            ],
            'web.assets_qweb': [
                'pos_custom/static/src/xml/pos_screen.xml',
                'pos_custom/static/src/xml/pos_my_button.xml',
            ],
        },
    "application": True,
    'license': 'LGPL-3'
}