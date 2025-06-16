import React, { useEffect, useState } from "react";
import { ChevronsRight, Pencil } from "lucide-react";

const Features = ({ featuresData }) => {
  const [editHeading, setEditHeading] = useState(false);
  const [heading, setHeading] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editedSteps, setEditedSteps] = useState({});

  const handleInputChange = (id, field, value) => {
    setEditedSteps((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    if (featuresData) {
      setHeading(featuresData?.heading || "");
      const initialSteps = {};
      featuresData?.features?.forEach((step) => {
        initialSteps[step._id] = {
          title: step.title,
          description: step.description,
        };
      });
      setEditedSteps(initialSteps);
    }
  }, [featuresData]);

  return (
    <div
      id="feature"
      className="w-full bg-neutral-800 h-full p-10 flex flex-col gap-5"
    >
      <div className="flex gap-1 w-full items-center">
        <h1 className="text-xl font-semibold text-neutral-300">Home</h1>
        <ChevronsRight className="text-white w-4 h-4" />
        <h4 className="text-base font-medium text-gray-300">Featues</h4>
      </div>
      <div className="flex flex-col gap-1 w-60">
        <p className="text-lg font-normal text-neutral-400">Heading</p>
        <div
          tabIndex={0}
          className="flex gap-2 w-full items-center border border-gray-600 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 p-4 shadow-inner outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
        >
          {editHeading ? (
            <input
              type="text"
              className="w-full text-white bg-transparent outline-none"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
            />
          ) : (
            <p className="w-full text-white">{heading}</p>
          )}
          <Pencil
            onClick={() => setEditHeading(true)}
            className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300"
          />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-5 h-full">
        {featuresData?.features?.map((item) => (
          <div
            className="w-full border border-gray-400 rounded-md p-4 flex flex-col gap-5"
            key={item?._id}
          >
            {editItem === item?._id ? (
              <div className="flex flex-col gap-2 w-full items-center">
                <input
                  type="text"
                  className="p-2 text-gray-300 border border-gray-500 rounded-md outline-none w-full"
                  value={editedSteps[item._id]?.title}
                  onChange={(e) =>
                    handleInputChange(item._id, "title", e.target.value)
                  }
                />
                <textarea
                  rows={4}
                  className="p-2 text-gray-300 border border-gray-500 rounded-md outline-none w-full resize-none overflow-hidden"
                  value={editedSteps[item._id]?.description}
                  onChange={(e) =>
                    handleInputChange(item._id, "description", e.target.value)
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full items-center">
                <p className="text-gray-300 text-lg font-normal">
                  {item?.title}
                </p>
                <p className="text-gray-400 text-base font-normal">
                  {item?.description}
                </p>
              </div>
            )}
            <div className="flex gap-4 w-full items-center">
              <button
                onClick={() => setEditItem(item?._id)}
                className="text-base w-40 font-normal text-gray-300 py-2 px-6 rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 border border-gray-600 hover:border-gray-500 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                EDIT
              </button>
              <button className="text-base w-40 font-normal text-gray-300 py-2 px-6 rounded-lg bg-gradient-to-r from-neutral-900 to-neutral-800 border border-gray-600 hover:border-gray-500 hover:from-neutral-800 hover:to-neutral-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                SAVE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
