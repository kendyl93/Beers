import React, { Component, Fragment } from 'react';

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    isSideDrawerShown: false
  };

  sideDrawerShowHandler = () => {
    this.setState({ isSideDrawerShown: true });
  };

  sideDrawerHideHandler = () => {
    this.setState({ isSideDrawerShown: false });
  };

  render() {
    return (
      <>
        <Toolbar sideDrawerShowHandler={this.sideDrawerShowHandler} />
        <SideDrawer
          open={this.state.isSideDrawerShown}
          closed={this.sideDrawerHideHandler}
        />
        {this.props.children}
      </>
    );
  }
}
export default Layout;
