import * as React from "react";
import { Component } from 'react';
import { Snackbar, IconButton } from "material-ui";
import { Close } from "@material-ui/icons";

export interface ISnackWrapperProps {
  message: string;
  classes: any;
  handleClose: () => void;
  open: boolean;
}

export default class SnackWrapper extends Component<ISnackWrapperProps, any> {

  constructor(
    public props: ISnackWrapperProps,
  ) {
    super(props)
  }

  public render() {
    return (
      <Snackbar
        open={this.props.open}
        onClose={this.props.handleClose}
        autoHideDuration={5000}
        SnackbarContentProps={{
          'aria-describedby': 'message-id',
        }
        }
        action={
          [
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={this.props.classes.close}
              onClick={this.props.handleClose}
            >
              <Close />
            </IconButton>,
          ]}
        message={< span id="message-id"
        > {this.props.message}</span >}
      />
    );
  }

}

