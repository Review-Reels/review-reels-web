import React from "react";
import logo from "../images/Logo.svg";
import email from "../images/Email.svg";
import GoogleButton from "../components/GoogleButton";
import { Link } from "react-router-dom";

function SignInPage() {
  const handleGoogleSignIn = (data: CredentialResponse) => {
    console.log("djfh", data);
  };

  return (
    <div className="flex content-center items-center	 justify-center">
      <div className="flex items-center flex-col my-5 mt-20 justify-between gap-20 w-200 lg:border-2 lg:border-primaryRed	rounded-md py-10 px-5 lg:shadow-md shadow-primaryRed">
        <img src={logo} alt="Review Reels Logo" />
        <div className="flex items-center flex-col my-5 justify-between space-y-5">
          <h1 className="font-medium text-2xl text-center">
            Collect short video reviews, quickly.
          </h1>
          <GoogleButton handleGoogleSignIn={handleGoogleSignIn} />
          <Link
            to="/email"
            className="mr-2 mb-2 bg-primaryRed  px-7 py-3 text-white rounded-full shadow-lg text-center inline-flex items-center  drop-shadow-md"
          >
            <img src={email} alt="google icon" className="w-4 h-4 mr-2 -ml-1" />
            Continue with Email
          </Link>
          <p className="font-normal text-base	">
            Don't have an account{" "}
            <Link to="/signup" className="underline">
              Signup
            </Link>
          </p>
          <p className="text-sm text-gray-500 w-45 text-center">
            By signing up you agree to our <br />
            terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
