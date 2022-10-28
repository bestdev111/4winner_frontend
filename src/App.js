import React, { useState, useEffect, Suspense } from 'react';
import routes from './configs/routesConfig'
import AppContext from './appContext';
import { renderRoutes } from 'react-router-config'
import { Router } from 'react-router-dom';
import { Navbar,  } from 'components'
import store from './store';
import Provider from 'react-redux/es/components/Provider';
import history from './history';
import { MobileNavbar, MobileFooter } from 'mobile/components'
import {Loading}  from 'utils'

// import styled, { createGlobalStyle } from "styled-components";

function App() {
  const [windowDimension, setWindowDimension] = useState(null);

  useEffect(() => {
    setWindowDimension(window.innerWidth);
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowDimension(window.innerWidth);
      console.log(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowDimension <= 640;
  console.log('isMobile', isMobile);
  isMobile ? history.push({ pathname: '/m_home' }) : history.push({ pathname: '/' });
  
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={store}>
        <Suspense fallback={<Loading/>}>
          <Router history={history}>
            {isMobile ? <MobileNavbar/> : <Navbar /> }
            {renderRoutes(routes)}
            {isMobile ? <MobileFooter/> : <></> }
          </Router>
        </Suspense>
      </Provider>
    </AppContext.Provider>
  );
}
export default App;