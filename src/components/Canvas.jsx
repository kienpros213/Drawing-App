import { useRef, useState } from "react";
import { DrawBrushClass } from "../utilClass/DrawBrushClass";
import { DrawRectClass } from "../utilClass/DrawRectClass";
import { toolSwap } from "../utils/toolSwap";

function Canvas(props) {
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
  const DrawBrush = new DrawBrushClass(canvasRef, isDraw, setIsDraw);

  function setCanvasRef(ref) {
    if (!ref) return;
    canvasRef.current = ref;
  }

  const { mouseMove, mouseDown, mouseUp } = toolSwap(
    props.tool,
    isDraw,
    DrawRect,
    DrawBrush
  );

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
