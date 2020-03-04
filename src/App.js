import React, {memo, useEffect, useRef} from "react";
import { fromEvent, merge } from "rxjs";
import Button from './StyledButton';
import {
  mapTo,
  map,
  switchMap, exhaustMap, mergeMap, concatMap, mergeAll
} from "rxjs/operators";


function App({ threeNetworkRequests }) {
  const greenButton = useRef(null);
  const blueButton = useRef(null);

  // console.log(threeNetworkRequests("https://api.url").subscribe());

  useEffect(() => {
    const greenClicks$ = fromEvent(greenButton.current, "click");
    const blueClicks$ = fromEvent(blueButton.current, "click");

    const clicks$ = merge(
      greenClicks$.pipe(mapTo("https://api/green")),
      blueClicks$.pipe(mapTo("httpss://api/blue")),
    ).pipe(
      map(url => threeNetworkRequests(url)),
      mergeAll(),
    );

    const sub = clicks$.subscribe(value => console.log(value));
    return () => sub.unsubscribe();
  }, []);


  return (
    <>
      <button style={{ background: 'lightgreen' }} ref={greenButton}>Green</button>
      <button style={{ background: 'lightblue' }} ref={blueButton}>Blue</button>
    </>
  );
}


export default memo(App);
