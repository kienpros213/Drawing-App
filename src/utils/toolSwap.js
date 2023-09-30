export function toolSwap(tool, isDraw, DrawRect, DrawBrush) {
  let mouseMove, mouseDown, mouseUp;

  if (tool == "rectTool") {
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
  }
  if (tool == "brushTool") {
    mouseMove = (event) => {
      DrawBrush.brushMouseMove(event);
    };
    mouseDown = () => {
      DrawBrush.brushMouseDown();
    };
    mouseUp = () => {
      DrawBrush.brushMouseUp();
    };
  }

  return { mouseMove, mouseDown, mouseUp };
}
