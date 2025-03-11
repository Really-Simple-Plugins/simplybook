<?php
/**
 * The skeleton view ensures that the layout is loaded before the actual content.
 * Which prevents the content from jumping around when the page is loaded.
 * @var string $logoUrl
 * @var array $navigation
 */
?>

<!-- for a smooth loading experience, some styles ware loaded inline here. -->
<style>
    .toplevel_page_simplybook #wpcontent {
        padding-left: 0;
    }
    .bg-white {
        --tw-bg-opacity: 1;
        background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    }

    .mx-auto {
        margin-left: auto;
        margin-right: auto;
    }

    .flex {
        display: flex;
    }

    .max-w-screen-2xl {
        max-width: 1536px;
    }

    .items-center {
        align-items: center;
    }

    .px-5 {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .h-12 {
        height: 3rem;
    }

    .w-40 {
        width: 10rem;
    }

    .blur-sm {
        filter: blur(4px);
    }

    .animate-pulse {
        animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    .py-6 {
        padding-top: 1.5rem;
        padding-bottom: 1.5rem;
    }

    .border-b-4 {
        border-bottom-width: 4px;
    }

    .border-transparent {
        border-color: transparent;
    }

    .ml-2 {
        margin-left: 0.5rem;
    }

    .grid {
        display: grid;
    }

    .min-h-full {
        min-height: 100%;
    }

    .w-full {
        width: 100%;
    }

    .grid-cols-12 {
        grid-template-columns: repeat(12, minmax(0, 1fr));
    }

    .gap-5 {
        gap: 1.25rem;
    }

    .col-span-6 {
        grid-column: span 6 / span 6;
    }

    .row-span-2 {
        grid-row: span 2 / span 2;
    }

    .shadow-md {
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    }

    .rounded-xl {
        border-radius: 0.75rem;
    }

    .p-5 {
        padding: 1.25rem;
    }

    .h-6 {
        height: 1.5rem;
    }

    .w-1/2 {
        width: 50%;
    }

    .bg-gray-200 {
        --tw-bg-opacity: 1;
        background-color: rgb(229 231 235 / var(--tw-bg-opacity));
    }

    .rounded-md {
        border-radius: 0.375rem;
    }

    .mb-5 {
        margin-bottom: 1.25rem;
    }

    .w-4/5 {
        width: 80%;
    }

    .w-full {
        width: 100%;
    }

    .w-5/6 {
        width: 83.333333%;
    }

    .col-span-3 {
        grid-column: span 3 / span 3;
    }
</style>

<!-- Header -->
<div class="bg-white">
    <div class="mx-auto flex max-w-screen-2xl items-center px-5">
        <div>
            <img src="<?php echo esc_attr($logoUrl); ?>" alt="SimplyBook" class="h-12 w-40 px-5 py-2">
        </div>
        <?php
        if (!empty($navigation)) {
            foreach ($navigation as $item) {
                echo '<div class="py-6 px-5 border-b-4 border-transparent ' . esc_attr(($item['classes'] ?? '')) . '">' . esc_html(($item['title'] ?? '')) . '</div>';
            }
        } ?>
    </div>
</div>

<!-- Content Grid -->
<div class="mx-auto flex max-w-screen-2xl">
    <div class="m-5 grid min-h-full w-full grid-cols-12 gap-5">
        <!-- Left Block -->
        <div class="col-span-6 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div class="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
        </div>

        <!-- Middle Block -->
        <div class="col-span-3 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div class="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
        </div>

        <!-- Right Block -->
        <div class="col-span-3 row-span-2 bg-white shadow-md rounded-xl p-5">
            <div class="h-6 w-1/2 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-4/5 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-full px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
            <div class="h-6 w-5/6 px-5 py-2 bg-gray-200 rounded-md mb-5 animate-pulse"></div>
        </div>
    </div>
</div>