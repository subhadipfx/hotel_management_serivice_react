import "./App.css";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { Component } from "react";
import axios from "axios";
import ManageServices from "./pages/services/manageServices";
import ManageRoles from "./pages/auth/manageRoles";
import ManageBookings from "./pages/bookings/manageBookings";
import BookServices from "./pages/bookings/book-services";
import { ApiUrl } from "./config/apiUrl";
import MyBookings from "./pages/bookings/my-bookings";

class App extends Component {
  state = {
    user: {
      email: "",
      password: "",
      token: localStorage.getItem("token") || "",
      role: "",
      user_id: "",
    },
  };

  componentDidMount() {
    const token = localStorage.getItem("token");
    if (token) {
      this.getMe(token);
    }
  }

  login = (credentials) => {
    axios
      .post(`${ApiUrl.TEST_URL}/user/authenticate`, credentials)
      .then((res) => {
        this.getMe(res.data.data.token);
      })
      .catch((err) => console.log(err));
  };

  register = (credentials) => {
    axios
      .post(`${ApiUrl.TEST_URL}/user`, credentials)
      .then((res) => {
        this.getMe(res.data.data.token);
      })
      .catch((err) => console.log(err));
  };

  getMe = (token) => {
    axios
      .get(`${ApiUrl.TEST_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token", token);
        this.setState({
          user: {
            ...res.data.data,
            role: res.data.data.role.toLowerCase(),
            token,
          },
        });
      })
      .catch((err) => console.log(err));
  };

  logout = () => {
    localStorage.removeItem("token");
    this.setState({
      user: {
        email: "",
        password: "",
        token: "",
        role: "",
        user_id: "",
      },
    });
  };

  render() {
    console.log(this.state.user);
    return (
      <div className="App">
        {this.state.user.token && (
            <div>
              <button className="logout" onClick={() => this.logout()}>Logout</button>
            </div>
        )}
        <Router>
          <Switch>
            <Route path="/" exact>
              {!this.state.user.token ? (
                <Redirect to="/login" />
              ) : (
                <Home user={this.state.user} />
              )}
            </Route>
            <Route path="/login">
              {this.state.user.token ? (
                <Redirect to="/" />
              ) : (
                <Login login={this.login} />
              )}
            </Route>
            <Route path="/register">
              {this.state.user.token ? (
                <Redirect to="/" />
              ) : (
                <Register register={this.register} />
              )}
            </Route>
            <Route path="/manage-services">
              {!this.state.user.token ? (
                <Redirect to="/" />
              ) : this.state.user.role === "staff" ||
                this.state.user.role === "owner" ? (
                <ManageServices user={this.state.user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/manage-roles">
              {!this.state.user.token ? (
                <Redirect to="/" />
              ) : this.state.user.role === "owner" ? (
                <ManageRoles user={this.state.user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/manage-bookings">
              {!this.state.user.token ? (
                <Redirect to="/" />
              ) : this.state.user.role === "staff" ||
                this.state.user.role === "owner" ? (
                <ManageBookings user={this.state.user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/book-services">
              {!this.state.user.token ? (
                <Redirect to="/" />
              ) : this.state.user.role === "guest" ? (
                <BookServices user={this.state.user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/my-bookings">
              {!this.state.user.token ? (
                <Redirect to="/" />
              ) : this.state.user.role === "guest" ? (
                <MyBookings user={this.state.user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
