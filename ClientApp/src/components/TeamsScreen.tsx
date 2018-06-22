import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "material-ui";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";


interface IOwnProps {
  firebase: any;
  teams: Array<Team>;
}

interface ITempState {
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
  name: string;
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

  }

  addItem() {
    this.props.firebase.push('teams', {
      name: "Giant Rodents",
      owner: "Todd Boss",
      ownerEmail: "tboss@boss.com",
      logoUrl: "http://www.wideopenspaces.com/wp-content/uploads/2014/10/ugly1.jpg",
      players: [
        { name: 'Sam', email: "sam@samantha.com" },
        { name: 'Sue', email: "sue@suzy.com" }
      ]
    });
    console.log("Added team Item");
  }

  render() {

    if (!isLoaded(this.props.teams)) {
      return <p>Loading... </p>
    }

    let cards = new Array<any>();
    if (!isEmpty(this.props.teams) && isLoaded(this.props.teams)) {
      cards = Object.keys(this.props.teams).map((key, index) => {
        let t = this.props.teams[key];
        console.log(key);
        return <Card key={t.name} style={styles.card}>
          <CardMedia component="img"
            style={styles.image}
            src={t.logoUrl}
          />
          <CardContent>
            <Typography gutterBottom={true}>
              {t.name} - owner: {t.owner}
            </Typography>
            <Button color="secondary">
              Edit
          </Button>
          </CardContent>
        </Card>
      });
    }

    return <div style={styles.layout}>
      <Button color="primary" style={styles.button} onClick={() => this.addItem()}>
        Add
      </Button>
      <section style={styles.issuecontainer} />
      <section style={styles.cardcontainer} >
        {cards}
      </section>
    </div>
  }
}

export const TeamsScreen: React.ComponentClass<ITempState> = compose<React.ComponentClass<ITempState>>(
  firebaseConnect((props: IProps) => [
    'teams'
  ]),
  connect((state: any) => ({
    teams: state.firebase.data.teams
  })
  ))(TeamsScreenComponent)
