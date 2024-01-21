import React, { useRef, useEffect } from "react";
import templateImg from "../template/template.png";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const img = new Image();
    img.src = { templateImg };
    const context = canvas.getContext("2d");
    console.log("ctx ", context);
    //Our first draw
    context.fillStyle = "#fff";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  }, []);

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
