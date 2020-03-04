import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import Button from './StyledButton';
import {
  mapTo,
  map,
  switchMap, exhaustMap, mergeMap, concatMap, throttleTime, scan, filter
} from "rxjs/operators";


export default function App({ fetch }) {
  const button = useRef(null);

  useEffect(() => {
    const click$ = fromEvent(button.current, 'click')
      .pipe(
        throttleTime(1500),
      );
    const sub = click$.subscribe(
      () => fetch('https://api/something')
    );
    return () => sub.unsubscribe();
  }, []);


  return (
    <>
      <button ref={button}>Click to Refresh</button>
    </>
  );
}
