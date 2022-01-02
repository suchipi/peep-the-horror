import React from "react";
import AppState from "./AppState";
import { Row, Column } from "./Layout";
import Button from "./Button";

export default function Aside({ appState }: { appState: AppState }) {
  const { markedTimes, currentTime } = appState.data;
  const {
    setCurrentTime,
    setIsPlaying,
    updateMarkedTimeAtIndex,
    removeMarkedTimeAtIndex,
  } = appState.controls;

  return (
    <Column
      tagName="aside"
      gap="var(--spacing)"
      flexBasis="33%"
      maxHeight="100vh"
      overflowY="auto"
    >
      {markedTimes.map((time, index) => (
        <React.Fragment key={index}>
          <Row gap="0.5em">
            <Button
              flexBasis="100%"
              onClick={() => {
                setCurrentTime(time, true);
                setIsPlaying(true);
              }}
            >
              Play {time.toFixed(3)} ({index + 1})
            </Button>
            <Column flexBasis="0%" gap="0.5em">
              <Button
                onClick={() => {
                  updateMarkedTimeAtIndex(index, currentTime);
                }}
              >
                Update{index < 9 ? ` (Shift+${index + 1})` : ""}
              </Button>
              <Button
                backgroundColor="var(--del-color)"
                onClick={() => {
                  removeMarkedTimeAtIndex(index);
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
