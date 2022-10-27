import { lazy } from 'react';

export const OutRightsConfig = {
    routes  : [
        {
            path: '/outrights',
            component: lazy(() => import('./outRights'))
        }
    ]
};
