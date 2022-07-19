import React, { useState } from "react";

import { emailSignIn } from "../apis/AuthApis";
import Button from "../components/customComponents/Button";
import { useStore } from "../store/UserStore";
import { useNavigate } from "react-router-dom";

function EmailSignIn() {
  const setUser = useStore((state) => state.setUser);
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    try {
      const { data: signInResponse } = await emailSignIn({ email, password });

      if (signInResponse) {
        setUser(signInResponse);
        navigate("/askmessage");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex flex-col space-y-5 justify-center items-center">
        <div className="w-[20rem]">
          <div className="text-5xl">Sign in</div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">ask message name</label>
            <input
              type="text"
              className="p-3 bg-Athens_Gray"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="uppercase mb-2">ask message</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3  bg-Athens_Gray"
            />
          </div>
          <Button
            className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
            onClick={handleSignIn}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailSignIn;
