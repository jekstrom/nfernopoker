import * as React from 'react';
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase';

class Register extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state= {
            email: '',
            password: '',
            username: '',
        }
    };

    public render() {
        const register = (password: any) => this.props.firebase.createUser({ email: this.state.email, password: this.state.password })
        return (
            <div>
            <h1>Register New User</h1>
            <input type="text" value={this.state.email} placeholder="email@example.com" onChange={evt => this.updateEmail(evt)}/>
            <input type="text" value={this.state.username} placeholder="username"  onChange={evt => this.updateUsername(evt)}/>
            <input type="password" value={this.state.password}  onChange={evt => this.updatePassword(evt)}/>
            <button onClick={register}>Register</button>
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

enhance(Register)

export default withFirebase(Register);
