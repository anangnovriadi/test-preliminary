import React, { Component } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import { isAuth, isLogout } from "../helpers/auth";

const history = createBrowserHistory({ forceRefresh: true });

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
    };
  }

  handleLogout(e) {
    e.preventDefault();
    isLogout();
    history.push("/login");
  }

  componentWillMount() {
    axios
      .post(
        "http://localhost:3004/api/tasks/common",
        {
          user: ["user1@mail.com", "alex@admin.com"],
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

        console.log(this.state);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { list, loading } = this.state;
    return (
      <div className="mt-5">
        <div className="container" style={{ maxWidth: "500px" }}>
          <div>
            <button onClick={this.handleLogout} class="badge badge-secondary">
              Logout
            </button>
          </div>
          <div>
            <h4>List Task</h4>
            <hr />
          </div>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
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
