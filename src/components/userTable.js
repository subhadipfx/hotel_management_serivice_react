import React, { Component } from "react";

export class UserTable extends Component {
  state = {
    role: this.props.user.role,
  };

  handleUpdateUser = () => {
    this.props.updateUser({
      user_id: this.props.user._id,
      role: this.state.role,
    });
  };

  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <select
            name="role"
            value={this.state.role}
            onChange={(e) => this.setState({ role: e.target.value })}
          >
            <option value="STAFF">STAFF</option>
            <option value="GUEST">GUEST</option>
          </select>
        </td>
        <td>
          <button type="button" className="update-role-btn" onClick={() => this.handleUpdateUser()}>
            Update
          </button>
        </td>
      </tr>
    );
  }
}

export default UserTable;
