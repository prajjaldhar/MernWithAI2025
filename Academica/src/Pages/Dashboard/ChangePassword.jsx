import React, { useState } from "react";

const ChangePassword = () => {
  const [otpVerifiedChange, setOtpVerifiedChange] = useState(false);
  const [otpVerifiedReset, setOtpVerifiedReset] = useState(false);
  const [activeTab, setActiveTab] = useState("change"); // default tab

  return (
    <div className="mt-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md border">
        {/* Tabs */}
        <div className="flex bg-gray-100 border-b">
          <button
            onClick={() => setActiveTab("change")}
            className={`px-6 py-3 font-medium flex items-center gap-2 ${
              activeTab === "change"
                ? "bg-white border-t-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            🔑 Change Password
          </button>
          <button
            onClick={() => setActiveTab("reset")}
            className={`px-6 py-3 font-medium flex items-center gap-2 ${
              activeTab === "reset"
                ? "bg-white border-t-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            🔄 Reset Password
          </button>
        </div>

        {/* Panel Content */}
        <div className="p-6">
          {activeTab === "change" && (
            <table className="w-full border-collapse">
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Email</td>
                  <td className="p-3">
                    <input
                      type="email"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter Email"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Old Password</td>
                  <td className="p-3">
                    <input
                      type="password"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter Old Password"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Phone Number</td>
                  <td className="p-3">
                    <input
                      type="tel"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter Phone Number"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">OTP</td>
                  <td className="p-3 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border rounded px-3 py-2"
                      placeholder="Enter OTP"
                    />
                    <button
                      onClick={() => setOtpVerifiedChange(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
                {otpVerifiedChange && (
                  <tr>
                    <td className="p-3 font-medium">New Password</td>
                    <td className="p-3">
                      <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter New Password"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {activeTab === "reset" && (
            <table className="w-full border-collapse">
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="p-3 font-medium w-1/3">Email</td>
                  <td className="p-3">
                    <input
                      type="email"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter Email"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">Phone Number</td>
                  <td className="p-3">
                    <input
                      type="tel"
                      className="w-full border rounded px-3 py-2"
                      placeholder="Enter Phone Number"
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 font-medium">OTP</td>
                  <td className="p-3 flex gap-2">
                    <input
                      type="text"
                      className="flex-1 border rounded px-3 py-2"
                      placeholder="Enter OTP"
                    />
                    <button
                      onClick={() => setOtpVerifiedReset(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Verify
                    </button>
                  </td>
                </tr>
                {otpVerifiedReset && (
                  <tr>
                    <td className="p-3 font-medium">New Password</td>
                    <td className="p-3">
                      <input
                        type="password"
                        className="w-full border rounded px-3 py-2"
                        placeholder="Enter New Password"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
