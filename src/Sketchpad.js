import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import {
  takeUntil,
  map,
  withLatestFrom,
  filter,
  tap,
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

    // Move to the new location without drawing a line, each time we put the pointer down.
    const subscription = pointerDown$.subscribe(event => ctx.moveTo(event.x, event.y));

    // Stream: is the pointer down or not?
    const isDown$ = merge(
      pointerDown$.pipe(mapTo(true)),
      pointerUp$.pipe(mapTo(false))
    );

    const lines$ = pointerMove$
      .pipe(
        withLatestFrom(isDown$),
        filter(([, isDown]) => isDown),
        map(([ev]) => ev),
      )
      .subscribe(event => {
        ctx.lineTo(event.x, event.y);
        ctx.stroke();
      });

    subscription.add(lines$);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <canvas
      style={{ touchAction: "none", background: "black" }}
      width={window.clientWidth || 1920}
      height={window.clientHeight || 1080}
      ref={canvasRef}
    />
  );
}
