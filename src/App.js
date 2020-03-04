import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import Button from './StyledButton';
import {
  mapTo,
  map,
  switchMap, exhaustMap, mergeMap, concatMap, throttleTime, scan, filter
} from "rxjs/operators";


export default function App({ fetch }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    // This code runs when the component renders for the first time.
    const button = buttonRef.current;

    // Todo!

  }, []);

  return (
    <>
      <button ref={buttonRef}>Click to Refresh</button>
    </>
  );
}
