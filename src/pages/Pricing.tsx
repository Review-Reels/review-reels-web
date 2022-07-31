import React from "react";
import { Check } from "phosphor-react";

const PRICING_CONSTANT = {
  starter: {
    name: "Starter",
    priceText: "Free",
    interval: "",
    price: 0.0,
    features: [
      "1 Review Ask message ",
      "4 Video Testmonials ",
      "Unlimited Text Testimonials ",
      "Testimonials Wall Page to embed ",
      "Powered by ReviewReels ",
      "No custom Domain",
      "No Bulk Export ",
      "No Localization help",
    ],
  },
  gold: {
    name: "Gold (Recomended)",
    priceText: "$25",
    interval: "/Mo",
    price: 25.0,
    features: [
      "Unlimitted Review Ask message ",
      "Unlimited Video Testmonials ",
      "Unlimited Text Testimonials ",
      "Testimonials Wall Page to embed ",
      "Removeable Powered by ReviewReels ",
      "Custom Domain",
      "Bulk Export ",
      "API",
      "No Localization help",
    ],
  },
};

function Pricing() {
  return (
    <div className="mt-12 mx-4 w-full">
      <div className="flex justify-center items-center flex-col">
        <div>
          <h1 className="text-3xl mt-10 font-bold text-center">
            Pay as you grow. Switch at any time.
          </h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10">
          {Object.values(PRICING_CONSTANT).map((pricing, index) => (
            <div className="shadow-xl m-10 p-4 pt-10 rounded-lg gap-4 flex flex-col">
              <h2 className="text-xl font-bold">{pricing.name}</h2>
              <h1 className="text-5xl font-semibold">
                {pricing.priceText}
                <span className="text-lg text-Black2"> {pricing.interval}</span>
              </h1>
              <ul className="list-none">
                {pricing.features.map((feature) => (
                  <li className="flex gap-2 py-1 text-Charade">
                    <Check size={32} weight="bold" color="#50C878" />
                    {feature}
                  </li>
                ))}
              </ul>
              {index !== 0 && (
                <a
                  className="gumroad-button"
                  href="https://adminreviewreels.gumroad.com/l/ldcxm?wanted=true"
                >
                  Subscribe
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pricing;
