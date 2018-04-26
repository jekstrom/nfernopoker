import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
// import { mapDispatchToProps } from '../actions/Counter'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export declare interface ICounterProps {
  count: number;
  increment: any;
  decrement: any;
}

const Counter = ({ count, firebase }: any) => {
    const pushSample = () => firebase.push('count', { count: 1 })
    const currentCount = !isLoaded(count)
    ? 'Loading'
    : isEmpty(count)
      ? { count: 1 }
      : count
      console.log(currentCount)
    return (
        <div>
        <h1>Counter</h1>
    
        <p>This is a simple example of a React component.</p>
    
        <p>Current count: <strong>{currentCount.count}</strong></p>
        <button onClick={pushSample}>Increment</button>
      </div>
    )
}

//const mapStateToProps = (state: Types.Store, props: ICounterProps) => state.counter;

// export default firebaseConnect(mapStateToProps, mapDispatchToProps)(Counter);
//export default withFirebase(Counter)
export default compose(
    firebaseConnect((props: any) => [
      'count' // { path: '/todos' } // object notation
    ]),
    connect((state: any, props: any) => ({
      count: state.firebase.data.count,
      // profile: state.firebase.profile // load profile
    }))
  )(Counter)