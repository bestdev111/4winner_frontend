import { lazy } from 'react';

export const InPlayConfig = {
    routes  : [
        {
            path: '/inplay',
            component: lazy(() => import('./inPlay')),
        }
    ]
};
