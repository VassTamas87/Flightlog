import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import pilot from "../assets/pilot.jpg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const format = (date) => {
  return moment(date).format("YYYY-MM-DD HH:mm");
};

const OneComment = ({ post, remove, userName, setEditedComment, update }) => {
  const handleRemove = () => remove(post);
  const handleUpdate = () => update(post);
  const [hasImage, setHasImage] = useState(false);
  const [defaultValue, setDefaultValue] = useState(post.comment);
  const handleChange = (e) => {
    setEditedComment(e.target.value);
    setDefaultValue(e.target.value);
  };

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
  }, [post.userId]);

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
          <div className="createdAt">
            <div>Posted: {format(post.createdAt)}</div>
            <div>
              {post.updatedAt !== null
                ? "Edited: " + format(post.updatedAt)
                : ""}
            </div>
          </div>
        </div>
        <div>{post.comment}</div>
        <div className="bottom-line">
          {userName === post.username && (
            <Popup
              contentStyle={{ width: "350px" }}
              trigger={
                <i
                  className="fa fa-pencil edit-btn link-button"
                  aria-hidden="true"
                ></i>
              }
              position="left bottom"
            >
              <div>
                <input
                  className="w-100"
                  type="text"
                  value={defaultValue}
                  onChange={(e) => handleChange(e)}
                ></input>
                <button onClick={handleUpdate} className="btn btn-primary mt-3">
                  Save
                </button>
              </div>
            </Popup>
          )}
          {userName === post.username && (
            <i
              className="fa fa-trash-o del-btn"
              aria-hidden="true"
              onClick={handleRemove}
            ></i>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneComment;
