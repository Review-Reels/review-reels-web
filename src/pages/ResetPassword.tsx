import React, { useState } from "react";
import Button from "../components/customComponents/Button";
import RRInput from "../components/customComponents/RRInput";
import { resetPassword } from "../apis/AuthApis";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../components/customComponents/Toast";
function ResetPassword() {
  let { email, passwordResetHash } = useParams();
  let navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (password === retypePassword && email && passwordResetHash) {
      setPasswordValidation("");
      try {
        setLoading(true);
        const res = await resetPassword(email, passwordResetHash, password);
        setShowToast({
          show: true,
          message: res?.data?.message,
          type: "success",
        });
        setLoading(false);
        navigate("/signin");
      } catch (err: any) {
        setShowToast({
          show: true,
          message: err.response?.data?.message,
          type: "failure",
        });
      }
    } else {
      setPasswordValidation("Password doesn't match");
    }
  };
  return (
    <div className="flex flex-col space-y-5 justify-center items-center h-screen">
      <div className="flex flex-col">
        <label className="first-letter:uppercase my-2">New password</label>
        <RRInput
          password
          value={password}
          onChange={(value) => setPassword(value)}
        />
      </div>
      <div className="flex flex-col">
        <label className="first-letter:uppercase my-2">retype password</label>
        <RRInput
          password
          value={retypePassword}
          onChange={(value) => setRetypePassword(value)}
          validationText={passwordValidation}
        />
      </div>
      <Button
        className="bg-primaryRed shadow-lg  drop-shadow-md my-4 px-10 flex gap-4"
        onClick={handlePasswordChange}
        loading={loading}
      >
        Change Password
      </Button>
      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default ResetPassword;
