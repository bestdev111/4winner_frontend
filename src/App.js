import React from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { BrowserRouter} from 'react-router-dom';
import { Navbar } from 'components'
import './App.css'
function App() {
  return (
    <AppContext.Provider value={{routes}}>
      <Navbar />
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;