import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.username || !this.state.password) {
      alert("Invalid credentials");
    } else {
      this.props.register({
        email: this.state.email,
        name: this.state.username,
        password: this.state.password,
      });
    }
  };
  render() {
    return (
      <div className="login">
        <h1 className="login-header">Register</h1>
        <form className="login-container" onSubmit={(e) => this.handleSubmit(e)}>
          <input
              type="text"
              placeholder="Name"
              value={this.state.username}
              onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            value={this.state.email}
            placeholder="Email"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <p>
            <input type="submit" value="Log in"/>
          </p>
          Have an account <Link to="/login">Login</Link>
        </form>
      </div>
    );
  }
}

export default Register;
