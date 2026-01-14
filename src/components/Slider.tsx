import { memo } from "react";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiGroupFill } from "react-icons/ri";
import { IoCallSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
//import Logo from "../assets/logo.png";

type SliderProps = {};

const Slider: React.FC<SliderProps> = () => {
  return (
    <div className="bg-black w-10 pt-12 flex flex-col items-center justify-between h-full pb-10 ">
      <div className="mx-auto p-2.5">
        <ul className="flex flex-col gap-5">
          <li className="relative group">
            <Link to="/allUsers" className="text-white text-2xl text-center">
              <HiChatBubbleBottomCenterText />
            </Link>
            <div className="w-17 absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
              New Chat
              <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
            </div>
          </li>

          <li className="relative group">
            <Link to="/allUsers" className="text-white text-2xl text-center">
              <RiGroupFill />
            </Link>
            <div className="absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
              Groups
              <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
            </div>
          </li>

          <li className="relative group">
            <Link to="/allUsers" className="text-white text-2xl text-center">
              <AiOutlineGlobal />
            </Link>
            <div className="w-17 absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
              Today Fills
              <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
            </div>
          </li>

          <li className="relative group">
            <Link to="/allUsers" className="text-white text-2xl text-center">
              <IoCallSharp />
            </Link>
            <div className="absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
              Calls
              <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
            </div>
          </li>
        </ul>
      </div>
      <div className="text-white text-2xl cursor-pointer">
        <IoSettings />
      </div>
    </div>
  );
};

export default memo(Slider);
