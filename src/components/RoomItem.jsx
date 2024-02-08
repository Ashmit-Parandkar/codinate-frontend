import React from 'react'

const RoomItem = (props) => {
  return (
      <div class="card my-4 join-card">
        <span class="card-body card-room-id">
          {props.roomid}
        </span>
        <span class="card-body card-room-name">
          {props.roomname}
        </span>
        <button type="button" class="btn btn-primary join-room-button">Join Room</button>
      </div>
  )
}

export default RoomItem
