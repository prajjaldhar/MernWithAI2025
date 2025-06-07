const highlights = [
  {
    icon: "https://cdn-icons-png.flaticon.com/128/2965/2965879.png",
    title: "WASC Accreditation (USA)",
    description:
      "Academica Online is India’s only university accredited by the Western Association of Schools and Colleges — a distinguished recognition of global academic excellence.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/128/3196/3196135.png",
    title: "Times Higher Education Employability Rankings",
    description:
      "Academica University is ranked among the best globally for graduate employability and employer reputation by Times Higher Education.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3004/3004503.png",
    title: "Industry Certifications for Better Employability",
    description:
      "Gain an edge with in-demand certifications from top industry bodies and partners — integrated within your program to boost your skills and CV.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3079/3079408.png",
    title: "WES Recognition",
    description:
      "Degrees recognised by World Education Services (WES) Canada & USA, enabling smoother pathways for higher studies and global career mobility.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/5351/5351397.png",
    title: "Pan-India Campus Access",
    description:
      "Enjoy access to all Academica campuses for events like orientation, mid-year meetups, on-campus connect and convocation — blending digital convenience with real-world connection.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2504/2504932.png",
    title: "Internship Opportunities",
    description:
      "Access curated internships with leading companies through our corporate network. Helping you gain real-world experience and stand out in the job market.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/7919/7919072.png",
    title: "QS Ranked Online Dynamic Quiz",
    description:
      "Academica Online offers India’s only Online dynamic quiz ranked by QS under Asia Pacific Top 10 — a global recognition for academic strength, learner outcomes, and digital innovation.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/270/270798.png",
    title: "Academico: Learning On-the-Go",
    description:
      "The Academico app makes learning seamless and mobile — attend live classes, track progress, access materials, and more on your schedule.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3791/3791469.png",
    title: "AI-Powered Career Discovery Platform",
    description:
      "From mock interviews and resume building to job search and easy-apply tools — our AI-powered platform ensures you’re career-ready from day one.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/2897/2897780.png",
    title: "QAA (UK) Accreditation",
    description:
      "Accredited by the UK’s Quality Assurance Agency (QAA), assuring students of globally benchmarked academic quality.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
    title: "Prof. Ami: Your AI-Powered Personal Tutor",
    description:
      "Meet Prof. Ami — your always-on, AI mentor for instant doubt-solving personalised learning tips, and smart academic support.",
  },
  {
    icon: "https://cdn-icons-png.flaticon.com/512/3544/3544552.png",
    title: "ConSocial App for Community Life",
    description:
      "Your virtual student hub — the beSocial app lets you network, join clubs, attend events, and be part of a vibrant, online-first community.",
  },
];

export default function WhyChooseAcademica() {
  return (
    <section className="px-6 py-12 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">
            Why Say <em className="italic text-indigo-800">Yes</em> To{" "}
            <span className="text-indigo-800 font-bold">Academica Online</span>
          </h2>
          <p className="text-gray-600 mt-2">
            Globally recognised | Digitally advanced | Deeply personalised
          </p>
          <hr className="mt-4 border-t border-gray-300 w-1/3 mx-auto" />
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <img
                src={item.icon}
                alt={item.title}
                className="w-12 h-12 object-contain mt-1"
              />
              <div>
                <h4 className="font-bold text-base mb-1">{item.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
