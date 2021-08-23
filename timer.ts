const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

export class CLITimer {
	/**
	 * minutes
	 */
	private interval = 1;


	/**
	 * minutes
	 */
	private timePast = 0;

	isTimerWorks = false;

	private timerId: any;

	/**
	 * Flag to hide/show messages
	 */
	private isMessagesVisible;

	/**
	 * Callback which will execute when this.timePast === this.actionTime
	 */
	private action: () => void;

	/**
	 * Time in minutes when
	 */
	private actionTime: number;

	/**
	 * Special global key listener object
	 */
	private globalListener: any;


	/**
	 * Action on user activity when timer works
	 */
	private onUserActivity?: () => {};

	constructor({
		isMessagesVisible = true,
		action = () => { },
		actionTime = Infinity,
		globalListener = {},
		onUserActivity = undefined,
	}) {
		this.isMessagesVisible = isMessagesVisible;
		this.action = action;
		this.actionTime = actionTime;
		this.globalListener = globalListener;
		this.onUserActivity = onUserActivity;
	}

	launchTimer() {
		if (this.globalListener?.launch) {
			this.globalListener.launch(this.onUserActivity);
		}
		
		this.addConsoleKeyListener();
		this.runTimer();
		this.showInstructions();
	};

	runTimer() {
		if (this.isTimerWorks) {
			return;
		}

		this.showMessage('timer is running');
		this.isTimerWorks = true;

		this.timerId = setInterval(() => {
			this.timePast += this.interval;

			if (this.timePast === this.actionTime) {
				this.action();
			}

			const hours = Math.floor(this.timePast / 60);
			const minutes = this.timePast % 60;

			this.showMessage(`${hours} hours, ${minutes} minutes`);
		}, this.interval * 60_000); // 60_000 == milliseconds per minute
	};


	stopTimer() {
		if (!this.isTimerWorks) {
			return;
		}
		this.showMessage('timer on pause')
		this.isTimerWorks = false;
		return clearInterval(this.timerId);
	}

	resetTimePast() {
		this.timePast = 0;
	}

	getTimePast() {
		return this.timePast
	}

	showMessage(message: string) {
		if (this.isMessagesVisible) {
			console.log(message);
		}
	}

	showInstructions() {
		this.showMessage('For run timer press "r" letter');
		this.showMessage('For pause timer press "space" ');
		this.showMessage('For exit press "ctrl + c"');
	}

	addConsoleKeyListener() {
		process.stdin.on('keypress', (event, key) => {
			if (key.name === 'c' && key.ctrl) {

				process.exit();

			} else if (key.name === 'r') {
				if (this.globalListener?.start) {
					this.globalListener?.start();
				}
				this.runTimer();

			} else if (key.name === 'space') {

				if (this.globalListener.stop) {
					this.globalListener?.stop();
				}
				this.stopTimer();

			}
		});
	};

}
