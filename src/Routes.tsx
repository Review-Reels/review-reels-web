import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoggedInRoutes from "./LoggedInRoutes";
import SignInPage from "./pages/SignInPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import EmailSignIn from "./pages/EmailSignIn";
import AskMessages from "./pages/AskMessages";
import ReviewLibrary from "./pages/ReviewLibrary";
import Integrations from "./pages/Integrations";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Inbox from "./pages/Inbox";
import NotFound from "./pages/NotFound";
import ViewAskMessage from "./pages/ViewAskMessage";
import ThankYou from "./pages/ThankYou";
import VideoEmbed from "./pages/VideoEmbed";
import ComingSoon from "./pages/ComingSoon";
import InitialDetails from "./pages/InitialDetails";
import VerifyEmail from "./pages/VerifyEmail";
import ForgottenPassword from "./pages/ForgottenPassword";
import ResetPassword from "./pages/ResetPassword";

function AllRoutes() {
  return (
    <div className="h-full">
      <Router>
        <Routes>
          <Route path="signin" element={<SignInPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="email" element={<EmailSignIn />} />
          <Route path="view/:requestId" element={<ViewAskMessage />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="embed/:responseId" element={<VideoEmbed />} />
          <Route path="verify/:email/:verifyHash" element={<VerifyEmail />} />
          <Route path="initialdetails" element={<InitialDetails />} />
          <Route path="forgot-password" element={<ForgottenPassword />} />
          <Route
            path="reset/:email/:passwordResetHash"
            element={<ResetPassword />}
          />
          <Route element={<LoggedInRoutes />}>
            <Route path="/" element={<HomePage />}>
              <Route path="/" element={<AskMessages />} />
              <Route path="askmessage" element={<AskMessages />} />
              <Route path="reviewlibrary" element={<ReviewLibrary />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="inbox/:requestId" element={<Inbox />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="settings" element={<Settings />} />
              <Route path="help" element={<Help />} />
              <Route path="comingsoon" element={<ComingSoon />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default AllRoutes;
