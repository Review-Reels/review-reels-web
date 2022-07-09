import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "./store/UserStore";

function LoggedInRoutes() {
  const user = useStore((state) => state.user);
  const isSignedIn = Object.values(user).length > 0;
  return isSignedIn ? <Outlet /> : <Navigate to="signin" />;
}

export default LoggedInRoutes;
