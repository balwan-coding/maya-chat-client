import React, {
  memo,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoImagesSharp } from "react-icons/io5";
import { connect, useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { Message } from "../types/dataTypes";
import { addMessage } from "../store/slices/messagesSlice";
import type { State } from "../store/store";
import EmojiPicker from "emoji-picker-react";
import Button from "../shared/Button";
import Input from "../shared/Input";
import socket from "../services/socket";

interface SendMsgBoxProps {
  addMessage: (msg: Message) => void;
}

const SendMsgBox: React.FC<SendMsgBoxProps> = ({ addMessage }) => {
  const [sendMsg, setSendMsg] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [opneMediaBox, setOpenMediaBox] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const user = useSelector((state: State) => state.auth.user);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server:", socket.id);
    });

    socket.on("message", (data: Message) => {
      console.log("Received:", data);
      addMessage(data);
    });

    return () => {
      socket.off("connect");
      socket.off("message");
    };
  }, [addMessage]);

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log("hello msg");
    setIsEmojiOpen(false);

    if (sendMsg.trim() === "" && image == null) return;

    const userId = user?.id as string;

    console.log("user id 1.0", user, userId, user?.id);

    if (!userId) {
      return;
    }

    console.log("user Id", userId);

    const newMsg: Message = {
      senderId: "69535e8d04fd1cb998a55eb0",
      text: sendMsg,
      messageType: "image",
      chatId: "695c103b8ac76bf84d17813d",
    };

    socket.emit("message", newMsg);
    addMessage(newMsg);

    setSendMsg("");
    setImage(null);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        console.log("image url", base64String);
        console.log(base64String);
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
    setImage(e.target.value);
  };

  const insertEmojiAtCursor = (word: string) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart ?? 0;
    const end = input.selectionEnd ?? 0;
    console.log(start, end);

    const newText = sendMsg.slice(0, start) + word + sendMsg.slice(end);

    console.log(newText);

    setSendMsg(newText);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(start + word.length, start + word.length);
    }, 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-[5%_80%_5%_10%] h-[7%] bg-gray-400"
    >
      <div>
        <button
          className="cursor-pointer w-full h-full text-4xl flex items-center justify-center"
          type="button"
          onClick={() => setIsEmojiOpen(!isEmojiOpen)}
        >
          <RiEmojiStickerLine className="text-gray-700" />
        </button>
        <div className="absolute bottom-12 left-10 z-50">
          <EmojiPicker
            open={isEmojiOpen}
            onEmojiClick={(v) => {
              insertEmojiAtCursor(v.emoji);
            }}
          />
        </div>
      </div>
      <Input
        inputRef={inputRef}
        type="text"
        value={sendMsg}
        className="bg-gray-400 rounded-l w-full h-full"
        onChange={(e) => {
          setSendMsg(e.target.value);
          setIsEmojiOpen(false);
        }}
        containerClass="w-full h-full"
      />

      <div className="w-full p-2 cursor-pointer h-full overflow-hidden">
        <motion.div
          layout
          data-expanded={opneMediaBox}
          initial={{ borderRadius: 10 }}
          className="absolute invisible bottom-12 right-10 bg-black p-2 data-[expanded=true]:visible data-[expanded=true]:w-[200px] data-[expanded=true]:h-[200px] z-50"
        >
          {image ? (
            <div className="w-6 h-6">
              <img src={image} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-6 h-6">
              <IoImagesSharp className="w-full h-full text-gray-700" />
            </div>
          )}
          <Input
            type="file"
            className="bg-transparent  h-full cursor-pointer w-full rounded-[100%] text-transparent"
            onChange={handleImage}
            containerClass="w-full top-0 z-50 absolute"
            placeholder="add your images"
          />
        </motion.div>

        <button
          onClick={() => setOpenMediaBox(!opneMediaBox)}
          className="cursor-pointer"
          type="button"
        >
          <IoImagesSharp className="text-3xl text-gray-700" />
        </button>
      </div>

      <Button className="bg-sky-400 h-full" type="primary">
        send
      </Button>
    </form>
  );
};

const mapDispatchToProps = {
  addMessage,
};

export default connect(null, mapDispatchToProps)(memo(SendMsgBox));
