import React, { useEffect } from "react";
import { Row } from "./Layout";
import Main from "./Main";
import Aside from "./Aside";
import useNewAppState from "./useNewAppState";
import useKeyboardControls from "./useKeyboardControls";
import useFocusGrabber from "./useFocusGrabber";

export default function App() {
  const appState = useNewAppState();
  useKeyboardControls(appState);
  useFocusGrabber();

  useEffect(() => {
    document.body.tabIndex = 0;
  }, []);

  return (
    <React.StrictMode>
      <Row
        margin="0 auto"
        padding="var(--spacing)"
        width="100vw"
        maxWidth="1600px"
        gap="var(--spacing)"
      >
        <Main appState={appState} />
        <Aside appState={appState} />
      </Row>
    </React.StrictMode>
  );
}
