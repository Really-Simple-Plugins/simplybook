let widget = new SimplybookWidget({
    "widget_type": "button",
    "url": "{{ server }}",
    "theme": "{{ theme }}",
    "theme_settings": {
        "timeline_show_end_time": "{{ timeline_show_end_time }}",
        "timeline_modern_display": "{{ timeline_modern_display }}",
        "timeline_hide_unavailable": "{{ timeline_hide_unavailable }}",
        "hide_past_days": "{{ hide_past_days }}",
        "sb_base_color": "{{ sb_base_color }}",
        "display_item_mode": "block",
        "booking_nav_bg_color": "{{ booking_nav_bg_color }}",
        "body_bg_color": "{{ body_bg_color }}",
        "sb_review_image": "{{ sb_review_image }}",
        "dark_font_color": "{{ dark_font_color }}",
        "light_font_color": "{{ light_font_color }}",
        "btn_color_1": "{{ btn_color_1 }}",
        "hide_img_mode": "0",
        "show_sidebar": "{{ show_sidebar }}",
        "sb_busy": "{{ sb_busy }}",
        "sb_available": "{{ sb_available }}"
    },
    "timeline": "null",
    "datepicker": "{{ datepicker }}",
    "is_rtl": "{{ is_rtl }}",
    "app_config": {
        "clear_session": "{{ clear_session }}",
        "allow_switch_to_ada": "{{ allow_switch_to_ada }}",
        "predefined": []
    },
    "button_title": "{{ button_title }}",
    "button_background_color": "{{ button_background_color }}",
    "button_text_color": "{{ button_text_color }}",
    "button_position": "{{ button_position }}",
    "button_position_offset": "{{ button_position_offset }}"
});