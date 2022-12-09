import { lazy } from 'react';

export const MyBetsConfig = {
    routes: [
        {
            path: '/mybets',
            component: lazy(() => import('./myBets'))
        }
    ]
};
