import React from "react";
import "./spin.css";
import {FiLoader, FiCheck, FiX} from "react-icons/all";

const stateIcons = {
  loading: <FiLoader className="spin" />,
  complete: <FiCheck />,
  cancelled: <FiX />
};

function getStyle(url) {
  if (url.includes("green"))
    return {
      background: "lightgreen"
    };
  else if (url.includes("blue"))
    return {
      background: "lightblue"
    };
}

function Request({ state, url }) {
  return (
    <tr style={getStyle(url)}>
      <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{url}</td>
      <td style={{ textAlign: 'center' }}>{stateIcons[state]}</td>
    </tr>
  );
}

export default function ShowNetworkRequests({ requests }) {
  return (
    <table style={{ textAlign: 'center', marginTop: '50px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'center' }}>URL</th>
          <th style={{ textAlign: 'center' }}>State</th>
        </tr>
      </thead>
      <tbody>
        {requests.map(r => (
          <Request key={r.id} state={r.state} url={r.url} />
        ))}
      </tbody>
    </table>
  );
}
