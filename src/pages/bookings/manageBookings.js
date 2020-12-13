import React, { Component } from "react";
import { ApiUrl } from "../../config/apiUrl";
import axios from "axios";

export class ManageBookings extends Component {
  state = {
    bookings: [],
  };

  componentDidMount() {
    this.getBookings();
  }

  getBookings = () => {
    axios
      .get(`${ApiUrl.TEST_URL}/booking-service/bookings`, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        this.setState({ bookings: res.data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleCheck = (data) => {
    axios
      .put(`${ApiUrl.TEST_URL}/booking-service/status`, data, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        alert(res.data.message)
        this.getBookings();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 className="home-header">Manage Bookings</h1>
        {this.state.bookings &&
          this.state.bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              {booking.service && <h5>Type: {booking.service.service_type}</h5>}
              <p>Guest Name : {booking.guest.name}</p>
              <p>Guest Email : {booking.guest.email}</p>
              <p>Bill : ${booking.bill_amount}</p>
              {booking.status === "CONFIRMED" && (
                <button
                  onClick={() =>
                    this.handleCheck({
                      status: "CHECK_IN",
                      booking_id: booking._id,
                    })
                  }
                >
                  Check In
                </button>
              )}
              {booking.status === "CONFIRMED" && (
                <button
                  onClick={() =>
                    this.handleCheck({
                      status: "CANCELED",
                      booking_id: booking._id,
                    })
                  }
                >
                  Cancel
                </button>
              )}
              {booking.status === "CHECK_IN" && (
                <button
                  onClick={() =>
                    this.handleCheck({
                      status: "CHECK_OUT",
                      booking_id: booking._id,
                    })
                  }
                >
                  Check Out
                </button>
              )}
              {booking.status === "RATED" && <p>Rating: {booking.rating}</p>}
            </div>
          ))}
      </div>
    );
  }
}

export default ManageBookings;
