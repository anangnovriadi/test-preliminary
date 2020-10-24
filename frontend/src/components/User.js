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
      email: "",
      name: "",
      password: "",
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
      .post(
        "http://localhost:3004/api/users",
        {
          name: this.state.name,
          email: this.state.email,
          password: "123456",
        },
        {
          headers: {
            Authorization: "Bearer " + isAuth(),
          },
        }
      )
      .then((res) => {
        alert("Success create user");
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillMount() {
    axios
      .get(
        "http://localhost:3004/api/users",
        {},
        {
          headers: {
            Authorization: "Bearer " + isAuth(),
          },
        }
      )
      .then((res) => {
        this.setState({
          loading: false,
          list: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { list, loading } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className="mt-5 mb-5">
        <div className="container" style={{ maxWidth: "500px" }}>
          <Header />
          <div className="mt-5 mb-4">
            <button onClick={this.handleLogout} class="badge badge-secondary">
              Logout
            </button>
          </div>
          <div className="mt-5 mt-4">
            <h4>Add Users</h4>
            <hr />
            <div>
              <form method="post" onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Email address</label>
                  <input
                    name="email"
                    onChange={handleChange}
                    type="email"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Name</label>
                  <input
                    name="name"
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>
          </div>
          <div className="mt-5 mt-4">
            <h4>List Task</h4>
            <hr />
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? "Loading"
                : list.map((key, i) => {
                    return (
                      <tr>
                        <th scope="row">#</th>
                        <td>{key.email}</td>
                        <td>{key.name}</td>
                        <td>User</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
