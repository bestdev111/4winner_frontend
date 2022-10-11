import React from 'react';
import './App.css';
import SportsBetting from './main/sportsBetting/sportsBetting';
import InPlay from './main/inPlay/inPlay';
import OutRights from './main/outRights/outRights';
import Results from './main/results/results';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SportsBetting />} />
            <Route exact path="/sportsbetting" element={<SportsBetting />} />
            <Route path="/inplay" element={<InPlay />} />
            <Route path="/outrights" element={<OutRights />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </BrowserRouter>
  );
}
export default App;
