import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Provider, Subscribe } from "unstated";
import { createMuiTheme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import AppContext from "./AppContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoadingDialog from "./components/LoadingDialog";
import MessageDialog from "./components/MessageDialog";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#b71c1c",
      light: "#f05545",
      dark: "#7f0000"
    }
  }
});

function App() {
  const renderHome = (app, router) => {
    if (app.state.isAuthenticated) {
      return <Home app={app} router={router} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Provider>
            <Subscribe to={[AppContext]}>
              {app => (
                <Router>
                  <Switch>
                    <Route
                      path="/home"
                      render={router => renderHome(app, router)}
                    />
                    <Route
                      path="/login"
                      render={router => <Login app={app} router={router} />}
                    />
                    <Redirect to="/login" />
                  </Switch>
                  <LoadingDialog open={app.state.isLoading} />
                  <MessageDialog
                    open={app.state.dialog.type === "Message"}
                    title={app.state.dialog.title}
                    body={app.state.dialog.body}
                    onClose={app.onCloseDialog}
                  />
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
