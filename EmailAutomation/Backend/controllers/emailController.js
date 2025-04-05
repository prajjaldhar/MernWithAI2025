// const Email = require("../models/emailModel");

// const emailController = {
//   async sendMail(req, res) {
//     try {
//       const { userId,name, message } = req.body;

//       // Validate input
//       if (!userId ||!name|| !message) {
//         return res
//           .status(400)
//           .json({ error: "User ID and message are required." });
//       }

//       // Find if user already has emails
//       let userEmailData = await Email.findOne({ userId });

//       if (userEmailData) {
//         // If user exists, push new message
//         userEmailData.emails.push({ message });
//         await userEmailData.save();
//       } else {
//         // If user doesn't exist, create new document
//         userEmailData = await Email.create({
//           userId,
//           name,
//           emails: [{ message }],
//         });
//       }

//       return res
//         .status(201)
//         .json({ message: "Email stored successfully.", data: userEmailData });
//     } catch (error) {
//       console.error("Error in storing email:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   },
//   async show(req, res, next) {
//     let display;
//     try {
//       display = await Email.find()
//     } catch (error) {
//       res.status(401).json({ error: "Server Error ", serverError: error });
//     }
//     res.status(200).json(display);
//   },
// };

const Email = require("../models/emailModel");

const emailController = {
  // Send email (store it in DB)
  async sendMail(req, res) {
    try {
      const { userId, name,email, message } = req.body;

      // Validate input
      if (!userId || !name ||!email || !message) {
        return res.status(400).json({
          error: "User ID, name, and message are required.",
        });
      }

      // Check if a document already exists for this user
      let userEmailData = await Email.findOne({ userId });

      if (userEmailData) {
        // Append the new message to the emails array
        userEmailData.emails.push({ message });
        await userEmailData.save();
      } else {
        // Create a new document if none exists
        userEmailData = await Email.create({
          userId,
          name,
          email,
          emails: [{ message }],
        });
      }

      return res.status(201).json({
        message: "Email stored successfully.",
        data: userEmailData,
      });
    } catch (error) {
      console.error("Error in storing email:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Show all stored emails
  async show(req, res) {
    try {
      const display = await Email.find().populate("userId", "email name");
      res.status(200).json(display);
    } catch (error) {
      console.error("Error fetching emails:", error);
      res.status(500).json({ error: "Server Error", serverError: error });
    }
  },
};

module.exports = emailController;
