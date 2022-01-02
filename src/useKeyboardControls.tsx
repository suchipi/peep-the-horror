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
    case key === " ": {
      key = "Spacebar";
      break;
    }

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

  const combo = description + key;
  description = combo + " (" + event.type + ")";

  return { description, combo, key, type: event.type };
}

const lastStates = {};

export default function useKeyboardControls(appState: AppState) {
  useEffect(() => {
    const { data, controls } = appState;

    const listener = (event: KeyboardEvent) => {
      const { description, combo, key, type } = parseEvent(event);

      // ignore repeated keydowns
      if (lastStates[combo] === type) return;
      lastStates[combo] = type;

      if (
        document.activeElement &&
        document.activeElement.tagName === "INPUT" &&
        !(
          key === "Spacebar" ||
          key === "K" ||
          description === "Alt ArrowLeft (keydown)" ||
          description === "Alt ArrowRight (keydown)" ||
          description.startsWith("Alt ArrowDown")
        )
      ) {
        return;
      }

      let eventHandled = true;

      switch (description) {
        // Pause
        case "/ (keydown)":
        case "Ctrl / (keydown)":
        case "Ctrl Shift / (keydown)":
        case "Ctrl Shift Alt / (keydown)": {
          controls.setIsPlaying(false);
          break;
        }

        // Mark new time and add to list
        case "+ (keydown)":
        case "= (keydown)":
        case "Shift + (keydown)":
        case "Alt + (keydown)":
        case "Shift Alt + (keydown)": {
          controls.addMarkedTime(data.currentTime);
          break;
        }

        // Scrub to marked time and play
        case "1 (keydown)":
        case "2 (keydown)":
        case "3 (keydown)":
        case "4 (keydown)":
        case "5 (keydown)":
        case "6 (keydown)":
        case "7 (keydown)":
        case "8 (keydown)":
        case "9 (keydown)":
        case "Shift 1 (keydown)":
        case "Shift 2 (keydown)":
        case "Shift 3 (keydown)":
        case "Shift 4 (keydown)":
        case "Shift 5 (keydown)":
        case "Shift 6 (keydown)":
        case "Shift 7 (keydown)":
        case "Shift 8 (keydown)":
        case "Shift 9 (keydown)": {
          const index = parseInt(key) - 1;

          let time = data.markedTimes[index];
          if (time != null) {
            controls.setCurrentTime(time);
            controls.setIsPlaying(true);
          }
          break;
        }

        // Stop playing on key release if holding alt
        case "Shift 1 (keyup)":
        case "Shift 2 (keyup)":
        case "Shift 3 (keyup)":
        case "Shift 4 (keyup)":
        case "Shift 5 (keyup)":
        case "Shift 6 (keyup)":
        case "Shift 7 (keyup)":
        case "Shift 8 (keyup)":
        case "Shift 9 (keyup)": {
          controls.setIsPlaying(false);
          break;
        }

        // Remove all marked times
        case "Alt - (keydown)":
        case "Alt _ (keydown)": {
          controls.clearMarkedTimes();
          break;
        }

        // Jump ahead 5 seconds
        case "Shift ArrowLeft (keydown)": {
          controls.setCurrentTime(data.currentTime - 5);
          break;
        }

        // Jump back 5 seconds
        case "Shift ArrowRight (keydown)": {
          controls.setCurrentTime(data.currentTime + 5);
          break;
        }

        // Scrub back 1 second; on YouTube, this is 5 seconds, but I chose to move that to Shift ArrowLeft
        case "ArrowLeft (keydown)": {
          controls.setCurrentTime(data.currentTime - 1);
          break;
        }

        // Scrub ahead 1 second; on YouTube, this is 5 seconds, but I chose to move that to Shift ArrowRight
        case "ArrowRight (keydown)": {
          controls.setCurrentTime(data.currentTime + 1);
          break;
        }

        // Scrub back 0.016 seconds (similar to YouTube keybind)
        case "< (keydown)":
        case ", (keydown)":
        case "Alt ArrowLeft (keydown)": {
          controls.setCurrentTime(data.currentTime - 0.016);
          controls.syncCurrentTimeInput();
          break;
        }

        // Scrub ahead 0.016 seconds (similar to YouTube keybind)
        case "> (keydown)":
        case ". (keydown)":
        case "Alt ArrowRight (keydown)": {
          controls.setCurrentTime(data.currentTime + 0.016);
          controls.syncCurrentTimeInput();
          break;
        }

        // Play/pause. Spacebar and K are from YouTube
        case "0 (keydown)":
        case "Ctrl 0 (keydown)":
        case "Ctrl Alt 0 (keydown)":
        case "Ctrl Shift 0 (keydown)":
        case "Ctrl Shift Alt 0 (keydown)":
        case "Spacebar (keydown)":
        case "K (keydown)": {
          controls.setIsPlaying(!data.isPlaying);
          controls.syncCurrentTimeInput();
          break;
        }

        // Jump back 10 seconds (YouTube keybind)
        case "J (keydown)": {
          controls.setCurrentTime(data.currentTime - 10);
          break;
        }

        // Jump ahead 10 seconds (YouTube keybind)
        case "L (keydown)": {
          controls.setCurrentTime(data.currentTime + 10);
          break;
        }

        // TODO YouTube keybinds:
        // - Arrow Up and Down for volume
        // - F toggle fullscreen
        // - M toggle mute
        // - C toggle captions

        case "Alt ArrowDown (keyup)":
        case "Alt ArrowDown (keydown)": {
          controls.syncCurrentTimeInput();

          if (type === "keydown") {
            controls.startPeeping();
          } else if (type === "keyup") {
            controls.stopPeeping();
          }

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
    window.addEventListener("keyup", listener);
    return () => {
      window.removeEventListener("keydown", listener);
      window.removeEventListener("keyup", listener);
    };
  }, [appState]);
}
