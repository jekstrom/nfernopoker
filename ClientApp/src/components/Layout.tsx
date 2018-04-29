import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import { Link } from 'react-router-dom';
import { MenuItem, MuiThemeProvider } from 'material-ui';
import { createMuiTheme } from 'material-ui/styles';
import orange from 'material-ui/colors/orange';

const drawerWidth = 240;

const theme = createMuiTheme({
	palette: {
		primary: orange,
	},
});

const styles: any = (theme: any) => ({
	root: {
		flexGrow: 1,
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0, // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component {

	constructor(
		public props: any,
		public state: any
	) {
		super(props)
	}

	public handleToggle = () => this.setState({ open: !this.state.open });

	public handleClose = () => this.setState({ open: false });

	public render() {
		return (
			<MuiThemeProvider theme={theme}>
				<div className={this.props.classes.root} >
					<AppBar position="absolute" className={this.props.classes.appBar}>
						<Toolbar>
							<Typography variant="title" color="inherit" noWrap={true}>
								NFERNO-POKER
							</Typography>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						classes={{
							paper: this.props.classes.drawerPaper,
						}}
					>
						<div className={this.props.classes.toolbar} />
						<MenuItem onClick={this.handleClose}>
							<Link to={'/'}>Home</Link>
						</MenuItem>
						<Divider />
						<MenuItem onClick={this.handleClose}>
							<Link to={'/counter'}>Counter</Link>
						</MenuItem>
					</Drawer>
					<main className={this.props.classes.content}>
						<div className={this.props.classes.toolbar} />
						{this.props.children}
					</main>
				</div>
			</MuiThemeProvider>
		);
	}
}

export default withStyles(styles)(Layout);