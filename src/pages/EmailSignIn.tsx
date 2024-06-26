import React, { useState } from "react";

import { emailSignIn } from "../apis/AuthApis";
import Button from "../components/customComponents/Button";
import { useStore } from "../store/UserStore";
import { Link, useNavigate } from "react-router-dom";
import RRInput from "../components/customComponents/RRInput";
import { validateEmail } from "../utils/validate";
import Toast from "../components/customComponents/Toast";
import { AxiosError } from "axios";

function EmailSignIn() {
  const setUser = useStore((state) => state.setUser);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
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

      const { data: signInResponse } = await emailSignIn({ email, password });
      if (signInResponse) {
        setUser(signInResponse);
        navigate("/askmessage");
      }
    } catch (err) {
      if (err instanceof AxiosError)
        setShowToast({
          show: true,
          message: err.response?.data?.message,
          type: "failure",
        });
    }
  };
  const handleEmail = (value: string) => {
    if (!validateEmail(value.trim())) {
      setEmailValidate("Enter a valid email");
    } else {
      setEmailValidate("");
    }
    setEmail(value.trim());
  };
  return (
    <div>
      <div className="flex flex-col space-y-5 justify-center items-center h-screen">
        <div className="w-[20rem]  border-2 p-8 rounded-xl">
          <div className="text-3xl uppercase text-center font-medium">
            sign in
          </div>
          <div className="flex flex-col">
            <label className="first-letter:uppercase mb-2">email</label>
            <RRInput
              value={email}
              onChange={handleEmail}
              validationText={emailValidate}
            />
          </div>
          <div className="flex flex-col">
            <label className="first-letter:uppercase my-2">password</label>
            <RRInput
              password
              value={password}
              onChange={(value) => setPassword(value)}
            />
          </div>
          <div className="flex flex-col my-2 items-end">
            <Link to="/forgot-password" className="text-blue-900">
              forgotten password?
            </Link>
          </div>
          <Button
            className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
            onClick={handleSignIn}
          >
            Sign in
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

export default EmailSignIn;
