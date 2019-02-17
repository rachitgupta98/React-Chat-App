import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import "whatwg-fetch";
class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      token: "",
      signUpError: "",

      signUpEmail: "",
      signUpPassword: "",
      handle: ""
    };
  }
  onchangeInputs = dbs => e => {
    this.setState({
      [dbs]: e.target.value
    });
  };
  componentDidMount() {}
  onSignUp = e => {
    e.preventDefault();
    const { handle, signUpEmail, signUpPassword } = this.state;
    console.log(this.state);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        handle: handle,
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  };
  render() {
    const {
      isLoading,
      token,

      signUpEmail,
      signUpPassword,
      signUpError,
      handle
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
          {signUpError ? (
            <div>
              <p>{signUpError}</p>
              <Button href="/api/signin">Login</Button>
            </div>
          ) : (
            <div>
              <p>Sign Up</p>
              <form onSubmit={this.onSignUp}>
                <TextField
                  type="text"
                  required
                  placeholder="handle"
                  value={handle}
                  onChange={this.onchangeInputs("handle")}
                />
                <br />
                <TextField
                  type="email"
                  required
                  placeholder="Email"
                  value={signUpEmail}
                  onChange={this.onchangeInputs("signUpEmail")}
                />
                <br />
                <TextField
                  type="password"
                  required
                  placeholder="Password"
                  value={signUpPassword}
                  onChange={this.onchangeInputs("signUpPassword")}
                />
                <br />
                <Button type="submit" variant="contained" color="primary">
                  Sign Up
                </Button>
              </form>
            </div>
          )}
        </div>
      );
    }

    return (
      <div>
        <p>Account</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default SignUp;
