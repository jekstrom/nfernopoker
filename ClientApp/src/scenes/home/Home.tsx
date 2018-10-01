import * as React from "react";
import { Paper } from "@material-ui/core";

class HomePageComponent extends React.Component {

  constructor(props: any) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <Paper >
        <h1> Welcome </h1>
        <p> This is a placeholder homepage component. </p>
        <p> Maybe some links to recent games here... </p>
      </Paper>
    )
  }
}

export default (HomePageComponent) as React.ComponentClass<any>;
