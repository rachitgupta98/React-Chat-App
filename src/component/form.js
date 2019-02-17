import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
class Form extends Component {
  state = {};
  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>
          <div className={this.props.handle}>
            <TextField
              label="handle"
              style={{ marginBottom: "10px" }}
              value={this.props.state.handle}
              onChange={this.props.onValueChange("handle")}
              required
            />
            <TextField
              label="message"
              multiline
              rowsMax={5}
              style={{ marginBottom: "10px" }}
              value={this.props.state.message}
              onChange={this.props.onValueChange("message")}
              onKeyPress={this.props.onTyping}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Form;
