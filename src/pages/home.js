import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <h1>Home</h1>
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
    );
  }
}

export default Home;
