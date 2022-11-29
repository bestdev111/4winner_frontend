import React from "react";
import Users from '../admin/components/users';
import Banks from '../admin/components/banks';
import Stats from '../admin/components/stats';
import Refunds from '../admin/components/refunds';
import Shops from '../admin/components/shops';
const AdminPanel = 
    {
        admin: [
            { title: 'Users', component: <Users />, icon: 'fa fa-users fa-1x fa-fw' },
            { title: 'Banks', component: <Banks />, icon: 'fa fa-university fa-1x fa-fw' },
            { title: 'Shops', component: <Shops />, icon: 'fa fa-shopping-cart fa-1x fa-fw' },
            { title: 'Stats', component: <Stats />, icon: 'fa fa-area-chart fa-1x fa-fw' },
            { title: 'Refunds', component: <Refunds />, icon: 'fa fa-reply fa-1x fa-fw' },
        ],
        agent: [
            { title: 'Users', component: <Users />, icon: 'fa fa-users fa-1x fa-fw' },
            { title: 'Banks', component: <Banks />, icon: 'fa fa-university fa-1x fa-fw' },
            { title: 'Stats', component: <Stats />, icon: 'fa fa-area-chart fa-1x fa-fw' },
            { title: 'New distributor', component: <Users />, icon: 'fa fa-cogs fa-1x fa-fw' },
        ],
        distributor: [
            { title: 'Users', component: <Users />, icon: 'fa fa-users fa-1x fa-fw' },
            { title: 'Banks', component: <Banks />, icon: 'fa fa-university fa-1x fa-fw' },
            { title: 'Shops', component: <Shops />, icon: 'fa fa-shopping-cart fa-1x fa-fw' },
            { title: 'Stats', component: <Stats />, icon: 'fa fa-area-chart fa-1x fa-fw' },
            { title: 'New Cashier', component: '', icon: 'fa fa-cogs fa-1x fa-fw' },
            { title: 'New Shop', component: '', icon: 'fa fa-cogs fa-1x fa-fw' },
        ],
        cashier: [
            { title: 'Users', component: <Users />, icon: 'fa fa-users fa-1x fa-fw' },
            { title: 'Stats', component: <Stats />, icon: 'fa fa-area-chart fa-1x fa-fw' },
            { title: 'Refunds', component: <Refunds />, icon: 'fa fa-reply fa-1x fa-fw' },
        ],
    }

export default AdminPanel