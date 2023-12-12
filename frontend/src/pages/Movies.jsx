import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Movies");
        setMovies(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllMovies();
  }, []);

  console.log(movies);

  const handleDelete = async (idMovies) => {
    try {
      await axios.delete(`http://localhost:8800/Movies/${idMovies}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1> Movie Shop</h1>
      <div className="movies">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div key={movie.idMovies} className="movie">
            <img src={movie.movieImg} alt="" />
            <h2>{movie.movieName}</h2>
            <p>{movie.movieDescription}</p>
            <button className="delete" onClick={() => handleDelete(movie.idMovies)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${movie.idMovies}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
            </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new movie
        </Link>
      </button>
    </div>
  );
};

export default Movies;