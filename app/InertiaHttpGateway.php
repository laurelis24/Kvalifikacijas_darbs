<?php

namespace App;

use Illuminate\Support\Str;
use Inertia\Ssr\HttpGateway;
use Inertia\Ssr\Response;

class InertiaHttpGateway extends HttpGateway
{
    /**
     * Dispatch the Inertia page to the Server Side Rendering engine.
     */
    public function dispatch(array $page): ?Response
    {

        if ($page['url'] === '/') {
            return null;
        }

        if (Str::is('/posts/edit/*', $page['url'])) {
            return null;
        }

        if ($page['url'] === '/posts/create') {
            return null;
        }

        return parent::dispatch($page);
    }
}
