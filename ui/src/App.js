import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from '@material-ui/styles';
import { Provider, Subscribe } from 'unstated'
import { createMuiTheme } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core'
import AppContext from './AppContext';
import Home from './pages/Home';
import Login from './pages/Login';


const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#b71c1c',
      light: '#f05545',
      dark: '#7f0000'
    }
  }
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
        <Provider>
          <Subscribe to={[AppContext]}>
            {app => (
              <Router>
                <Switch>
                  <Route path='/home' render={router => <Home app={app} router={router} />} />
                  <Route path='/login' render={router => <Login app={app} router={router} />} />
                  <Redirect to='/login' />
                </Switch>
              </Router>
            )}
          </Subscribe>
        </Provider>
        </CssBaseline>
      </ThemeProvider>
    </div>
  );
}

export default App;
