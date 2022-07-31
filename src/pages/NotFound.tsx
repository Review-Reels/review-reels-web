import React from "react";

function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col h-screen gap-2">
      <h1 className="text-8xl text-Charade font-bold">404</h1>
      <h3 className="text-3xl text-Black2">Not Found</h3>
      <h3 className="text-l text-Black3">
        The page you are looking for is not found on this server
      </h3>
    </div>
  );
}

export default NotFound;
