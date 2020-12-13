import React, { Component } from "react";
import UserTable from "../components/userTable";
import axios from "axios";
import { ApiUrl } from "../config/apiUrl";

export class ManageRoles extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get(`${ApiUrl.TEST_URL}/user/list`, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        this.setState({
          users: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateUser = (data) => {
    axios
      .put(`${ApiUrl.TEST_URL}/user/assign-role`, data, {
        headers: {
          Authorization: `Bearer ${this.props.user.token}`,
        },
      })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Manage users</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
            {this.state.users &&
              this.state.users.map((user) => (
                <UserTable
                  key={user._id}
                  user={user}
                  updateUser={this.updateUser}
                />
              ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ManageRoles;
