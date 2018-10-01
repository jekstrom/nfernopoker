import * as React from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { Game, Story } from "../../core/models";
import DeleteIcon from '@material-ui/icons/Delete';
import WhatshotIcon from '@material-ui/icons/Whatshot';

interface IOwnProps {
  game: Game;
  onItemSelected: (story: Story) => {};
  onItemRemove: (story: Story) => {};
}

interface ITempState { }

type IProps = IOwnProps;

class StoryListComponent extends React.Component<IProps, ITempState> {

  constructor(props: any) {
    super(props);
  }

  handleItemSelected(story: Story): void {
    this.props.onItemSelected(story);
  }

  handleItemDeleted(story: Story): void {
    this.props.onItemRemove(story);
  }

  render(): JSX.Element {

    let stories = this.props.game.stories ? this.props.game.stories.map((story: any, i: number) => {
      return (
        <ListItem key={i} onClick={() => this.handleItemSelected(story)}>
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
            <IconButton aria-label="Delete" onClick={() => this.handleItemDeleted(story)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem >
      )
    }) :
      (<h1>Add a story</h1>);

    return (
      <div>
        <h3>Stories</h3>
        <List dense={true}>
          {stories}
        </List>
      </div>
    )
  }
}

export default StoryListComponent as React.ComponentClass<any>;
