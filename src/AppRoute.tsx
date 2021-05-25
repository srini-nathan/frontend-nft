import { Router, Route, Switch } from "react-router-dom";
import Home from "./dashboard/pages/Home";
import Login from "./auth/pages/Login";
import SignUp from "./auth/pages/SignUp";
import { createBrowserHistory } from "history";
import  CreatorRoute from "./routes/CreatorRoute";
import { Route as ROUTES } from "./routes/constants/routes";
import { Profile } from "./dashboard/components/MyProfile/Profile";

export const history = createBrowserHistory();

export const AppRoute = () => {
  return (
    <Router history={history}>
      <Switch>
        <CreatorRoute  exact path={ROUTES.HOME} component={Home} />
        <CreatorRoute  exact path={ROUTES.PROFILE} component={Profile} />
        <Route path={"/signup/:id"} component={SignUp} exact />
        <Route path={"/login"} component={Login} />
      </Switch>
    </Router>
  );
};
