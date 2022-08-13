import React, { useState, useEffect } from "react";

import { getUser, updateUser } from "../apis/UserApis";
import { User } from "../types";
import RRInput from "../components/customComponents/RRInput";
import Button from "../components/customComponents/Button";
import Toast from "../components/customComponents/Toast";
import { CheckCircle } from "phosphor-react";
import { Tooltip } from "../components/customComponents/ToolTip";
import { useStore } from "../store/UserStore";
function Settings() {
  const setStoreUser = useStore((state) => state.setUser);
  const storeUser = useStore((state) => state.user);
  const [user, setUser] = useState<User>({
    authType: "",
    createdAt: "",
    email: "",
    id: "",
    merchantName: "",
    name: "",
    username: "",
    password: "",
    emailVerified: false,
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [retypePassword, setRetypePassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  useEffect(() => {
    getUser()
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (retypePassword && user.password !== retypePassword)
      setPasswordValidation("Passwords don't match");
    else setPasswordValidation("");
  }, [retypePassword, user.password]);

  const handleMerchantChange = (value: string) => {
    setUser((prev) => ({
      ...prev,
      merchantName: value,
    }));
  };

  const handlePasswordChange = (value: string) => {
    setUser((prev) => ({
      ...prev,
      password: value,
    }));
  };

  const updateUserDetails = () => {
    if (!passwordValidation)
      updateUser(user)
        .then((res) => {
          setShowToast({
            show: true,
            message: "Updated",
            type: "success",
          });
          setStoreUser({ ...storeUser, ...user });
        })
        .catch((err) => {
          setShowToast({
            show: true,
            message: err.response.message,
            type: "failure",
          });
        });
  };

  return (
    <div className="mt-14 mx-4 flex justify-center items-center w-full flex-col">
      <div className="flex flex-col gap-4 w-full md:w-1/2 p-4 rounded-xl md:border-2">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="w-full font-medium">Username </label>
          <RRInput value={user?.username || ""} disabled />
        </div>
        <div className="flex flex-col md:flex-row  items-center gap-2">
          <label className="w-full font-medium">Email </label>
          <RRInput
            value={user?.email || ""}
            disabled
            iconAppend={
              user.emailVerified && (
                <Tooltip message="Email verified">
                  <CheckCircle size={24} weight="fill" color="#50C878" />
                </Tooltip>
              )
            }
          />
        </div>
        <div className="flex flex-col md:flex-row   items-center gap-2">
          <label className="w-full font-medium">Merchant Name </label>
          <RRInput value={user?.merchantName} onChange={handleMerchantChange} />
        </div>

        {user?.authType !== "google" && (
          <>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <label className="w-full font-medium">New password </label>
              <RRInput
                password
                value={user?.password || ""}
                onChange={handlePasswordChange}
                validationText={passwordValidation}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <label className="w-full font-medium">Retype new password </label>
              <RRInput
                password
                value={retypePassword}
                onChange={(value) => setRetypePassword(value)}
                validationText={passwordValidation}
              />
            </div>
          </>
        )}
        <Button className="bg-primaryRed" onClick={updateUserDetails}>
          Update
        </Button>
      </div>

      <Toast
        showToast={showToast.show}
        onClose={(value) => setShowToast((prev) => ({ ...prev, show: value }))}
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default Settings;
