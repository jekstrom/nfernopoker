import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";

interface IOwnProps {
  firebase: any;
  profile: any;
  games: Array<any>;
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
  },
  modal: {
    height: '600px',
    left: '50%',
    top: '10em'
  },
  modalcontent: {
    backgroundColor: 'white'
  }
}

class GamesScreenComponent extends React.Component<IProps, any> {

  public state: any;

  constructor(props: IProps) {
    super(props);
    this.state = {
      modalOpen: false,
      teamRef: null,
      playerEmail: "",
    };
  }

  removeItem(key: string) {
    this.props.firebase.remove(`/teams/${key}`)
  }

  render() {

    if (!isLoaded(this.props.games)) {
      return <p>Loading... </p>
    }

    let cards = new Array<any>();
    if (!isEmpty(this.props.games) && isLoaded(this.props.games)) {
      cards = Object.keys(this.props.games).map((key, index) => {
        let game = this.props.games[key];
        return <Card key={index} style={styles.card}>
          <CardMedia component="img"
            style={styles.image}
            src="https://tse3.mm.bing.net/th?id=OIP.iUJC2RFnRl_JWM7TuocoUgHaJl&pid=Api"
          />
          <CardContent>
            <Typography gutterBottom={true}>
              {game.title}
            </Typography>
            <Button color="secondary" onClick={() => this.removeItem(key)}>
              Delete
            </Button>
            <Button color="primary">
              Play
            </Button>
          </CardContent>
        </Card>
      });
    }
    return <div style={styles.layout}>
      <section style={styles.cardcontainer} >
        {cards}
      </section>
    </div>
  }
}

export const GamesScreen: React.ComponentClass<any> = compose<React.ComponentClass<any>>(
  firebaseConnect((props: IProps) => [
    'games',
  ]),
  connect((state: any) => ({
    games: state.firebase.data.games,
    profile: state.firebase.profile
  })
  ))(GamesScreenComponent)
