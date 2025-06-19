import { ChevronsRight, Pencil } from "lucide-react";
import React, { useState, useEffect } from "react";

const HeroSection = ({ homeHeroSectionData }) => {
  const [editHeading, setEditHeading] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (homeHeroSectionData) {
      setHeading(homeHeroSectionData.heading || "");
      setDescription(homeHeroSectionData.description || "");
    }
  }, [homeHeroSectionData]);

  return (
    <div id="homehero" className="w-full bg-neutral-900 h-full p-10 flex flex-col gap-5">
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">Hero Section</h4>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-gray-600 shadow-2xl">
        <iframe className="w-full h-80" src={homeHeroSectionData?.videoURL} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Live Demo Video"></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/20 to-transparent pointer-events-none"></div>
      </div>
      <div className="flex gap-5 w-full items-center">
        <button className="text-base font-normal text-gray-300 py-2 px-6 rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 border border-gray-600 hover:border-gray-500 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Upload New Video</button>
        <button className="text-base font-normal text-gray-300 py-2 px-6 rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 border border-gray-600 hover:border-gray-500 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Delete</button>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-1 w-full">
          <p className="text-lg font-normal text-neutral-400">Heading</p>
          <div tabIndex={0} className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
            {
              editHeading ? 
              (
                <input type="text" className="w-full text-white bg-transparent outline-none" value={heading} onChange={(e) => setHeading(e.target.value)}/>
              ) 
              : 
              (
                <p className="w-full text-white">{heading}</p>
              )
            }
            <Pencil onClick={() => setEditHeading(true)} className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300" />
          </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <p className="text-lg font-normal text-neutral-400">Description</p>
          <div tabIndex={0} className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
            {
              editDescription ? 
              (
                <input type="text" className="w-full text-white bg-transparent outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
              ) 
              : 
              (
                <p className="w-full text-white">{description}</p>
              )
            }
            <Pencil onClick={() => setEditDescription(true)} className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300"/>
          </div>
        </div>
        <button className="text-base w-40 font-normal text-gray-300 py-2 px-6 rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 border border-gray-600 hover:border-gray-500 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">SAVE</button>
      </div>
    </div>
  );
};

export default HeroSection;
