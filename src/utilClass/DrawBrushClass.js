import { brushDraw, computePointInCanvas } from "../utils/drawFunction";

export class DrawBrushClass {
  constructor(canvasRef, isDraw, setIsDraw) {
    this.canvasRef = canvasRef;
    this.isDraw = isDraw;
    this.setIsDraw = setIsDraw;
  }

  brushMouseMove(event) {
    if (this.isDraw) {
      const point = computePointInCanvas(
        this.canvasRef,
        event.clientX,
        event.clientY
      );
      brushDraw(this.canvasRef, point);
    }
  }

  brushMouseDown() {
    this.setIsDraw(true);
  }

  brushMouseUp() {
    this.setIsDraw(false);
  }
}
