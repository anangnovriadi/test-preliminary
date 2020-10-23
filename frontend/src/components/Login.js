import React, { Component } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
const history = createBrowserHistory({ forceRefresh: true });

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      login: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);

    // let axiosConfig = {
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     }
    // };

    axios
      .post("http://localhost:3004/api/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === "00") {
          localStorage.setItem("token", res.data.data.token);
          this.setState({
            login: true,
          });
          setTimeout(() => history.push("/"), 400);
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { handleSubmit, handleChange } = this;
    return (
      <div className="mt-5">
        <div className="container" style={{ maxWidth: "500px" }}>
          <div>
            <h4>Login</h4>
            <hr />
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                onChange={handleChange}
                name="email"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                onChange={handleChange}
                name="password"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
