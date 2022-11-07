import React, { useState, useEffect } from "react";
import RRInput from "../components/customComponents/RRInput";
import Button from "../components/customComponents/Button";
import { getUser, updateUser } from "../apis/UserApis";
import { User } from "../types";
import { useStore } from "../store/UserStore";
import Toast from "../components/customComponents/Toast";
import { useNavigate } from "react-router-dom";
import { validateUsername } from "../utils/validate";

function InitialDetails() {
  const setStoreUser = useStore((state) => state.setUser);
  const storeUser = useStore((state) => state.user);
  let navigate = useNavigate();
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
    websiteUrl: "",
  });
  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [usernameValidation, setUsernameValidation] = useState("");

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
    if (!user.username) setUsernameValidation("Username is required");
    else setUsernameValidation("");
  }, [user.username]);

  const handleMerchantChange = (value: string) => {
    setUser((prev) => ({
      ...prev,
      merchantName: value,
    }));
  };

  const handleWebsiteUrl = (value: string) => {
    setUser((prev) => ({
      ...prev,
      websiteUrl: value,
    }));
  };

  const handleUserName = (value: string) => {
    if (validateUsername(value)) setUsernameValidation("");
    else
      setUsernameValidation(
        "Username can only use letters,numbers, minimum length is 8 characters"
      );
    setUser((prev) => ({
      ...prev,
      username: value,
    }));
  };

  const updateUserDetails = () => {
    if (!usernameValidation)
      updateUser(user)
        .then((res) => {
          setShowToast({
            show: true,
            message: "Updated",
            type: "success",
          });
          setStoreUser({ ...storeUser, ...user });
          navigate("/askmessage");
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
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <div className="bg-Peach_Cream-normal p-4 rounded-xl">
        <h1 className="text-base font-medium">
          Before you proceed. Please set your Username and Merchant Name
        </h1>
      </div>
      <div className="flex flex-col gap-4 border-2 p-4 rounded-xl md:w-1/4">
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="w-full font-medium">Username </label>
          <RRInput
            value={user?.username}
            onChange={handleUserName}
            validationText={usernameValidation}
          />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="w-full font-medium">Merchant Name </label>
          <RRInput value={user?.merchantName} onChange={handleMerchantChange} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <label className="w-full font-medium">Website URL </label>
          <RRInput value={user?.websiteUrl || ""} onChange={handleWebsiteUrl} />
        </div>
      </div>
      <Button className="bg-primaryRed" onClick={updateUserDetails}>
        Update
      </Button>
      <Toast
        showToast={showToast.show}
        onClose={(value: boolean) =>
          setShowToast((prev) => ({ ...prev, show: value }))
        }
        toastMessage={showToast.message}
        type={showToast.type}
      />
    </div>
  );
}

export default InitialDetails;
