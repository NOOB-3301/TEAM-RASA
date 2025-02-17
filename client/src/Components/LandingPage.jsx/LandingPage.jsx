import { useState, useEffect } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaGlobe,
  FaHandsHelping,
  FaStar,
  FaGraduationCap,
  FaClock,
  FaChartLine,
  FaVideo,
  FaPlayCircle,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const words = [
  "Education",
  "Learning",
  "Opportunities",
  "Communities",
  "Futures",
];

export default function LandingPage() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("effect");
    const token = localStorage.getItem("authToken");
    if (token) {
      const userpayload = jwtDecode(token);
      if (userpayload.role === "Teacher") {
        window.location.href = "/teacher";
      } else {
        window.location.href = "/student";
      }
    }
  }, []);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, 100);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/course/getallcourse"
        );
        const data = await response.json();

        if (response.ok) {
          setCourses(data.fetchedCourses || []);
        } else {
          console.error("Error fetching courses:", data.message);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="overflow-x-hidden bg-gradient-to-b from-[#f0f4ff] to-white">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-7xl font-extrabold text-gray-900">
                RASA
                <div className="text-2xl font-semibold text-[#0F6B5E] mt-4">
                  Empowering Local Teachers, Transforming
                </div>
                <div className="text-4xl mt-2 min-h-[48px]">{text}</div>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Join our platform to transform education through innovative
                teaching methods, personalized learning experiences, and a
                supportive global community.
              </p>

              <div className="flex gap-6">
                <Link to="/signup">
                  <button className="px-8 py-4 bg-[#0F6B5E] text-white rounded-xl font-bold hover:bg-[#0a4e42] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                    Get Started
                  </button>
                </Link>
                <Link to="/courses">
                  <button className="px-8 py-4 border-2 border-[#0F6B5E] text-[#0F6B5E] rounded-xl font-bold hover:bg-[#0F6B5E] hover:text-white transform hover:scale-105 transition-all duration-300">
                    Explore Courses
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-[#0F6B5E] rounded-3xl opacity-10 blur-2xl"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { number: "10K+", label: "Active Students" },
                    { number: "1000+", label: "Expert Teachers" },
                    { number: "500+", label: "Courses" },
                    { number: "95%", label: "Success Rate" },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="text-center p-4 bg-gray-50 rounded-xl hover:shadow-md transition-all duration-300"
                    >
                      <div className="text-3xl font-bold text-[#0F6B5E]">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-6">
          {[
            { icon: <FaStar />, text: "Top Rated Platform" },
            { icon: <FaGraduationCap />, text: "Certified Courses" },
            { icon: <FaClock />, text: "Flexible Learning" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="text-[#0F6B5E]">{item.icon}</span>
              <span className="font-semibold">{item.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured Courses
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-r from-[#5a5d85] to-[#14887a] relative overflow-hidden">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={course.imageLink}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>                </div>
                <div className="p-6">
                  <div className="text-sm text-[#0F6B5E] font-semibold mb-2">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-[#0F6B5E] transition-colors duration-300">
                    {course.title}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <FaStar className="text-yellow-400" />
                      <span>{course.rating}</span>
                      <span className="text-gray-400">
                        ({course.students} students)
                      </span>
                    </div>
                    <div className="font-bold text-[#0F6B5E]">
                      {course.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <FaChalkboardTeacher className="text-5xl text-[#0F6B5E]" />
                ),
                title: "Expert Teachers",
                desc: "Learn from certified and experienced educators passionate about student success.",
              },
              {
                icon: <FaUsers className="text-5xl text-[#0F6B5E]" />,
                title: "Community Support",
                desc: "Join a thriving community of educators and learners for collaborative growth.",
              },
              {
                icon: <FaBook className="text-5xl text-[#0F6B5E]" />,
                title: "Quality Content",
                desc: "Access thoroughly vetted, professionally designed course materials.",
              },
              {
                icon: <FaGlobe className="text-5xl text-[#0F6B5E]" />,
                title: "Global Reach",
                desc: "Connect with educators and students from around the world.",
              },
              {
                icon: <FaHandsHelping className="text-5xl text-[#0F6B5E]" />,
                title: "Mentorship",
                desc: "Get personalized guidance from experienced professionals.",
              },
              {
                icon: <FaChartLine className="text-5xl text-[#0F6B5E]" />,
                title: "Career Growth",
                desc: "Advance your teaching career with professional development opportunities.",
              },
              {
                icon: <FaVideo className="text-5xl text-[#0F6B5E]" />,
                title: "Live Class",
                desc: "Start your learning in much better way.",
              },
              {
                icon: <FaPlayCircle className="text-5xl text-[#0F6B5E]" />,
                title: "Recorded Classes",
                desc: "If you missed your live Class dont worry we got your back.",
              },
              {
                icon: <FaUserFriends className="text-5xl text-[#0F6B5E]" />,
                title: "One-to-One",
                desc: "Your very Own Personal tutor in One go",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "RASA JAISWAL",
                role: "Math Teacher",
                text: "RASA has transformed my teaching approach. The resources and community support are invaluable.",
              },
              {
                name: "RASA SHAW",
                role: "Science Educator",
                text: "The professional development opportunities here are outstanding. I've grown so much as an educator.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col space-y-4">
                  <div className="text-[#0F6B5E]">★★★★★</div>
                  <p className="text-gray-600 italic">{testimonial.text}</p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0F6B5E]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Transform Your Teaching Journey?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of educators who are already making a difference with
            RASA.
          </p>
          <Link>
            <button className="px-8 py-4 bg-white text-[#0F6B5E] rounded-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
