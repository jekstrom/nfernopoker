import * as React from 'react';
import * as redux from 'redux';
import { connect } from 'react-redux';
import { incrementCounter } from '../actions/Counter'

interface IConnectedDispatch {
  increment: (n: number) => void
}

// type ConnectedState = {
//   counter: { value: number }
// }

interface OwnState { }

class CounterComponent extends React.Component<{ value: number } & IConnectedDispatch, OwnState> {
  _onClickIncrement = () => {
    this.props.increment(1)
  }

  render() {
    const { value } = this.props
    return <div>
      <pre>counter = {value}</pre>
      <pre>counter (nested) = {(this.props as any).counter.value}</pre>
      <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
    </div>
  }
}

const mapStateToProps = (state: { counter: { value: number } }, props: {}): { value: number } => state.counter

const mapDispatchToProps = (dispatch: redux.Dispatch<{ counter: { value: number } }>): IConnectedDispatch => ({
  increment: (n: number) => {
    dispatch(incrementCounter(n))
  },
})

export const Counter: React.ComponentClass<{}> = connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
