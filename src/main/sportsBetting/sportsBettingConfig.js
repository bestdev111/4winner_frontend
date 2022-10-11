import { SystemLoadable } from 'utils';

export const SportsBettingConfig = {
    
    routes: [
        {
            path: '/sportsbetting',
            component: SystemLoadable({
                loader: () => import('./sportsBetting')
            })
        }
    ]
};
