import Bull from 'bull';
import JobSleep from './jobsleep.ts';

const myFirstQueue = new Bull('my-first-queue');

// producers
myFirstQueue.add({timeSleep: 1});

// consumers
myFirstQueue.process(async (job) => {
	console.log("processing: ", job.data);
	const j = new JobSleep(job.data.timeSleep);
	const res = await j.getSleepPromisse();
	console.log("res: ", res)
	return res;
});

// listeners
myFirstQueue.on('completed', (job, result) => {
	console.log(`Job completed with result ${result}`);
});
