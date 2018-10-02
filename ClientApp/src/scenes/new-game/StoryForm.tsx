import * as React from "react";
import { ChangeEvent } from "react";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import { Game, Story } from "../../core/models";

interface IOwnProps {
  classes: any;
  game: Game;
  story: Story;
  onFormChange: (field: string, value: string) => {};
  onAdd: () => {};
  onUpdate: () => {};
}

interface ITempState { }

type IProps = IOwnProps;

const styles: any = (theme: any) => ({
  textField: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    width: '100px'
  },
});

class StoryForm extends React.Component<IProps, ITempState> {

  constructor(props: any) {
    super(props);
  }

  handleStoryChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    this.props.onFormChange(name, event.target.value);
  }

  isStoryInvalid(): boolean {
    let story = this.props.story;
    return story.type == "" && story.title == "" || story.description == "";
  }

  isUpdateDisabled(): boolean {
    return this.props.story.type == "" || this.isStoryInvalid();
  }
  
  handleAdd(): void {
    this.props.onAdd();
  }

  handleUpdate(): void {
    this.props.onUpdate();
  }

  render(): JSX.Element {
    let classes = this.props.classes;
    let game = this.props.game;
    let story = this.props.story;

    let buttons = (
      <div>
        <Button variant="contained" size="small" className={classes.button} disabled={this.isStoryInvalid()} onClick={() => this.handleAdd()}>
          <AddIcon className={classes.iconSmall} />
          Add
        </Button>
        <Button variant="contained" size="small" className={classes.button} disabled={this.isUpdateDisabled()} onClick={() => this.handleUpdate()}>
          <UpdateIcon className={classes.iconSmall} />
          Update
      </Button>
      </div>
    );

    return (
      <div>
        <h1>Game : {game.title}</h1>
        <form noValidate autoComplete="off">
          <legend>Add a user story to the game.</legend>

          <TextField id="story-title"
            className={classes.textField}
            fullWidth={true}
            label="Story Title"
            value={story.title}
            onChange={(e: any) => this.handleStoryChange(e, 'title')}
            margin="normal"
          />

          <TextField id="story-desc"
            className={classes.textField}
            fullWidth={true}
            multiline={true}
            rows={4}
            label="Story description"
            value={story.description}
            onChange={(e: any) => this.handleStoryChange(e, 'description')}
            margin="normal"
          />

          <TextField id="story-acceptanceCriteria"
            className={classes.textField}
            fullWidth={true}
            multiline={true}
            rows={4}
            label="Acceptance Criteria"
            value={story.acceptanceCriteria}
            onChange={(e: any) => this.handleStoryChange(e, 'acceptanceCriteria')}
            helperText="Acceptance Criteria (Given, When, Then)"
            margin="normal">
          </TextField>

          {buttons}

        </form>

      </div >
    )
  }
}

export default withStyles(styles)(StoryForm) as React.ComponentClass<any>;
