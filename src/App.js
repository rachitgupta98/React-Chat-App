import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Form from "./component/form";
import Layout from "./component/layout";
import styles from "./styleApp/style";
import Header from "./component/header";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      datas: "",
      handle: "",
      message: "",
      chate: [],
      typing: false,
      typeUser: "",
      users: ""
    };
    this.socket = io("http://localhost:4000");

    this.socket.on("chat", data => this.addMessage(data));
    this.socket.on("typing", data => this.addTyping(data));
    this.socket.on("broadcast", data => this.onlineUsers(data));
  }

  onlineUsers = data => {
    this.setState({
      users: data.description,
      typing: false
    });
  };

  addTyping = data => {
    this.setState({
      typeUser: data,
      typing: true
    });
  };

  addMessage = data => {
    this.setState({
      chate: [...this.state.chate, data],
      typing: false
    });
    console.log(this.state.chate);
  };

  handleSubmit = e => {
    e.preventDefault();

    this.socket.emit("chat", {
      handle: this.state.handle,
      message: this.state.message
    });
    this.setState({
      message: ""
    });
  };

  handleChange = s => e => {
    this.setState({
      [s]: e.target.value
    });
  };
  handleKey = e => {
    this.socket.emit("typing", this.state.handle);
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        {/* <Header classes={classes} /> */}
        <div>
          <Grid container spacing={24}>
            <Grid item xs={6} className={classes.paper}>
              <Layout state={this.state} classes={classes} />
              <Form
                handle={classes.handle}
                state={this.state}
                onValueChange={this.handleChange}
                onTyping={this.handleKey}
                onSubmit={this.handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
