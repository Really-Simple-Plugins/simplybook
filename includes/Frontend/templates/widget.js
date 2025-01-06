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
console.log("running simplybook script");
document.addEventListener("DOMContentLoaded", function () {
    console.log("Fired our event listener, instantiating Simplybook widget");
    new SimplybookWidget({
        "widget_type": "iframe",
        "url": "{{ server }}", // Replace with your SimplyBook URL
        "theme": "modern", // Replace with your preferred theme, e.g., "default", "modern"
        "theme_settings": {
            "is_rtl": "{{ is_rtl }}", // Not right-to-left
            // Colors
            "primary_color": "{{ primary_color }}",          // Main theme color
            "secondary_color": "{{ secondary_color }}",        // Secondary accent color
            "btn_color_1": "#DD3649",            // Button background color
            "btn_color_2": "#DD3649",            // Hover or active button color
            "sb_busy": "#DD3649",                // Busy time slots
            "sb_available": "#DD3649",           // Available time slots
            "sb_selected": "{{ sb_selected }}",            // Selected time slot color
            "sb_base_color": "#DD3649",          // Base color for timeline and inputs
            "sb_hover": "#DD3649",               // Hover color for elements
            "sb_company_label_color": "#DD3649", // Company label text color
            "booking_nav_bg_color": "{{ booking_nav_bg_color }}",   // Navigation background color
            "body_bg_color": "{{ body_bg_color }}",          // Main background color
            "dark_font_color": "{{ dark_font_color }}",        // Dark text color
            "light_font_color": "{{ light_font_color }}",       // Light text color

            // Layout & Display
            "timeline_modern_display": "as_slots",        // Display timeline as slots or continuous
            "display_item_mode": "block",                  // Options: "block", "list"
            "timeline_show_end_time": "1",                // Show end time in the timeline
            "timeline_hide_unavailable": "1",             // Hide unavailable time slots
            "hide_past_days": "1",                        // Hide dates in the past
            "hide_img_mode": "0",                         // Hide images (1: yes, 0: no)
            "show_sidebar": "0",                          // Hide the sidebar
           // "datepicker_hide_weekdays": [0, 6],           // Hide specific weekdays (Sunday: 0, Saturday: 6)
            "datepicker_start_weekday": 1,                // Set start day of the week (Monday: 1)
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

// {
//     "url": "https://rsptest1.simplybook.it",
//     "theme": "default",
//     "theme_settings": {
//         "timeline_modern_display": "as_slots",
//         "display_item_mode": "block",
//         "booking_nav_bg_color": "#DD3649",
//         "body_bg_color": "#F2F2F2",
//         "dark_font_color": "#474747",
//         "light_font_color": "#F5FCFF",
//         "btn_color_1": "#DD3649",
//         "sb_company_label_color": "#FFFFFF",
//         "sb_busy": "#c7b3b3",
//         "sb_available": "#D6EBFF",
//         "sb_base_color": "#DD3649",
//         "timeline_show_end_time": "0",
//         "timeline_hide_unavailable": "1",
//         "hide_past_days": "0",
//         "hide_img_mode": "1",
//         "show_sidebar": "1"
// },
//     "timeline": "modern",
//     "datepicker": "top_calendar",
//     "is_rtl": 0,
//     "app_config": {
//     "clear_session": 0,
//         "allow_switch_to_ada": 0,
//         "predefined": {
//         "service": "1"
//     }
// },
//     "container_id": "sbw_z0hg2i"
// }