import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import pilot from "../assets/pilot.jpg";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const OneComment = ({ post, remove, userName }) => {
  const handleRemove = () => remove(post);
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/picture/${post.userId}`);
        console.log(response);
        setHasImage(true);
      } catch (error) {
        console.error(error);
        setHasImage(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="comments list-group-item mt-3">
      <div>
        <img
          className="comment-pic"
          src={!hasImage ? pilot : `/api/picture/${post.userId}`}
          alt=""
        />
      </div>
      <div className="comment">
        <div className="first">
          <div className="name">
            <b>{post.username}</b>
          </div>
          <div className="createdAt">{format(post.createdAt)}</div>
        </div>
        <div>{post.comment}</div>
        <div className="bottom-line">
          {userName === post.username && (
            <button className="link-button" onClick={() => remove(post)}>
              edit
            </button>
          )}
          {userName === post.username && (
            <button className="link-button" onClick={handleRemove}>
              delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneComment;
