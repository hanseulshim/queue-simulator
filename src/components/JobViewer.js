import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import shortid from 'shortid';
import { style, card, jobName, jobOptions } from '../styles/JobViewerStyles';
import { dateOptions } from './config';

class JobViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createCards = (jobList) => {
    return jobList.map((job, index) => {
      const submissionTime = new Date(job.submissionTime).toLocaleDateString('en-US', dateOptions);
      return (
        <Card key={shortid.generate()} {...card}>
        <CardContent>
          <div {...jobName}>Job Name: {job.name}</div>
          <div {...jobOptions}>Job Number: {job.jobNumber}</div>
          <div {...jobOptions}>Submission Time: {submissionTime}</div>
          <div {...jobOptions}>Time Elapsed: {job.secondsElapsed} seconds</div>
          <div {...jobOptions}>Process Time: {job.processTime} seconds</div>
        </CardContent>
        <CardActions>
          <Button dense color="accent" onClick={() => this.props.removeJob(index)}>Cancel</Button>
        </CardActions>
      </Card>
      )
    })
  }

  render() {
    const { jobList } = this.props;
    const cardList = this.createCards(jobList);
    return (
      <div {...style}>
        {cardList.length === 0 ? <div>No Jobs available. Please add a job.</div> : cardList}
      </div>
    );
  }
}

export default JobViewer;
