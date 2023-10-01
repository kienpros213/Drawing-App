//brush tool
export function brushDraw(canvasRef, point) {
  const ctx = canvasRef.current.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}

//rect tool
export function rectDraw(canvasRef, startPoint, pointX, pointY) {
  const ctx = canvasRef.current.getContext("2d");
  const nextPoint = computePointInCanvas(canvasRef, pointX, pointY);
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

//circle tool
export function circleDraw(canvasRef, startPoint, pointX, pointY) {
  const ctx = canvasRef.current.getContext("2d");
  const nextPoint = computePointInCanvas(canvasRef, pointX, pointY);
  const radius = Math.sqrt(
    Math.pow(startPoint.x - nextPoint.x, 2) +
      Math.pow(startPoint.y - nextPoint.y, 2)
  );
  ctx.strokeStyle = "#FF0000"; // Set the stroke color
  ctx.lineWidth = 2; // You can adjust the line width as needed
  ctx.beginPath();
  ctx.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
  ctx.stroke(); // Use stroke() to draw the circle outline
}
//re-compute point
export function computePointInCanvas(canvasRef, clientX, clientY) {
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

//set snapshot
export function setSnapshot(canvasRef) {
  const ctx = canvasRef.current.getContext("2d");
  const snapshot = ctx.getImageData(0, 0, 700, 500);
  return snapshot;
}
