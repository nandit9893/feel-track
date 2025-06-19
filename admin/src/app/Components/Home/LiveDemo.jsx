import { ChevronsRight } from "lucide-react";
import React from "react";

const LiveDemo = () => {
  return (
    <div id="homelive" className="w-full bg-neutral-900 h-full p-10 flex flex-col gap-5">
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">Live Demo</h4>
      </div>
      <div className="flex flex-col gap-1 w-60">
        <p className="text-lg font-normal text-neutral-300">Heading</p>
        <div className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
          <p className="w-full text-white text-base">Live Demo</p>
        </div>
      </div>
      <div className="p-0.5 cursor-pointer rounded-xl bg-white flex-shrink-0 w-xl h-96">
        <div className="w-full h-full bg-black rounded-xl overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/0JW3CiOV-kY"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Live Demo Video"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
