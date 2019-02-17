import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      handle: ""
    };
  }

  onchangeInputs = dbs => e => {
    this.setState({
      [dbs]: e.target.value
    });
  };
  onSignIn = e => {
    e.preventDefault();
    const { signInEmail, signInPassword } = this.state;
    fetch("/api/signin", {
      method: "POST",
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status === 200) {
          console.log("Token received");
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch(err => {
        console.error(err);
        alert("Error logging in please try again");
      });
  };
  render() {
    const { signInError, signInPassword, signInEmail } = this.state;
    return (
      <div>
        {signInError ? (
          <p>{signInError}</p>
        ) : (
          <div>
            <p>Sign In</p>
            <form onSubmit={this.onSignIn}>
              <TextField
                type="email"
                required
                placeholder="email"
                value={signInEmail}
                onChange={this.onchangeInputs("signInEmail")}
              />
              <br />
              <TextField
                type="password"
                required
                placeholder="Password"
                value={signInPassword}
                onChange={this.onchangeInputs("signInPassword")}
              />
              <br />
              <Button type="submit" variant="contained" color="primary">
                Sign In
              </Button>
            </form>
          </div>
        )}
        ;
      </div>
    );
  }
}

export default SignIn;
