import { useRef, useEffect, useState } from "react";

export function useOnDraw(onDraw, socket){
    
    const canvasRef = useRef(null);
    const isDrawingRef = useRef(false);    

    //set canvas reference
    function setCanvasRef(ref){
        if(!ref) return;
        canvasRef.current = ref;
        initMouseMoveListener();
        initMouseDownListener();
        initMouseUpListener();
    }

    function initMouseMoveListener(){
        const mouseMoveListener = (e) => {
            if(isDrawingRef.current && socket){
                const point = computePointInCanvas(e.clientX, e.clientY);
                const ctx = canvasRef.current.getContext('2d');
                if(onDraw) onDraw(ctx, point);
                console.log(point);
                console.log(socket)
                if(socket){
                    socket.emit("client", point)
                }
            }
        }
        window.addEventListener("mousemove", mouseMoveListener)
    }

    function initMouseDownListener(){
        if(!canvasRef.current) return
        const listener = () => {
            isDrawingRef.current = true;
        }
        canvasRef.current.addEventListener("mousedown", listener)
    }

    function initMouseUpListener(){
        const listener = () => {
            isDrawingRef.current = false;
        }
        canvasRef.current.addEventListener("mouseup", listener)
    }

    function computePointInCanvas(clientX, clientY){
        if(canvasRef.current){
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

    return setCanvasRef

};