import { useRef, useEffect, useState } from "react";

export function useOnDraw(socket, roomName, isDrawingRef) {

    const canvasRef = useRef(null);
    // const isDrawingRef = useRef(false);
    console.log("hook", isDrawingRef)

    //set canvas reference
    function setCanvasRef(ref) {
        if (!ref) return;
        canvasRef.current = ref;
        // initMouseMoveListener();
        // initMouseDownListener();
        // initMouseUpListener();
        setCurrentState();
    }

    //draw canvas current state
    if (socket) {
        socket.on("draw", (point) => {
            drawReceivedPoint(point);
        })
    }

    //draw
    function drawReceivedPoint(point) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.fillStyle = "#FF0000"; // You can use a different color for received points
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }

    //draw when move
    function initMouseMoveListener() {
        const mouseMoveListener = (e) => {
            if (drawStatus && socket) {
                console.log("init", isDrawingRef)
                const point = computePointInCanvas(e.clientX, e.clientY);
                if (socket) {
                    socket.emit("draw", { point, roomName })
                    // console.log({ point, roomName })
                    drawReceivedPoint(point);
                }
            }
        }
        window.addEventListener("mousemove", mouseMoveListener)
    }

    //start draw on mouse down
    // function initMouseDownListener() {
    //     if (!canvasRef.current) return
    //     const listener = () => {
    //         isDrawingRef.current = true;
    //     }
    //     canvasRef.current.addEventListener("mousedown", listener)
    // }

    //stop draw on mouse up
    // function initMouseUpListener() {
    //     const listener = () => {
    //         isDrawingRef.current = false;
    //     }
    //     canvasRef.current.addEventListener("mouseup", listener)
    // }

    //compute point in canvas
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

    //set current canvas state
    function setCurrentState() {
        if (socket) {
            socket.on("drawState", (drawState) => {
                for (let i = 0; i < drawState.length; i++) {
                    console.log(drawState[i]);
                    drawReceivedPoint(drawState[i]);
                }
            })
        }
    }

    return setCanvasRef

};