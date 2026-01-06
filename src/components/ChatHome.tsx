import { memo, useRef } from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import PanenList from "./PanenList";
import ChataBox from "./ChataBox";
import SendMsgBox from "./SendMsgBox";
import { useNavigate } from "react-router-dom";

interface ChataBoxPropes {}

const ChataHome: React.FC<ChataBoxPropes> = () => {
  const nevigate = useNavigate();
  const palnenList = useRef(null);
  return (
    <>
      {" "}
      <div className="h-[calc(100vh-60px)] grid grid-cols-[30%_70%]">
        <div
          ref={palnenList}
          className="bg-gray-700 h-full relative overflow-y-scroll"
        >
          <motion.div
            drag
            dragElastic={0.1}
            dragConstraints={palnenList}
            whileDrag={{ cursor: "grabbing" }}
            className="absolute text-sky-400 text-5xl z-50 bottom-10  right-2"
            onClick={() => nevigate("/allChats")}
          >
            <IoChatbubbleEllipses />
          </motion.div>
          <PanenList />
        </div>
        <div className="flex flex-col relative border-l-2 border-gray-500">
          <ChataBox />
          <SendMsgBox />
        </div>
      </div>
    </>
  );
};

export default memo(ChataHome);
