import React from "react";

const UserDetails = ({
  username = "Prajjal Dhar",
  enrollmentNumber = "ENR20230678",
  formNumber = "FORM987654",
  email = "prajjal@example.com",
  userPassword = "********",
  registrationStatus = "Completed",
  coursesOpted = 5,
}) => {
  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-3xl p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-3xl text-center font-semibold mb-6 flex items-center gap-3">
          <span>👤</span> User Details
        </h2>

        <div className="space-y-5 text-gray-700 text-lg">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Username:</span>
            <span>{username}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Enrollment Number:</span>
            <span>{enrollmentNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Form Number:</span>
            <span>{formNumber}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email ID:</span>
            <span>{email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">User Password:</span>
            <span>{userPassword}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Registration Status:</span>
            <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
              {registrationStatus}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Courses Opted:</span>
            <span>{coursesOpted}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
