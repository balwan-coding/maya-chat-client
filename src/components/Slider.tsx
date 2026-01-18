import { memo, useEffect } from "react";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { AiOutlineGlobal } from "react-icons/ai";
import { RiGroupFill } from "react-icons/ri";
import { IoCallSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { usersSelectors } from "../store/selectors/usersSelectors";
import { loadeUsers, setCurrentUserId } from "../store/slices/usersSlice";
import Avtar from "../assets/avtar.jpg";
import type { CreateChat } from "../types/dataTypes";
import type { State } from "../store/store";
import { createChatStart } from "../store/slices/chatSlice";
import { setIsOpen } from "../store/slices/uiSlice";

type SliderProps = {};

const Slider: React.FC<SliderProps> = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersSelectors.selectAll);
  const currentUser = useSelector((state: State) => state.auth.user);
  const isOpne = useSelector((state: State) => state.ui.isOpen);

  useEffect(() => {
    dispatch(loadeUsers());
  }, [isOpne]);

  const handleCreateChat = (data: CreateChat) => {
    dispatch(createChatStart(data));
    dispatch(setCurrentUserId(data.targetUserId));
    dispatch(setIsOpen(false));
  };

  return (
    <div
      className={`bg-black ${isOpne ? "w-full grid grid-cols-11" : "w-10"}
        h-full absolute z-50`}
    >
      <div className="flex pb-10  h-full flex-col items-center justify-between">
        <div className="pt-2.5 w-full ">
          <ul className="flex flex-col items-center gap-5 w-full">
            <li className="group">
              <button
                onClick={() => dispatch(setIsOpen(!isOpne))}
                className="text-white text-2xl text-center cursor-pointer"
              >
                <HiChatBubbleBottomCenterText />
              </button>
              <div className="w-17 absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                New Chat
                <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
              </div>
            </li>

            <li className="group">
              <Link to="/allUsers" className="text-white text-2xl text-center">
                <RiGroupFill />
              </Link>
              <div className="absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                Groups
                <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
              </div>
            </li>

            <li className="group">
              <Link to="/allUsers" className="text-white text-2xl text-center">
                <AiOutlineGlobal />
              </Link>
              <div className="w-17 absolute z-50 bottom-0 mb-1 left-6 translate-y-1/2 hidden group-hover:block  p-1 bg-gray-800 text-white text-xs rounded shadow-lg">
                Today Fills
                <div className="absolute bottom-0 left-6 translate-y-1/2 border border-transparent border-t-gray-800"></div>
              </div>
            </li>

            <li className="group">
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
        <div className="text-white flex items-center   w-full text-2xl cursor-pointer">
          <IoSettings />
        </div>
      </div>

      {isOpne && (
        <div
          className={`col-span-10  ${
            isOpne ? "w-full" : "w-0"
          }  bg-gray-900 transition-all delay-100 overflow-y-scroll`}
        >
          <div className="">
            <div>
              <button
                onClick={() => dispatch(setIsOpen(false))}
                className="text-white text-xl p-2 flex gap-2 items-center cursor-pointer"
              >
                <IoMdArrowRoundBack /> <span>Chats</span>
              </button>
            </div>
            <div>
              {users.map((v) => {
                return (
                  <div
                    key={v._id}
                    className="w-full text-white h-16 flex gap-2 lowercase cursor-pointer border-b-2 border-gray-400 py-1 px-2 hover:bg-gray-600"
                    onClick={() => {
                      if (currentUser?.id) {
                        handleCreateChat({
                          currentUserId: currentUser.id,
                          targetUserId: v._id,
                        });
                      }
                    }}
                  >
                    <div
                      className={`${
                        v.isOnlie ? "border-green-400" : "border-sky-500"
                      }  h-full w-[52px]  rounded-full border-2  relative`}
                    >
                      <img
                        className="rounded-full h-full w-full object-cover"
                        src={v.profilePhoto || Avtar}
                        alt={v.name}
                      />

                      {v.isOnlie && (
                        <span className="absolute bottom-0 right-0 flex size-3">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                        </span>
                      )}
                    </div>
                    <p>{v.userName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(Slider);
