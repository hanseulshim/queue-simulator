import React, { Component } from 'react';
import JobMaker from './JobMaker';
import JobViewer from './JobViewer';
import { css } from 'glamor';

const style = css({
  display: 'flex',
  height: '100%',
  background: '#c9d8c5'
});

class JobContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobList: [],
      jobNumber: 1
    };
  }

  componentDidMount() {
    const url = 'http://localhost:8000/getJobs';
    fetch(url, {
      method: 'GET',
      headers: new Headers()
    })
      .then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        this.setState({
          jobList: response
        });
      });
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  addJob = jobName => {
    const url = 'http://localhost:8000/addJob';
    // Create new job object
    const job = {
      name: jobName,
      submissionTime: new Date(),
      secondsElapsed: 0,
      jobNumber: this.state.jobNumber,
      processTime: Math.random() * (15 - 0.5 + 1) + 0.5
    };
    // Check if there is an existing job in the queue
    const tempList = this.state.jobList.slice();
    const firstJob = tempList[0];
    // If there is an existing job then update secondsElapsed
    const data = {
      job: job,
      secondsElapsed: firstJob === undefined ? -1 : firstJob.secondsElapsed
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        // Add the job to the queue and update state
        tempList.push(job);
        this.setState({
          jobList: tempList,
          jobNumber: this.state.jobNumber + 1
        });
      })
      .catch(error => console.error('Error:', error));
  };

  removeJob = index => {
    const url = 'http://localhost:8000/removeJob';
    const tempList = this.state.jobList.slice();
    const firstJob = tempList[0];
    // If there is an existing job then update secondsElapsed
    const data = {
      index: index,
      secondsElapsed: firstJob === undefined ? -1 : firstJob.secondsElapsed
    };
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        tempList.splice(index, 1);
        this.setState({
          jobList: tempList
        });
      })
      .catch(error => console.error('Error:', error));
  };

  // Increment secondsElapsed every second
  tick = () => {
    // Only increment secondsElapsed if there is a job in the queue
    if (this.state.jobList.length > 0) {
      const tempList = this.state.jobList.slice();
      tempList[0].secondsElapsed += 1;
      if (tempList[0].secondsElapsed >= tempList[0].processTime) {
        this.removeJob(0);
      }
      this.setState({ jobList: tempList });
    }
  };

  render() {
    const { jobList } = this.state;
    return (
      <div {...style}>
        <JobMaker addJob={this.addJob} />
        <JobViewer jobList={jobList} removeJob={this.removeJob} />
      </div>
    );
  }
}

export default JobContainer;
