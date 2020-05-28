import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function deletePost(props) {
  console.log("lol");
  axios
    .delete(`https://jsonplaceholder.typicode.com/posts/${props.post.id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err));
}

const Post = (props) => (
  <tr>
    <td>{props.post.userId}</td>
    <td>{props.post.title}</td>
    <td>{props.post.body}</td>
    <td>
      <Link to={"/edit/" + props.post.id}>
        <button type="button" className="btn btn-link">
          Edit
        </button>
      </Link>
      <button
        type="button"
        className="btn btn-link"
        onClick={deletePost.bind(this, props)}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default class PostsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        this.setState({ posts: res.data });
      })
      .catch((err) => console.log(err));
  }

  postList = () => {
    return this.state.posts.map((currentPost, i) => {
      return <Post post={currentPost} key={i} />;
    });
  };

  render() {
    return (
      <div>
        <h3> Posts List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>{this.postList()}</tbody>
        </table>
      </div>
    );
  }
}
