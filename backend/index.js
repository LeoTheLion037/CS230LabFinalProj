import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "CS230Lab",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/Movies", (req, res) => {
  const q = "SELECT * FROM Movies";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/Movies", (req, res) => {
  const q = "INSERT INTO Movies(`movieName`, `movieDescription`, `movieImg`) VALUES (?)";

  const values = [
    req.body.idMovies,
    req.body.movieDescription,
    req.body.movieImg,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/Moives/:idMovies", (req, res) => {
  const idMovies = req.params.id;
  const q = " DELETE FROM Movie WHERE idMovies = ? ";

  db.query(q, [idMovies], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/Movies/:idMovies", (req, res) => {
  const idMovies = req.params.idMovies;
  const q = "UPDATE Movie SET `movieName`= ?, `movieDescription`= ?, `movieImg`= ? WHERE idMovies = ?";

  const values = [
    req.body.movieName,
    req.body.movieDescription,
    req.body.movieImg,
  ];

  db.query(q, [...values,idMovies], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});