// import React, { useState } from "react";

// const EmailAutomation = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//   });
// console.log(">>>>>>",formData);
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
// console.log(">>>>>>>>>", formData);



// const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!formData.name || !formData.description) {
//     alert("Please fill out all fields.");
//     return;

    
//   }
//   console.log(">>>>", !formData.name);

//    const userData = JSON.parse(localStorage.getItem("UserData"));
   

//    if (!userData || !userData.user || !userData.user._id) {
//      alert("User not logged in. Please login again.");
//      return;
//    }
// console.log("....", userData.user._id);
//   const dataToSend = {
//     userId: userData.user._id,
    
//     name: formData.name, // ✅ added name here
//     emails: [
//       {
//         message: formData.description,
//       },
//     ],
    
//   };
//   try {
//     const response = await fetch("http://localhost:4000/sendmail", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(dataToSend),
//     });

//     const result = await response.json();
// console.log(":::::::", result);
//     if (response.ok) {
//       alert("Email sent successfully!");
//       setFormData({ name: "", description: "" });
//     } else {
//       alert("Failed to send email: " + result.message);
//     }
//   } catch (error) {
//     console.error("Error sending email:", error);
//     alert("Something went wrong. Please try again.");
//   }
// };


//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
//       <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//         Submit Your Details
//       </h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Name:</label>
//           <input
//             type="text"
//             name="name"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={formData.name}
//             onChange={handleChange}
//             placeholder="Enter your name"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Description:</label>
//           <textarea
//             name="description"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Enter a brief description"
//             rows="4"
//             required
//           ></textarea>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EmailAutomation;


import React, { useState } from "react";

const EmailAutomation = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name ||!formData.email || !formData.description) {
      alert("Please fill out all fields.");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("UserData"));

    if (!userData || !userData.user || !userData.user._id) {
      alert("User not logged in. Please login again.");
      return;
    }

    const dataToSend = {
      userId: userData.user._id,
      name: formData.name,
      email: formData.email,
      message: formData.description, // ✅ message (not emails)
    };

    try {
      const response = await fetch("http://localhost:4000/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Email sent successfully!");
        setFormData({ name: "", description: "" ,email:""});
      } else {
        alert("Failed to send email: " + result.error);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
       Send Email
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Id:</label>
          <input
            type="email"
            name="email"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email id"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description:</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a brief description"
            rows="4"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmailAutomation;
