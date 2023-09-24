import { useState, useEffect } from "react";
import { useOnDraw } from "./Hooks";
import { io } from "socket.io-client";

const Canvas = ({ width, height }) => {

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        const initSocket = io('ws://localhost:3000')
        setSocket(initSocket)
    }, [])

    const setCanvasRef = useOnDraw(socket);

    return (
        <>
            <canvas
                width={width}
                height={height}
                style={canvasStyle}
                ref={setCanvasRef}
            />
        </>
    )
}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}