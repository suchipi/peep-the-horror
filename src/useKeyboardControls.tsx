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
    const listener = (event: KeyboardEvent) => {
      let eventHandled = true;

      const { description, key } = parseEvent(event);

      switch (description) {
        case "0":
        case "Ctrl 0":
        case "Ctrl Shift 0":
        case "Ctrl Shift Alt 0": {
          appState.controls.setIsPlaying(true);
          break;
        }

        case ".":
        case "Ctrl .":
        case "Ctrl Shift .":
        case "Ctrl Shift Alt .": {
          appState.controls.setIsPlaying(false);
          break;
        }

        case "+":
        case "=":
        case "Shift +": {
          appState.controls.addMarkedTime(appState.data.currentTime);
          break;
        }

        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": {
          const index = parseInt(key) - 1;

          let time = appState.data.markedTimes[index];
          if (time != null) {
            appState.controls.setCurrentTime(time, true);
          }
          break;
        }

        case "Shift 0":
        case "Shift 1":
        case "Shift 2":
        case "Shift 3":
        case "Shift 4":
        case "Shift 5":
        case "Shift 6":
        case "Shift 7":
        case "Shift 8":
        case "Shift 9": {
          const index = parseInt(key) - 1;

          let time = appState.data.markedTimes[index];
          if (time != null) {
            appState.controls.updateMarkedTimeAtIndex(
              index,
              appState.data.currentTime
            );
          }
          break;
        }

        case "Ctrl 0":
        case "Ctrl 1":
        case "Ctrl 2":
        case "Ctrl 3":
        case "Ctrl 4":
        case "Ctrl 5":
        case "Ctrl 6":
        case "Ctrl 7":
        case "Ctrl 8":
        case "Ctrl 9": {
          const index = parseInt(key) - 1;

          let time = appState.data.markedTimes[index];
          if (time != null) {
            appState.controls.removeMarkedTimeAtIndex(index);
          }
          break;
        }

        case "ArrowLeft": {
          appState.controls.setCurrentTime(appState.data.currentTime - 5, true);
          break;
        }

        case "ArrowRight": {
          appState.controls.setCurrentTime(appState.data.currentTime + 5, true);
          break;
        }

        case "Shift ArrowLeft": {
          appState.controls.setCurrentTime(appState.data.currentTime - 1, true);
          break;
        }

        case "Shift ArrowRight": {
          appState.controls.setCurrentTime(appState.data.currentTime + 1, true);
          break;
        }

        case "Alt ArrowLeft": {
          appState.controls.setCurrentTime(
            appState.data.currentTime - 0.03,
            true
          );
          break;
        }

        case "Alt ArrowRight": {
          appState.controls.setCurrentTime(
            appState.data.currentTime + 0.03,
            true
          );
          break;
        }

        // Stands in for YouTube's default play/pause keybinds
        case " ":
        case "Spacebar":
        case "K": {
          appState.controls.setIsPlaying(!appState.data.isPlaying);
          break;
        }

        // Stands in for YouTube's default 10 second jump keybinds
        case "J": {
          appState.controls.setCurrentTime(
            appState.data.currentTime - 10,
            true
          );
          break;
        }

        case "L": {
          appState.controls.setCurrentTime(
            appState.data.currentTime + 10,
            true
          );
          break;
        }

        // TODO:
        // - Arrow Up and Down for volume
        // - F toggle fullscreen
        // - M toggle mute

        case "Shift ArrowDown": {
          if (appState.data.isPlaying) break;

          // Check what the audio here is
          const now = appState.data.currentTime;
          appState.controls.setIsPlaying(true);
          setTimeout(() => {
            appState.controls.setIsPlaying(false);
            appState.controls.setCurrentTime(now, true);
          }, 100);

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
