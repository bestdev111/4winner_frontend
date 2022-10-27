import { lazy } from 'react';

export const ErrorsConfig = {
    routes  : [
        {
            path     : '/error404',
            component: lazy(() => import('./error404'))

        },
        {
            path     : '/error500',
            component: lazy(() => import('./error500'))

        }
    ]
};
