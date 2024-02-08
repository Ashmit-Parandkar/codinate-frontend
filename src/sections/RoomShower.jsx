import React from 'react'
import RoomItem from '../components/RoomItem'



const RoomShower = () => {

    const roomid1 = "fzey34br";
    const roomid2 = "het2uj2f";
    const roomname1 = "Test room 1";
    const roomname2 = "Test room 2";
    
  return (
    <div id='view-rooms' className="m-12 border-2 border-black flex flex-col gap-7 bg-black rounded-lg shadow-xl shadow-cyan-300 py-7">
      <RoomItem roomid={roomid1} roomname={roomname1}/>
      <RoomItem roomid={roomid2} roomname={roomname2} />
      </div>
  )
}

export default RoomShower
