import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, RadioGroup, FormControlLabel, Radio, DialogActions, Button } from 'material-ui';
import Colors from '../Colors';

export default class GroupsDialog extends Component {

  state = {
    show: false,
    groupName: 'None',
    groups: [],
    tagOrCan: 0,
  };

  changeDialogState = (groupName, tagOrCan) => {
    const groups = this.props.groups.map(item => item.name);
    this.setState({
      show: !this.state.show, groupName, groups, tagOrCan,
    });
  };

  hideDialog = () => {
    this.setState({ show: !this.state.show });
  };

  changeGroup = () => {
    this.props.change(this.state.groupName);
    this.hideDialog();
  };

  handleChange = (event, groupName) => {
    this.setState({ groupName });
  };

  handleEntering = () => {
    this.radioGroup.focus();
  };

  render() {
    return (
      <Dialog
        open={this.state.show}
        onClose={this.hideDialog}
      >
        <DialogTitle id="form-dialog-title">Change Group</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={(node) => {
              this.radioGroup = node;
            }}
            style={{width: '100%'}}
            value={this.state.groupName}
            onChange={this.handleChange}
          >
            {this.state.groups.map(option => (
              <FormControlLabel
                value={option}
                key={option}
                control={<Radio style={{ color: this.state.tagOrCan ? Colors.canMainColor : Colors.tagMainColor }} />}
                label={option}
              />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.hideDialog} style={{ color: this.state.tagOrCan ? Colors.canMainColor : Colors.tagMainColor }}>
            Cancel
          </Button>
          <Button onClick={this.changeGroup} style={{ color: this.state.tagOrCan ? Colors.canMainColor : Colors.tagMainColor }}>
            Change
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

GroupsDialog.propTypes = {
  change: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
};
