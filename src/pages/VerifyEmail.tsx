import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../apis/AuthApis";

function VerifyEmail() {
  let { email, verifyHash } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [verified, setVerified] = useState<string>("");
  useEffect(() => {
    if (email && verifyHash) {
      setLoading(true);
      verifyEmail(email, verifyHash)
        .then((res) => {
          console.log(res);
          setVerified("verfied");
        })
        .catch((err) => {
          console.log(err);
          setVerified("not verfied");
        })
        .finally(() => setLoading(false));
    }
  }, [email, verifyHash]);
  if (loading) return <div>Verifiying email...</div>;
  return (
    <div>
      <p>Your email is {verified}.</p>
    </div>
  );
}

export default VerifyEmail;
