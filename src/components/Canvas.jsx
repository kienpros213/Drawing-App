import { useRef, useState } from "react";
import { toolFactory } from "../utils/toolFactory";

function Canvas(props) {
  const canvasRef = useRef(null);
  const [isDraw, setIsDraw] = useState(false);
  const [startPoint, setStartPoint] = useState();
  const [snapshot, setSnapshot] = useState();

  const toolHandler = new toolFactory(
    props.tool,
    canvasRef,
    isDraw,
    setIsDraw,
    setStartPoint,
    startPoint,
    snapshot,
    setSnapshot
  );

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  function clearCanvas() {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, 700, 500);
  }
  return (
    <>
      <button type="button" onClick={clearCanvas}>
        {" "}
        clear canvas{" "}
      </button>
      <canvas
        onMouseMove={(event) => {
          toolHandler.mouseMove(event);
        }}
        onMouseDown={(event) => {
          toolHandler.mouseDown(event);
        }}
        onMouseUp={(event) => {
          toolHandler.mouseUp(event);
        }}
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
