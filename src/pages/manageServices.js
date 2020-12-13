import React, { Component } from "react";
import { ApiUrl } from "../config/apiUrl";
import axios from "axios";

export class ManageServices extends Component {
  state = {
    services: [],
  };

  componentDidMount() {
    this.getServices();
  }

  getServices = () => {
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
  };

  deleteService = (serviceId) => {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`${ApiUrl.TEST_URL}/hotel-service/${serviceId}`, {
          headers: {
            Authorization: `Bearer ${this.props.user.token}`,
          },
        })
        .then((res) => {
          this.getServices();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  handleAddService = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    axios
      .post(`${ApiUrl.TEST_URL}/hotel-service`, data, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        this.getServices();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Manage services</h1>
        <form onSubmit={(e) => this.handleAddService(e)}>
          <select name="service_type" title="Select a service type">
            <option value="MEETING_ROOMS">Meeting Rooms</option>
            <option value="DINING">Dining</option>
            <option value="LIVE_EVENT_BOOKINGS">Live Event Booking</option>
            <option value="ROOM_UPGRADE">Room Upgrade</option>
            <option value="CAR_RENTAL">Car Rental</option>
          </select>
          <input type="text" name="description" placeholder="Description" />
          <input type="number" name="price" placeholder="Price" />
          <input type="number" name="discount" placeholder="Discount" />
          <input type="file" name="image" />
          <button type="submit">Save</button>
        </form>
        {this.state.services &&
          this.state.services.map((service) => (
            <div key={service._id} className="service-card">
              <img
                src="https://cdn1.goibibo.com/voy_mmt/t_g/htl-imgs/201906151747438570-5ced5052caf811e99e200242ac110002.jpg"
                alt=""
              />
              <h5>Type: {service.service_type}</h5>
              <p>Description {service.description}</p>
              <p>price :${service.price}</p>
              <p>Discount: {service.discount}%</p>
              <button
                type="button"
                onClick={() => this.deleteService(service._id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    );
  }
}

export default ManageServices;
