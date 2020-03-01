import { Observable, concat } from "rxjs";
import { v4 as uuid } from "uuid";

export function networkRequest(url, onStart, onComplete, onCancel) {
  return makeNetworkRequest(url, onStart, onComplete, onCancel).subscribe();
}

export function makeNetworkRequest(url, onStart, onComplete, onError) {
  const id = uuid();
  return new Observable(subscriber => {
    onStart(id);
    let response = null;
    const timeout = setTimeout(() => {
      onComplete(id);
      response = "Response from " + url;
      subscriber.next(response);
      subscriber.complete();
    }, 750 + Math.random() * 750);
    return () => {
      clearTimeout(timeout);
      if (!response) onError(id);
    };
  });
}

export function threeNetworkRequests(url, onStart, onComplete, onError) {
  return concat(
    makeNetworkRequest(url, onStart, onComplete, onError),
    makeNetworkRequest(url, onStart, onComplete, onError),
    makeNetworkRequest(url, onStart, onComplete, onError)
  );
}
