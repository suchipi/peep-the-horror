import React from "react";
import AppState from "./AppState";
import { Row, Column } from "./Layout";
import Button from "./Button";

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
          backgroundColor="var(--del-color)"
          onClick={controls.clearMarkedTimes}
          marginBottom="var(--spacing)"
        >
          Remove All (-)
        </Button>
      ) : null}
      {data.markedTimes.map((time, index, all) => (
        <React.Fragment key={index}>
          <Row
            gap="0.5em"
            marginBottom={index === all - 1 ? "" : "var(--spacing)"}
          >
            <Button
              flexBasis="100%"
              onClick={() => {
                controls.setCurrentTime(time);
                controls.setIsPlaying(true);
              }}
            >
              Play {time.toFixed(3)} ({index + 1})
            </Button>
            <Column flexBasis="0%" gap="0.5em">
              <Button
                onClick={() => {
                  controls.updateMarkedTimeAtIndex(index, data.currentTime);
                }}
              >
                Update{index < 9 ? ` (Shift+${index + 1})` : ""}
              </Button>
              <Button
                backgroundColor="var(--del-color)"
                onClick={() => {
                  controls.removeMarkedTimeAtIndex(index);
                }}
              >
                Remove{index < 9 ? ` (Ctrl+${index + 1})` : ""}
              </Button>
            </Column>
          </Row>
        </React.Fragment>
      ))}
    </Column>
  );
}
