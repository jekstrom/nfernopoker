import * as React from 'react';
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase';

class Home extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
    }
  };

  public render() {
    const login = () => {
      const credential = this.props.firebase.auth.EmailAuthProvider.credential(
        this.state.email,
        this.state.password
      );
      this.props.firebase
        .auth()
        .signInWithCredential(credential)
        .then((user: any) => console.log(user));
    };
    return (
      <div>
        <h1>Login</h1>
        <input type="text" value={this.state.email} placeholder="email@example.com" onChange={evt => this.updateEmail(evt)} />
        <input type="password" value={this.state.password} onChange={evt => this.updatePassword(evt)} />
        <button onClick={login}>Login</button>
      </div>
    );
  }
  updateEmail(evt: any) {
    console.log(evt.target.value);
    this.setState({
      email: evt.target.value
    });
  }
  updatePassword(evt: any) {
    console.log(evt.target.value);
    this.setState({
      password: evt.target.value
    });
  }
  updateUsername(evt: any) {
    console.log(evt.target.value);
    this.setState({
      username: evt.target.value
    });
  }
}

const enhance = connect(
  // Map redux state to component props
  ({ firebase: { auth, profile } }: any) => ({
    auth,
    profile
  })
)

enhance(Home)

export default withFirebase(Home);
