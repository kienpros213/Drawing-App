import { useRef, useState } from "react";
import { mouseMoveListener } from "../utils/mouseMoveListener";
import { drawReceivedPoint } from "../utils/mouseMoveListener";

const Canvas = (props) => {
  const roomName = props.roomName;
  const [isDrawRef, setIsDrawingRef] = useState(false);
  const canvasRef = useRef(null);

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
        onMouseMove={mouseMoveListener(
          roomName,
          canvasRef,
          isDrawRef,
          props.socket
        )}
        onMouseDown={() => {
          setIsDrawingRef(true);
        }}
        onMouseUp={() => {
          setIsDrawingRef(false);
        }}
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
