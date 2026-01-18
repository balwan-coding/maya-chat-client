import { memo } from "react";

type NoMessageProps = {};

const NoMessage: React.FC<NoMessageProps> = () => {
  return (
    <div className="h-[93%] w-full flex justify-center items-start">
      <div className="bg-black rounded p-2 text-center w-96 mt-5">
        <strong className="text-green-500">Maya Chata</strong>
        <p className="text-white">
          Maya Talk brings you instant connectivity powered by cutting-edge
          technology. Enjoy lag-free messaging, secure chats, and a smooth user
          experience built for speed.
        </p>
      </div>
    </div>
  );
};

export default memo(NoMessage);
