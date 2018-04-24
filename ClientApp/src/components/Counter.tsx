import * as React from 'react';
import { connect } from 'react-redux';
import { mapDispatchToProps } from '../actions/Counter'

export declare interface ICounterProps {
  count: number;
  increment: any;
  decrement: any;
}

class Counter extends React.Component<ICounterProps, {}> {
  public render() {
    return (      
      <div>
        <h1>Counter</h1>
    
        <p>This is a simple example of a React component.</p>
    
        <p>Current count: <strong>{ this.props.count }</strong></p>
        <button onClick={this.props.increment}>Increment</button>
        <button onClick={this.props.decrement}>Decrement</button>
      </div>
    );
  }
}

const mapStateToProps = (state: Types.Store, props: ICounterProps) => state.counter;

export default connect(mapStateToProps, mapDispatchToProps)(Counter);