import React, { useState } from "react";

const EnquireNowModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [isIndian, setIsIndian] = useState(true);
  const [countryCode, setCountryCode] = useState("+91");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  const countryOptions = [
    { name: "India", code: "+91", short: "IN" },
    { name: "United States", code: "+1", short: "US" },
    { name: "United Kingdom", code: "+44", short: "UK" },
    { name: "Canada", code: "+1", short: "CA" },
    { name: "Australia", code: "+61", short: "AU" },
    { name: "Germany", code: "+49", short: "DE" },
    { name: "Singapore", code: "+65", short: "SG" },
    { name: "France", code: "+33", short: "FR" },
    { name: "UAE", code: "+971", short: "AE" },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-3 cursor-pointer text-4xl font-bold text-gray-600"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Visual */}
          {/* Left Visual */}
          <div className="w-full md:w-1/2 ml-8 my-8 relative h-80 md:h-auto">
            {/* Background Image */}
            <img
              src="https://images.unsplash.com/photo-1672248652488-73f8a07e3307?w=600&auto=format&fit=crop&q=60"
              alt="Login Visual"
              className="absolute inset-0 rounded-3xl w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 rounded-3xl bg-black/50 bg-opacity-50"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-xl font-semibold">Welcome To Your</h2>
              <h1 className="text-2xl font-bold text-white">
                Academica Online
              </h1>
              <p className="mt-2 text-sm">Digital Campus</p>
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-3/4 p-6">
            <h3 className="text-3xl font-semibold mt-5 mb-5 text-blue-900">
              Connect With Our Counsellor
            </h3>
            <p className="text-gray-500 font-light text-sm mb-5">
              Please provide the information below, and our counsellor will get
              in touch with you
            </p>

            {/* Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                className={`px-10 py-3 rounded-xl text-sm font-semibold ${
                  isIndian
                    ? "bg-[#0B2450] text-white"
                    : "bg-white border-[#0B2450] border-2 text-[#0B2450]"
                }`}
                onClick={() => {
                  setIsIndian(true);
                  setCountryCode("+91");
                }}
              >
                INDIAN
              </button>
              <button
                className={`px-10 py-3 rounded-xl text-sm font-semibold ${
                  !isIndian
                    ? "bg-[#0B2450] text-white"
                    : "bg-white border-[#0B2450] border-2 text-[#0B2450]"
                }`}
                onClick={() => {
                  setIsIndian(false);
                  setCountryCode("+1");
                }}
              >
                INTERNATIONAL
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Country Code */}
              <div className="w-18">
                <label className="text-sm font-medium text-gray-700">
                  Country
                </label>
                <select
                  className="w-full py-2 mt-1 text-[16px] border rounded"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryOptions.map((option) => (
                    <option
                      key={option.code}
                      value={option.code}
                    >{`${option.short} ${option.code}`}</option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded mt-1"
                  placeholder="e.g., Prajjal Dhar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Mobile */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-2 border rounded mt-1"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            {/* Second Row: Email */}
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">
                Email ID
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded mt-1"
                placeholder="e.g., prajjaldhar@academica.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Consent */}
            <div className="flex items-start gap-2 mb-4 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={() => setConsentChecked(!consentChecked)}
              />
              <p>
                By entering these details I agree that Academica and its
                associates can contact me with updates & notifications via
                Email, SMS, WhatsApp, and Voice call as per the Privacy Policy.
                This consent overrides any registration for DNC / NDNC.
              </p>
            </div>

            {/* Submit */}
            <button className="bg-[#0B2450] w-full text-white py-2 rounded-full cursor-pointer font-semibold">
              SUBMIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnquireNowModal;
