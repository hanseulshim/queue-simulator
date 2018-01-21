const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: { cors: true }
});

const jobList = [];
let jobNumber = 1;

const updateSecondsElapsed = secondsElapsed => {
  if (secondsElapsed > 0) {
    jobList[0].secondsElapsed = secondsElapsed;
  }
};

// Adds new job to the list of jobs.
server.route({
  method: 'POST',
  path: '/addJob',
  handler: (request, h) => {
    updateSecondsElapsed(request.payload.secondsElapsed);
    jobList.push(request.payload.job);
    jobNumber++;
    return jobNumber;
  }
});

// Removes job at the specified index.
server.route({
  method: 'POST',
  path: '/removeJob',
  handler: (request, h) => {
    updateSecondsElapsed(request.payload.secondsElapsed);
    jobList.splice(request.payload.index, 1);
    return 'success';
  }
});

// Grab all the jobs that are available.
server.route({
  method: 'GET',
  path: '/getJobs',
  handler: (request, h) => {
    const responseData = {
      jobList: jobList,
      jobNumber: jobNumber
    };
    return responseData;
  }
});

// Update secondsElapsed of first job
server.route({
  method: 'POST',
  path: '/updateTimer',
  handler: (request, h) => {
    updateSecondsElapsed(request.payload.secondsElapsed);
    return 'success';
  }
});

// Start the server
async function start() {
  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server running at:', server.info.uri);
}

start();
