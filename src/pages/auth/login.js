import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css"
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
      <div className="login">
        <h2 className="login-header">Log in</h2>
        <form className="login-container" onSubmit={(e) => this.handleSubmit(e)}>
          <input
            type="text"
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Password"
          />
          <p>
            <input type="submit" value="Log in"/>
          </p>
          <p>
            Don't have an account <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    );
  }
}

export default Login;
