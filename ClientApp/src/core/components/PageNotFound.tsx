import * as React from 'react';
import { Component } from 'react';
import { Grid } from '@material-ui/core';
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
    const four0four = require("../../../public/img/404_notfound.png");
    return (
      <Grid
        container
        spacing={16}
        alignItems="center"
        direction="column"
        justify="center"
      >
        <h1 className={classes.title}>PAGE NOT FOUND</h1>
        <img className={classes.img} src={four0four} />
      </Grid>
    );
  }
}

export default
  withStyles(styles)(PageNotFound);
