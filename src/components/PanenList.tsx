import React, { memo } from "react";
import Avtar from "../assets/avtar.jpg";
import { useSelector } from "react-redux";
import { usersSelectors } from "../store/selectors/usersSelectors";

interface PanenListProps {}

const PanenList: React.FC<PanenListProps> = () => {
  const users = useSelector(usersSelectors.selectAll);
  console.log("the users", users);

  return (
    <div className="overflow-hidden">
      {users.map((v) => {
        return (
          <div
            key={v._id}
            className="w-full text-white h-16 flex gap-2 lowercase cursor-pointer border-b-2 border-gray-400 py-1 px-2 hover:bg-gray-600"
          >
            <div
              className={`${
                v.isOnlie ? "border-green-400" : "border-sky-500"
              }  h-full w-[52px]  rounded-full border-2  relative`}
            >
              <img
                className="rounded-full h-full w-full object-cover"
                src={v.profilePic || Avtar}
                alt=""
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
  );
};

export default memo(PanenList);
