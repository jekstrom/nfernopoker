import * as React from "react";
import { AppBar } from 'material-ui';
import { firebaseConnect } from "react-redux-firebase";
import { Component, MouseEvent } from "react";

@firebaseConnect()
export default class AppHeader extends Component {

	constructor(
		public props: any,
		public context: any
	) {
		super(props, context);
	}

	public render() {
		let title = "N-Ferno-Poker";

		return (
			<AppBar className="appbar_in_main" title={title}>
				<div><p>Hi Mom</p></div>
			</AppBar>
		);
	}

	public login = (event: MouseEvent<any>) => {
		this.props.firebase.login({
			email: 'test@test.com',
			password: 'testest1'
		});
	}


}
