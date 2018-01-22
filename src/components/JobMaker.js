import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import PlayIcon from 'material-ui-icons/PlayArrow';
import PauseIcon from 'material-ui-icons/Pause';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { style, addJobStyle, queueControlStyle, queueControlTextStyle } from '../styles/JobMakerStyles';

class JobMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobName: 'Job 1',
      open: false
    };
  }

  handleChange = event => {
    this.setState({ jobName: event.target.value });
  };

  handleClickOpen = () => {
    if (this.props.queueStart) {
      this.setState({ open: true });
    } else {
      this.props.toggleQueueStart();
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleAgree = () => {
    this.props.toggleQueueStart();
    this.setState({ open: false });
  };

  addJob = () => {
    this.props.addJob(this.state.jobName);
  };

  render() {
    const { queueStart } = this.props;
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
          <Button fab color="primary" onClick={this.handleClickOpen} >
            { queueStart ? <PauseIcon /> : <PlayIcon />}
          </Button>
        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure you want to lock the queue?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default JobMaker;
