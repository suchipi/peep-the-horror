import React from "react";
import AppState from "./AppState";
import { Row, Spacer } from "./Layout";
import Button from "./Button";
import Box from "react-boxxy";

export default function MarkedTimeRow({
  appState,
  index,
}: {
  appState: AppState;
  index: number;
}) {
  const { data, controls } = appState;

  const time = data.markedTimes[index];

  return (
    <Row
      gap="0.5em"
      marginBottom={
        index === data.markedTimes.length - 1 ? "" : "var(--spacing)"
      }
    >
      <Box
        border="1px solid var(--primary)"
        borderRadius="var(--border-radius)"
        paddingLeft="var(--spacing)"
        width="100%"
      >
        <Row alignItems="center" justifyContent="space-between">
          <Row
            tagName="span"
            alignItems="center"
            marginRight="var(--spacing)"
            flexShrink="0"
            fontSize={24}
          >
            <Box
              background="var(--icon-time)"
              backgroundRepeat="no-repeat"
              width={24}
              height={24}
            ></Box>
            <Spacer value="calc(var(--spacing) / 2)" />
            {time.toFixed(3)}
          </Row>
          <Row fontSize={18}>
            <Button
              padding="2px 0"
              borderRadius="0"
              border="none"
              onClick={() => {
                controls.setCurrentTime(time);
                controls.setIsPlaying(true);
              }}
            >
              Play ({index + 1})
            </Button>

            <Button
              contrast
              padding="2px 0"
              borderRadius="0"
              onClick={() => {
                controls.updateMarkedTimeAtIndex(index, data.currentTime);
              }}
            >
              Update{index < 9 ? ` (Shift+${index + 1})` : ""}
            </Button>

            <Button
              secondary
              padding="2px 0"
              borderRadius="0"
              onClick={() => {
                controls.removeMarkedTimeAtIndex(index);
              }}
            >
              Remove{index < 9 ? ` (Ctrl+${index + 1})` : ""}
            </Button>
          </Row>
        </Row>
      </Box>
    </Row>
  );
}
