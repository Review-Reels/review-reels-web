import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "./store/UserStore";

function LoggedInRoutes() {
  const user = useStore((state) => state.user);
  const isSignedIn = user && user;
  const usernameSet = !user?.username;
  return isSignedIn ? (
    usernameSet ? (
      <Navigate to="initialdetails" />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="signin" />
  );
}

export default LoggedInRoutes;
