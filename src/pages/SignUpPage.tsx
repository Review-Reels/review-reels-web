import React, { useEffect, useState } from "react";

import { emailSignup } from "../apis/AuthApis";
import Button from "../components/customComponents/Button";
import { useNavigate } from "react-router-dom";
import RRInput from "../components/customComponents/RRInput";
import { validateEmail, validateUsername } from "../utils/validate";
import Toast from "../components/customComponents/Toast";
import { AxiosError } from "axios";

function SignUpPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [merchantName, setMerchantName] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [usernameValidate, setUsernameValidate] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSignIn = async () => {
    try {
      if (!validateEmail(email)) {
        setEmailValidate("Enter a valid email");
        return;
      }

      if (!validateUsername(username)) {
        setUsernameValidate(
          "Username can only use letters,numbers, minimum length is 8 characters"
        );
        return;
      }

      if (retypePassword && password !== retypePassword) {
        setPasswordValidation("Passwords don't match");
        return;
      }

      const { data: signInResponse } = await emailSignup({
        email,
        password,
        name: merchantName,
        username,
        merchantName,
      });
      if (signInResponse) {
        navigate("/signin");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.data?.message === "email_unique")
          setEmailValidate("You already have an account try, sigin");
        else if (err.response?.data?.message === "username_unique")
          setUsernameValidate("This username is taken");
        else
          setShowToast({
            show: true,
            message: err.response?.data?.message,
            type: "failure",
          });
      }
    }
  };
  const handleEmail = (value: string) => {
    if (!validateEmail(email)) {
      setEmailValidate("Enter a valid email");
    } else {
      setEmailValidate("");
    }
    setEmail(value);
  };

  const handleUsername = (value: string) => {
    if (!validateUsername(value)) {
      setUsernameValidate(
        "Username can only use letters,numbers, minimum length is 8 characters"
      );
    } else {
      setUsernameValidate("");
    }
    setUsername(value);
  };

  useEffect(() => {
    if (retypePassword && password !== retypePassword)
      setPasswordValidation("Passwords don't match");
    else setPasswordValidation("");
  }, [retypePassword, password]);

  return (
    <div>
      <div className="flex flex-col space-y-5 justify-center items-center h-screen">
        <div className="w-[20rem]  border-2 p-8 rounded-xl">
          <div className="text-3xl uppercase text-center font-medium">
            sign up
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">email</label>
            <RRInput
              value={email}
              onChange={handleEmail}
              validationText={emailValidate}
            />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">username</label>
            <RRInput
              value={username}
              onChange={handleUsername}
              validationText={usernameValidate}
            />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">merchant name</label>
            <RRInput value={merchantName} onChange={setMerchantName} />
          </div>
          <div className="flex flex-col">
            <label className="uppercase my-2">password</label>
            <RRInput
              password
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="uppercase my-2">retype password</label>
            <RRInput
              password
              value={retypePassword}
              onChange={(value) => setRetypePassword(value)}
              validationText={passwordValidation}
            />
          </div>
          <Button
            className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
            onClick={handleSignIn}
          >
            Sign up
          </Button>
        </div>
        <Toast
          showToast={showToast.show}
          onClose={(value) =>
            setShowToast((prev) => ({ ...prev, show: value }))
          }
          toastMessage={showToast.message}
          type={showToast.type}
        />
      </div>
    </div>
  );
}

export default SignUpPage;
