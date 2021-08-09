import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Back from "../components/buttons/Back";
import Message from "./Message";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const Board = () => {
  const userId = localStorage.getItem("user");
  const userName = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/posts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setPosts(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const post = async () => {
    try {
      await axios.post(
        `/api/posts/${userId}`,
        { comment: comment },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setComment("");
    } catch (error) {}
  };

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="board card w-50">
      <div className="card-body">
        <div className="posts w-100">
          {posts.map((post) => (
            <div className="list-group-item mt-3" key={post.id}>
              <div>{post.username}</div>
              <div>{format(post.createdAt)}</div>
              <div>{post.comment}</div>
            </div>
          ))}
        </div>
        <textarea
          className="form-control mb-3 mt-3"
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          id="comment"
        />
        <button className="btn btn-warning" onClick={post}>
          Post Message
        </button>
        <Back />
      </div>
    </div>
  );
};

export default Board;
