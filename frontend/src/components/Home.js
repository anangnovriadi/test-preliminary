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
      listUser: [],
      user_id: "",
      task: "",
      description: "",
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
        "http://localhost:3004/api/assign",
        {
          user_id: this.state.user_id,
          task: this.state.task,
          description: this.state.description,
        },
        {
          headers: {
            Authorization: "Bearer " + isAuth(),
          },
        }
      )
      .then((res) => {
        console.log(res);
        alert("Success create task");
        setTimeout(() => history.push("/"), 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleClickDelete(id) {
    axios
      .delete("http://localhost:3004/api/tasks/" + id, {
        headers: {
          Authorization: "Bearer " + isAuth(),
        },
      })
      .then((res) => {
        alert("Success delete task");
        setTimeout(() => history.push("/"), 400);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillMount() {
    axios
      .post(
        "http://localhost:3004/api/tasks/common",
        {
          user: [],
        },
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
          listUser: res.data.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { list, listUser, loading } = this.state;
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
            <h4>Add Task</h4>
            <hr />
            <div>
              <form method="post" onSubmit={handleSubmit}>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">User</label>
                  <select
                    name="user_id"
                    onChange={handleChange}
                    class="form-control"
                  >
                    {listUser.map((key, i) => {
                      return <option value={key.id}>{key.name}</option>;
                    })}
                  </select>
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Task</label>
                  <input
                    name="task"
                    onChange={handleChange}
                    type="text"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlInput1">Description</label>
                  <input
                    name="description"
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
                <th scope="col">Task</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? "Loading"
                : list.map((key, i) => {
                    return (
                      <tr>
                        <th scope="row">#</th>
                        <td>{key.task}</td>
                        <td>{key.description}</td>
                        <td>{key.status}</td>
                        <td>
                          <a href={"/edit/" + key.id} class="btn btn-primary">
                            Edit
                          </a>
                          <button
                            onClick={() => this.handleClickDelete(key.id)}
                            style={{ cursor: "pointer" }}
                            className="btn btn-secondary"
                          >
                            Delete
                          </button>
                        </td>
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
