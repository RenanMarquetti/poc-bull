export class JobSleep {

	constructor(timeSleep) {
		this.timeSleep;
	}

	getSleepPromisse() {
  		return new Promise(resolve => setTimeout(resolve, timeSleep))
	}
}

export default JobSleep;
