const Ziggy = {
    url: 'http:\/\/localhost',
    port: null,
    defaults: {},
    routes: {
        'sanctum.csrf-cookie': { uri: 'sanctum\/csrf-cookie', methods: ['GET', 'HEAD'] },
        posts: { uri: 'posts', methods: ['GET', 'HEAD'] },
        dashboard: { uri: 'dashboard', methods: ['GET', 'HEAD'] },
        'profile.edit': { uri: 'profile', methods: ['GET', 'HEAD'] },
        'profile.update': { uri: 'profile', methods: ['PATCH'] },
        'profile.destroy': { uri: 'profile', methods: ['DELETE'] },
        'storage.local': {
            uri: 'storage\/{path}',
            methods: ['GET', 'HEAD'],
            wheres: { path: '.*' },
            parameters: ['path'],
        },
    },
};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
