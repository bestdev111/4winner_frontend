import { lazy } from 'react';

export const MLiveConfig = {
    routes: [
        {
            path: '/m_live',
            exact: true,
            component: lazy(() => import('./mLive'))
        },
    ]
};
