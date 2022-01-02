import React from "react";
import AppState from "./AppState";
import { Column } from "./Layout";
import Button from "./Button";
import MarkedTimeRow from "./MarkedTimeRow";

export default function Aside({ appState }: { appState: AppState }) {
  const { data, controls } = appState;

  return (
    <Column tagName="aside" flexBasis="33%" overflowY="auto">
      {/* This is here so that the "Remove All" button is vertically aligned with the "Video URL" input field in Main. */}
      <label aria-hidden="true" style={{ opacity: "0" }}>
        hidden text
      </label>
      {data.markedTimes.length > 0 ? (
        <Button
          className="secondary"
          onClick={controls.clearMarkedTimes}
          marginBottom="var(--spacing)"
        >
          Remove All Saved Times (-)
        </Button>
      ) : null}
      {data.markedTimes.map((_, index) => (
        <React.Fragment key={index}>
          <MarkedTimeRow appState={appState} index={index} />
        </React.Fragment>
      ))}
    </Column>
  );
}
