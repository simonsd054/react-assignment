import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Spinner, Toast } from "react-bootstrap";

export default class EditPost extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserId = this.onChangeUserId.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      user_id: "",
      title: "",
      body: "",
      spinner: false,
      toast: false,
    };
  }

  componentDidMount() {
    console.log("check");
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`
      )
      .then((res) => {
        console.log("check1");
        this.setState({
          user_id: res.data.userId,
          title: res.data.title,
          body: res.data.body,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeUserId(e) {
    this.setState({
      user_id: e.target.value,
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }
  onSubmit(e) {
    this.setState({
      spinner: true,
    });

    e.preventDefault();
    const obj = {
      id: this.props.match.params.id,
      userId: this.state.user_id,
      title: this.state.title,
      body: this.state.body,
    };

    axios
      .put(
        `http://jsonplaceholder.typicode.com/posts/${this.props.match.params.id}`,
        obj,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        this.setState({
          spinner: false,
          toast: true,
        });
        console.log(res.data);
        this.props.history.push("/");
      });
  }

  handleClose = () => {
    this.setState({ spinner: false });
  };

  triggerToast = () => {
    this.setState({
      toast: !this.state.toast,
    });
  };

  render() {
    return (
      <div>
        <h3>Edit Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              className="form-control"
              value={this.state.user_id}
              onChange={this.onChangeUserId}
            ></input>
          </div>
          <div className="form-group">
            <label>Title</label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              type="text"
              className="form-control"
              value={this.state.body}
              onChange={this.onChangeBody}
            ></textarea>
          </div>
          <br></br>
          <Button
            variant="primary"
            onClick={this.onSubmit}
            disabled={this.state.spinner}
          >
            {this.state.spinner ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : (
              <div></div>
            )}
            {this.state.spinner ? " Updating..." : "Update Post"}
          </Button>
        </form>
        <Toast
          show={this.state.toast}
          onClose={this.triggerToast}
          delay={3000}
          autohide
        >
          <Toast.Body>Post Updated</Toast.Body>
        </Toast>
      </div>
    );
  }
}
