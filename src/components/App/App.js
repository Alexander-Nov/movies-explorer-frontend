import React from "react";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Footer from "../Footer/Footer.js";
import Movies from "../Movies/Movies.js";

import { Route, Switch } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true); // исправить потом на false
  return (
    <div className="page">
      <Header
        loggedIn={loggedIn}
      />
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
