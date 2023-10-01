function Room(props) {
  function joinRoom() {
    const room = document.getElementsByClassName("room")[0].value;
    props.setRoomName(room);
    props.socket.emit("joinRequest", room);
  }

  function setBrush() {
    const setFalse = props.setTool("brushTool");
  }

  function setRect() {
    const setTrue = props.setTool("rectTool");
  }

  function setCircle() {
    const setTrue = props.setTool("circleTool");
  }
  return (
    <>
      <button type="button" onClick={() => {}}>
        {" "}
        check Room{" "}
      </button>
      <input type="text" className="room" placeholder="room"></input>
      <button type="button" onClick={joinRoom}>
        {" "}
        Join Room{" "}
      </button>
      <div>
        <button type="button" onClick={setBrush}>
          {" "}
          brush{" "}
        </button>
        <button type="button" onClick={setRect}>
          {" "}
          rect{" "}
        </button>
        <button type="button" onClick={setCircle}>
          {" "}
          circle{" "}
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
