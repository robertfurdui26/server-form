const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "123",
  database: "form",
});

app.post("/register", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  db.query(
    "INSERT INTO myForm(userName,password) VALUES(?,?)",
    [userName, password],
    (err, result) => {
      console.log(err);
    }
  );
});

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;

  db.query(
    "SELECT * FROM myForm WHERE userName = ? AND password = ?",
    [userName, password],
    (err, result) => {
      if (err) {
        res.send({ err: "eroare" });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ mesage: "wrong user" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Yes,it is running in port 3001!!!");
});
