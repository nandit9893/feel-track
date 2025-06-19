import { ChevronsRight, Pencil } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CTA = ({ ctaData, aboutPlanData }) => {
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [aboutEditPlanData, setEditAboutPlanData] = useState({
    heading: {
      firstSubHeading: "",
      secondSubHeading: "",
    },
    button: {
      title: "",
      subheading: "",
    },
    description: "",
    descriptionPoints: [],
  });
  const [editData, setEditData] = useState(false);

  const handleFirstSubHeadingChange = (e) => {
    setEditAboutPlanData((prev) => ({
      ...prev,
      heading: {
        ...prev.heading,
        firstSubHeading: e.target.value,
      },
    }));
  };

  const handleSecondSubHeadingChange = (e) => {
    setEditAboutPlanData((prev) => ({
      ...prev,
      heading: {
        ...prev.heading,
        secondSubHeading: e.target.value,
      },
    }));
  };

  const handleDescriptionChange = (e) => {
    setEditAboutPlanData((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleDescriptionPointChange = (index, value) => {
    const updatedPoints = [...aboutEditPlanData.descriptionPoints];
    updatedPoints[index].title = value;
    setEditAboutPlanData((prev) => ({
      ...prev,
      descriptionPoints: updatedPoints,
    }));
  };

  const handleButtonHeadingChange = (e) => {
    setEditAboutPlanData((prev) => ({
      ...prev,
      button: {
        ...prev.button,
        title: e.target.value,
      },
    }));
  };

  const handleButtonSubHeadingChange = (e) => {
    setEditAboutPlanData((prev) => ({
      ...prev,
      button: {
        ...prev.button,
        subheading: e.target.value,
      },
    }));
  };

  const updateData = async () => {};

  useEffect(() => {
    if (ctaData && aboutPlanData) {
      setDescription(ctaData?.description || "");
      setEditAboutPlanData({
        heading: {
          firstSubHeading: aboutPlanData?.heading?.firstSubHeading || "",
          secondSubHeading: aboutPlanData?.heading?.secondSubHeading || "",
        },
        button: {
          title: aboutPlanData?.button?.title || "",
          subheading: aboutPlanData?.button?.subheading || "",
        },
        descriptionPoints: aboutPlanData?.descriptionPoints || [],
        description: aboutPlanData?.description || "",
      });
    }
  }, [ctaData, aboutPlanData]);

  return (
    <div id="cta" className="w-full bg-neutral-900 h-full p-10 flex flex-col gap-5">
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">CTA</h4>
      </div>
      <div className="flex flex-col gap-1 w-xl">
        <p className="text-lg font-normal text-neutral-400">Heading</p>
        <div tabIndex={0} className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-2 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300">
          {
            editDescription ? 
            (
              <textarea disabled={!editDescription} rows="3" className="w-full text-white bg-transparent outline-none" value={description} onChange={(e) => setDescription(e.target.value)} />
            ) 
            : 
            (
              <p className="w-full text-white text-base">{description}</p>
            )
          }
          <Pencil onClick={() => setEditDescription((prev) => !prev)} className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300"/>
        </div>
      </div>
      <div className="w-2xl">
        <Image src={ctaData?.imageURL} alt={ctaData?.description} width={500} height={500} className="w-60 h-60 rounded-xl" priority unoptimized quality={100} />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-center gap-5 w-full">
          <input type="text" value={aboutEditPlanData?.heading?.firstSubHeading} disabled={!editData} onChange={handleFirstSubHeadingChange} className={`bg-neutral-800 w-full ${ editData ? "border-gray-400" : "border-transparent" } border rounded-md text-white px-3 py-2 outline-none`} />
          <input type="text" value={aboutEditPlanData?.heading?.secondSubHeading} disabled={!editData} onChange={handleSecondSubHeadingChange} className={`bg-neutral-800 w-full ${ editData ? "border-gray-400" : "border-transparent" } border rounded-md text-white px-3 py-2 outline-none`} />
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-base font-normal text-gray-400">Description</p>
            <textarea rows="4" value={aboutEditPlanData?.description} disabled={!editData} onChange={handleDescriptionChange} className={`bg-neutral-800 w-full ${   editData ? "border-gray-400" : "border-transparent" } border rounded-md text-white px-3 py-2 outline-none`} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-base font-normal text-gray-400">Description Points</p>
            {
              aboutEditPlanData?.descriptionPoints?.map((point, index) => (
                <input key={index} type="text" value={point?.title} disabled={!editData} onChange={(e) => handleDescriptionPointChange(index, e.target.value)} className={`bg-neutral-800 w-full ${ editData ? "border-gray-400" : "border-transparent"} border rounded-md text-white px-3 py-2 outline-none`} />
              ))
            }
          </div>
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-base font-normal text-gray-400">Button Title</p>
            <input type="text" value={aboutEditPlanData?.button?.title} disabled={!editData} onChange={handleButtonHeadingChange} className={`bg-neutral-800 w-full ${ editData ? "border-gray-400" : "border-transparent" } border rounded-md text-white px-3 py-2 outline-none`} />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p className="text-base font-normal text-gray-400">Button Subheading</p>
            <input type="text" value={aboutEditPlanData?.button?.subheading} disabled={!editData} onChange={handleButtonSubHeadingChange} className={`bg-neutral-800 w-full ${ editData ? "border-gray-400" : "border-transparent" } border rounded-md text-white px-3 py-2 outline-none`} />
          </div>
        </div>
        <div className="flex gap-5 w-full items-center">
          {
            editData ? 
            (
              <button onClick={updateData} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Save</button>
            )   
            : 
            (
              <button onClick={() => setEditData(true)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Edit</button>
            )
          }
          {
            editData ? 
            (
              <button onClick={() => setEditData(false)} className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Cancel</button>
            )   
            : 
            (
              <button className="text-base cursor-pointer bg-neutral-700 hover:bg-neutral-600 transition-colors duration-300 text-gray-200 border border-gray-500 rounded-md px-4 py-1 font-normal">Delete</button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CTA;
