const { CLITimer } = require('./timer');
const { GlobalEventListener } = require('./GlobalEventListener');

const globalListener = new GlobalEventListener();

const userActivityTimer = new CLITimer({});
const lastUserActivityTimer = new CLITimer({
    isMessagesVisible: false,
    action: () => {
        userActivityTimer.stopTimer();
    },
    actionTime: 2,
    globalListener,
    onUserActivity: (data) => {
        console.log('active')
        lastUserActivityTimer.resetTimePast();
        if (!userActivityTimer.isTimerWorks) {
            userActivityTimer.runTimer();
        }
        console.log('end active')
    },
});

lastUserActivityTimer.launchTimer();
userActivityTimer.launchTimer();
