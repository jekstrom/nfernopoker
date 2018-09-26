import * as React from "react";
import { Avatar, Card, CardActions, CardMedia, CardContent, CardHeader, IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import Launch from '@material-ui/icons/Launch';

interface IOwnProps { }
interface ITempState {
  players: Player[],
  issue: Issue
}
interface Player {
  name: string
}
interface Issue {
  name: string
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
  issue: {
    maxWidth: 1024,
    flex: '1 0 0',
    margin: '8px'
  },
  image: {
    height: 0,
    paddingTop: `${9.0 / 16.0 * 100}%`
  },
  icon: {
    height: '10%',
    width: '10%',
    paddingTop: '12px',
  }
}

class GameScreenComponent extends React.Component<IProps, ITempState> {
  state = {
    players: [
      { name: 'George' },
      { name: 'Michael' },
      { name: 'George Michael' },
      { name: 'GOB' },
      { name: 'Lucille' },
      { name: 'Lucille 2' },
      { name: 'Maeby' },
      { name: 'Tobias' },
      { name: 'Lindsay' },
      { name: 'Buster' },
    ],
    issue: {
      name: ""
    }
  }

  render() {
    const cards = this.state.players.map(p => (
      <Card key={p.name} style={styles.card}>
        <CardMedia
          style={styles.image}
          image="http://www.fillmurray.com/400/300"
        />
        <CardContent>
          <Typography gutterBottom={true} component="p">
            {p.name}
          </Typography>
        </CardContent>
      </Card>
    ));

    this.getJiraIssue("NFER-9").then(res => this.state.issue = { name: JSON.stringify(res) });

    const s = `${this.state.issue.name} As a developer, I'd like to update story status during the sprint >> Click the Active sprints link at the top right of the screen to go to the Active sprints where the current Sprint's items can be updated`

    const issue = <Card key="test issue" style={styles.issue}>
      <CardHeader title={s} avatar={<Avatar aria-label="issue-icon" src="http://localhost:8080/secure/projectavatar?avatarId=10324" />} subheader="NFER-9" />
      <CardContent>
        <Typography gutterBottom={false} component="q">test</Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="Add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="Open in new window" onClick={function () { window.open('http://google.com', '_blank') }} >
          <Launch />
        </IconButton>
      </CardActions>
    </Card>
    return <div style={styles.layout}>
      <section style={styles.issuecontainer}>
        {issue}
      </section>
      <section style={styles.cardcontainer} >
        {cards}
      </section>
    </div>
  }

  private getJiraIssue = async (issueId: string) => {
    console.log("fetching issue");
    const url = `http://localhost:3000/jira/issue/${issueId}`;
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await fetch(url, options);
    console.log("got response");
    if (!response.ok) {
      console.log("error");
      throw new Error(`Error ${response.status}: ${response.statusText} ${await response.text()}`);
    }
    console.log(response);
    return response.json();
  }
}

export const GameScreen = GameScreenComponent;
