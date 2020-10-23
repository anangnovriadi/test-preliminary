import React, { Component } from "react";
import axios from "axios";
import { isAuth } from "../helpers/auth";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      loading: true,
    };
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
