import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState(null);
  const userId = localStorage.getItem("user");
  const history = useHistory();
  const token = localStorage.getItem("token");

  const removePicture = async () => {
    try {
      await axios.delete(`/api/picture/${userId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    let url = `/api/upload/${userId}`;
    axios
      .post(url, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res);
        history.push("/message/upload");
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  const onChange = (event) => {
    if (event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <form>
          <label>
            Upload Picture
            <input type="file" onChange={onChange}></input>
          </label>
          <button
            type="submit"
            className="btn btn-success p-2"
            onClick={(e) => submit(e)}
          >
            Upload
          </button>
        </form>
        <button className="btn btn-success p-2" onClick={removePicture}>
          Delete Picture
        </button>
        <Link to={"/account"}>
          <button className="btn btn-primary">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Upload;
