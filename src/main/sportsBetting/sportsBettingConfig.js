import {lazy} from 'react'

export const SportsBettingConfig = {
    routes: [
        {
            path: '/sportsbetting',
            component: lazy(() => import('./sportsBetting')),
        }
    ]
};
