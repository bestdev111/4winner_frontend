import { lazy } from 'react';

export const MLoginConfig = {
    routes: [
        {
            path: '/m_login',
            exact: true,
            component: lazy(() => import('./mLogin'))
        },
        {
            path: '/m_changepassword',
            exact: true,
            component: lazy(() => import('./mChangePassword'))
        },
    ]
};
