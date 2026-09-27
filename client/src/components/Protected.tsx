import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../app/utils";
import React from "react";

const Protected = () => {
  const token = getToken();
  const location = useLocation();

  return token ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default Protected;
