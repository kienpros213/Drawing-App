import { useOnDraw } from "./Hooks";

const Canvas = (props) => {

    const setCanvasRef = useOnDraw(props.socket);

    return (
        <>
            <canvas
                width={props.width}
                height={props.height}
                style={canvasStyle}
                ref={setCanvasRef}
            />
        </>
    );
};

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
};