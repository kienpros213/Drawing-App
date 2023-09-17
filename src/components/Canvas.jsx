import { useState, useEffect } from "react";
import { useOnDraw } from "./Hooks";
import { io } from "socket.io-client";

const Canvas = ({width, height}) => {
    
    const [socket, setSocket] = useState(null)
    
    useEffect( () => {
        const initSocket = io('http://localhost:3030/')
        setSocket(initSocket)
    },[])

    const setCanvasRef = useOnDraw(onDraw, socket);


    function onDraw(ctx, point){
        ctx.fillStyle = "#000000"
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function drawReceivedPoint(point) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "#FF0000"; // You can use a different color for received points
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
      }

    return(
        <canvas
            width = {width}
            height = {height}
            style = {canvasStyle}
            ref = {setCanvasRef}
        />
    )
}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}