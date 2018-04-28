import * as React from 'react';
//import AppHeader from "./AppHeader";
import { MuiThemeProvider } from "material-ui/styles";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { Drawer, MenuItem } from "material-ui";
import { Link } from "react-router-dom";

export default class Layout extends React.Component<{}, {}> {

	constructor(
		public props: any,
		public state: { open: true }) {
		super(props, state);
	}

	public handleToggle = () => this.setState({ open: !this.state.open });

	public handleClose = () => this.setState({ open: false });

	public render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<Drawer
					docked={true}
					width={200}
					open={this.state.open}
				>
					<MenuItem onClick={this.handleClose}>
						<Link to={'/'}>Home</Link>
					</MenuItem>
					<MenuItem onClick={this.handleClose}>
						<Link to={'/counter'}>Counter</Link>
					</MenuItem>
				</Drawer>

				<div>
					{this.props.children}
				</div>

			</MuiThemeProvider>
		);
	}
}

			  //<AppHeader />
