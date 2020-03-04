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

    const lines$ = pointerDown$.pipe(
      tap(event => ctx.moveTo(event.x, event.y)),
      switchMap(event => pointerMove$.pipe(
        takeUntil(pointerUp$)
      ))
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
