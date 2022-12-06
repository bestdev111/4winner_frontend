import { lazy } from 'react';

export const MHomeConfig = {
    routes: [
        {
            path: '/m_home',
            component: lazy(() => import('./mHome')) 
        }
    ]
};
