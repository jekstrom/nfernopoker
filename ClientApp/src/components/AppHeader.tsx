import * as React from "react";
import { AppBar, Avatar, IconButton } from 'material-ui';
//import ActionAccountCircle from "material-ui/svg-icons/action/account-circle";
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
		const avatar_icon_size = 32;
		const custom_padding = { padding: 8 };

		return (
			<AppBar className="appbar_in_main" title={title}
				iconElementRight={
					<IconButton onClick={this.login}
						style={custom_padding}>
						<Avatar size={avatar_icon_size} />
					</IconButton>} />
		);
	}

	public login = (event: MouseEvent<any>) => {
		this.props.firebase.login({
			email: 'test@test.com',
			password: 'testest1'
		});
	}


}
