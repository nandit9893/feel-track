"use client";
import React, { useState } from "react";
import { FaNodeJs } from "react-icons/fa";
import { TbWaveSawTool } from "react-icons/tb";
import { RiRobot2Line } from "react-icons/ri";

import {
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiCloudinary,
  SiTensorflow,
  SiPytorch,
} from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";

const Icons = {
  SiNextdotjs,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiCloudinary,
  SiTensorflow,
  SiPytorch,
  FaNodeJs,
  TbWaveSawTool,
  RiRobot2Line,
};

const tech_stack_left = [
  {
    _id: 1,
    name: "Front End",
    description_points: [
      {
        _id: 1,
        name: "Next.js",
        icon: "SiNextdotjs",
        description:
          "Next.js is a powerful React framework that enables server-side rendering, static site generation, and dynamic routing out of the box, helping developers build fast and SEO-friendly applications effortlessly.",
      },
      {
        _id: 2,
        name: "Tailwind CSS",
        icon: "SiTailwindcss",
        description:
          "Tailwind CSS is a utility-first CSS framework that allows for rapid UI development directly in your markup. Its design system promotes consistency and flexibility without writing custom CSS.",
      },
      {
        _id: 3,
        name: "Redux",
        icon: "SiRedux",
        description:
          "Redux is a state management library commonly used with React applications. It enables centralized management of application state with predictable state transitions using actions and reducers.",
      },
    ],
  },
  {
    _id: 2,
    name: "Back End",
    description_points: [
      {
        _id: 1,
        name: "Node.js",
        icon: "FaNodeJs",
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 engine that allows server-side execution of JavaScript. It’s known for its non-blocking, event-driven architecture, ideal for scalable network applications.",
      },
      {
        _id: 2,
        name: "Express",
        icon: "SiExpress",
        description:
          "Express.js is a minimalist Node.js web application framework that simplifies API and server development. It provides powerful middleware and routing capabilities for building scalable backends quickly.",
      },
      {
        _id: 3,
        name: "Cloudinary",
        icon: "SiCloudinary",
        description:
          "Cloudinary is a cloud-based image and video management platform that enables developers to efficiently upload, store, transform, and deliver media assets through a powerful API and CDN support.",
      },
    ],
  },
  {
    _id: 3,
    name: "Database",
    description_points: [
      {
        _id: 1,
        name: "MongoDB",
        icon: "SiMongodb",
        description:
          "MongoDB is a NoSQL database known for its scalability and flexibility. It stores data in JSON-like documents, making it ideal for applications that require fast iterations and complex data structures.",
      },
    ],
  },
  {
    _id: 4,
    name: "Machine Learning",
    description_points: [
      {
        _id: 1,
        name: "PyTorch",
        icon: "SiPytorch",
        description:
          "PyTorch is an open-source machine learning library developed by Facebook’s AI Research lab. It provides a dynamic computational graph, making it intuitive and flexible for research and production in deep learning.",
      },
      {
        _id: 2,
        name: "TensorFlow",
        icon: "SiTensorflow",
        description:
          "TensorFlow is an end-to-end open-source platform developed by Google for machine learning and deep learning. It supports both CPU and GPU computation, and is widely used for training large-scale models.",
      },
    ],
  },
  {
    _id: 5,
    name: "AI Capabilities",
    description_points: [
      {
        _id: 1,
        name: "ElevenLabs",
        icon: "TbWaveSawTool",
        description:
          "ElevenLabs is a leading AI voice synthesis platform that delivers lifelike voice cloning. It enables creators to generate human-sounding speech from text with expressive tone and emotions.",
      },
      {
        _id: 2,
        name: "Resemble.ai",
        icon: "RiRobot2Line",
        description:
          "Resemble.ai offers real-time voice cloning with personalized voice avatars. It's used in gaming, film, and customer service to bring natural-sounding, interactive audio experiences.",
      },
    ],
  },
];

const TechStack = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [hoveredTech, setHoveredTech] = useState(null);

  const selectedTech = hoveredTech
    ? hoveredTech
    : tech_stack_left.find((stack) => stack._id === activeTab)
        ?.description_points[0];

  const handleTabClick = (id) => {
    setActiveTab(id);
    setHoveredTech(null);
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-700 to-black">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-10">
        <h4 className="text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
          Tech Stack
        </h4>
        <div className="flex gap-10 w-full items-center">
          {/* Sidebar tabs unchanged */}
          <div className="w-1/4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-full">
            {tech_stack_left.map((item, index) => (
              <div
                className={`relative flex items-center justify-between w-full p-6 cursor-pointer transition-all duration-300 group
                            ${
                              activeTab === item._id
                                ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-l-4 border-purple-500"
                                : "hover:bg-slate-700/50"
                            }
                            ${
                              index !== tech_stack_left.length - 1
                                ? "border-b border-slate-100/20"
                                : ""
                            }
                        `}
                key={item._id}
                onClick={() => handleTabClick(item._id)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 
                                ${
                                  activeTab === item._id
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                                    : "bg-slate-500 group-hover:bg-slate-400"
                                }
                            `}
                  ></div>
                  <p
                    className={`font-medium text-2xl transition-all duration-300 
                                ${
                                  activeTab === item._id
                                    ? "text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text"
                                    : "text-slate-200 group-hover:text-white"
                                }
                            `}
                  >
                    {item.name}
                  </p>
                </div>

                {activeTab === item._id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-lg animate-pulse"></div>
                )}
              </div>
            ))}
          </div>

          {/* Main tech stack grid with animations */}
          <div className="w-3/4 rounded-2xl shadow-2xl border border-slate-100/30 overflow-hidden h-80 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-black">
              {tech_stack_left
                .find((stack) => stack._id === activeTab)
                ?.description_points.map((tech, index, arr) => {
                  const IconComponent = Icons[tech.icon];
                  const isLastInRowLg = (index + 1) % 3 === 0;

                  const isHovered = hoveredTech?._id === tech._id;

                  return (
                    <div
                      key={tech._id}
                      className={`flex flex-col items-center h-40 justify-center border-b bg-gradient-to-tr from-black to-slate-700 border-slate-100/30 p-6 relative group cursor-pointer transition-all duration-300
          ${!isLastInRowLg ? "border-r" : ""}`}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      {/* Icon motion: moves up and fades out on hover */}
                      <motion.div
                        initial={{ y: 0, opacity: 1 }}
                        animate={
                          isHovered
                            ? { y: -20, opacity: 0 }
                            : { y: 0, opacity: 1 }
                        }
                        transition={{ duration: 0.3 }}
                        className="text-5xl text-pink-500"
                      >
                        <IconComponent />
                      </motion.div>

                      {/* Name motion: moves up from below and fades in on hover */}
                      <motion.h3
                        initial={{ y: 20, opacity: 0 }}
                        animate={
                          isHovered
                            ? { y: 0, opacity: 1 }
                            : { y: 20, opacity: 0 }
                        }
                        transition={{ duration: 0.3 }}
                        className="text-2xl font-semibold text-white mb-2 absolute"
                      >
                        {tech.name}
                      </motion.h3>
                    </div>
                  );
                })}
            </div>

            {selectedTech && (
              <div className="flex items-center w-full justify-center bg-gradient-to-tr from-slate-700 to-black flex-grow p-5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={selectedTech._id}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-white text-lg text-center"
                  >
                    {selectedTech.description}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
