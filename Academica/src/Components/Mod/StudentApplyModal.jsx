import React, { useState } from "react";

const allCourses = [
  { label: "C++ Beginner", value: "cpp-beginner" },
  { label: "C++ Intermediate", value: "cpp-intermediate" },
  { label: "C++ Advanced", value: "cpp-advanced" },
  { label: "Java Intermediate", value: "java-intermediate" },
  { label: "Java Advanced", value: "java-advanced" },
  { label: "Python Beginner", value: "python-beginner" },
  { label: "Python Intermediate", value: "python-intermediate" },
  { label: "Python Advanced", value: "python-advanced" },
  { label: "React Basics", value: "react-basics" },
  { label: "React Advanced", value: "react-advanced" },
  { label: "Node.js Beginner", value: "nodejs-beginner" },
  { label: "Node.js Intermediate", value: "nodejs-intermediate" },
  { label: "Node.js Advanced", value: "nodejs-advanced" },
  { label: "Data Structures", value: "data-structures" },
  { label: "Algorithms", value: "algorithms" },
  { label: "Machine Learning", value: "machine-learning" },
  { label: "Deep Learning", value: "deep-learning" },
  { label: "Database Fundamentals", value: "db-fundamentals" },
  { label: "SQL Advanced", value: "sql-advanced" },
  { label: "NoSQL Basics", value: "nosql-basics" },
  { label: "Web Development", value: "web-development" },
  { label: "Mobile App Development", value: "mobile-app-dev" },
  { label: "Cloud Computing Basics", value: "cloud-computing" },
  { label: "DevOps Essentials", value: "devops-essentials" },
  { label: "Cybersecurity Fundamentals", value: "cybersecurity" },
  { label: "UI/UX Design", value: "ui-ux-design" },
  { label: "JavaScript Basics", value: "js-basics" },
  { label: "TypeScript Intermediate", value: "typescript-intermediate" },
  { label: "Angular Basics", value: "angular-basics" },
  { label: "Vue.js Fundamentals", value: "vuejs-fundamentals" },
  { label: "Kubernetes Basics", value: "kubernetes-basics" },
  { label: "Blockchain Basics", value: "blockchain-basics" },
  { label: "Big Data Introduction", value: "big-data-intro" },
  { label: "Artificial Intelligence", value: "artificial-intelligence" },
  { label: "Software Testing", value: "software-testing" },
  { label: "Agile Methodologies", value: "agile-methodologies" },
  { label: "Project Management", value: "project-management" },
  { label: "Digital Marketing", value: "digital-marketing" },
  { label: "SEO Fundamentals", value: "seo-fundamentals" },
  { label: "Cloud AWS", value: "cloud-aws" },
  { label: "Cloud Azure", value: "cloud-azure" },
  { label: "Cloud GCP", value: "cloud-gcp" },
  { label: "Docker Essentials", value: "docker-essentials" },
  { label: "Linux Administration", value: "linux-admin" },
  { label: "Ethical Hacking", value: "ethical-hacking" },
  { label: "Data Analysis", value: "data-analysis" },
  { label: "Excel for Beginners", value: "excel-beginners" },
  { label: "Power BI", value: "power-bi" },
  { label: "Tableau Basics", value: "tableau-basics" },
];

const StudentApplyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    dob: "",
    profilePic: null,
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    bio: "",
    courses: ["cpp-beginner"],
  });

  const [preview, setPreview] = useState(null);
  const [courseSearch, setCourseSearch] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profilePic") {
      const file = files[0];
      if (
        file &&
        ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ) {
        setFormData((prev) => ({ ...prev, profilePic: file }));
        setPreview(URL.createObjectURL(file));
      } else {
        alert("Only .jpg, .jpeg, .png files are allowed");
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCourseToggle = (value) => {
    setFormData((prev) => {
      let newCourses = [...prev.courses];
      if (newCourses.includes(value)) {
        newCourses = newCourses.filter((c) => c !== value);
      } else {
        newCourses.push(value);
      }
      return { ...prev, courses: newCourses };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      if (key === "courses") {
        formData.courses.forEach((course) => data.append("courses[]", course));
      } else {
        data.append(key, formData[key]);
      }
    }

    console.log("Submitting FormData");
    // axios.post('/api/apply', data); // Example usage
  };

  if (!isOpen) return null;

  const filteredCourses = allCourses.filter((course) =>
    course.label.toLowerCase().includes(courseSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-5xl shadow-xl overflow-hidden relative max-h-[90vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 cursor-pointer text-4xl font-bold text-gray-600"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Left Visual */}
        <div className="w-full md:w-1/2 bg-gray-100 p-6 flex flex-col items-center justify-center text-center">
          {preview ? (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
          ) : (
            <img
              src="https://images.unsplash.com/photo-1672248652488-73f8a07e3307?w=600&auto=format&fit=crop&q=60"
              alt="Apply Visual"
              className="w-40 h-40 object-cover rounded-full mb-4"
            />
          )}
          <h2 className="text-xl font-semibold">Ready to Begin?</h2>
          <h1 className="text-2xl font-bold text-blue-900">
            Apply to Academica
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill out your student application
          </p>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto">
          <h3 className="text-3xl font-semibold mb-6 text-blue-900">
            Student Application
          </h3>
          <form onSubmit={handleSubmit}>
            {[
              {
                label: "First Name",
                name: "firstName",
                type: "text",
                required: true,
              },
              {
                label: "Last Name",
                name: "lastName",
                type: "text",
                required: true,
              },
              { label: "Email", name: "email", type: "email", required: true },
              {
                label: "Password",
                name: "password",
                type: "password",
                required: true,
              },
              { label: "Phone", name: "phone", type: "tel", required: true },
              { label: "Age", name: "age", type: "number", required: true },
              {
                label: "Date of Birth",
                name: "dob",
                type: "date",
                required: true,
              },
              {
                label: "Address",
                name: "address",
                type: "text",
                required: true,
              },
              { label: "City", name: "city", type: "text", required: true },
              { label: "State", name: "state", type: "text", required: true },
              {
                label: "Country",
                name: "country",
                type: "text",
                required: true,
              },
              {
                label: "Pincode",
                name: "pincode",
                type: "text",
                required: true,
              },
            ].map(({ label, name, type, required }) => (
              <div key={name}>
                <label className="text-sm font-medium text-gray-700">
                  {label}
                  {required && " *"}
                </label>
                <input
                  name={name}
                  type={type}
                  required={required}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded mt-1 mb-3"
                  placeholder={`Enter ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Profile Pic Upload */}
            <label className="text-sm font-medium text-gray-700">
              Profile Picture *
            </label>
            <input
              name="profilePic"
              type="file"
              accept=".jpg, .jpeg, .png"
              required
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 mb-3"
            />

            {/* Bio */}
            <label className="text-sm font-medium text-gray-700">Bio</label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded mt-1 mb-3"
              placeholder="Tell us something about you..."
            />

            {/* Courses Search */}
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Courses *
            </label>
            <input
              type="text"
              placeholder="Search courses..."
              value={courseSearch}
              onChange={(e) => setCourseSearch(e.target.value)}
              className="w-full mb-2 px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
            />

            {/* Courses Checkbox Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto border rounded p-3 mb-4"
              role="list"
              aria-label="Courses checklist"
            >
              {filteredCourses.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">
                  No courses found.
                </p>
              ) : (
                filteredCourses.map(({ label, value }) => (
                  <label
                    key={value}
                    className="inline-flex items-center space-x-2 cursor-pointer hover:bg-blue-50 rounded p-2"
                  >
                    <input
                      type="checkbox"
                      checked={formData.courses.includes(value)}
                      onChange={() => handleCourseToggle(value)}
                      className="form-checkbox text-blue-600"
                    />
                    <span>{label}</span>
                  </label>
                ))
              )}
            </div>

            <button
              type="submit"
              className="bg-[#0B2450] w-full text-white py-2 rounded-full cursor-pointer font-semibold mt-2"
            >
              APPLY NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentApplyModal;
