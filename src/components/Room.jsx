function Room(props) {
  function joinRoom() {
    const room = document.getElementsByClassName("room")[0].value;
    props.setRoomName(room);
    props.socket.emit("joinRequest", room);
  }

  function setFalse() {
    const setFalse = props.setTool(false);
  }

  function setTrue() {
    const setTrue = props.setTool(true);
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
        <button type="button" onClick={setFalse}>
          {" "}
          brush{" "}
        </button>
        <button type="button" onClick={setTrue}>
          {" "}
          rect{" "}
        </button>
        <button
          type="button"
          onClick={() => {
            console.log(props.tool);
          }}
        >
          {" "}
          check{" "}
        </button>
      </div>
    </>
  );
}

export default Room;
