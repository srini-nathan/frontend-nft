import React from "react";
import {
  RouterProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router";
import { isLoggedInVar } from "../apollo";

import { MyProfile } from "../dashboard/components/MyProfile";
import { Header } from "../dashboard/pages/Home/Header";
import { Route as ROUTES } from "./constants/routes";

interface IProps extends Partial<RouterProps> {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
  exact: boolean;
  path: string;
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}: IProps) => {
  const { data, error, loading } = MyProfile();
  if (loading) return <h3>Loading...</h3>;
  const isAuthorizedAdmin = isLoggedInVar() && data?.me?.role === "Admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorizedAdmin ? (
          <>
            <Header user={data?.me!} />
            <Component {...props} />
          </>
        ): (
          <Redirect
            to={{
              pathname: ROUTES.SIGNIN,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
