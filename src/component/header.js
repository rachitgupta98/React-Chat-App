import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Typography } from "@material-ui/core";
class Header extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={this.props.classes.heading}>
            <Typography variant="display1" color="inherit">
              Chat Server
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Header;
