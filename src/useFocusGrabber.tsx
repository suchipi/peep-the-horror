import { useEffect } from "react";

export default function useFocusGrabber() {
  useEffect(() => {
    setInterval(() => {
      if (
        document.activeElement &&
        document.activeElement.tagName === "IFRAME"
      ) {
        // TODO: this absolutely sucks if you're using tab to navigate through the document
        console.log("Refocusing away from iframe...");
        document.body.focus();
      }
    }, 100);
  }, []);
}
