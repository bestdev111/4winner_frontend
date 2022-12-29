import { lazy } from 'react';

export const MTransactionsConfig = {
    routes: [
        {
            path: '/m_transactions',
            component: lazy(() => import('./mTransactions'))
        }
    ]
};
