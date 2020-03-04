import React, { useEffect, useRef } from "react";
import {fromEvent} from "rxjs";
import {throttleTime} from "rxjs/operators";


export default function App({ fetch }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    // This code runs when the component renders for the first time.
    const button = buttonRef.current;

    // Todo!
    const clicks = fromEvent(button, 'click');

    const throttledClicks = clicks.pipe(
      throttleTime(1000)
    );

    clicks.subscribe(clickEvent => console.log(clickEvent));

    throttledClicks.subscribe(() => fetch("https://api.url"));

  }, []);

  return (
    <>
      <button ref={buttonRef}>Click to Refresh</button>
    </>
  );
}
