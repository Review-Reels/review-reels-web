import React from "react";
import logo from "../images/LogoSmall.svg";
function ThankYou() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="bg-Peach_Cream-normal rounded p-8 flex justify-center items-center content-center flex-col">
          <h3 className="text-lg font-bold">Awesome</h3>
          <p>
            Thank you so much for your response. Hope you had a great time with
            John
          </p>
        </div>
        <div className="flex gap-4 text-Black2 m-4">
          powerd by <img src={logo} alt="review reels logo" />
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
