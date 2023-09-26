function Room(props) {


    function joinRoom() {
        const roomName = document.getElementsByClassName("room")[0].value
        props.socket.emit("joinRequest", roomName);
    }

    return (
        <>
            <input type="text" className="room" placeholder="room"></input>
            <button type="button" onClick={joinRoom}> Join Room </button>
        </>
    )
}

export default Room;