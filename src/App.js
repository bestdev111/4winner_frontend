import React, { Suspense } from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router-dom';
import { Navbar, } from 'components'
import store from './store';
import Provider from 'react-redux/es/components/Provider';
import history from './history';
// import { MobileNavbar, SubMobileNavbar, MobileFooter } from 'mobile/components'
import { Loading } from 'utils'
import { useMediaQuery } from 'usehooks-ts'
function App() {
  const matches = useMediaQuery('(min-width: 640px)')
  // matches ? history.push({ pathname: '/' }) : history.push({ pathname: '/m_home' });
  const real_routes = routes();
  return (
    <AppContext.Provider value={{ real_routes }}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Router history={history}>
            {matches ?
              <>
                <Navbar />
                {renderRoutes(real_routes)}
              </>
              :
              <>
                {/* <MobileNavbar /> */}
                {/* <SubMobileNavbar /> */}
                {renderRoutes(real_routes)}
                {/* <MobileFooter /> */}
              </>
            }
          </Router>
        </Suspense>
      </Provider>
    </AppContext.Provider>
  );
}
export default App;