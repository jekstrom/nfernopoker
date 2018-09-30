import * as React from "react";
import { ChangeEvent } from "react";
import { TextField, Button, Paper } from "@material-ui/core";
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { withRouter } from "react-router";
import { Game, Story } from "../../core/models";
import { firebaseConnect } from 'react-redux-firebase';

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

interface IOwnProps {
  firebase: any;
  classes: any;
  location: any;
  game: Game;
}

interface ITempState {
  story: Story
}

type IProps = IOwnProps;

class NewStoryComponent extends React.Component<IProps, ITempState> {

  constructor(props: any) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState(): ITempState {
    return {
      story: {
        title: "",
        type: "user-added",
        url: "n/a",
        description: "",
        acceptanceCriteria: "",
        storyPoints: "-666"
      }
    };
  }

  handleStoryChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    let newState = { ...this.state };
    newState.story[name] = event.target.value
    this.setState(newState);
  }

  isStoryInvalid(): boolean {
    let story = this.state.story;
    return story.title == "" || story.description == "";
  }

  addStory(): void {
    let key = this.props.location.pathname.substring(7, 27);
    let stories = this.props.game.stories ? [...this.props.game.stories, this.state.story] : [this.state.story];
    this.props.firebase.ref(`/games/${key}`).update({ stories: stories });
    this.setState({ ...this.getInitialState() })
  }

  render(): JSX.Element {
    let classes = this.props.classes;
    return (
      <Paper className={classes.container}>
        <h1>Game : {this.props.game.title}</h1>
        <form noValidate autoComplete="off">
          <legend>Add a user story to the game.</legend>

          <TextField id="story-title"
            className={classes.textField}
            fullWidth={true}
            label="Story Title"
            value={this.state.story.title}
            onChange={(e: any) => this.handleStoryChange(e, 'title')}
            margin="normal"
          />

          <TextField id="story-desc"
            className={classes.textField}
            fullWidth={true}
            multiline={true}
            rows={4}
            label="Story description"
            value={this.state.story.description}
            onChange={(e: any) => this.handleStoryChange(e, 'description')}
            margin="normal"
          />

          <TextField id="story-acceptanceCriteria"
            className={classes.textField}
            fullWidth={true}
            multiline={true}
            rows={4}
            label="Acceptance Criteria"
            value={this.state.story.acceptanceCriteria}
            onChange={(e: any) => this.handleStoryChange(e, 'acceptanceCriteria')}
            helperText="Acceptance Criteria (Given, When, Then)"
            margin="normal">
          </TextField>

          <Button type="reset" variant="contained" size="small" className={classes.button}>
            Clear
          </Button>

          <Button variant="contained" size="small" className={classes.button} disabled={this.isStoryInvalid()} onClick={() => this.addStory()}>
            <AddIcon className={classes.iconSmall} />
            Add
          </Button>
        </form>
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  withRouter,
  firebaseConnect(null),
)(NewStoryComponent) as React.ComponentClass<any>;

