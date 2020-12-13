import React, { Component } from "react";
import BookingPayModal from "../../components/bookingPayModal";
import axios from "axios";
import { ApiUrl } from "../../config/apiUrl";
import "./styles.css";

export class BookServices extends Component {
  state = {
    openPayModal: false,
    booking: null,
    bookingLoading: false,
    services: [],
  };

  componentDidMount() {
    axios
      .get(`${ApiUrl.TEST_URL}/hotel-service/list`, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        this.setState({
          services: res.data.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  closePayModal = () => {
    this.setState({
      openPayModal: false,
    });
  };

  pay = () => {
    this.setState({ bookingLoading: true });
    axios
      .post(
        `${ApiUrl.TEST_URL}/booking-service`,
        {
          service_id: this.state.booking._id,
          amount:
            parseInt(this.state.booking.price) -
            Math.round(
              parseInt(this.state.booking.price) *
                parseInt(this.state.booking.discount)
            ) /
              100,
        },
        {
          headers: {
            Authorization: `Bearer ${this.props.user.token}`,
          },
        }
      )
      .then((res) => {
        this.setState({ bookingLoading: false, openPayModal: false });
        alert("Booking has been confirmed");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 className="home-header">Book services</h1>
        {this.state.services &&
          this.state.services.map((service) => (
            <div key={service._id} className="service-card">
              <img
                src="https://cdn1.goibibo.com/voy_mmt/t_g/htl-imgs/201906151747438570-5ced5052caf811e99e200242ac110002.jpg"
                alt=""
              />
              <p>Type: {service.service_type}</p>
              <p>Description {service.description}</p>
              <p>price :${service.price}</p>
              <p>Discount: {service.discount}%</p>
              <button
                type="button"
                onClick={() =>
                  this.setState({ openPayModal: true, booking: service })
                }
              >
                Book
              </button>
            </div>
          ))}
        {this.state.openPayModal && (
          <BookingPayModal
            open={this.state.openPayModal}
            closePayModal={this.closePayModal}
            booking={this.state.booking}
            pay={this.pay}
            bookingLoading={this.state.bookingLoading}
          />
        )}
      </div>
    );
  }
}

export default BookServices;
