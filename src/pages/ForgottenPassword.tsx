import React, { useState } from "react";
import Button from "../components/customComponents/Button";
import RRInput from "../components/customComponents/RRInput";
import { validateEmail } from "../utils/validate";
import { sendResetPasswordEmail } from "../apis/AuthApis";

function ForgottenPassword() {
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleEmail = (value: string) => {
    console.log(value);
    if (!validateEmail(value.trim())) {
      setEmailValidate("Enter a valid email");
    } else {
      setEmailValidate("");
    }
    setEmail(value);
  };
  const handleSendRecovery = async () => {
    try {
      setLoading(true);
      const res = await sendResetPasswordEmail(email);
      setResponseMessage(res.data.message);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      setResponseMessage(err.response.data.message);
    }
  };
  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      <h2 className="text-3xl font-medium">Find Your Account</h2>
      <div className="flex flex-col w-1/4">
        <label className="first-letter:uppercase mb-2">Enter your email</label>
        <RRInput
          value={email}
          onChange={handleEmail}
          validationText={emailValidate}
        />
      </div>
      <Button
        className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
        onClick={handleSendRecovery}
        loading={loading}
      >
        Send recovery mail
      </Button>
      <h3>{responseMessage}</h3>
    </div>
  );
}

export default ForgottenPassword;
