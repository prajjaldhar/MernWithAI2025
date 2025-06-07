import React from "react";

const highlights = [
  {
    title: "QS Ranked Online Quiz Program",
    desc: "Only Online quiz program in India to be ranked by QS. Ranked top 10 in Asia Pacific.",
    image: "https://cdn-icons-png.flaticon.com/512/3998/3998719.png", // Replace with original if needed
  },
  {
    title: "ACCA specializations",
    desc: "ACCA-accredited specializations offer exemptions from 60% of ACCA exams",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // Replace with your image
  },
  {
    title: "Study anytime anywhere",
    desc: "400+ hours of recorded video lectures making your learning journey convenient",
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png", // Replace with your image
  },
  {
    title: "Real World Projects",
    desc: "Real world projects and case studies to help you succeed in your industry",
    image: "https://cdn-icons-png.flaticon.com/512/2515/2515043.png", // Replace with your image
  },
];

const ProgramHighlights = () => {
  return (
    <section className="py-10 px-4 md:px-16 bg-white">
      <h2 className="text-3xl font-serif font-semibold text-indigo-950 mb-2">
        Program Highlights & Advantages
      </h2>
      <p className="text-right text-sm text-gray-600 mb-6">
        Discover our Online MBA degree program and begin an exciting educational
        journey
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h4 className="font-semibold text-indigo-900 mb-1 text-lg">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProgramHighlights;
