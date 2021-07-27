import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Message from "./Message";

const validateFile = (file) => {
  let split = file.name.split(".");
  return ["jpg", "jpeg", "png", "bmp"].includes(split[1]);
};

const Upload = () => {
  const [file, setFile] = useState(null);
  const userId = localStorage.getItem("user");
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [hasImage, setHasImage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/api/picture/${userId}`);
        console.log(response);
        setHasImage(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [userId]);

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

  return !token ? (
    <Message prop={"denied"} />
  ) : (
    <div className="card">
      <div className="card-body">
        <div>
          <form>
            <label>
              Upload Picture
              <input type="file" onChange={onChange}></input>
            </label>
          </form>
        </div>
        <div>
          {file && validateFile(file) && (
            <button
              type="submit"
              className="btn btn-success p-2"
              onClick={(e) => submit(e)}
            >
              Upload
            </button>
          )}
        </div>
        {hasImage && (
          <Link to={"/message/deletepic"}>
            <button className="btn btn-success p-2" onClick={removePicture}>
              Delete Profile Picture
            </button>
          </Link>
        )}
        <Link to={"/account"}>
          <button className="btn btn-primary mt-1">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Upload;
