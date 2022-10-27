import { lazy } from 'react';

export const ResultsConfig = {
    routes  : [
        {
            path     : '/results',
            component: lazy(() => import('./results')),
        }
    ]
};
