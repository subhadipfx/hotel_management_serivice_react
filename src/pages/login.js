import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      alert("Invalid credentials");
    } else {
      this.props.login({
        email: this.state.email,
        password: this.state.password,
      });
    }
  };
  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">login</button>
        </form>
        <p>
          Don't have an account <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}

export default Login;
