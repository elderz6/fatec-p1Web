import './App.css';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import Navs from './Components/Navs';
import AuthApi from './AuthApi'
import React from 'react';

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
      <div>
        <Navs isAuthenticated={auth}/>
        <div className='container'>
          <Routes />
        </div>
      </div>
    </AuthApi.Provider>
  );
}

export default App;
