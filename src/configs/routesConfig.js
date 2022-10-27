import React from 'react';
import { Redirect } from 'react-router-dom';
import { Utils } from 'utils';
import { SportsBettingConfig } from 'main/sportsBetting/sportsBettingConfig'
import { InPlayConfig } from 'main/inPlay/inPlayConfig'
import { OutRightsConfig } from 'main/outRights/outRightsConfig'
import { ResultsConfig } from 'main/results/resultsConfig'
import { ErrorsConfig } from 'main/errors/errorsConfig'
// mobile view
import { MHomeConfig } from 'mobile/pages/home/mHomeConfig'

const routeConfigs = [
    SportsBettingConfig,
    InPlayConfig,
    OutRightsConfig,
    ResultsConfig,
    ErrorsConfig,
//mobile
    MHomeConfig,
];

const routes = [
    ...Utils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact    : true,
        component: () => <Redirect to="/sportsbetting"/>

    },
    {
        component: () => <Redirect to="/error404"/>
    },
    {
        component: () => <Redirect to="/error500"/>
    }
];

export default routes;
