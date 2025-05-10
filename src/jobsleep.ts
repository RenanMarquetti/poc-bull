export class JobSleep {

	constructor(timeSleep) {
		this.timeSleep = timeSleep;
	}

	getSleepPromisse() {
  		return new Promise(resolve => setTimeout(resolve, this.timeSleep));
	}
}

export default JobSleep;
