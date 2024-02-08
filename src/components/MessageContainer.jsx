import React from "react";

const MessageContainer = ({ name, time, message, isSent }) => {
  return (
    <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} m-4`}>
      <div className={`max-w-[70%] p-4 rounded-lg ${isSent ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
        <div className="font-bold">{name}</div>
        <div className="text-sm text-gray-500">{time}</div>
        <div>{message}</div>
      </div>
    </div>
  );
};

export default MessageContainer;
