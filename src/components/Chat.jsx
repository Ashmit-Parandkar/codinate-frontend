import React, {useMemo} from "react";
import { FiPaperclip } from "react-icons/fi";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import MessageContainer from "../components/MessageContainer";
import { io } from "socket.io-client"; 

const Chat = (props) => {

  let isLoaded = true;


  
  // console.log("props.roomData : ",props.roomData)
  const socketChat = useMemo(() => io("http://localhost:8080"), []);
  // while(props === null){
    
    setTimeout(()=>{
      console.log("Props : ", props)
      console.log("completed....")
      socketChat.emit("addChatRoom", props.roomData.roomId);
    }, 5000)

  // }
  socketChat.on("sendChatMessage", ({ chatText, roomId, senderName, formattedTime }) => {
    // setMessages((messages) => [...messages,m])
    set
    console.log("Test : ",`${ chatText }`)
    console.log("message received")
  });
  // console.log(socketChat.id);

  const handleButtonClick = (e) =>{

    let chatText = document.getElementById("chat-input").value

    if(chatText){
      
    delete props.roomData.password
    props.roomData['text'] = chatText;
    fetch("http://127.0.0.1:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(props.roomData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Form submitted successfully:", data);
      // history.push("/code", { roomData: data });
      // props.setshowModal(false);
      // navigateTo(`/code/${data.room.roomId}`,{state:{roomId: data.room.roomId, password: data.room.password, senderName:data.room.members[data.room.members.length-1].name}})
      // Redirect to the code editor page
      //window.location.href = '/code'; // Replace '/code' with your actual code editor URL
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });

    const roomId = props.roomData.roomId
    const senderName = props.roomData.senderName
    const currentTime = new Date();


const timestamp = currentTime.getTime();
const formattedTime = new Date(timestamp).toLocaleString();


    socketChat.emit("chatMessage", {chatText, roomId, senderName, formattedTime});

  }
}

  return (
    <>
      <div className="w-[500px] h-[500px] m-1">
        <div className=" w-[500px] h-[500px] bg-cyan-200 rounded-lg pt-7">
        <MessageContainer name="John Doe" time="12:30 PM" message="Hello there!" isSent={true} />
        <MessageContainer name="Jane Doe" time="12:35 PM" message="Hi, how are you?" isSent={false} />
        </div>

        <div className="flex gap-4 mt-4">
        <FiPaperclip  className="text-2xl bg-white rounded-full p-2 w-10 h-10"/>
            <input type="text" placeholder="Message" id="chat-input" className=" p-2 rounded-lg outline-none focus:outline-none w-80" />
            <FiSend className="text-2xl bg-white rounded-full p-2 w-10 h-10" onClick={handleButtonClick}/>
            <FaMicrophone className="text-2xl bg-white rounded-full p-2 w-10 h-10"/>

        </div>
        
      </div>
    </>
  );
};

export default Chat;