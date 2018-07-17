import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Button, TextField, CardActions } from "material-ui";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { ChangeEvent } from "react";

interface IOwnProps {
  firebase: any;
  profile: any;
  teams: Array<Team>;
}

interface ITempState {
  playerEmail: string;
  team: Team;
}

interface Team {
  owner: string;
  ownerEmail: string;
  name: string
  logoUrl: string;
  players: Array<Player>;
}

interface Player {
  email: string;
}

type IProps = IOwnProps;

const styles = {
  layout: {
    display: 'grid',
    grid: `
            [issuerow-start] "issue-view" 1fr [issuerow-end]
            [cardrow-start] "card-view" auto [cardrow-end]
            / 100%
        `,
    width: '100%',
    height: '100%'
  },
  issuecontainer: {
    gridArea: 'issue-view',
    alignSelf: 'stretch'
  },
  button: {
    background: 'white',
    width: '100px'
  },
  cardcontainer: {
    gridArea: 'card-view',
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'space-around'
  },
  card: {
    maxWidth: 400,
    flex: '1 1 0',
    margin: '8px'
  },
  image: {
    height: 200,
  }
}

class TeamsScreenComponent extends React.Component<IProps, ITempState> {

  public state: ITempState;

  constructor(props: IProps) {
    super(props);
    this.state = {
      playerEmail: "",
      team: {
        owner: "",
        ownerEmail: "",
        logoUrl: "",
        name: "",
        players: []
      }
    };
  }

  storeName = (event: ChangeEvent<HTMLInputElement>) => {
    let team = Object.assign(this.state.team);
    team.name = event.target.value;
    team.owner = `${this.props.profile.firstName} ${this.props.profile.lastName}`;
    team.ownerEmail = this.props.profile.email;
    this.setState({ team });
  }

  storeLogoUrl = (event: ChangeEvent<HTMLInputElement>) => {
    let team = Object.assign(this.state.team);
    team.logoUrl = event.target.value;
    this.setState({ team });
  }

  storePlayerEmail = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ playerEmail: event.target.value });
  }

  removeItem(key: string) {
    this.props.firebase.remove(`/teams/${key}`)
  }

  addPlayer() {
    let team = Object.assign(this.state.team);
    team.players.push({ email: this.state.playerEmail });
    this.setState({ team: team, playerEmail: "" });
  }

  removePlayer(player: Player) {
    let team: Team = Object.assign(this.state.team);
    team.players = team.players.filter(p => p.email !== player.email);
    this.setState({ team });
  }

  createTeam() {
    this.props.firebase.push('teams', this.state.team);
    this.state.team = {
      owner: "",
      ownerEmail: "",
      logoUrl: "",
      name: "",
      players: []
    };
  }

  render() {

    let teamInput = (
      <React.Fragment>
        <CardContent>
          <Typography color="textSecondary">
            Enter new team information below.
          </Typography>
          <TextField
            id="name"
            fullWidth={true}
            label="Name"
            onChange={this.storeName}
          />
          <TextField
            id="logoUrl"
            fullWidth={true}
            label="Logo URL"
            onChange={this.storeLogoUrl}
          />

          <br />

          <TextField
            id="teamPlayer"
            fullWidth={false}
            value={this.state.playerEmail}
            label="Team Player Email Address"
            onChange={this.storePlayerEmail}
          />

          <Button color="primary" style={styles.button} onClick={() => this.addPlayer()}>
            Add Player
          </Button>

          <ul>
            {
              this.state.team.players.map(player => {
                return <li key={player.email}>
                  {player.email}
                  <Button color="primary" onClick={() => this.removePlayer(player)}>
                    X
                  </Button>
                </li>
              })
            }
          </ul>
        </CardContent>

        <CardActions>
          <Button color="primary" style={styles.button} onClick={() => this.createTeam()}>
            Add Team
          </Button>
        </CardActions>

      </React.Fragment>
    );

    if (!isLoaded(this.props.teams)) {
      return <p>Loading... </p>
    }

    let cards = new Array<any>();
    if (!isEmpty(this.props.teams) && isLoaded(this.props.teams)) {
      cards = Object.keys(this.props.teams).map((key, index) => {
        let team = this.props.teams[key];
        return <Card key={team.name} style={styles.card}>
          <CardMedia component="img"
            style={styles.image}
            src={team.logoUrl}
          />
          <CardContent>
            <Typography gutterBottom={true}>
              {team.name} - owner: {team.owner}
            </Typography>
            <Button color="secondary" onClick={() => this.removeItem(key)}>
              Delete
          </Button>
          </CardContent>
        </Card>
      });
    }

    return <div style={styles.layout}>
      <section>
        {teamInput}
      </section>

      <section style={styles.issuecontainer} />
      <section style={styles.cardcontainer} >
        {cards}
      </section>
    </div>
  }
}

export const TeamsScreen: React.ComponentClass<ITempState> = compose<React.ComponentClass<ITempState>>(
  firebaseConnect((props: IProps) => [
    'teams',
  ]),
  connect((state: any) => ({
    teams: state.firebase.data.teams,
    profile: state.firebase.profile
  })
  ))(TeamsScreenComponent)
