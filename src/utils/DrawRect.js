let snapshot;

export function drawRectMove(canvasRef, startPoint, isDraw) {
  const drawRectMouseMove = (e) => {
    if (isDraw) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.putImageData(snapshot, 0, 0);
      drawReceivedPoint(canvasRef, startPoint, e.clientX, e.clientY);
    }
  };
  return drawRectMouseMove;
}

export function drawRectDown(canvasRef, setIsDraw, setStartPoint) {
  const drawRectMouseDown = (e) => {
    setIsDraw(true);
    setStartPoint(computePointInCanvas(canvasRef, e.clientX, e.clientY));
    const ctx = canvasRef.current.getContext("2d");
    snapshot = ctx.getImageData(0, 0, 700, 500);
  };
  return drawRectMouseDown;
}

export function drawRectUp(setIsDraw) {
  const drawRectMouseUp = () => {
    setIsDraw(false);
  };
  return drawRectMouseUp;
}

export function drawReceivedPoint(canvasRef, startPoint, pointX, pointY) {
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

function computePointInCanvas(canvasRef, clientX, clientY) {
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
