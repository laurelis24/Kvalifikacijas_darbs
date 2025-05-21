<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/svg+xml" href=" https://static.thenounproject.com/png/3358181-200.png" />
        <meta name="author" content="Lauris Kairo">
        <meta name="description" content="An interactive app for users to authenticate and post observed events, accidents, or storm damage in Latvia.">
        <title inertia>{{ config('app.name', 'Kvalifikācijas_darbs') }}</title> 
        
        @routes
        @viteReactRefresh
        @inertiaHead
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html> 
