import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import {
  takeUntil,
  map,
  withLatestFrom,
  filter,
  switchMapTo,
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

    // Move to a point without drawing a line.
    const moveWithoutDrawing = ({ x, y }) => ctx.moveTo(x, y);

    // Draw a line to a point.
    const drawLineToPoint = ({x, y}) => {
      ctx.lineTo(x, y);
      ctx.stroke();
    };

    // Streams of each event.
    const pointerDown$ = fromEvent(canvasRef.current, "pointerdown");
    const pointerMove$ = fromEvent(canvasRef.current, "pointermove");
    const pointerUp$ = fromEvent(canvasRef.current, "pointerup");

    // Stream of points in an unbroken line.
    const singleLine$ = pointerMove$.pipe(

    );

    // Draw each line: first move to the start, then draw a line with the points.
    const lines$ = pointerDown$.pipe(
      tap(moveWithoutDrawing),
      switchMapTo(singleLine$),
      takeUntil(pointerUp$)
    ).subscribe(drawLineToPoint);

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
