import * as React from "react";
import { ChangeEvent } from "react";
import { connect } from "react-redux";
import { TextField, Button } from "@material-ui/core";
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

const styles: any = (theme: any) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default,
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
    width: '200px'
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  menu: {
    width: 200,
  }
});

class NewGameComponent extends React.Component<any, any> {

  cardOptions = [
    { name: "0, 1, 2, 4, 8, 16, 32, 64, 128", value: [0, 1, 2, 4, 8, 16, 32, 64, 128, "?"] },
    { name: "0, 1, 3, 5, 8, 13, 20, 40, 100", value: [0, 1, 3, 5, 8, 13, 20, 40, 100, "?"] }
  ];

  constructor(props: any) {
    super(props);

    this.state = {
      game: {
        title: "",
        description: "",
        team: this.props.teams ? this.props.teams[0].name : "",
        cards: this.cardOptions[0],
        stories: []
      }
    };

  }

  handleGameChange = (event: ChangeEvent<HTMLInputElement>, name: string) => {

    let newState = { ...this.state };
    if (name == 'team') {
      //Object.keys(this.props.teams).forEach(k => {
        //if (this.props.teams[k].name == event.target.value) {
          newState.game.team = this.props.teams[event.target.value];
        //}
      //});
    } else if (name == "cards") {
      newState.game.cards = this.cardOptions.find(x => x.name == event.target.value);
    }
    else {
      newState.game[name] = event.target.value
    }

    this.setState(newState);
  }

  saveGame() {
    this.props.firebase.push('games', this.state.game);
  }

  isGameInvalid(): boolean {
    let game = this.state.game;
    return game.title == "" || game.description == "" || game.team == "" || game.cards == "";
  }

  render() {
    let classes = this.props.classes;
    let teams = this.props.teams;

    if (!teams) {
      return (<h1>Go add a team!</h1>)
    }

    let cards = this.cardOptions.map((cardDeck, index) => {
      return (<option key={index} value={cardDeck.name}>
        {cardDeck.name}
      </option>)
    });

    let menuItems = Object.keys(teams).map((key, index) => {
      let team = teams[key];
      return (<option key={index} value={key}>
        {team.name}
      </option>)
    });

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <h1>Create a new game</h1>
        <p>Add a team of players. Players will be notified when the game is ready to play.</p>

        <TextField
          id="name"
          className={classes.textField}
          fullWidth={true}
          label="Game Title"
          value={this.state.game.title}
          onChange={(e: any) => this.handleGameChange(e, 'title')}
          margin="normal"
        />

        <TextField
          id="name"
          className={classes.textField}
          fullWidth={true}
          label="Game description (option)"
          value={this.state.game.description}
          onChange={(e: any) => this.handleGameChange(e, 'description')}
          margin="normal"
        />

        <TextField
          id="select-team"
          select
          fullWidth={true}
          label="Select Team"
          className={classes.textField}
          value={this.state.game.team.name}
          onChange={(e: any) => this.handleGameChange(e, 'team')}
          helperText="Please select your team"
          margin="normal"
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          <option disabled hidden value=''></option>
          {menuItems}
        </TextField>

        <TextField
          id="select-cards"
          select
          fullWidth={true}
          label="Select Cards"
          className={classes.textField}
          value={this.state.game.cards.name}
          onChange={(e: any) => this.handleGameChange(e, 'cards')}
          helperText="Please select your card deck"
          margin="normal"
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
        >
          <option disabled hidden value=''></option>
          {cards}
        </TextField>

        <Button variant="contained" size="small" className={classes.button} disabled={this.isGameInvalid()} onClick={() => this.saveGame()}>
          <SaveIcon className={classes.iconSmall} />
          Save
        </Button>

      </form>
    )
  }
}

const mapStateToProps = (state: any) => ({
  teams: state.firebase.data.teams
});

export default compose(
  withStyles(styles),
  firebaseConnect((props: any) => [
    'teams'
  ]),
  connect(mapStateToProps)
)(NewGameComponent) as React.ComponentClass<any>;

