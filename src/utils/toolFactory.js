import { DrawBrushClass } from "../utilClass/DrawBrushClass";
import { DrawRectClass } from "../utilClass/DrawRectClass";
import { DrawCircleClass } from "../utilClass/DrawCircleClass";

export function toolFactory(
  tool,
  canvasRef,
  isDraw,
  setIsDraw,
  setStartPoint,
  startPoint,
  snapshot,
  setSnapshot
) {
  switch (tool) {
    case "rectTool":
      return new DrawRectClass(
        canvasRef,
        startPoint,
        isDraw,
        setIsDraw,
        setStartPoint,
        snapshot,
        setSnapshot
      );
    case "circleTool":
      return new DrawCircleClass(
        canvasRef,
        startPoint,
        isDraw,
        setIsDraw,
        setStartPoint,
        snapshot,
        setSnapshot
      );
    case "brushTool":
      return new DrawBrushClass(canvasRef, isDraw, setIsDraw);
  }
}
