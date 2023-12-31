import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
  const [movie, setMovie] = useState({
    movieName: "",
    movieDescription: "",
    movieImg: "",
  });
  const [error,setError] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/Movies", movie);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true)
    }
  };

  return (
    <div className="form">
      <h1>Add New Movie</h1>
      <input
        type="text"
        placeholder="Movie title"
        name="movieName"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        type="text"
        placeholder="Movie desc"
        name="movieDescription"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Movie cover"
        name="movieImg"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Add</button>
      {error && "Something went wrong!"}
      <Link to="/">See all Movies</Link>
    </div>
  );
};

export default Add;