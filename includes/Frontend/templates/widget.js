function instantiateSimplybookWidget() {
    console.log("Fired our event listener, instantiating Simplybook widget");
    new SimplybookWidget({
        "widget_type": "iframe",
        "url": "{{ server }}", // Replace with your SimplyBook URL
        "theme": "modern", // Replace with your preferred theme, e.g., "default", "modern"
        "theme_settings": {
            "is_rtl": "{{ is_rtl }}", // Not right-to-left
            "primary_color": "{{ primary_color }}",
            "secondary_color": "{{ secondary_color }}",
            "btn_color_1": "#DD3649",
            "btn_color_2": "#DD3649",
            "sb_busy": "#DD3649",
            "sb_available": "#DD3649",
            "sb_selected": "{{ sb_selected }}",
            "sb_base_color": "#DD3649",
            "sb_hover": "#DD3649",
            "sb_company_label_color": "#DD3649",
            "booking_nav_bg_color": "{{ booking_nav_bg_color }}",
            "body_bg_color": "{{ body_bg_color }}",
            "dark_font_color": "{{ dark_font_color }}",
            "light_font_color": "{{ light_font_color }}",
            "timeline_modern_display": "as_slots",
            "display_item_mode": "block",
            "timeline_show_end_time": "1",
            "timeline_hide_unavailable": "1",
            "hide_past_days": "1",
            "hide_img_mode": "0",
            "show_sidebar": "0",
            "datepicker_start_weekday": 1
        },
        "timeline": "modern",
        "datepicker": "inline",
        "is_rtl": "{{ is_rtl }}",
        "app_config": {
            "clear_session": false,
            "allow_switch_to_ada": true,
            "predefined": null
        },
        "container_id": "sbw_z0hg2i"
    });
}

console.log("Running Simplybook script");

document.addEventListener("DOMContentLoaded", instantiateSimplybookWidget);
