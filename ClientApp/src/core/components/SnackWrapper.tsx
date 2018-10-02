import * as React from "react";
import * as redux from 'redux';
import { Component } from 'react';
import { Snackbar, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { connect } from "react-redux";
import { MessageTypes } from "../actions/SnackMessage";

interface ISnackWrapperProps {
  classes: any;
}
interface IConnectedState {
  message: string;
  open: boolean;
}
interface IConnectedDispatch {
  clear: () => void
}

type IProps = ISnackWrapperProps & IConnectedState & IConnectedDispatch

class SnackWrapperComponent extends Component<IProps, {}> {
  public render() {
    return (
      <Snackbar
        open={this.props.open}
        autoHideDuration={5000}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={this.props.classes.close}
            onClick={this.props.clear}
          >
            <Close />
          </IconButton>,
        ]}
        message={<span id="message-id"
        >{this.props.message}</span>}
      />
    );
  }
}

const mapStateToProps = (state: any, props: ISnackWrapperProps): IConnectedState => ({
  message: state.snacks.message,
  open: state.snacks.open
});

const mapDispatchToProps = (dispatch: redux.Dispatch<Types.Store>): IConnectedDispatch => ({
  clear: () => {
    dispatch({ type: MessageTypes.ToastClearMessage });
  }
});

export const SnackWrapper: React.ComponentClass<ISnackWrapperProps> = connect(mapStateToProps, mapDispatchToProps)(SnackWrapperComponent);
