import { ChevronsRight, Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";

const HowItWorks = ({ howHomeItWorksData }) => {
  const [editHeading, setEditHeading] = useState(false);
  const [heading, setHeading] = useState("");
  const [steps, setSteps] = useState([]);
  const [stepBeingEdited, setStepBeingEdited] = useState(null);

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };
    setSteps(updatedSteps);
  };

  const updateItem = async () => {

  };

  useEffect(() => {
    if (howHomeItWorksData) {
      setHeading(howHomeItWorksData?.heading || "");
      const editedSteps = howHomeItWorksData?.steps;
      setSteps(editedSteps);
    }
  }, [howHomeItWorksData]);

  return (
    <div id="homework" className="w-full bg-neutral-900 h-full p-10 flex flex-col gap-5">
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">How It Works?</h4>
      </div>
      <div className="flex flex-col gap-1 w-60">
        <p className="text-lg font-normal text-neutral-300">Heading</p>
        <div tabIndex={0} className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-neutral-800 p-2 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
          {
            editHeading ? 
            (
              <input type="text" className="w-full text-white bg-transparent outline-none" value={heading} onChange={(e) => setHeading(e.target.value)}/>
            ) 
            : 
            (
              <p className="w-full text-white text-base">{heading}</p>
            )
          }
          <Pencil onClick={() => setEditHeading(true)} className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300" />
        </div>
      </div>
      <p className="text-4xl leading-[60px] underline font-normal text-neutral-300">Steps</p>
      <div className="grid grid-cols-2 w-full gap-16 h-full">
        {
          steps?.map((step, index) => (
            <div className="flex flex-col gap-5 w-full border border-neutral-600 rounded-md p-4" key={step?._id}>
              <div className="border border-gray-300 bg-neutral-800 rounded-xl w-10 flex items-center justify-center h-10"> 
                <p className="text-lg font-semibold text-white">{index+1}</p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base font-normal text-gray-300">Heading</p>
                  <input disabled={stepBeingEdited !== step?._id} onChange={(e) => handleStepChange(index, "heading", e.target.value)} type="text" className={`bg-neutral-800 w-full ${stepBeingEdited === step?._id ? "border-gray-400" : "border-transparent"} border rounded-md text-white px-3 py-2 outline-none`} value={step?.heading} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base font-normal text-gray-300">Description</p>
                  <textarea disabled={stepBeingEdited !== step?._id} onChange={(e) => handleStepChange(index, "description", e.target.value)} rows="8" type="text" className={`bg-neutral-800 w-full border rounded-md ${stepBeingEdited === step?._id ? "border-gray-400" : "border-transparent"} text-white px-3 py-2 outline-none`} value={step?.description} />
                </div>
              </div>
              <div className="flex gap-5 w-full items-center">
                {
                  stepBeingEdited === step?._id ?
                  (
                    <button onClick={updateItem} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Save</button>
                  )
                  :
                  (
                    <button onClick={() => setStepBeingEdited(step?._id)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Edit</button>
                  )
                }
                {
                  stepBeingEdited === step?._id ?
                  (
                    <button onClick={()=>setStepBeingEdited(null)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Cancel</button>
                  )
                  :
                  (
                    <button className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Delete</button>
                  )
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default HowItWorks;
