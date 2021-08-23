const debounce = require("debounce");
const gkm = require("gkm");

export class GlobalEventListener {

  onUserActivity?: () => void;

  constructor(onUserActivity: () => void) {
    this.onUserActivity = onUserActivity;
  }

  launch() {
    if (this.onUserActivity) {
      this.start();
    }
  }

  start() {
    if (this.onUserActivity) {
      // Listen to all key events (pressed, released, typed)
      gkm.events.on("key.*", (data: any) => {
        if (this.onUserActivity) {
          this.onUserActivity();
        }
      });

      // Listen to all mouse events (click, pressed, released, moved, dragged)
      gkm.events.on("mouse.*", (data: any) => {
        // console.log(this.event + " " + data);
        if (this.onUserActivity) {
          this.onUserActivity();
        }
      });
    }
  }

  stop() {
    if (this.onUserActivity) {
      // Listen to all key events (pressed, released, typed)
      gkm.events.on("key.*", function (data: any) {
        // console.log(this.event + " " + data);
      });

      // Listen to all mouse events (click, pressed, released, moved, dragged)
      gkm.events.on("mouse.*", function (data: any) {
        // console.log(this.event + " " + data);
      });
    }
  }
}

module.exports = {
  GlobalEventListener,
};
