import { useRef, useState } from "react";

const Canvas = (props) => {

    const roomName = props.roomName
    const [isDrawRef, setIsDrawingRef] = useState(false)
    const canvasRef = useRef(null);

    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
    }

    function computePointInCanvas(clientX, clientY) {
        if (canvasRef.current) {
            const boundingRect = canvasRef.current.getBoundingClientRect();
            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
        }
        else {
            return null;
        }
    }

    function drawReceivedPoint(point) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function mouseMoveListener(e) {
        if (isDrawRef && props.socket) {
            const point = computePointInCanvas(e.clientX, e.clientY);
            if (props.socket) {
                console.log({ point, roomName })
                props.socket.emit("draw", { point, roomName })
                drawReceivedPoint(point);
            }
        }
    }

    return (
        <>
            <canvas
                onMouseMove={mouseMoveListener}
                onMouseDown={() => { setIsDrawingRef(true) }}
                onMouseUp={() => { setIsDrawingRef(false) }}
                width={props.width}
                height={props.height}
                style={canvasStyle}
                ref={setCanvasRef}
            />
        </>
    );
};

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
};