document.addEventListener("DOMContentLoaded", function () {
    new SimplybookWidget({
        "widget_type": "iframe",
        "url": "https://{{ server }}",
        "theme": {{ template }},
    "theme_settings": {{ themeparams }},
    "timeline": {{ timeline_type }},
    "datepicker": {{ datepicker_type }},
    "is_rtl": {{ is_rtl }},
    "app_config": {"clear_session": {{ clear_session }}, "allow_switch_to_ada": {{ allow_switch_to_ada| }}, "predefined": {
        {{predefined}}//"{{ key }}": "{{ value }}",
    }},
    "container_id": "sbw_z0hg2i"
    });
});
