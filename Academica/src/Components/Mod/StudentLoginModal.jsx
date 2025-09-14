import React, { useState } from "react";

const StudentLoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [isLoginWithEmail, setLoginWithEmail] = useState(true);
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-99">
      <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-3 cursor-pointer text-4xl font-bold text-gray-600"
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side Image + Welcome */}
          <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
            <img
              src="https://images.unsplash.com/photo-1672248652488-73f8a07e3307?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8b2ZmaWNlJTIwd29tYW4lMjB1c2luZyUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D"
              alt="Login Visual"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">Welcome To Your</h2>
            <h1 className="text-2xl font-bold text-blue-900">
              Academica Online
            </h1>
            <p className="mt-2 text-sm text-gray-600">Digital Campus</p>
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2 p-6">
            <h3 className="text-3xl font-semibold mt-5 mb-10 text-blue-900">
              Student Login
            </h3>

            <div className="flex gap-2 mb-4">
              <button
                className="bg-[#0B2450] cursor-pointer text-white px-4 py-2 rounded-full text-sm font-semibold"
                onClick={() => setLoginWithEmail(true)}
              >
                LOGIN WITH EMAIL
              </button>
              <button
                className="border border-[#0B2450] cursor-pointer text-[#0B2450] px-4 py-2 rounded-full text-sm font-semibold"
                onClick={() => setLoginWithEmail(false)}
              >
                LOGIN WITH OTP
              </button>
            </div>

            {isLoginWithEmail ? (
              <>
                <label className="text-sm font-medium text-gray-700">
                  Email ID / Form ID
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded mt-1 mb-4"
                  placeholder="e.g., prajjaldhar@academica.com"
                />
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border rounded mt-1 mb-4"
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500 mb-3 cursor-pointer">
                  Forgot Password?
                </p>
              </>
            ) : (
              <div className="mt-16 mb-16">
                <label className="text-sm font-medium text-gray-700">
                  Enter Phone Number
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border rounded mt-1 mb-4"
                  placeholder="Enter email address or mobile number"
                />
              </div>
            )}

            <button className="bg-[#0B2450] w-full text-white py-2 rounded-full cursor-pointer font-semibold">
              SUBMIT
            </button>

            <button className="mt-4 cursor-pointer border border-[#0B2450] w-full text-[#0B2450] py-2 rounded-full font-semibold flex items-center justify-center gap-2 hover:text-white hover:bg-[#0B2450]">
              🎁 Refer & Earn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginModal;
