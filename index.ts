const { CLITimer } = require("./timer");
const { GlobalEventListener } = require("./GlobalEventListener");

const globalListener = new GlobalEventListener(() => {
  lastUserActivityTimer.resetTimePast();
  if (!userActivityTimer.isTimerWorks) {
    userActivityTimer.runTimer();
  }
});

const userActivityTimer = new CLITimer({});
const lastUserActivityTimer = new CLITimer({
  isMessagesVisible: false,
  action: () => {
    userActivityTimer.stopTimer();
  },
  actionTime: 2,
  globalListener,
});

lastUserActivityTimer.launchTimer();
userActivityTimer.launchTimer();
