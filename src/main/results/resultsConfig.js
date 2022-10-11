import { SystemLoadable } from 'utils';

export const ResultsConfig = {
    routes  : [
        {
            path     : '/results',
            component: SystemLoadable({
                loader: () => import('./results')
            })
        }
    ]
};
