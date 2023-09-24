import { useRef, useEffect, useState } from "react";

export function useOnDraw(socket) {

    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);

    //set canvas reference
    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
        setCurrentState();
    }

    if (socket) {
        socket.on("client", (point) => {
            drawReceivedPoint(point);
        })
    }

    function drawReceivedPoint(point) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "#FF0000"; // You can use a different color for received points
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    function initMouseMoveListener() {
        const mouseMoveListener = (e) => {
            if (isDrawingRef.current && socket) {
                const point = computePointInCanvas(e.clientX, e.clientY);
                console.log(point);
                if (socket) {
                    socket.emit("client", point)
                    drawReceivedPoint(point);
                }
            }
        }
        window.addEventListener("mousemove", mouseMoveListener)
    }

    function initMouseDownListener() {
        if (!canvasRef.current) return
        const listener = () => {
            isDrawingRef.current = true;
        }
        canvasRef.current.addEventListener("mousedown", listener)
    }

    function initMouseUpListener() {
        const listener = () => {
            isDrawingRef.current = false;
        }
        canvasRef.current.addEventListener("mouseup", listener)
    }

    function computePointInCanvas(clientX, clientY) {
        if (canvasRef.current) {
            const boundingRect = canvasRef.current.getBoundingClientRect();
            return {
                x: clientX - boundingRect.left,
                y: clientY - boundingRect.top
            }
        }
        else {
            return null;
        }
    }

    function setCurrentState() {
        if (socket) {
            socket.on("drawState", (drawState) => {
                // console.log(drawState);
                for (let i = 0; i < drawState.length; i++) {
                    console.log(drawState[i]);
                    drawReceivedPoint(drawState[i]);
                }
            })
        }
    }

    return setCanvasRef

};