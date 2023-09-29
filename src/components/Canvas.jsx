import { useRef, useState } from "react";
import { drawRectDown, drawRectMove, drawRectUp } from "../utils/DrawRect";
import { mouseMoveListener } from "../utils/MouseMoveListener";

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

  let mouseMove, mouseDown, mouseUp;

  if (props.tool) {
    mouseMove = drawRectMove(canvasRef, startPoint, isDraw);
    mouseDown = drawRectDown(canvasRef, setIsDraw, setStartPoint);
    mouseUp = drawRectUp(setIsDraw);
  } else {
    mouseMove = mouseMoveListener(roomName, canvasRef, isDraw, props.socket);
    mouseDown = () => {
      setIsDraw(true);
    };
    mouseUp = () => {
      setIsDraw(false);
    };
  }

  return (
    <>
      <canvas
        onMouseMove={mouseMove}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
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
