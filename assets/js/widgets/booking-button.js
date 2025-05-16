// Unused since: NL14RSP2-220 - kept for reference
let bookingButtonWidget = new SimplybookWidget({
    "widget_type": "button",
    "url": "{{ server }}",
    "theme": "{{ theme }}",
    "theme_settings": "{{ theme_settings }}",
    "timeline": "{{ timeline_type }}",
    "datepicker": "{{ datepicker }}",
    "is_rtl": "{{ is_rtl }}",
    "app_config": {
        "clear_session": "{{ clear_session }}",
        "allow_switch_to_ada": "{{ allow_switch_to_ada }}",
        "predefined": "{{ predefined }}",
    },
    "button_title": "{{ button_title }}",
    "button_background_color": "{{ button_background_color }}",
    "button_text_color": "{{ button_text_color }}",
    "button_position": "{{ button_position }}",
    "button_position_offset": "{{ button_position_offset }}",
});