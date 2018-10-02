import * as React from "react";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";
import { Game, Story } from "../../core/models";
import StoryForm from "./StoryForm";
import StoryList from "./StoryList";

interface IOwnProps {
  firebase: any;
  classes: any;
  location: any;
  game: Game;
  story: Story;
}

interface ITempState {
  story: Story
}

type IProps = IOwnProps;

const styles: any = (theme: any) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: theme.spacing.unit
  }
});

class StoryPageComponent extends React.Component<IProps, ITempState> {

  constructor(props: any) {
    super(props);
    this.state = {
      story: this.getInitialStoryState()
    };
  }

  getInitialStoryState(): Story {
    return {
      title: "",
      type: "",
      url: "n/a",
      description: "",
      acceptanceCriteria: "",
      storyPoints: "-666"
    };
  }

  getKey(): string {
    return this.props.location.pathname.substring(7, 27);
  }

  onStoryChange(name: string, value: string) {
    let newState = { ...this.state };
    newState.story[name] = value
    this.setState(newState);
  }

  addStory(): void {
    let story = { ...this.state.story };
    story.type = "user-added";
    let stories = this.props.game.stories ? [...this.props.game.stories, story] : [story];
    this.props.firebase.ref(`/games/${this.getKey()}`).update({ stories: stories });
    this.setState({ story: this.getInitialStoryState() })
  }

  updateStory(): void {
    let index = this.props.game.stories.indexOf(this.state.story);
    this.props.game.stories[index] = this.state.story;
    let stories = [...this.props.game.stories];
    this.props.firebase.ref(`/games/${this.getKey()}`).update({ stories: stories });
    this.setState({ story: this.getInitialStoryState() });
  }

  selectStory(story: Story): void {
    this.setState({ story: story });
  }

  removeStory(story: Story): void {
    let stories = this.props.game.stories.filter((s: Story) => story != s);
    this.props.firebase.ref(`/games/${this.getKey()}`).update({ stories: stories })
    if (this.state.story == story) {
      this.setState({ story: this.getInitialStoryState() });
    }
  }

  render(): JSX.Element {
    let classes = this.props.classes;

    if (!isLoaded(this.props.game)) {
      return <p>Loading...</p>
    }

    return (
      <Paper className={classes.container} >
        <StoryForm game={this.props.game} story={this.state.story}
          onFormChange={(name: string, value: string) => this.onStoryChange(name, value)}
          onAdd={() => this.addStory()}
          onUpdate={() => this.updateStory()} />
        <StoryList game={this.props.game}
          onItemSelected={(s: Story) => this.selectStory(s)}
          onItemRemove={(s: Story) => this.removeStory(s)} />
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
)(StoryPageComponent) as React.ComponentClass<any>;
