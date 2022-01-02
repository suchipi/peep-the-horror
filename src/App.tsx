import React, { useEffect } from "react";
import { Column, Row } from "./Layout";
import Main from "./Main";
import Aside from "./Aside";
import useNewAppState from "./useNewAppState";
import useKeyboardControls from "./useKeyboardControls";
import useFocusGrabber from "./useFocusGrabber";
import Title from "./Title";

export default function App() {
  const appState = useNewAppState();
  useKeyboardControls(appState);
  useFocusGrabber();

  useEffect(() => {
    document.body.tabIndex = 0;
  }, []);

  return (
    <React.StrictMode>
      <Column>
        <Title />
        <Row
          margin="0 auto"
          padding="var(--spacing)"
          width="100vw"
          maxWidth="1600px"
          gap="var(--spacing)"
          backgroundColor="var(--background-color)"
          borderRadius="var(--border-radius)"
        >
          <Main appState={appState} />
          <Aside appState={appState} />
        </Row>
      </Column>
    </React.StrictMode>
  );
}
