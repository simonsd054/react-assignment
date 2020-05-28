import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Spinner, Toast } from "react-bootstrap";

export default class CreatePost extends Component {
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
    e.preventDefault();

    console.log("lol");

    this.setState({
      spinner: true,
    });

    const newPost = {
      userId: this.state.user_id,
      title: this.state.title,
      body: this.state.body,
    };

    console.log(newPost);

    axios
      .post("http://jsonplaceholder.typicode.com/posts", newPost, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        this.setState({
          spinner: false,
          toast: true,
        });
        console.log(res.data);
      });

    this.setState({
      user_id: "",
      title: "",
      body: "",
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
      <div style={{ marginTop: 20 }}>
        <h3>Create New Post</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>User ID:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.user_id}
              onChange={this.onChangeUserId}
            ></input>
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
            ></input>
          </div>
          <div className="form-group">
            <label>Body:</label>
            <input
              type="text"
              className="form-control"
              value={this.state.body}
              onChange={this.onChangeBody}
            ></input>
          </div>
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
            {this.state.spinner ? " Creating..." : "Create Post"}
          </Button>
        </form>
        <Toast
          show={this.state.toast}
          onClose={this.triggerToast}
          delay={3000}
          autohide
        >
          <Toast.Body>Post Created</Toast.Body>
        </Toast>
      </div>
    );
  }
}
