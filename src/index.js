import Bull from 'bull';
import JobSleep from './jobsleep.js';

const myFirstQueue = new Bull('my-first-queue');

// producers
myFirstQueue.add({timeSleep: 1000 * 5});

// consumers
myFirstQueue.process(async (job) => {
	return new JobSleep(job.data.timeSleep).getSleepPromisse();
});

// listeners
myFirstQueue.on('completed', (job, result) => {
	console.log(`Job completed with result ${result}`);
});
