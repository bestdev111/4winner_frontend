import React from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { BrowserRouter} from 'react-router-dom';
import { Navbar } from 'components'
import store from './store';
import Provider from 'react-redux/es/components/Provider';
function App() {
  return (
    <AppContext.Provider value={{routes}}>
      <Provider store={store}>
        <Navbar />
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    </AppContext.Provider>
  );
}
export default App;