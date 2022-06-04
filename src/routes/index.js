import Home from '~/pages/Home';
import Products from '~/pages/Products';

const publicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/products',
        component: Products,
    },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
