import { Menu, Home, Zap, DollarSign, ChevronDown, BookOpen } from "lucide-react";
import React from "react";

const Icons = { Home, BookOpen, Zap, DollarSign };

const SideBar = ({ pages, togglePages, currentPage, currentComponent, width, setWidth }) => {

  return (
    <div className="w-full h-full bg-neutral-900 p-5">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex justify-between w-full items-center">
            <p className="text-xl font-semibold text-white underline">Admin Panel</p>
            <div className="w-8 h-8 flex items-center cursor-pointer justify-center rounded-lg shadow-cyan-100 border border-gray-400 transition-colors duration-300 bg-transparent hover:bg-neutral-700">
                <Menu className="text-white w-5 h-5" />
            </div>
        </div>
        <div className="flex flex-col gap-1 w-full">
            {
                pages.map((item) => {
                    const IconComponent = Icons[item.icon];
                    return (
                        <div className={`flex flex-col gap-0.5 w-full rounded-md ${currentPage === item._id ? "border border-neutral-400" : "border border-transparent"} transition-all duration-300 cursor-pointer hover:bg-neutral-800`} key={item._id}>
                            <div onClick={()=>togglePages(item)} className="flex justify-between w-full items-center py-1 px-2">
                                <div className="flex gap-3 w-full items-center">
                                    <IconComponent className="text-white w-4 h-4" />
                                    <p className="text-base font-normal text-neutral-300">{item.title}</p>
                                </div>
                                <ChevronDown className={`dark:text-white text-black w-5 h-5 transition-transform duration-300 ${currentPage === item._id ? "rotate-180" : "" }`} />
                            </div>
                            <div className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${currentPage === item._id ? "h-full" : "h-0"}`}>
                              <div className="flex flex-col gap-0.5 w-full">
                                  {
                                      item.components.map((component) => (
                                          <div className={`flex flex-col w-full px-9 py-1 ${currentComponent === component._id ? "border border-neutral-400" : "border border-transparent"} transition-all duration-300 cursor-pointer hover:bg-neutral-900`} key={component._id}>
                                              <p className="text-sm font-normal text-neutral-300">{component.title}</p>
                                          </div>
                                      ))
                                  }
                              </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
      </div>
    </div>
  );
};

export default SideBar;
