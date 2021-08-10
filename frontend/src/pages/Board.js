import React, { useState, useEffect } from "react";
import axios from "axios";
import Back from "../components/buttons/Back";
import Message from "./Message";
import OneComment from "../components/OneComment";

const Board = () => {
  const userId = localStorage.getItem("user");
  const userName = localStorage.getItem("username");
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const [isPosted, setIsPosted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/posts`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const sorted = response.data.sort(function (a, b) {
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
        setPosts(sorted);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [isPosted]);

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
      setIsPosted(!isPosted);
      setComment("");
    } catch (error) {}
  };

  const remove = async (post) => {
    try {
      await axios.delete(`/api/posts/${post.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setIsPosted(!isPosted);
    } catch (error) {}
  };

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-12 col-lg-8">
          <div className="board card w-100">
            <div className="card-body">
              <div className="posts w-100">
                {posts.map((post) => (
                  <OneComment
                    post={post}
                    remove={remove}
                    key={post.id}
                    userName={userName}
                  />
                ))}
              </div>
              <textarea
                className="form-control mb-3 mt-3"
                type="text"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                id="comment"
                placeholder="Enter your message here..."
              />
              <Back />
              <button className="btn btn-warning" onClick={post}>
                Post Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
