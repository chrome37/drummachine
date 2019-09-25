import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { Provider, Subscribe } from 'unstated'
import { createMuiTheme } from '@material-ui/core/styles';
import AppContext from './AppContext';
import Home from './pages/Home';

const theme = createMuiTheme({

})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Provider>
          <Subscribe to={[AppContext]}>
            {app => (
              <Router>
                <Switch>
                  <Route path='/home' render={router => <Home app={app} router={router} />} />
                  <Redirect to='/home' />
                </Switch>
              </Router>
            )}
          </Subscribe>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
