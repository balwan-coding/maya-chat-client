import React, { memo, useEffect, useRef } from "react";
import { connect, useSelector } from "react-redux";
import type { Message } from "../types/dataTypes";
import type { State } from "../store/store";
import { getMessagesSelector } from "../store/selectors/messages";
import NoMessage from "./NoMessage";
interface ChatBoxProps {
  messages: Message[];
}
const ChataBox: React.FC<ChatBoxProps> = ({ messages }) => {
  const scroolRef = useRef<HTMLDivElement | null>(null);
  const user = useSelector((state: State) => state.auth.user);
  const currentUserId = useSelector(
    (state: State) => state.users.currentUserId,
  );

  useEffect(() => {
    if (scroolRef.current) {
      scroolRef.current.scrollTop = scroolRef.current.scrollHeight;
    }
  }, [messages]);

  if (!currentUserId) {
    return <NoMessage />;
  }

  return (
    <div
      ref={scroolRef}
      className="h-[calc(100vh-156px)] bg-gray-800 p-2 overflow-y-scroll"
    >
      <ul className="flex flex-col gap-2">
        {messages?.map((v: Message, i: number) => {
          const senderId = v.senderId;

          return senderId._id == user?.id ? (
            <div key={v._id} className="bg-blue-400 p-1 self-end">
              {v.media && (
                <div className="w-40 h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={v.media.url}
                    alt=""
                  />
                </div>
              )}
              <div key={`${v.text}${i}`}>{v.text}</div>
            </div>
          ) : (
            <div key={v._id} className="bg-gray-400 p-1 self-start">
              {v.media && (
                <div className="w-40 h-40">
                  <img
                    className="w-full h-full object-cover"
                    src={v.media.url}
                    alt=""
                  />
                </div>
              )}
              <div
                key={`${v.text}${i}`}
                className="bg-gray-400 p-1 self-start w-[100px] text-center"
              >
                {v.text}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProp = (state: State) => ({
  messages: getMessagesSelector(state),
});

export default connect(mapStateToProp)(memo(ChataBox));
