export function mouseMoveListener(roomName, canvasRef, isDraw, socket) {
  const onMouseMove = (e) => {
    if (isDraw && socket) {
      const point = computePointInCanvas(canvasRef, e.clientX, e.clientY);
      if (socket) {
        socket.emit("draw", { point, roomName });
        drawReceivedPoint(canvasRef, point);
      }
    }
  };
  return onMouseMove;
}

export function drawReceivedPoint(canvasRef, point) {
  const ctx = canvasRef.current.getContext("2d");
  ctx.fillStyle = "#FF0000";
  ctx.beginPath();
  ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
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
