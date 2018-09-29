import * as React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { compose } from "redux";
import { firebaseConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';

interface IOwnProps {
  firebase: any;
  games: Array<any>;
  history: any;
  classes: any;
}

type IProps = IOwnProps;

const styles = {
  root: {
    flexGrow: 1,
  },
  button: {
    background: 'white',
    width: '100px'
  },
  card: {
    width: 245
  },
  image: {
    height: 180,
  }
}

class GamesScreenComponent extends React.Component<IProps, any> {

  constructor(props: IProps) {
    super(props);
  }

  playGame(key: string) {
    this.props.history.push(`/game/${key}`);
  }

  removeItem(key: string) {
    this.props.firebase.remove(`/games/${key}`);
  }

  render() {
    const { classes } = this.props;

    if (!isLoaded(this.props.games)) {
      return <p>Loading... </p>
    }

    let cards = new Array<any>();
    if (!isEmpty(this.props.games) && isLoaded(this.props.games)) {
      cards = Object.keys(this.props.games).map((key, index) => {
        let game = this.props.games[key];
        return (<Grid key={index} item className={classes.card}>
          <Card>
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
        </Grid>)
      });
    }
    return (<Grid container
      direction="row"
      justify="flex-start"
      alignItems="flex-start"
      className={classes.root} spacing={24}>
      {cards}
    </Grid>)
  }
}

export const GamesScreen: React.ComponentClass<any> = compose<React.ComponentClass<any>>(
  withStyles(styles),
  withRouter,
  firebaseConnect((props: IProps) => [
    'games',
  ]),
  connect((state: any) => ({
    games: state.firebase.data.games,
    profile: state.firebase.profile
  })
  ))(GamesScreenComponent)
