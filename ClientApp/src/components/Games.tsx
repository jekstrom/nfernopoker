import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { withRouter } from "react-router";

interface IOwnProps {
  firebase: any;
  profile: any;
  games: Array<any>;
  history: any;
}

type IProps = IOwnProps;

const styles = {
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
      playerEmail: ""
    };
  }

  playGame(key: string) {
    this.props.history.push(`/game/${key}`);
  }

  removeItem(key: string) {
    this.props.firebase.remove(`/games/${key}`);
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
            <Button color="primary" onClick={() => this.playGame(key)}>
              Play
            </Button>
          </CardContent>
        </Card>
      });
    }
    return <div>
      <section style={styles.cardcontainer} >
        {cards}
      </section>
    </div>
  }
}

export const GamesScreen: React.ComponentClass<any> = compose<React.ComponentClass<any>>(
  withRouter,
  firebaseConnect((props: IProps) => [
    'games',
  ]),
  connect((state: any) => ({
    games: state.firebase.data.games,
    profile: state.firebase.profile
  })
  ))(GamesScreenComponent)
