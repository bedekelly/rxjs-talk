import React, { useState } from "react";
import App from "./App";
import { networkRequest, threeNetworkRequests } from "./networkRequest";
import ShowNetworkRequests from "./ShowNetworkRequests";

import "./normalize.css";
import "./skeleton.css";

export default function Wrapper() {
  const [requests, setRequests] = useState([]);

  const onStart = url => id =>
    setRequests(prevRequests =>
      prevRequests.concat({ id, url, state: "loading" })
    );
  const onComplete = id =>
    setRequests(prevRequests =>
      prevRequests.map(request => {
        if (request.id !== id) return request;
        return { ...request, state: "complete" };
      })
    );
  const onCancel = id =>
    setRequests(prevRequests =>
      prevRequests.map(request => {
        if (request.id !== id) return request;
        return { ...request, state: "cancelled" };
      })
    );

  const oneRequest = url =>
    networkRequest(url, onStart(url), onComplete, onCancel);
  const threeRequests = url =>
    threeNetworkRequests(url, onStart(url), onComplete, onCancel);

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', display: 'flex', flexDirection: 'column' }}>
      <App networkRequest={oneRequest} threeNetworkRequests={threeRequests} />
      <ShowNetworkRequests requests={requests} />
    </div>
  );
}
