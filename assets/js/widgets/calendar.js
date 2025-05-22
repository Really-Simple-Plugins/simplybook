function instantiateSimplyBookWidget() {
    new SimplybookWidget({
        "widget_type": "iframe",
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
        "container_id": "sbw_z0hg2i_calendar"
    });
}

document.addEventListener("DOMContentLoaded", instantiateSimplyBookWidget);
document.addEventListener("loadSimplyBookPreviewWidget", instantiateSimplyBookWidget);