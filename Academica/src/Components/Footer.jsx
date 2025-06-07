import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10 px-6 md:px-16 py-10">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-semibold text-blue-900 mb-2">
            Academica Online
          </h2>
          <p className="text-sm text-gray-600 max-w-sm">
            Globally recognized online education platform empowering learners
            with flexible, high-quality programs.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <h4 className="text-md font-semibold text-gray-800">Quick Links</h4>
          <ul className="text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Programs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Admissions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Logos / Social Icons */}
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Our Partners
          </h4>
          <div className="flex gap-4 items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/888/888859.png"
              alt="partner-1"
              className="w-8 h-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/2111/2111392.png"
              alt="partner-2"
              className="w-8 h-8"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
              alt="partner-3"
              className="w-8 h-8"
            />
          </div>
        </div>
      </div>

      <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Academica Online. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
