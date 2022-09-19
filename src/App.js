import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import HeaderLayout from './layouts/Header'

import './scss/app.scss';

function App() {  
  return (
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<HeaderLayout />}>
          <Route path='' element={<Home/>}/>
          <Route path='cart' element={<Cart />}/>
          <Route path='*' element={<NotFound />}/>
        </Route>
      </Routes>
    </React.StrictMode>
  );
}

export default App;
