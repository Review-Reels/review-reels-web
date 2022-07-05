import React from "react";
import logo from "../images/Logo.svg";
import email from "../images/Email.svg";
import GoogleButton from "../components/GoogleButton";

function SignInPage() {
  const handleGoogleSignIn = (data: CredentialResponse) => {
    console.log("djfh", data);
  };

  return (
    <div className="flex items-center flex-col my-5 justify-between gap-20">
      <img src={logo} alt="Review Reels Logo" className="mt-40" />
      <div className="flex items-center flex-col my-5 justify-between gap-3">
        <h1 className="font-medium text-2xl text-center">
          Collect short video reviews, quickly.
        </h1>
        <div id="signinDiv" />
        {/* <button className="g_id_signin mr-2 mb-2 bg-primaryRed  px-7 py-3 text-white rounded-full shadow-lg text-center inline-flex items-center  drop-shadow-md">
          <img src={google} alt="google icon" className="w-4 h-4 mr-2 -ml-1" />
          Continue with google
        </button> */}
        <GoogleButton handleGoogleSignIn={handleGoogleSignIn} />
        <button className="mr-2 mb-2 bg-primaryRed  px-7 py-3 text-white rounded-full shadow-lg text-center inline-flex items-center  drop-shadow-md">
          <img src={email} alt="google icon" className="w-4 h-4 mr-2 -ml-1" />
          Continue with Email
        </button>
        <p className="font-normal text-base	">
          Don't have an account{" "}
          <a href="signup" className="underline">
            Signup
          </a>
        </p>
        <p className="text-sm text-gray-500 w-45 text-center">
          By signing up you agree to our <br />
          terms and conditions.
        </p>
      </div>
    </div>
  );
}

export default SignInPage;
