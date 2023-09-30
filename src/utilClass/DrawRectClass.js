import {
  rectDraw,
  computePointInCanvas,
  setSnapshot,
} from "../utils/drawFunction";

export class DrawRectClass {
  constructor(canvasRef, startPoint, isDraw, setIsDraw, setStartPoint) {
    this.snapshot;
    this.canvasRef = canvasRef;
    this.startPoint = startPoint;
    this.isDraw = isDraw;
    this.setIsDraw = setIsDraw;
    this.setStartPoint = setStartPoint;
  }
  drawRectMove(event) {
    if (this.snapshot) {
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.putImageData(this.snapshot, 0, 0);
    } else {
    }
    this.snapshot = setSnapshot(this.canvasRef);
    rectDraw(this.canvasRef, this.startPoint, event.clientX, event.clientY);
  }

  drawRectDown(event) {
    this.setIsDraw(true);
    this.setStartPoint(
      computePointInCanvas(this.canvasRef, event.clientX, event.clientY)
    );
  }

  drawRectUp() {
    this.setIsDraw(false);
  }
}
