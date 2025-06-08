const express = require("express");
const path = require("path");
const multer = require("multer");

const { userRegister, userGet } = require("../Controller/registerController");
const {
  addCourse,
  enrollStudent,
  getCourse,
  addQuizToCourse,
} = require("../Controller/allCourseController");
const {
  addQuiz,
  getAllQuizzes,
  createQuiz,
} = require("../Controller/quizController");

const router = express.Router();

const profilePic = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/profileImg/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadpic = multer({ storage: profilePic });

const thumbnailImg = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload/thumbnailImg/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const uploadthumb = multer({ storage: thumbnailImg });

// this for register user
router.post("/signup", uploadpic.single("profilePic"), userRegister);
//this is for get user
router.get("/userget", userGet);

// this is for create course
router.post("/allcourse", uploadthumb.single("thumbnailUrl"), addCourse);

// this is for enroll student in course collection
router.post("/enrollstu", enrollStudent);
// this is for enroll quiz in course collection
router.post("/addquiz", addQuizToCourse);

//get all courses
router.get("/getcourse", getCourse);

// this is for create quiz
router.post("/createquiz", createQuiz);
// this is for getting quiz
router.get("/getquiz", getAllQuizzes);

module.exports = router;
