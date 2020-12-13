import React, { Component } from "react";
import axios from "axios";
import { ApiUrl } from "../../config/apiUrl";
import MybookingItems from "../../components/my-bookingItems";

export class MyBookings extends Component {
  state = {
    myBookings: [],
  };

  componentDidMount() {
    axios
      .get(`${ApiUrl.TEST_URL}/booking-service`, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        this.setState({
          myBookings: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleRating = (data) => {
    axios
      .put(`${ApiUrl.TEST_URL}/booking-service/rating`, data, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // this.setState({
        //   myBookings: res.data.data.data,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>My Bookings</h1>
        {this.state.myBookings &&
          this.state.myBookings.map((booking) => (
            <MybookingItems
              key={booking._id}
              booking={booking}
              handleRating={this.handleRating}
            />
          ))}
      </div>
    );
  }
}

export default MyBookings;
