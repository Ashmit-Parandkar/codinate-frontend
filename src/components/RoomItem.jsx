import React from 'react'
import Button from './Button';

const RoomItem = (props) => {
  return (
      <div className="flex w-[90%] m-auto bg-[#404040] gap-10 text-white shadow-md shadow-cyan-300 text-[20px] h-[60px] justify-between p-7 items-center">
        <span className=" font-thin text-md">
          {props.roomid}
        </span>
        <span className="flex font-thin text-md">
          {props.roomname}
        </span>
        <button className='bg-white text-black rounded-full w-[100px] h-12 text-sm'> Join Now</button>
      </div>
  )
}

export default RoomItem;