import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import {
  takeUntil,
  map,
  withLatestFrom,
  filter,
  tap,
  switchMap,
  mapTo, scan
} from "rxjs/operators";

export default function Sketchpad() {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Setup our Canvas for drawing.
    const ctx = canvasRef.current.getContext("2d");
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.imageSmoothingEnabled = true;

    // Streams of each event.
    const pointerDown$ = fromEvent(canvasRef.current, "pointerdown");
    const pointerMove$ = fromEvent(canvasRef.current, "pointermove");
    const pointerUp$ = fromEvent(canvasRef.current, "pointerup");

    // Stream of points in a single unbroken line.
    const oneLinePoints$ = () => pointerMove$.pipe(
      takeUntil(pointerUp$)
    );

    // Side effect: move to a point without drawing a line.
    const moveWithoutDrawing = ({ x, y }) => ctx.moveTo(x, y);

    // Draw each line.
    const lines$ = pointerDown$.pipe(
      tap(moveWithoutDrawing),
      switchMap(oneLinePoints$)
    ).subscribe(event => {
        ctx.lineTo(event.x, event.y);
        ctx.stroke();
      });

    return () => lines$.unsubscribe();
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
