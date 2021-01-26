import React, {useContext} from 'react';

import "./App.css";
import {AuthContext} from './context/auth-context';
import Positions from './components/Positions';
import Auth from './components/Auth';

const App = (props) => {
  const authContext = useContext(AuthContext);

  let content = <Auth />;
  if(authContext.isAuth) {
    content = <Positions />;
  }

  return <Positions />;
}

export default App;
