import { useRef, useState } from "react";
import { drawRectDown, drawRectMove, drawRectUp } from "../utils/DrawRect";

const Canvas = (props) => {
  const roomName = props.roomName;
  const [isDraw, setIsDraw] = useState(false);
  const canvasRef = useRef(null);
  const [startPoint, setStartPoint] = useState();

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  if (props.socket) {
    props.socket.on("draw", (point) => {
      drawReceivedPoint(canvasRef, point);
    });
  }

  return (
    <>
      <canvas
        onMouseMove={drawRectMove(canvasRef, startPoint, isDraw)}
        onMouseDown={drawRectDown(canvasRef, setIsDraw, setStartPoint)}
        onMouseUp={drawRectUp(setIsDraw)}
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
  border: "1px solid black",
};
