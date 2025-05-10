import Bull from 'bull';
import JobSleep from './jobsleep.ts';

const myFirstQueue = new Bull('my-first-queue');

// producers
myFirstQueue.add({timeSleep: 1_000 * 5});

// consumers
myFirstQueue.process(async (job) => {
	console.log("processing: ", job.data);
	const obj = new JobSleep(job.data.timeSleep);
	return await obj.getSleepPromisse().then(_ => "success");
});

// listeners
myFirstQueue.on('completed', (job, result) => {
	console.log(`Job completed with result ${result}`);
});
