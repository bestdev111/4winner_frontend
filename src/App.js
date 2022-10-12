import React from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <AppContext.Provider value={{routes}}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;