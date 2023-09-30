import { rectDraw, computePointInCanvas } from "../utils/drawFunction";

export class DrawRectClass {
  constructor(
    canvasRef,
    startPoint,
    isDraw,
    setIsDraw,
    setStartPoint,
    snapshot,
    setSnapshot
  ) {
    this.snapshot = snapshot;
    this.setSnapshot = setSnapshot;
    this.canvasRef = canvasRef;
    this.startPoint = startPoint;
    this.isDraw = isDraw;
    this.setIsDraw = setIsDraw;
    this.setStartPoint = setStartPoint;
  }
  mouseMove(event) {
    const ctx = this.canvasRef.current.getContext("2d");
    if (this.isDraw && this.snapshot) {
      ctx.putImageData(this.snapshot, 0, 0);
      rectDraw(this.canvasRef, this.startPoint, event.clientX, event.clientY);
    }
  }

  mouseDown(event) {
    const ctx = this.canvasRef.current.getContext("2d");
    const snapshot = ctx.getImageData(0, 0, 700, 500);
    this.snapshot = this.setSnapshot(snapshot);
    this.setIsDraw(true);
    this.setStartPoint(
      computePointInCanvas(this.canvasRef, event.clientX, event.clientY)
    );
  }

  mouseUp() {
    this.setIsDraw(false);
  }
}
