import React, { Component } from "react";

export class MybookingItems extends Component {
  state = {
    rating: 5,
  };

  render() {
    const { booking } = this.props;

    return (
      <div key={booking._id} className="myBooking-card">
        <img
          src="https://cdn1.goibibo.com/voy_mmt/t_g/htl-imgs/201906151747438570-5ced5052caf811e99e200242ac110002.jpg"
          alt=""
        />
        {booking.service && (
          <>
            <p>Type : {booking.service.service_type}</p>
            <p>Description : {booking.service.description}</p>
          </>
        )}
        <p>Status : {booking.status}</p>
        {booking.status === "CHECK_OUT" && (
          <>
            <select
              name="rating"
              value={this.state.rating}
              onChange={(e) => this.setState({ rating: e.target.value })}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button
              type="button"
              onClick={() =>
                this.props.handleRating({
                  booking_id: booking._id,
                  rating: this.state.rating,
                })
              }
            >
              Rate{" "}
            </button>
          </>
        )}

        {booking.status === "RATED" && <p>Rating: {booking.rating}</p>}
      </div>
    );
  }
}

export default MybookingItems;
