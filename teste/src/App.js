import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';
import Navs from './Components/Navs';
import { GlobalProvider } from './AuthApi'
import React from 'react';

function App() {
  return (
    <GlobalProvider>
      <div>
        <Navs />
        <div className='container'>
          <Routes />
        </div>
      </div>
    </GlobalProvider>
  );
}

export default App;
