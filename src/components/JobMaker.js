import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import { style, addJobStyle, queueControlStyle, queueControlTextStyle } from '../styles/JobMakerStyles';

class JobMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: 'Job 1'
    };
  }

  handleChange = event => {
    this.setState({ jobName: event.target.value });
  };

  addJob = () => {
    this.props.addJob(this.state.jobName);
  };

  render() {
    const { queueStart, toggleQueueStart } = this.props;
    const { jobName } = this.state;
    return (
      <div {...style}>
        <div {...addJobStyle}>
          <TextField
            label="Input Job Name:"
            defaultValue={jobName}
            onChange={this.handleChange}
          />
          <Button raised color="primary" onClick={this.addJob}>
            Submit
          </Button>
        </div>
        <div {...queueControlStyle}>
          <div {...queueControlTextStyle}>Pause the Queue</div>
          <Button fab color="primary" onClick={toggleQueueStart} >
            { queueStart ? <PauseIcon /> : <PlayIcon />}
          </Button>
        </div>
      </div>
    );
  }
}

export default JobMaker;
