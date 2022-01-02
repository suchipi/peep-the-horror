import { useEffect } from "react";

export default function useFocusGrabber() {
  useEffect(() => {
    setInterval(() => {
      if (
        document.activeElement &&
        document.activeElement.tagName === "IFRAME"
      ) {
        console.log("Refocusing away from iframe...");
        document.body.focus();
      }
    }, 100);
  }, []);
}
