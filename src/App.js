import React, { useEffect, useRef } from "react";
import { fromEvent, merge } from "rxjs";
import Button from './StyledButton';
import {
  mapTo,
  map,
  switchMap, exhaustMap, mergeMap, concatMap
} from "rxjs/operators";


export default function App({ threeNetworkRequests }) {
  const greenButton = useRef(null);
  const blueButton = useRef(null);


  useEffect(() => {
    const greenClicks$ = fromEvent(greenButton.current, "click");
    const blueClicks$ = fromEvent(blueButton.current, "click");

    const clicks$ = merge(
      greenClicks$.pipe(mapTo("https://api/green")),
      blueClicks$.pipe(mapTo("httpss://api/blue")),
    ).pipe(
      map(url => threeNetworkRequests(url).subscribe())
    );

    const sub = clicks$.subscribe();
    return () => sub.unsubscribe();
  }, []);


  return (
    <>
      <button style={{ background: 'lightgreen' }} ref={greenButton}>Green</button>
      <button style={{ background: 'lightblue' }} ref={blueButton}>Blue</button>
    </>
  );
}
