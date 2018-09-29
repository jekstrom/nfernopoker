import * as React from 'react';
import { Component } from 'react';
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles: any = (theme: any) => ({
  img: {
    width: '50%',
    height: '50%'
  },
  title: {
    fontSize: 'large'
  }
});

class PageNotFound extends Component<any> {

  constructor(props: any) {
    super(props)
  }

  render() {
    const { classes } = this.props;
    const firestar = require("../../../public/img/666_firestar.jpg");
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="column"
        justify="center"
      >
        <Typography className={classes.title} color="textPrimary">
          <h1>PAGE NOT FOUND </h1>
        </Typography>
        <img className={classes.img} src={firestar} />
      </Grid>
    );
  }
}

export default
  withStyles(styles)(PageNotFound);
