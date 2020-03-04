import React, { useEffect, useRef } from "react";

export default function Sketchpad() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;

    // Todo!

  }, []);

  return (
    <canvas
      style={{ touchAction: "none", background: "black" }}
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef}
    />
  );
}
