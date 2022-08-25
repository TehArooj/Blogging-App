import React, { FC } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  isAuth: boolean;
}
const ProtectedRoute: FC<Props> = ({ isAuth, ...routerProps }: Props) => {
  if (isAuth) {
    return <Route {...routerProps} />;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;
