import React, { useEffect, useState } from "react";
import { ChevronsRight, Pencil } from "lucide-react";
import Image from "next/image";

const Features = ({ featuresData }) => {
  const [editHeading, setEditHeading] = useState(false);
  const [heading, setHeading] = useState("");
  const [features, setFeatures] = useState([]);
  const [featureBeingEdited, setFeatureBeingEdited] = useState(null);

  const handleStepChange = (index, field, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };
    setFeatures(updatedFeatures);
  };

  const updateItem = async () => {

  };

  useEffect(() => {
    if (featuresData) {
      setHeading(featuresData?.heading || "");
      const editedSteps = featuresData?.features;
      setFeatures(editedSteps);
    }
  }, [featuresData]);

  return (
    <div id="feature" className="w-full bg-neutral-900 h-full p-10 flex flex-col gap-5">
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">Featues</h4>
      </div>
      <div className="flex flex-col gap-1 w-60">
        <p className="text-lg font-normal text-neutral-400">Heading</p>
        <div tabIndex={0} className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-2 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
          {
            editHeading ? 
            (          
              <input type="text" className="w-full text-white bg-transparent outline-none" value={heading} onChange={(e) => setHeading(e.target.value)} />
            ) 
            : 
            (
              <p className="w-full text-white text-base">{heading}</p>
            )
          }
          <Pencil onClick={() => setEditHeading(true)} className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300" />
        </div>
      </div>
      <div className="grid grid-cols-2 w-full gap-16 h-full">
        {
          features?.map((feature, index) => (
            <div className="flex flex-col gap-5 w-full border border-neutral-600 rounded-md p-4" key={feature?._id}>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base font-normal text-gray-300">Title</p>
                  <input disabled={featureBeingEdited !== feature?._id} onChange={(e) => handleStepChange(index, "title", e.target.value)} type="text" className={`bg-neutral-800 w-full ${featureBeingEdited === feature?._id ? "border-gray-400" : "border-transparent"} border rounded-md text-white px-3 py-2 outline-none`} value={feature?.title} />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="text-base font-normal text-gray-300">Description</p>
                  <textarea disabled={featureBeingEdited !== feature?._id} onChange={(e) => handleStepChange(index, "description", e.target.value)} rows="3" type="text" className={`bg-neutral-800 w-full ${featureBeingEdited === feature?._id ? "border-gray-400" : "border-transparent"} border rounded-md text-white px-3 py-2 outline-none`} value={feature?.description} />
                </div>
              </div>
              <Image src={feature?.imageURL} alt={feature?.title} width={500} height={500} className="w-60 h-60 rounded-xl" priority unoptimized quality={100} />
              <div className="flex gap-5 w-full items-center">
                {
                  featureBeingEdited === feature?._id ?
                  (
                    <button onClick={updateItem} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Save</button>
                  )
                  :
                  (
                    <button onClick={() => setFeatureBeingEdited(feature?._id)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Edit</button>
                  )
                }
                {
                  featureBeingEdited === feature?._id ?
                  (
                    <button onClick={()=>setFeatureBeingEdited(null)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Cancel</button>
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

export default Features;
