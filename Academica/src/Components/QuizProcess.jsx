import React from "react";

const steps = [
  {
    id: 1,
    title: "Select Your Domain and Register",
    desc: "Choose your quiz domain and get started by registering.",
    color: "bg-green-400",
    icon: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
  },
  {
    id: 2,
    title: "Complete Your Application",
    desc: "Fill out all the necessary details before proceeding.",
    color: "bg-blue-400",
    icon: "https://cdn-icons-png.flaticon.com/512/942/942748.png",
  },
  {
    id: 3,
    title: "Pay Your Program Fee",
    desc: "Make your secure payment and unlock quiz access.",
    color: "bg-yellow-400",
    icon: "https://cdn-icons-png.flaticon.com/512/1170/1170678.png",
  },
  {
    id: 4,
    title: "Submit & Register",
    desc: "Confirm and submit your details to complete registration.",
    color: "bg-pink-400",
    icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
  },
  {
    id: 5,
    title: "Await Enrollment Details",
    desc: "We’ll notify you with further guidance via email.",
    color: "bg-green-400",
    icon: "https://cdn-icons-png.flaticon.com/512/1828/1828919.png",
  },
];

const QuizProcess = () => {
  return (
    <div className="py-12 px-4 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-4xl font-semibold text-center mb-12 text-indigo-900">
        Quiz Intake Process
      </h2>
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        {steps.map((step, index) => (
          <div key={index} className="text-center relative w-full md:w-1/5">
            <div
              className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center ${step.color}`}
            >
              <img src={step.icon} alt="icon" className="w-10 h-10" />
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-indigo-900 text-lg">
                {`0${step.id}. ${step.title}`}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{step.desc}</p>
            </div>

            {/* Connector line with arrow */}
            {index !== steps.length - 1 && (
              <div className="hidden lg:block absolute top-[25%] right-[-40%] w-36 h-[2px] bg-black after:content-[''] after:absolute after:right-0 after:top-[-4px] after:border-t-[6px] after:border-l-[6px] after:border-b-[6px] after:border-r-0 after:border-solid after:border-t-transparent after:border-b-transparent after:border-l-black"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizProcess;
