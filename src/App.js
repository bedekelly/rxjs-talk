import React, {memo, useEffect, useRef} from "react";
import { fromEvent, merge } from "rxjs";
import Button from './StyledButton';
import {
  mapTo,
  map,
  switchMap, exhaustMap, mergeMap, concatMap, mergeAll
} from "rxjs/operators";


function App({ threeNetworkRequests }) {
  const greenButtonRef = useRef(null);
  const blueButtonRef = useRef(null);

  useEffect(() => {
    const greenButton = greenButtonRef.current;
    const blueButton = blueButtonRef.current;

    // Todo!

  }, []);


  return (
    <>
      <button style={{ background: 'lightgreen' }} ref={greenButtonRef}>Green</button>
      <button style={{ background: 'lightblue' }} ref={blueButtonRef}>Blue</button>
    </>
  );
}


export default memo(App);
