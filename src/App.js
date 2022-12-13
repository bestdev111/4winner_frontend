import React, { Suspense } from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { Router } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import createStore from './store';
import Provider from 'react-redux/es/components/Provider';
import history from './history';
import { SetAuthToken, Loading, Authorization } from './utils';
import { setCurrentUser, logoutUser } from './store/actions/authActions'
import { ToastContainer } from "react-toastify";
import AppMain from './AppMain'
import "react-toastify/dist/ReactToastify.css";

const store = createStore()
if (localStorage.jwtToken) {
  SetAuthToken(localStorage.jwtToken);
  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  }
}

function App() {
  const real_routes = routes();
  return (
    <AppContext.Provider value={{ real_routes }}>
      <Provider store={store} >
        <Suspense fallback={<Loading />}>
          <Router history={history} lang={'en_US'}>
            <Authorization routes={real_routes}>
              <AppMain real_routes={real_routes} />
            </Authorization>
          </Router>
          <ToastContainer autoClose={4000} />
        </Suspense>
      </Provider>
    </AppContext.Provider>
  );
}
export default App;