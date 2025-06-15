import React from "react";

const LiveDemo = () => {
  return (
    <div className="bg-black w-full h-full min-h-[500px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 py-20 lg:px-0 px-5 md:px-10">
        <h4 className="text-5xl md:text-6xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">Live Demo</h4>
        <div className="p-1 cursor-pointer rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex-shrink-0 w-full aspect-video max-h-[600px]">
          <div className="w-full h-full bg-black rounded-xl overflow-hidden">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/0JW3CiOV-kY" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen title="Live Demo Video"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
