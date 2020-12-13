import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
export class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
          <h1 className="home-header">Home</h1>
          <div className="nav-items">
            {user.role === "owner" && <Link to="/manage-roles">Manage Roles</Link>}
                    {(user.role === "owner" || user.role === "staff") && (
                      <>
                          <Link to="/manage-services">Manage Services</Link>
                          <Link to="/manage-bookings">Manage Bookings</Link>
                      </>
                    )}
                    {user.role === "guest" && (
                      <>
                          <Link to="/book-services">Book services</Link>
                          <Link to="/my-bookings">My Bookings</Link>
                      </>
                    )}
          </div>

      </div>
    );
  }
}

export default Home;
