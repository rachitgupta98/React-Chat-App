import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import SignUp from "./signupform";
import SignIn from "./signinform";
import App from "../App";
import Header from "./header";
import withAuths from "../routes/frontauth";
import styles from "../styleApp/style";
import { withStyles } from "@material-ui/core/styles";
class Main extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Header classes={classes} />
        {/*  <ul>
          <li>
            <Link to="/api/signup">Signup</Link>
          </li>
          <li>
            <Link to="/api/signin">Signin</Link>
          </li>
          <li>
            <Link to="/api/chat">Chat</Link>
          </li>
        </ul> */}
        <Switch>
          <Route path="/api/signup" exact component={SignUp} />
          <Route path="/api/signin" exact component={SignIn} />
          <Route path="/api/chat" exact component={withAuths(App)} />
        </Switch>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
