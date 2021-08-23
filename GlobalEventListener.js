const GK = require('global-keypress');
const mouseHooks = require('mouse-hooks');
const debounce = require('debounce');

const gk = new GK();

class GlobalEventListener {

	// #mouseListener = mouseEvents;

	// #keyboardListener = new GK();

	#onUserActivity = () => { };

	constructor() {

	}

	launch(onUserActivity) {
		this.#onUserActivity = onUserActivity;
		mouseHooks.default.on('mouse-move', this.#onUserActivity) // debounce
		
		gk.start();
		// gk.on('press', data => {
		// 	console.log(data);
		//   });
		gk.on('press', this.#onUserActivity); // debounce // problem is on this line : callback run automatically
	}

	start() {
		gk.start();
		mouseHooks.on('mousemove', this.#onUserActivity);
	}

	stop() {
		gk.stop();
		// cant stop mouse event listener
		mouseHooks.on('mousemove', () => { })
	}
}
module.exports = {
	GlobalEventListener
}
