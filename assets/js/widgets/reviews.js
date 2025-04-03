let widget = new SimplybookWidget({
    "widget_type": "reviews",
    "url": "{{ server }}",
    "theme": "{{ theme }}",
    "theme_settings": {
        "timeline_show_end_time": "{{ timeline_show_end_time }}",
        "timeline_modern_display": "{{ timeline_modern_display }}",
        "timeline_hide_unavailable": "{{ timeline_hide_unavailable }}",
        "hide_past_days": "{{ hide_past_days }}",
        "sb_base_color": "{{ sb_base_color }}",
        "display_item_mode": "{{ display_item_mode }}",
        "booking_nav_bg_color": "{{ booking_nav_bg_color }}",
        "body_bg_color": "{{ body_bg_color }}",
        "sb_review_image": "{{ sb_review_image }}",
        "dark_font_color": "{{ dark_font_color }}",
        "light_font_color": "{{ light_font_color }}",
        "btn_color_1": "{{ btn_color_1 }}",
        "hide_img_mode": "{{ hide_img_mode }}",
        "show_sidebar": "{{ show_sidebar }}",
        "sb_busy": "{{ sb_busy }}",
        "sb_available": "{{ sb_available }}"
    },
    "timeline": "{{ timeline_type }}",
    "datepicker": "{{ datepicker }}",
    "is_rtl": "{{ is_rtl }}",
    "app_config": {
        "predefined": []
    },
    "reviews_count": "{{ reviews_count }}",
    "hide_add_reviews": "{{ hide_add_reviews }}"
});