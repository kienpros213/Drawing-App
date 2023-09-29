function Room(props) {
  function joinRoom() {
    const room = document.getElementsByClassName("room")[0].value;
    props.setRoomName(room);
    props.socket.emit("joinRequest", room);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          console.log(props.roomName);
        }}
      >
        {" "}
        check Room{" "}
      </button>
      <input type="text" className="room" placeholder="room"></input>
      <button type="button" onClick={joinRoom}>
        {" "}
        Join Room{" "}
      </button>
      <div>
        <button type="button"> brush </button>
        <button type="button"> rect </button>
      </div>
    </>
  );
}

export default Room;
