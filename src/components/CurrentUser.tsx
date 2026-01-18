import { memo } from "react";
import Avtar from "../assets/avtar.jpg";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import type { State } from "../store/store";

type CurrentUserProps = {};

const CurrentUser: React.FC<CurrentUserProps> = () => {
  const currentUserId = useSelector(
    (state: State) => state.users.currentUserId
  );
  const users = useSelector((state: State) => state.users.entities);

  if (!currentUserId) {
    return;
  }

  return (
    <div className="h-16 w-full bg-gray-900  border-gray-400 py-1 px-2 hover:bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className="
               h-12 w-12  rounded-full border-2"
          >
            <img
              className="rounded-full h-full w-full object-cover"

              
              src={users[currentUserId]?.profilePhoto || Avtar}
              alt=""
            />
          </div>
          <p className="text-white">{users[currentUserId]?.name}</p>
        </div>
        <div className="text-white text-xl cursor-pointer">
          <HiDotsVertical />
        </div>
      </div>
    </div>
  );
};

export default memo(CurrentUser);
