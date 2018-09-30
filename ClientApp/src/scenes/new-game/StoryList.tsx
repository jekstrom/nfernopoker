import * as React from "react";
import { connect } from "react-redux";
import { Avatar, Paper, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import NewStoryComponent from "./NewStory";
import DeleteIcon from '@material-ui/icons/Delete';
import WhatshotIcon from '@material-ui/icons/Whatshot';

const styles: any = (theme: any) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    width: '100px'
  },
  iconSmall: {
    fontSize: 20,
  },
  menu: {
    width: 200,
  }
});

class StoryListComponent extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  //removeStory(key: string): void {
  //  this.props.firebase.ref(`/games/${key}`).update(updates)
  //}

  render(): JSX.Element {
    let classes = this.props.classes;

    if (!isLoaded(this.props.game)) {
      return <p>Loading... </p>
    }

    let stories = this.props.game.stories ? this.props.game.stories.map((story: any, i: number) => {
      return (
        <ListItem key={i}>
          <ListItemAvatar>
            <Avatar>
              <WhatshotIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={story.title}
            secondary={story.description}
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Delete">
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }) :
      (<h1>Add a story</h1>);

    return (
      <Paper className={classes.container} >
        <NewStoryComponent game={...this.props.game} />
        <h3>Stories</h3>
        <List dense={true}>
          {stories}
        </List>
      </Paper>
    )
  }
}

const currentGame: string = 'currentGame';

const mapStateToProps = (state: any) => ({
  game: state.firebase.data[currentGame]
});

export default compose(
  withStyles(styles),
  withRouter,
  firebaseConnect((props: any) => {
    let key = props.location.pathname.substring(7, 27);
    return [
      { path: "/games/" + key, storeAs: currentGame }
    ]
  }),
  connect(mapStateToProps)
)(StoryListComponent) as React.ComponentClass<any>;
