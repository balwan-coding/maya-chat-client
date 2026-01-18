import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IoChatbubbleEllipses } from "react-icons/io5";
import PanenList from "./PanenList";
import ChataBox from "./ChataBox";
import SendMsgBox from "./SendMsgBox";
import { useDispatch, useSelector } from "react-redux";
import { loadeChats } from "../store/slices/chatSlice";
import type { State } from "../store/store";
import CurrentUser from "./CurrentUser";
import Slider from "./Slider";

interface ChataBoxPropes {}

const ChataHome: React.FC<ChataBoxPropes> = () => {
  const dispatch = useDispatch();
  const palnenList = useRef(null);
  const user = useSelector((state: State) => state.auth.user);
  useEffect(() => {
    dispatch(loadeChats({ userId: user?.id }));
  }, []);
  return (
    <>
      {" "}
      <div className="h-[calc(100vh-40px)] md:grid md:grid-cols-[30%_70%]">
        <div ref={palnenList} className="bg-gray-700 h-full relative">
          <motion.div
            drag
            dragElastic={0.1}
            dragConstraints={palnenList}
            whileDrag={{ cursor: "grabbing" }}
            className="absolute text-sky-400 text-5xl z-50 bottom-10  right-2"
            onClick={() => {}}
          >
            <IoChatbubbleEllipses />
          </motion.div>
          <Slider />
          <PanenList />
        </div>
        <div className="flex h-[calc(100vh-40px)] flex-col lg:block md:hidden relative border-l-2 border-gray-500">
          <CurrentUser />
          <ChataBox />
          <SendMsgBox />
        </div>
      </div>
    </>
  );
};

export default memo(ChataHome);
