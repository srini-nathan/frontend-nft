import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./auth/pages/Home";
import Login from "./auth/pages/Login";
import SignUp from "./auth/pages/SignUp";

export const AppRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path={"/"} component={Home} exact />
        <Route path={"/signup/:id"} component={SignUp} exact/>
        <Route path={"/login"} component={Login} exact/>
      </Switch>
    </Router>
  );
};
