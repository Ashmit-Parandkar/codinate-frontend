import React from "react";
import { FiPaperclip } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import MessageContainer from "../components/MessageContainer";


const Chat = () => {
  return (
    <>
      <div className="w-[500px] h-[500px] m-1">
        <div className=" w-[500px] h-[500px] bg-cyan-200 rounded-lg pt-7">
        <MessageContainer name="John Doe" time="12:30 PM" message="Hello there!" isSent={true} />
        <MessageContainer name="Jane Doe" time="12:35 PM" message="Hi, how are you?" isSent={false} />
        </div>

        <div className="flex gap-4 mt-4">
        <FiPaperclip  className="text-2xl bg-white rounded-full p-2 w-10 h-10"/>
            <input type="text" placeholder="Message" className=" p-2 rounded-lg outline-none focus:outline-none w-80" />
            <FiSend className="text-2xl bg-white rounded-full p-2 w-10 h-10" />
            <FaMicrophone className="text-2xl bg-white rounded-full p-2 w-10 h-10"/>

        </div>
        
      </div>
    </>
  );
};

export default Chat;