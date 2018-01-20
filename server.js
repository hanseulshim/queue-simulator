const Hapi = require('hapi');

// Create a server with a host and port
const server = Hapi.server({
  host: 'localhost',
  port: 8000,
  routes: { cors: true },
});

let jobList = [];

// Adds new job to the list of jobs.
server.route({
  method: 'POST',
  path: '/addJob',
  handler: (request, h) => {
    if (request.payload.secondsElapsed > 0) {
      jobList[0].secondsElapsed = request.payload.secondsElapsed;
    }
    jobList.push(request.payload.job);
    return 'success';
  },
});

// Removes job at the specified index.
server.route({
  method: 'POST',
  path: '/removeJob',
  handler: (request, h) => {
    if (request.payload.secondsElapsed > 0) {
      jobList[0].secondsElapsed = request.payload.secondsElapsed;
    }
    jobList.splice(request.payload.index, 1);
    return 'success';
  },
});

// Grab all the jobs that are available.
server.route({
  method: 'GET',
  path: '/getJobs',
  handler: (request, h) => jobList
})

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
