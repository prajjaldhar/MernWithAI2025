import React, { useState } from "react";
import WhyChooseAcademica from "../Components/WhyChooseAcademica";
import QuizProcess from "../Components/QuizProcess";
import ProgramHighlights from "../Components/ProgramHighlights";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import StudentLoginModal from "../Components/Mod/StudentLoginModal";
import EnquireNowModal from "../Components/Mod/EnquireNowModal";
import StudentApplyModal from "../Components/Mod/StudentApplyModal";
const courses = [
  {
    name: "C++ Programming",
    bg: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    duration: "02 YEARS",
    badge: "TOP RANKED",
  },
  {
    name: "Core Java",
    bg: "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    duration: "01.5 YEARS",
    badge: "JAVA CERTIFIED",
  },
  {
    name: "Fullstack MERN",
    bg: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=400&q=80",
    duration: "01 YEAR",
    badge: "INDUSTRY READY",
  },
  {
    name: "Data Science with Python",
    bg: "https://images.unsplash.com/photo-1542744095-291d1f67b221?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    duration: "02 YEARS",
    badge: "QS RANKED",
  },
];

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const [showStudentApplyModal, setStudentApplyModal] = useState(false);

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="hidden md:flex bg-[#0B2450] text-white px-8 py-4 m-5 rounded-4xl justify-between items-center">
        <div className="text-2xl font-thin">ACADEMICA</div>
        <div className="flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-transparent text-white border-white border-2 cursor-pointer px-4 py-2 rounded-full"
          >
            EXISTING STUDENT LOGIN
          </button>
          <button
            className="bg-white text-[#0B2450] cursor-pointer px-4 py-2 rounded-full"
            onClick={() => setShowEnquireModal(true)}
          >
            ENQUIRE NOW
          </button>
          <button
            className="bg-[#FDC500] text-black cursor-pointer px-4 py-2 rounded-full font-bold"
            onClick={() => setStudentApplyModal(true)}
          >
            APPLY NOW
          </button>
        </div>
      </nav>

      {/* Highlight Bar */}
      <div className="bg-[#FDC500] text-center py-2 m-5 rounded-4xl text-[#0B2450] text-sm font-semibold">
        July '25 Session Admissions Open Now
      </div>

      {/* Hero Section with Background Image and Overlay */}
      <section
        className="relative bg-cover bg-center text-white m-5 p-3 rounded-4xl"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607873524997-ce0fe37e7e68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 bg-opacity-80 z-0 rounded-4xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between p-10 items-center gap-10 min-h-[80vh]">
          {/* Left: Course Info */}
          <div className="flex-1 text-white">
            <h3 className="text-sm font-semibold mb-2 text-yellow-400">
              Online Quiz Platform
            </h3>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Master in Modern Technologies <br /> (Dynamic-Quiz-based Learning)
            </h1>
            <p className="text-md mb-6">DURATION: 1.5 Hr per session</p>
            <button className="bg-[#FDC500] text-black leading-5 px-10 py-3 rounded-full">
              DOWNLOAD BROCHURE
            </button>
            <div className="mt-6 bg-white text-black rounded-xl shadow p-4 w-fit">
              <p className="text-sm font-medium">
                India’s most practical tech course
              </p>
              <p className="text-sm font-medium">
                Global Top 10 Practical-Quiz-first Programs
              </p>
            </div>
          </div>

          {/* Right: Apply Form */}
          <div className="bg-white text-black shadow-xl p-8 rounded-xl w-full md:w-[400px]">
            <h2 className="text-3xl text-center font-semibold mb-6">
              Apply Now
            </h2>

            {/* Full Name */}
            <label className="text-indigo-900 text-sm font-bold block mb-1">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            {/* Email ID */}
            <label className="text-indigo-900 text-sm font-bold block mb-1">
              Email ID <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            {/* Phone Number */}
            <label className="text-indigo-900 text-sm font-bold block mb-1">
              Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="Enter your phone number"
              className="w-full mb-4 px-4 py-2 border rounded"
            />

            {/* Checkbox */}
            <div className="text-sm text-gray-600 mb-4">
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span className="text-sm font-medium">
                  By entering these details I agree that Academica and its
                  associates can contact me with updates & notifications via
                  Email, SMS, WhatsApp, and Voice call as per the Privacy
                  Policy. This consent will override any registration for DNC /
                  NDNC.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button className="w-full bg-[#ccc] text-black py-2 rounded-3xl font-semibold">
              SUBMIT
            </button>
          </div>
        </div>
      </section>

      {/* Course List */}
      <section className="px-8 py-12 bg-white">
        <h2 className="text-3xl font-bold mb-9 text-center">
          Explore Our Top Courses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {courses.map(({ name, bg, duration, badge }) => (
            <div
              key={name}
              className="relative rounded-xl shadow-lg overflow-hidden h-[400px] w-full cursor-pointer group"
              style={{
                backgroundImage: `url(${bg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Blue gradient overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/100 to-transparent"></div>

              {/* Yellow badge */}
              <div className="absolute top-3 left-3 bg-yellow-400 text-xs font-semibold px-3 py-1 rounded-sm shadow">
                {badge}
              </div>

              {/* Bottom text info */}
              <div className="absolute bottom-0 w-full p-4 text-white">
                <h3 className="font-semibold text-lg leading-tight">{name}</h3>

                <div className="mt-2 flex items-center gap-2 text-sm opacity-90">
                  {/* Calendar icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <span>{duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <WhyChooseAcademica />
      <QuizProcess />
      <ProgramHighlights />
      <Banner />
      <Footer />
      <StudentLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
      <EnquireNowModal
        isOpen={showEnquireModal}
        onClose={() => setShowEnquireModal(false)}
      />
      <StudentApplyModal
        isOpen={showStudentApplyModal}
        onClose={() => setStudentApplyModal(false)}
      />
    </div>
  );
};

export default HomePage;
