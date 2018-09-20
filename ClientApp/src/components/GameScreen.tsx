import * as React from "react";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";

interface IOwnProps { }
interface ITempState {
    players: Player[]
}
interface Player {
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
    image: {
        height: 0,
        paddingTop: `${9.0/16.0*100}%`
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
        ]
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
        return <div style={styles.layout}>
            <section style={styles.issuecontainer} />
            <section style={styles.cardcontainer} >
                { cards }
            </section>
        </div>
    }
}

export const GameScreen = GameScreenComponent;
