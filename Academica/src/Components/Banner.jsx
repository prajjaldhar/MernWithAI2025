import React from "react";

const Banner = () => {
  return (
    <section className="bg-indigo-900 m-12 rounded-3xl py-7 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-10">
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-3xl font-serif font-semibold text-white mb-4 leading-tight">
          Discover Your <span className="text-amber-500">Future</span>
          <br /> With Online Quiz Programs
        </h1>
        <p className="text-gray-300 text-md md:text-lg mb-6">
          Start your journey with globally recognized online programs designed
          to boost your career.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition-all">
          Apply Now
        </button>
      </div>

      {/* Image Section */}
      <div className="flex-1">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3407/3407038.png"
          alt="Online Education"
          className="w-42 max-w-md mx-auto"
        />
      </div>
    </section>
  );
};

export default Banner;
