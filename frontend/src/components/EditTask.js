import React, { Component } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import { isAuth, isLogout } from "../helpers/auth";
import Header from "./Header";

const history = createBrowserHistory({ forceRefresh: true });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
      status: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    isLogout();
    history.push("/login");
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    axios
      .put(
        "http://localhost:3004/api/tasks/" + this.props.match.params.id,
        {
          status: this.state.status,
        },
        {
          headers: {
            Authorization: "Bearer " + isAuth(),
          },
        }
      )
      .then((res) => {
        alert("Success update task");
        setTimeout(() => history.push("/"), 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props.match.params.id);
    const { handleSubmit, handleChange } = this;
    return (
      <div className="mt-5">
        <div className="container" style={{ maxWidth: "500px" }}>
          <Header />
          <div className="mt-5 mb-4">
            <button onClick={this.handleLogout} class="badge badge-secondary">
              Logout
            </button>
          </div>
          <div className="mt-5 mt-4">
            <h4>Edit Task</h4>
            <hr />
            <div>
              <form method="post" onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Status</label>
                  <select
                    name="status"
                    onChange={handleChange}
                    class="form-control"
                  >
                    <option value="1">Initial</option>
                    <option value="2">Done</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
