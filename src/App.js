import React, { Suspense } from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import createStore from './store';
import Provider from 'react-redux/es/components/Provider';
import history from './history';
import {SetAuthToken} from './utils';
import { Loading } from 'utils'
import { setCurrentUser, logoutUser } from 'auth/store/action/authActions'

const store = createStore()
if (localStorage.jwtToken) {
  SetAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/sportsbetting';
  }
}

function App() {
  const real_routes = routes();
  return (
    <AppContext.Provider value={{ real_routes }}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <Router history={history}>
            {renderRoutes(real_routes)}
          </Router>
        </Suspense>
      </Provider>
    </AppContext.Provider>
  );
}
export default App;