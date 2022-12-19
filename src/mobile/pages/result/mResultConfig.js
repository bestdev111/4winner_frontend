import { lazy } from 'react';

export const MResultsConfig = {
    routes: [
        {
            path: '/m_results',
            component: lazy(() => import('./mResults'))
        }
    ]
};
