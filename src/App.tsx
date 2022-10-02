import React, { useEffect } from "react";
import AllRoutes from "./Routes";

import smartlookClient from "smartlook-client";

function App() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production")
      if (process.env.REACT_APP_SMART_LOOKS_KEY)
        smartlookClient.init(process.env.REACT_APP_SMART_LOOKS_KEY);
  });
  return (
    <div className="h-full">
      <AllRoutes />
    </div>
  );
}

export default App;
