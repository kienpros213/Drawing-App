import { useRef, useState } from "react";
import { drawRectDown, drawRectMove, drawRectUp } from "../utils/DrawRect";
import { mouseMoveListener } from "../utils/MouseMoveListener";
import { DrawRectClass } from "../utilClass/DrawRectClass";

function Canvas(props) {
  const roomName = props.roomName;
  const canvasRef = useRef(null);
  const [isDraw, setIsDraw] = useState(false);
  const [startPoint, setStartPoint] = useState();
  const DrawRect = new DrawRectClass(
    canvasRef,
    startPoint,
    isDraw,
    setIsDraw,
    setStartPoint
  );
  let mouseMove, mouseDown, mouseUp;

  //setup canvasRef
  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  //draw recieved point from server
  if (props.socket) {
    props.socket.on("draw", (point) => {
      drawReceivedPoint(canvasRef, point);
    });
  }

  if (props.tool) {
    mouseMove = (event) => {
      if (isDraw) {
        DrawRect.drawRectMove(event);
      }
    };
    mouseDown = (event) => {
      DrawRect.drawRectDown(event);
    };
    mouseUp = () => {
      DrawRect.drawRectUp();
    };
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
}

export default Canvas;

const canvasStyle = {
  border: "1px solid black",
};
