import React from "react";
import {
  RouterProps,
  RouteComponentProps,
  Route,
  Redirect,
} from "react-router";
import { isLoggedInVar } from "../apollo";
import { MeQuery_me } from "../auth/graphql/queries/__generated__/MeQuery";

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

const CreatorRoute: React.FC<IProps> = ({
  component: Component,
  ...rest
}: IProps) => {
  const { data, error, loading } = MyProfile();
  if (loading) return <h3>Loading...</h3>;
  const isAuthorizedCreator = isLoggedInVar() && data?.me?.role === "Creator";
  const isAuthorizedAdmin = isLoggedInVar() && data?.me?.role === "Admin";

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthorizedCreator ? (
          <>
            <Header user={data?.me!} />
            <Component {...props} />
          </>
        ) : isAuthorizedAdmin ? (
          <Redirect to={ROUTES.ADMIN_DASHBOARD} />
        ) : (
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

export default CreatorRoute;
