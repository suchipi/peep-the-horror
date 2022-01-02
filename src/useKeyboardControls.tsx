import { useEffect } from "react";
import AppState from "./AppState";

function parseEvent(event: KeyboardEvent) {
  let key = event.key;
  const ctrl = event.ctrlKey;
  const shift = event.shiftKey;
  const alt = event.altKey;
  const numpad = event.location === 3;

  let description = "";
  if (ctrl) {
    description = "Ctrl " + description;
  }
  if (shift) {
    description = "Shift " + description;
  }
  if (alt) {
    description = "Alt " + description;
  }

  switch (true) {
    case key === "0":
    case key === ")":
    case numpad && key === "Insert": {
      key = "0";
      break;
    }

    case key === ".":
    case key === ">":
    case numpad && key === "Delete": {
      key = ".";
      break;
    }

    case key === "+": {
      key = "+";
      break;
    }

    case key === "1":
    case key === "!":
    case numpad && key === "End": {
      key = "1";
      break;
    }

    case key === "2":
    case key === "@":
    case numpad && key === "ArrowDown": {
      key = "2";
      break;
    }

    case key === "3":
    case key === "#":
    case numpad && key === "PageDown": {
      key = "3";
      break;
    }

    case key === "4":
    case key === "$":
    case numpad && key === "ArrowLeft": {
      key = "4";
      break;
    }

    case key === "5":
    case key === "%":
    case numpad && key === "Unidentified": {
      key = "5";
      break;
    }

    case key === "6":
    case key === "^":
    case numpad && key === "ArrowRight": {
      key = "6";
      break;
    }

    case key === "7":
    case key === "&":
    case numpad && key === "Home": {
      key = "7";
      break;
    }

    case key === "8":
    case key === "*":
    case numpad && key === "ArrowUp": {
      key = "8";
      break;
    }

    case key === "9":
    case key === "(":
    case numpad && key === "PageUp": {
      key = "9";
      break;
    }

    case key.length === 1: {
      key = key.toUpperCase();
    }
  }

  description = description + key;

  return { description, key };
}

export default function useKeyboardControls(appState: AppState) {
  useEffect(() => {
    const { data, controls } = appState;

    const listener = (event: KeyboardEvent) => {
      const { description, key } = parseEvent(event);

      if (
        document.activeElement &&
        document.activeElement.tagName === "INPUT" &&
        !(
          key === " " ||
          key === "Spacebar" ||
          key === "K" ||
          description === "Alt ArrowLeft" ||
          description === "Alt ArrowRight" ||
          description === "Alt ArrowDown"
        )
      ) {
        return;
      }

      let eventHandled = true;

      switch (description) {
        // Pause
        case "/":
        case "Ctrl /":
        case "Ctrl Shift /":
        case "Ctrl Shift Alt /": {
          controls.setIsPlaying(false);
          break;
        }

        // Mark new time and add to list
        case "+":
        case "=":
        case "Shift +":
        case "Alt +":
        case "Shift Alt +": {
          controls.addMarkedTime(data.currentTime);
          break;
        }

        // Scrub to marked time and play
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "Alt 1":
        case "Alt 2":
        case "Alt 3":
        case "Alt 4":
        case "Alt 5":
        case "Alt 6":
        case "Alt 7":
        case "Alt 8":
        case "Alt 9": {
          const index = parseInt(key) - 1;

          let time = data.markedTimes[index];
          if (time != null) {
            controls.setCurrentTime(time);
            controls.setIsPlaying(true);
          }
          break;
        }

        // Update marked time
        case "Shift 1":
        case "Shift 2":
        case "Shift 3":
        case "Shift 4":
        case "Shift 5":
        case "Shift 6":
        case "Shift 7":
        case "Shift 8":
        case "Shift 9":
        case "Shift Alt 1":
        case "Shift Alt 2":
        case "Shift Alt 3":
        case "Shift Alt 4":
        case "Shift Alt 5":
        case "Shift Alt 6":
        case "Shift Alt 7":
        case "Shift Alt 8":
        case "Shift Alt 9": {
          const index = parseInt(key) - 1;

          let time = data.markedTimes[index];
          if (time != null) {
            controls.updateMarkedTimeAtIndex(index, data.currentTime);
          }
          break;
        }

        // Remove marked time
        case "Ctrl 1":
        case "Ctrl 2":
        case "Ctrl 3":
        case "Ctrl 4":
        case "Ctrl 5":
        case "Ctrl 6":
        case "Ctrl 7":
        case "Ctrl 8":
        case "Ctrl 9":
        case "Ctrl Alt 1":
        case "Ctrl Alt 2":
        case "Ctrl Alt 3":
        case "Ctrl Alt 4":
        case "Ctrl Alt 5":
        case "Ctrl Alt 6":
        case "Ctrl Alt 7":
        case "Ctrl Alt 8":
        case "Ctrl Alt 9": {
          const index = parseInt(key) - 1;

          let time = data.markedTimes[index];
          if (time != null) {
            controls.removeMarkedTimeAtIndex(index);
          }
          break;
        }

        // Remove all marked times
        case "-":
        case "_": {
          controls.clearMarkedTimes();
          break;
        }

        // Jump ahead 5 seconds
        case "Shift ArrowLeft": {
          controls.setCurrentTime(data.currentTime - 5);
          break;
        }

        // Jump back 5 seconds
        case "Shift ArrowRight": {
          controls.setCurrentTime(data.currentTime + 5);
          break;
        }

        // Scrub back 1 second; on YouTube, this is 5 seconds, but I chose to move that to Shift ArrowLeft
        case "ArrowLeft": {
          controls.setCurrentTime(data.currentTime - 1);
          break;
        }

        // Scrub ahead 1 second; on YouTube, this is 5 seconds, but I chose to move that to Shift ArrowRight
        case "ArrowRight": {
          controls.setCurrentTime(data.currentTime + 1);
          break;
        }

        // Scrub back 0.016 seconds (similar to YouTube keybind)
        case "<":
        case ",":
        case "Alt ArrowLeft": {
          controls.setCurrentTime(data.currentTime - 0.016);
          controls.syncCurrentTimeInput();
          break;
        }

        // Scrub ahead 0.016 seconds (similar to YouTube keybind)
        case ">":
        case ".":
        case "Alt ArrowRight": {
          controls.setCurrentTime(data.currentTime + 0.016);
          controls.syncCurrentTimeInput();
          break;
        }

        // Play/pause. Spacebar and K are from YouTube
        case "0":
        case "Ctrl 0":
        case "Ctrl Alt 0":
        case "Ctrl Shift 0":
        case "Ctrl Shift Alt 0":
        case " ":
        case "Spacebar":
        case "K": {
          controls.setIsPlaying(!data.isPlaying);
          controls.syncCurrentTimeInput();
          break;
        }

        // Jump back 10 seconds (YouTube keybind)
        case "J": {
          controls.setCurrentTime(data.currentTime - 10);
          break;
        }

        // Jump ahead 10 seconds (YouTube keybind)
        case "L": {
          controls.setCurrentTime(data.currentTime + 10);
          break;
        }

        // TODO YouTube keybinds:
        // - Arrow Up and Down for volume
        // - F toggle fullscreen
        // - M toggle mute
        // - C toggle captions

        case "Alt ArrowDown": {
          controls.syncCurrentTimeInput();
          controls.peepTheHorror(350);

          break;
        }

        default: {
          eventHandled = false;
        }
      }

      if (eventHandled) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [appState]);
}
