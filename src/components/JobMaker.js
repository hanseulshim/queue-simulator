import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { css } from 'glamor';

const style = css({
  width: '30%',
  height: '50px',
  padding: '20px',
  display: 'flex',
  justifyContent: 'space-around',
});

class JobMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: 'Job 1'
    };
  }

  handleChange = (event) => {
    this.setState({ jobName: event.target.value });
  }

  addJob = () => {
    this.props.addJob(this.state.jobName);
  }

  render() {
    const { jobName } = this.state;
    return (
      <div {...style}>
        <TextField label="Input Job Name:" defaultValue={jobName} onChange={this.handleChange}/>
        <Button raised color="primary" onClick={this.addJob}>
          Submit
        </Button>
      </div>
    );
  }
}

export default JobMaker;
