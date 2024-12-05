// document.addEventListener("DOMContentLoaded", function () {
//     new SimplybookWidget({
//         "widget_type": "iframe",
//         "url": "https://{{ server }}",
//         "theme": "{{ template }}",
//         "theme_settings": {{ themeparams }},
//         "timeline": "{{ timeline_type }}",
//         "datepicker": "{{ datepicker_type }}",
//         "is_rtl": {{ is_rtl }},
//         "app_config": {
//             "clear_session": {{ clear_session }},
//             "allow_switch_to_ada": {{ allow_switch_to_ada }},
//             "predefined":{{ predefined }}
//         },
//         "container_id": "sbw_z0hg2i"
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    new SimplybookWidget({
        "widget_type": "iframe",
        "url": "{{ server }}", // Replace with your SimplyBook URL
        "theme": "modern", // Replace with your preferred theme, e.g., "default", "modern"
        "theme_settings": {
            "timeline_hide_unavailable": 1, // Hide unavailable time slots
            "timeline_show_end_time": 0, // Show end time on the timeline
            "datepicker_hide_weekdays": [0, 6], // Hide Sundays and Saturdays
            "is_rtl": 0, // Not right-to-left
            "primary_color": "#4CAF50", // Custom theme color
            "hide_past_days": true // Hide past days on the date picker
        },
        "timeline": "modern", // Choose the timeline layout (e.g., "default", "modern")
        "datepicker": "inline", // Choose datepicker style ("inline" or "default")
        "is_rtl": false, // Set to true for RTL languages
        "app_config": {
            "clear_session": false, // Keep session active
            "allow_switch_to_ada": true, // Enable accessibility features
            "predefined": null // Set to null or predefined options
        },
        "container_id": "sbw_z0hg2i" // Match with the container ID
    });
});

//"url": "https:\/\/rsptest1.simplybook.it", "theme": "default", "theme_settings": {"timeline_modern_display":"as_slots","display_item_mode":"block","booking_nav_bg_color":"#DD3649","body_bg_color":"#F2F2F2","dark_font_color":"#474747","light_font_color":"#F5FCFF","btn_color_1":"#DD3649","sb_company_label_color":"#FFFFFF","sb_busy":"#c7b3b3","sb_available":"#D6EBFF","sb_base_color":"#DD3649","timeline_show_end_time":"0","timeline_hide_unavailable":"1","hide_past_days":"0","hide_img_mode":"1","show_sidebar":"1"}, "timeline": "modern", "datepicker": "top_calendar", "is_rtl": 0, "app_config": {"clear_session": 0, "allow_switch_to_ada": 0, "predefined": { "service": "1", }}, "container_id": "sbw_z0hg2i" }); });
