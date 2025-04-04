import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: Props) => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
