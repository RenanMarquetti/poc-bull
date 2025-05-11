import type { QueueOptions, AdvancedSettings, JobOpt } from 'bull';
import Queue from 'bull';
import JobSleep from './jobsleep.ts';

const queueOpt: QueueOptions = {
	settings: {
		lockDuration: 1_000,
		stalledInterval: 1_000,
		// guardInterval: 500,
		retryProcessDelay: 500,
		lockRenewTime: 1_000 * 10,
	} as AdvancedSettings,
};
 
console.log(queueOpt);

const jobOpt: JobOpt = {
	timeout: 1_000 * 10,
};

const myFirstQueue = new Queue('my-first-queue', queueOpt);

// producers
myFirstQueue.add({timeSleep: 1_000 * 5, isLock: false}, jobOpt);

// consumers
myFirstQueue.process(async (job) => {
	console.log("processing: ", job.data);
	const obj = new JobSleep(job.data.timeSleep, job.data.isLock);
	return obj.getSleepPromisse().then(_ => "success");
});

// listeners
myFirstQueue.on('completed', (job, result) => {
	console.log(`Job completed with result ${result}`);
	myFirstQueue.close();
});

myFirstQueue.on('stalled', (job) => {
	console.log(`Job stalled with id ${job.id}`);
});

myFirstQueue.on('failed', (job, err) => {
	console.log(`Job failed with error ${err}`);
	myFirstQueue.close();
});
