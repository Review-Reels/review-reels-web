import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "./store/UserStore";

function LoggedInRoutes() {
  const user = useStore((state) => state.user);
  const isSignedIn = user && user;
  return isSignedIn ? <Outlet /> : <Navigate to="signin" />;
}

export default LoggedInRoutes;
