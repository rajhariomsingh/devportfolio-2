"use client";
import React, { useEffect, useState, createContext, useContext } from "react";
import { FaGithub, FaLinkedin, FaSun, FaMoon } from "react-icons/fa";
import { PieChart, Pie, Cell } from "recharts";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const GlobalStyles = () => {
  return (
    <style jsx global>{`
      /* Custom Scrollbar */
      ::-webkit-scrollbar {
        width: 4px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        background: #22c55e;
        border-radius: 2px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #16a34a;
      }

      /* Hide scrollbar for non-hover */
      * {
        scrollbar-width: thin;
        scrollbar-color: transparent transparent;
      }

      *:hover {
        scrollbar-color: #22c55e transparent;
      }

      /* Prevent body scroll */
      body {
        overflow: hidden;
      }

      /* Smooth scrolling */
      html {
        scroll-behavior: smooth;
      }
    `}</style>
  );
};

const COLORS = ["#22c55e", "#3f3f46"];

const typewriterText = "<div> I am a Next.js Dev </div>";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardHover = {
  rest: { scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
    transition: { type: "spring", stiffness: 400, damping: 17 },
  },
};

const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
    },
  },
};

function Contact() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Me</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center space-x-3"
            >
              <FaEnvelope className="text-green-400" />
              <span className="text-gray-400">david.johnson@example.com</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center space-x-3"
            >
              <FaPhone className="text-green-400" />
              <span className="text-gray-400">+1 (555) 123-4567</span>
            </motion.div>
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center space-x-3"
            >
              <FaMapMarkerAlt className="text-green-400" />
              <span className="text-gray-400">San Francisco, CA</span>
            </motion.div>
          </div>
        </div>

        <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Received", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:border-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:border-green-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-2 rounded-lg bg-black border border-gray-800 focus:border-green-400 focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-black cursor-pointer font-semibold rounded-lg hover:bg-green-400 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const About = () => {
  return (
    <div className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold mb-4"
      >
        About Me
      </motion.h2>
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 leading-relaxed"
        >
          I'm David Johnson, a passionate MERN Stack Developer based in San
          Francisco. With over 5 years of experience in web development, I
          specialize in building scalable applications and creating intuitive
          user experiences.
        </motion.p>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-8">Experience Timeline</h3>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-green-700" />

            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative pl-8"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                <div className="bg-[#222222] p-6 rounded-lg shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-green-400">
                      Senior Developer at TechCorp
                    </h4>
                    <span className="text-sm text-gray-500 bg-[#1a1a1a] px-3 py-1 rounded-full">
                      2021 - Present
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Leading a team of developers in building enterprise-level
                    applications using MERN stack.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "Node.js", "MongoDB", "Team Leadership"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative pl-8"
              >
                <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
                <div className="bg-[#222222] p-6 rounded-lg shadow-xl">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-medium text-green-400">
                      Full Stack Developer at WebSolutions
                    </h4>
                    <span className="text-sm text-gray-500 bg-[#1a1a1a] px-3 py-1 rounded-full">
                      2019 - 2021
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Developed and maintained various client projects using React
                    and Node.js.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["React", "Express.js", "PostgreSQL", "AWS"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <h3 className="text-xl font-semibold mb-4">Education</h3>
          <div className="relative pl-8">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50" />
            <div className="bg-[#222222] p-6 rounded-lg shadow-xl">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-medium text-green-400">
                  MSc in Computer Science
                </h4>
                <span className="text-sm text-gray-500 bg-[#1a1a1a] px-3 py-1 rounded-full">
                  2019
                </span>
              </div>
              <p className="text-gray-400">Stanford University</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Algorithms",
                  "Machine Learning",
                  "Software Architecture",
                ].map((subject) => (
                  <span
                    key={subject}
                    className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Page() {
  const [mernProgress, setMernProgress] = useState(0);
  const [reactProgress, setReactProgress] = useState(0);
  const [backendProgress, setBackendProgress] = useState(0);
  const [englishProgress, setEnglishProgress] = useState(0);
  const [spanishProgress, setSpanishProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [currentPage, setCurrentPage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const expertiseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setMernProgress((prev) => (prev < 75 ? prev + 1 : prev));
      setReactProgress((prev) => (prev < 91 ? prev + 1 : prev));
      setBackendProgress((prev) => (prev < 54 ? prev + 1 : prev));
      setEnglishProgress((prev) => (prev < 95 ? prev + 1 : prev));
      setSpanishProgress((prev) => (prev < 70 ? prev + 1 : prev));
    }, 15);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < typewriterText.length) {
        setTypedText((prev) => prev + typewriterText[i]);
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, []);

  const getPieData = (value: any) => [
    { value },
    { value: 100 - (typeof value === "number" ? value : 0) },
  ];

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderPieWithHoverText = (value: any) => (
    <div className="relative w-[80px] h-[80px] group">
      {isClient && (
        <PieChart width={80} height={80}>
          <Pie
            data={getPieData(value)}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={25}
            outerRadius={35}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell fill="#22c55e" />
            <Cell fill="#3f3f46" />
          </Pie>
        </PieChart>
      )}
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
        {value}%
      </div>
    </div>
  );

  const renderContent = () => {
    const contentVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          staggerChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    switch (currentPage) {
      case "about":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <About />
          </motion.div>
        );
      case "contact":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <Contact />
          </motion.div>
        );
      default:
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <>
              <div className="relative rounded-xl mb-16 p-8 overflow-hidden min-h-[500px] flex items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.2 }}
                  transition={{ duration: 1 }}
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage:
                      "url(https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg?semt=ais_hybrid&w=740)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: "fixed",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent z-1" />
                <div></div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative flex gap-2 z-10 max-w-4xl mx-auto text-center"
                >
                  <div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500">
                      Hello, Check This Out!
                    </h1>

                    <p className="text-green-400 mt-4 text-xl font-mono whitespace-pre">
                      {typedText}{" "}
                    </p>
                    <motion.button
                      onClick={() => {
                        expertiseRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-8 px-8 py-3 cursor-pointer bg-gradient-to-r from-green-500 to-green-600 rounded-full text-black font-semibold shadow-lg hover:shadow-green-500/25 transition-shadow duration-300"
                    >
                      Explore
                    </motion.button>
                  </div>
                  <img
                    src="https://media.tenor.com/DcDYpWonGbIAAAAi/budding-pop-cute.gif"
                    alt="Hello Gif"
                    className="mx-auto w-20 h-24 mb-4 hidden md:block"
                  />
                </motion.div>
              </div>
              <div ref={expertiseRef}>
                <Parallax offset={100}>
                  <motion.h2
                    className="text-2xl font-semibold mb-8"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    My Expertise
                  </motion.h2>
                  <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-8"
                  >
                    {[
                      {
                        title: "Full Stack Development",
                        description:
                          "I build scalable applications using MERN stack, with expertise in REST APIs, SSR, and database design.",
                        icon: "💻",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        variants={cardHover}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                        className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="text-3xl mb-4 block">{item.icon}</span>
                        <h3 className="font-bold mb-3">{item.title}</h3>
                        <p className="text-gray-400">{item.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                </Parallax>
              </div>
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-4">Projects</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                    <h3 className="font-bold mb-2">Weather App</h3>
                    <p className="text-gray-400">
                      Real-time weather app using OpenWeather API and
                      TailwindCSS. Provides dynamic location-based weather info.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                    <h3 className="font-bold mb-2">Task Manager</h3>
                    <p className="text-gray-400">
                      Full-featured MERN task manager with drag-and-drop, auth,
                      and responsive dashboard.
                    </p>
                  </div>
                  <div className="bg-[#1a1a1a] p-4 rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105">
                    <h3 className="font-bold mb-2">Portfolio Website</h3>
                    <p className="text-gray-400">
                      Personal portfolio made with Next.js and Framer Motion,
                      showcasing all my major projects and skills.
                    </p>
                  </div>
                </div>
              </div>
            </>
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <GlobalStyles />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <nav className="fixed top-0 left-0 right-0 bg-[#101010] z-50 px-6 py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://media.tenor.com/DcDYpWonGbIAAAAi/budding-pop-cute.gif"
              alt="Logo"
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <span className="text-lg md:text-xl font-bold">David Johnson</span>
          </div>

          <button
            className="md:hidden p-2  cursor-pointer hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? "open" : "closed"}
              className="w-6 h-6 flex flex-col justify-center items-center"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 2 },
                }}
                className="w-6 h-0.5 bg-white block mb-1.5 origin-center transition-transform"
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="w-6 h-0.5 bg-white block mb-1.5 transition-opacity"
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -2 },
                }}
                className="w-6 h-0.5 bg-white block origin-center transition-transform"
              />
            </motion.div>
          </button>

          <div className="hidden md:flex items-center space-x-6">
            {["home", "about", "contact"].map((page) => (
              <motion.button
                key={page}
                whileHover={{ y: -2 }}
                className={`px-4 py-2 cursor-pointer rounded-full ${
                  currentPage === page
                    ? "bg-green-500 text-black"
                    : "text-white"
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#101010] border-t border-gray-800 shadow-lg"
            >
              <div className="p-4 flex flex-col space-y-3">
                {["home", "about", "contact"].map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ x: 10 }}
                    className={`px-4 py-3 cursor-pointer rounded-lg text-left ${
                      currentPage === page
                        ? "bg-green-500 text-black"
                        : "text-white hover:bg-gray-800"
                    }`}
                    onClick={() => {
                      setCurrentPage(page);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex flex-col md:flex-row h-screen pt-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className={`
                        md:sticky md:top-16 md:h-[calc(100vh-4rem)] 
                        flex-shrink-0 w-full md:w-1/4
                        bg-[#101010] p-8 overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent
                        ${currentPage !== "home" ? "hidden md:block" : "block"}
                    `}
        >
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="David"
            className="rounded-full w-[100px] h-[100px] object-cover mx-auto md:mx-0"
          />
          <h1 className="text-xl font-bold mt-4 text-center md:text-left">
            David Johnson
          </h1>
          <p className="text-center md:text-left text-gray-400">
            MERN Stack Developer | Open Source Contributor | Tech Blogger
          </p>

          <div className="mt-6 w-full text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">Residence:</span>
              <span className="text-gray-400">USA</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">City:</span>
              <span className="text-gray-400">San Francisco</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Age:</span>
              <span className="text-gray-400">27</span>
            </div>
          </div>

          <div className="mt-6 w-full text-left">
            <h2 className="font-semibold mb-4">Languages</h2>
            <div className="flex justify-around">
              <div className="flex flex-col items-center">
                {renderPieWithHoverText(englishProgress)}
                <span className="mt-2">English</span>
              </div>
              <div className="flex flex-col items-center">
                {renderPieWithHoverText(spanishProgress)}
                <span className="mt-2">Spanish</span>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full text-left">
            <h2 className="font-semibold mb-2">Expertise and Competencies</h2>
            <p className="text-gray-400">MERN Stack Developer</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400"
                animate={{ width: `${mernProgress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-2 text-gray-400">React Developer</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400"
                animate={{ width: `${reactProgress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-2 text-gray-400">Backend Developer</p>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-400"
                animate={{ width: `${backendProgress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
          </div>

          <div className="flex gap-6 mt-6 justify-center md:justify-start">
            <a href="#">
              <FaGithub size={24} />
            </a>
            <a href="#">
              <FaLinkedin size={24} />
            </a>
          </div>
        </motion.div>

        <div
          className={`
                        flex-grow
                        h-[calc(100vh-4rem)]
                        overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-transparent
                        ${currentPage !== "home" ? "w-full" : "w-full md:w-3/4"}
                    `}
        >
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                variants={pageTransition}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="min-h-full"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

interface ParallaxProps {
  children: React.ReactNode;
  offset?: number;
}

const Parallax = ({ children, offset = 50 }: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};
