import React from 'react';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config'
import { Loading } from './utils';

function AppMain(props) {
  const isLoading = useSelector(state => state.mobileSportsReducers.isLoading)
  return (
    <>
      {isLoading ? <Loading /> : null}
      {renderRoutes(props.real_routes)}
    </>
  );
}
export default AppMain;