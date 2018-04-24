import * as React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';


class Layout extends React.Component<{}, {}> {
  public render() {
    return (
      <Grid fluid={true}>
      <Row>
        <Col sm={3}>
          <NavMenu />
        </Col>
        <Col sm={9}>
          {this.props.children}
        </Col>
      </Row>
    </Grid>
    );
  }
}

export default Layout;
