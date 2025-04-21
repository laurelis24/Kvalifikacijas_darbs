<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/svg+xml" href=" https://static.thenounproject.com/png/3358181-200.png" />
        <meta name="author" content="Lauris Kairo">
        <meta name="description" content="An interactive app for users to authenticate and post observed events, accidents, or storm damage in Latvia.">
        <title inertia>{{ config('app.name', 'Kval darbs') }}</title> 
        
       
        <!-- Fonts -->
       {{--  <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> --}}

        <!-- map css -->
       <!--  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" /> -->

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @inertiaHead
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html> 
