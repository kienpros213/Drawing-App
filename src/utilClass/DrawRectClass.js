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
    console.log(this.snapshot);
    if (this.snapshot) {
      const ctx = this.canvasRef.current.getContext("2d");
      ctx.putImageData(this.snapshot, 0, 0);
    } else {
    }
    this.drawReceivedPoint(
      this.canvasRef,
      this.startPoint,
      event.clientX,
      event.clientY
    );
  }

  drawRectDown(event) {
    this.setIsDraw(true);
    this.setStartPoint(
      this.computePointInCanvas(this.canvasRef, event.clientX, event.clientY)
    );
  }

  drawRectUp() {
    this.setIsDraw(false);
  }

  drawReceivedPoint(canvasRef, startPoint, pointX, pointY) {
    this.setSnapshot(this.canvasRef);
    const ctx = canvasRef.current.getContext("2d");
    const nextPoint = this.computePointInCanvas(canvasRef, pointX, pointY);
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.strokeRect(
      startPoint.x,
      startPoint.y,
      nextPoint.x - startPoint.x,
      nextPoint.y - startPoint.y
    );
    ctx.fill();
  }

  setSnapshot(canvasRef) {
    const ctx = canvasRef.current.getContext("2d");
    this.snapshot = ctx.getImageData(0, 0, 700, 500);
  }

  computePointInCanvas(canvasRef, clientX, clientY) {
    if (canvasRef.current) {
      const boundingRect = canvasRef.current.getBoundingClientRect();
      return {
        x: clientX - boundingRect.left,
        y: clientY - boundingRect.top,
      };
    } else {
      return null;
    }
  }
}
