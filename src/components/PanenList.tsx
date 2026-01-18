import React, { memo } from "react";
import Avtar from "../assets/avtar.jpg";
import { useDispatch, useSelector } from "react-redux";
//import { usersSelectors } from "../store/selectors/usersSelectors";
import type { State } from "../store/store";
import { setCrrChat } from "../store/slices/chatSlice";
import { chatSelectors } from "../store/selectors/slectotors";
import socket from "../services/socket";
import { setCurrentUserId } from "../store/slices/usersSlice";

interface PanenListProps {}

const PanenList: React.FC<PanenListProps> = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: State) => state.users.entities);
  const user = useSelector((state: State) => state.auth.user);
  const chats = useSelector(chatSelectors.selectAll);

  const setCurrentChat = (_id: string, userId: string) => {
    dispatch(setCrrChat(_id));
    dispatch(setCurrentUserId(userId));
    socket.emit("join_room", _id);
  };

  return (
    <div className="overflow-hidden">
      {chats?.map((v) => {
        console.log("the ids", v, v?.members, v?.members);
        const id = user?.id == v?.members[0] ? v?.members[1] : v?.members[0];
        return (
          <div
            key={id}
            className="w-full text-white pl-12 h-16 flex gap-2 lowercase cursor-pointer border-b-2 border-gray-400 py-1 px-2 hover:bg-gray-600"
            onClick={() => setCurrentChat(v._id, id)}
          >
            <div
              className={`${
                v.isOnlie ? "border-green-400" : "border-sky-500"
              }  h-full w-[52px]  rounded-full border-2  relative`}
            >
              <img
                className="rounded-full h-full w-full object-cover"
                src={users[id]?.profilePhoto || Avtar}
                alt=""
              />

              {users[id]?.isOnlie && (
                <span className="absolute bottom-0 right-0 flex size-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex size-3 rounded-full bg-green-500"></span>
                </span>
              )}
            </div>
            <p>{users[id]?.name}</p>
          </div>
        );
      })}
    </div>
  );
};

export default memo(PanenList);
